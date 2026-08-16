/**
 * Retrieval for the on-site assistant — BM25 over the site corpus, in ~120 lines
 * and zero dependencies.
 *
 * WHY BM25 AND NOT EMBEDDINGS: the corpus is a few dozen short passages about
 * one business. Shipping a transformer to the browser to search forty paragraphs
 * would cost megabytes to answer questions that term-frequency ranking already
 * answers correctly. The retrieval layer should be the cheapest thing that is
 * actually accurate — for a client with thousands of documents this is where the
 * hosted vector store goes, and the interface below does not change.
 *
 * The index is built once at module load. It is small enough that this is
 * measured in microseconds, and it keeps the query path allocation-free.
 */
import { passages } from './corpus.js'

// Words that appear everywhere and discriminate nothing.
const STOP = new Set(
  ('a an and are as at be but by can could do does for from had has have how i if in into is it its ' +
    'me my of on or our so that the their them then there these they this to too was we were what when ' +
    'where which who will with would you your about would like just want need get got give tell').split(' '),
)

/**
 * Domain synonyms. A visitor asks "how much do you charge", the page says
 * "price" — without this bridge, retrieval misses the single most common
 * question a studio site receives. Every group here is a real question shape.
 */
const SYNONYMS = [
  ['price', 'cost', 'charge', 'fee', 'budget', 'quote', 'rate', 'expensive', 'cheap', 'afford', 'much', 'rupees', 'lakh', 'inr'],
  ['time', 'long', 'duration', 'timeline', 'schedule', 'deadline', 'weeks', 'week', 'fast', 'quick', 'soon', 'delivery', 'deliver'],
  ['assistant', 'ai', 'chatbot', 'bot', 'chat', 'llm', 'rag', 'gpt'],
  ['edit', 'update', 'change', 'cms', 'content', 'manage', 'myself'],
  ['retainer', 'maintenance', 'monthly', 'support', 'care', 'upkeep', 'hosting'],
  ['who', 'team', 'person', 'people', 'founder', 'solo', 'freelancer', 'agency', 'staff'],
  ['work', 'portfolio', 'projects', 'case', 'examples', 'clients', 'built'],
  ['contact', 'email', 'reach', 'call', 'hire', 'start', 'begin', 'talk', 'enquiry', 'book'],
  ['available', 'availability', 'free', 'busy', 'booked', 'capacity', 'slots'],
  ['malayalam', 'english', 'language', 'languages', 'bilingual'],
  ['fast', 'performance', 'speed', 'lighthouse', 'fps', 'slow', 'optimise', 'optimize'],
  ['seo', 'google', 'search', 'ranking', 'rank', 'visible'],
  ['clinic', 'hospital', 'doctor', 'medical', 'healthcare', 'health'],
  ['college', 'institution', 'school', 'admissions', 'institute', 'education'],
]

const expand = (token) => {
  const out = [token]
  for (const group of SYNONYMS) {
    // Cheap stem tolerance: "pricing" should still hit the "price" group.
    if (group.some((w) => token === w || token.startsWith(w) || w.startsWith(token))) {
      out.push(...group)
    }
  }
  return out
}

export function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s₹]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
}

// ---- Index -----------------------------------------------------------------

const K1 = 1.4 // term-frequency saturation
const B = 0.72 // length normalisation

const docs = passages.map((p) => {
  // The title and keyword hints are weighted by repetition — a match on the
  // heading of a passage is a stronger signal than one in its body prose.
  const terms = [
    ...tokenize(p.title),
    ...tokenize(p.title),
    ...tokenize(p.title),
    ...tokenize(p.keywords || ''),
    ...tokenize(p.keywords || ''),
    ...tokenize(p.text),
  ]
  const tf = new Map()
  for (const t of terms) tf.set(t, (tf.get(t) || 0) + 1)
  return { passage: p, tf, len: terms.length, title: new Set(tokenize(p.title)) }
})

const N = docs.length
const avgLen = docs.reduce((sum, d) => sum + d.len, 0) / N || 1

const df = new Map()
for (const d of docs) for (const term of d.tf.keys()) df.set(term, (df.get(term) || 0) + 1)

const idf = (term) => {
  const n = df.get(term) || 0
  if (!n) return 0
  return Math.log(1 + (N - n + 0.5) / (n + 0.5))
}

// ---- Query -----------------------------------------------------------------

/**
 * Rank passages against a query.
 * Returns `[{ passage, score }]` sorted high to low, already trimmed to `limit`.
 *
 * Scores are normalised against the best possible score for the query so the
 * confidence threshold in answer.js means the same thing for a one-word query
 * as for a full sentence.
 */
export function retrieve(query, limit = 3) {
  const base = tokenize(query)
  if (!base.length) return []

  // Expanded terms count, but at a discount — a synonym hit is weaker evidence
  // than the visitor's own word.
  const weights = new Map()
  for (const token of base) {
    weights.set(token, Math.max(weights.get(token) || 0, 1))
    for (const syn of expand(token)) {
      if (syn !== token) weights.set(syn, Math.max(weights.get(syn) || 0, 0.45))
    }
  }

  const scored = docs.map((d) => {
    let score = 0
    for (const [term, weight] of weights) {
      const f = d.tf.get(term)
      if (!f) continue
      const norm = f * (K1 + 1) / (f + K1 * (1 - B + (B * d.len) / avgLen))
      score += idf(term) * norm * weight
    }

    /**
     * Title-overlap bonus.
     *
     * FAQ passages are titled with the exact question a visitor asks, so how
     * much of the query the title covers is a strong signal that term
     * frequency alone underweights. Without this, "do I have to take the
     * retainer" ranks the service card — which lists the retainer but never
     * answers "do I have to" — above the FAQ entry written for that objection.
     *
     * Multiplicative so it sharpens the existing ordering rather than letting
     * a short title outscore a genuinely relevant passage from nothing.
     */
    if (score > 0) {
      let covered = 0
      for (const token of base) if (d.title.has(token)) covered++
      score *= 1 + 0.9 * (covered / base.length)
    }

    return { passage: d.passage, score }
  })

  const best = Math.max(...scored.map((s) => s.score), 0)
  if (best <= 0) return []

  return scored
    .map((s) => ({ ...s, score: s.score / best, raw: s.score }))
    .sort((a, b) => b.raw - a.raw)
    .slice(0, limit)
    .filter((s) => s.raw > 0)
}

/**
 * Absolute-confidence gate.
 *
 * Normalised scores always put *something* at 1.0, so relevance has to be judged
 * on the raw score. Below this the honest move is to say we don't know rather
 * than serve the least-bad paragraph — a confidently wrong price is worse than
 * no answer.
 */
export const CONFIDENCE_FLOOR = 1.9
