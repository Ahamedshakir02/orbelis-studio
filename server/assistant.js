/**
 * The hosted half of the assistant: a model that writes the reply, held to
 * what the site says.
 *
 * The browser never talks to Anthropic. It posts the visitor's question here;
 * this handler adds the site's knowledge as the system prompt and asks Claude.
 * The API key lives only in the host's environment (`ANTHROPIC_API_KEY`), never
 * in a `VITE_` variable, so it is never shipped to a visitor.
 *
 * Nothing in here is specific to Orbelis. `createAssistantHandler` takes the
 * business's knowledge and voice, so the same handler can serve a client site
 * with a different knowledge file.
 *
 * Guard rails, because this endpoint is public and every call costs money:
 *   · only POSTs from the site's own origin are answered (`SITE_ORIGIN`); with
 *     it unset the endpoint refuses everything rather than serving anyone
 *   · a per-visitor rate limit, held in memory (best effort: each serverless
 *     instance keeps its own count, so the real ceiling is the spend limit on
 *     the API key)
 *   · the question, history and reply are all length-capped
 *   · any failure returns an error status, and the browser falls back to its
 *     own local answer, so a visitor never sees a dead chat
 */
import Anthropic from '@anthropic-ai/sdk'

const MAX_QUESTION = 500
const MAX_TURNS = 6
const MAX_TURN_CHARS = 1200
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 20

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  })

const hits = new Map()

/** True when this visitor has asked more than RATE_MAX questions in the window. */
function limited(key, now = Date.now()) {
  const recent = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) hits.clear()
  return recent.length > RATE_MAX
}

/** Keep only well-formed, recent turns, and trim each one. */
function cleanHistory(history) {
  if (!Array.isArray(history)) return []
  return history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.text.trim().slice(0, MAX_TURN_CHARS) }))
    .filter((m) => m.content)
}

/**
 * The API needs the conversation to start with the visitor and alternate. The
 * widget opens with the assistant's greeting, so drop leading assistant turns
 * and merge any two in a row from the same side.
 */
function toMessages(history, question) {
  const turns = [...history, { role: 'user', content: question }]
  while (turns.length && turns[0].role !== 'user') turns.shift()
  const out = []
  for (const t of turns) {
    const last = out[out.length - 1]
    if (last && last.role === t.role) last.content += `\n\n${t.content}`
    else out.push({ ...t })
  }
  return out
}

/**
 * @param {{ system: string, model?: string }} options
 *   `system` is the full instruction and knowledge text for this business.
 * @returns {(request: Request, env: Record<string, string | undefined>) => Promise<Response>}
 */
export function createAssistantHandler({ system, model: defaultModel = 'claude-opus-5-5' }) {
  let client

  return async function handle(request, env = {}) {
    const origin = request.headers.get('Origin') || ''
    const allowed = (env.SITE_ORIGIN || '')
      .split(',')
      .map((s) => s.trim().replace(/\/$/, ''))
      .filter(Boolean)
    const cors = allowed.includes(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' },
      })
    }
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

    const apiKey = env.ANTHROPIC_API_KEY
    if (!apiKey || !allowed.length) return json({ error: 'not_configured' }, 503)

    // A browser always sends Origin on a POST. Without this, anyone could point
    // a page at the endpoint and spend the budget.
    if (!allowed.includes(origin)) return json({ error: 'forbidden' }, 403)

    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'unknown'
    if (limited(ip)) return json({ error: 'rate_limited' }, 429, cors)

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'bad_request' }, 400, cors)
    }

    const question = typeof body?.question === 'string' ? body.question.trim() : ''
    if (!question || question.length > MAX_QUESTION) return json({ error: 'bad_request' }, 400, cors)

    client ??= new Anthropic({ apiKey, maxRetries: 1, timeout: 20_000 })

    try {
      const response = await client.beta.messages.create({
        model: env.ASSISTANT_MODEL || defaultModel,
        max_tokens: 1024,
        // A chat reply about one business: low effort keeps it quick and cheap
        // without hurting answers that come straight from the knowledge text.
        output_config: { effort: 'low' },
        // If a safety check declines a harmless question, Anthropic retries it
        // on its recommended fallback model instead of returning nothing.
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
        messages: toMessages(cleanHistory(body.history), question),
      })

      if (response.stop_reason === 'refusal') return json({ error: 'declined' }, 502, cors)

      const answer = response.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim()
      if (!answer) return json({ error: 'empty' }, 502, cors)

      return json({ answer, actions: ['enquiry'] }, 200, cors)
    } catch (err) {
      // The status is enough for the browser to fall back; details stay in
      // the host's logs.
      console.error('[assistant]', err?.status ?? '', err?.message ?? err)
      const status = err instanceof Anthropic.RateLimitError ? 429 : 502
      return json({ error: 'upstream' }, status, cors)
    }
  }
}
