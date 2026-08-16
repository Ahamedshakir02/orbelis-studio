/**
 * Answer composition.
 *
 * Two layers, in order:
 *
 *   1. INTENTS — a handful of question shapes worth answering deterministically
 *      rather than statistically. "What does it cost" and "how do I hire you"
 *      are the questions that decide whether a visitor becomes a client; they
 *      get a written answer, not the best-scoring paragraph.
 *
 *   2. RETRIEVAL — everything else is answered from the passage that ranked
 *      highest, cited back to the section it came from.
 *
 * Below the confidence floor the assistant declines. That is the whole point of
 * a retrieval-grounded assistant and the reason clients buy this instead of a
 * raw model: it would rather say "I don't have that" than invent a price.
 */
import { retrieve, CONFIDENCE_FLOOR } from './retrieve.js'
import { brand, services, availability, assistant as cfg } from '../../data/site.js'

const has = (q, ...words) => words.some((w) => q.includes(w))

/**
 * @returns {{ text: string, source?: {label: string, href: string}, actions?: string[] }}
 */
function matchIntent(query) {
  const q = query.toLowerCase().trim()

  if (/^(hi|hey|hello|yo|hai|namaskaram|good (morning|evening|afternoon))\b/.test(q)) {
    return {
      text: `Hello. I can answer anything on this page — prices, timelines, what the AI assistant actually does, how a project runs. What are you looking to build?`,
    }
  }

  if (/^(thanks|thank you|cheers|nice|cool|great|ok|okay)\b/.test(q)) {
    return {
      text: `Anytime. If you want to take it further, the enquiry form at the bottom of the page reaches ${brand.full} directly.`,
      actions: ['enquiry'],
    }
  }

  // The money question, answered in full rather than one service at a time.
  if (has(q, 'cost', 'price', 'pricing', 'charge', 'budget', 'how much', 'rate', 'quote')) {
    const lines = services.map((s) => `· ${s.title} — ${s.price}`).join('\n')
    return {
      text: `Published, not quoted on request:\n\n${lines}\n\nThe performance budget and the accessibility pass are included, not billed as extras. Where a project lands in a range depends on page count and how much of the content already exists.`,
      source: { label: 'Services & pricing', href: '#services' },
      actions: ['enquiry'],
    }
  }

  if (has(q, 'available', 'availability', 'free', 'busy', 'booked', 'capacity', 'start')) {
    return {
      text: `${availability.status} — ${availability.detail.toLowerCase()}. Scope gets agreed before a project starts, which is why the schedule holds. If the timing matters, say so in the enquiry and it'll be answered honestly.`,
      source: { label: 'Contact', href: '#contact' },
      actions: ['enquiry'],
    }
  }

  if (has(q, 'contact', 'email', 'reach', 'hire', 'get in touch', 'talk to', 'speak', 'call you')) {
    return {
      text: `Two ways: the enquiry form at the bottom of this page, or ${brand.email} directly. Either reaches the person who writes the code — there is no account manager in between.`,
      source: { label: 'Contact', href: '#contact' },
      actions: ['enquiry', 'email'],
    }
  }

  // A question every prospect asks and no site answers well.
  if (has(q, 'why you', 'why should', 'better than', 'different', 'instead of')) {
    return {
      text: `Honestly: because the two halves usually come from two vendors. Agencies build the site, someone else bolts on a chatbot, and neither owns the result. Here one person builds award-grade motion on the front and a retrieval-grounded assistant behind it — and you talk to that person, not a project manager.`,
      source: { label: 'Studio', href: '#studio' },
    }
  }

  return null
}

/** Trim a passage to the first couple of sentences so replies stay chat-sized. */
function condense(text, maxChars = 340) {
  if (text.length <= maxChars) return text
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  let out = ''
  for (const s of sentences) {
    if ((out + s).length > maxChars) break
    out += s
  }
  return (out || text.slice(0, maxChars)).trim() + (out ? '' : '…')
}

export function answer(query) {
  const intent = matchIntent(query)
  if (intent) return { ...intent, grounded: true }

  const hits = retrieve(query, 3)
  const top = hits[0]

  if (!top || top.raw < CONFIDENCE_FLOOR) {
    return {
      grounded: false,
      text: `${cfg.fallback} ${brand.email} gets a real answer from a human, usually the same day.`,
      actions: ['enquiry', 'email'],
    }
  }

  let text = condense(top.passage.text)

  // A clearly relevant second passage adds context without turning the reply
  // into a wall — anything weaker is noise and gets dropped.
  const second = hits[1]
  if (second && second.raw > CONFIDENCE_FLOOR && second.score > 0.55) {
    text += `\n\nAlso relevant — ${second.passage.title}: ${condense(second.passage.text, 200)}`
  }

  return {
    grounded: true,
    text,
    source: { label: top.passage.section, href: top.passage.href },
    actions: ['enquiry'],
  }
}
