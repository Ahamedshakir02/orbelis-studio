/**
 * The single entry point the UI talks to.
 *
 * Local retrieval always runs first. If `VITE_ASSISTANT_ENDPOINT` is configured,
 * the retrieved passages are posted to it so a hosted model can phrase the reply
 * in better prose — but the grounding is still decided here, on the client.
 *
 * That split is deliberate and it is the architecture we sell:
 *   · retrieval is cheap, auditable, and runs even when the network is down
 *   · the API key never reaches the browser, because the browser never calls the
 *     model provider — it calls our own endpoint
 *   · if the endpoint is slow, errors, or was never configured, the visitor
 *     still gets a correct grounded answer instead of a spinner
 *
 * A demo that dies without a backend is a demo that dies during the client
 * meeting. This one degrades to something that still works.
 */
import { answer } from './answer.js'
import { retrieve } from './retrieve.js'

const ENDPOINT = import.meta.env?.VITE_ASSISTANT_ENDPOINT || ''
const TIMEOUT_MS = 8000

export const isRemoteEnabled = () => Boolean(ENDPOINT)

async function askRemote(question, history) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const context = retrieve(question, 4).map((h) => ({
      title: h.passage.title,
      section: h.passage.section,
      text: h.passage.text,
      score: Number(h.score.toFixed(3)),
    }))

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ question, history: history.slice(-6), context }),
    })
    if (!res.ok) throw new Error(`Assistant endpoint returned ${res.status}`)

    const data = await res.json()
    if (!data?.answer) throw new Error('Assistant endpoint returned no answer')

    return {
      grounded: true,
      text: String(data.answer),
      source: data.source,
      actions: data.actions || ['enquiry'],
      via: 'remote',
    }
  } finally {
    clearTimeout(timer)
  }
}

/**
 * @param {string} question
 * @param {{role: 'user'|'assistant', text: string}[]} history
 */
export async function ask(question, history = []) {
  if (ENDPOINT) {
    try {
      return await askRemote(question, history)
    } catch (err) {
      // Never surface an infrastructure failure to a visitor — fall through to
      // the local answer, which is grounded in the same passages anyway.
      if (import.meta.env?.DEV) console.warn('[assistant] remote failed, using local:', err)
    }
  }
  return { ...answer(question), via: 'local' }
}
