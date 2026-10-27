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
 * raw model: it would rather say "I don't have that" than invent an answer.
 */
import { retrieve, CONFIDENCE_FLOOR } from './retrieve.js'
import { brand, services, work, availability, faq, assistant as cfg } from '../../data/site.js'

// A keyword must start a word: "rate" should not fire on "integrate" or
// "separately". Phrases and stems ("case stud") still match as prefixes.
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// A trailing space in a keyword means the word must end there too ("are you
// free " should not match "are you freelancers"); `q + ' '` lets it end the query.
const has = (q, ...words) => words.some((w) => new RegExp('(^|[^a-z])' + esc(w)).test(q + ' '))

/**
 * @returns {{ text: string, source?: {label: string, href: string}, actions?: string[] }}
 */
function matchIntent(query) {
  const q = query.toLowerCase().trim()

  if (/^(hi|hey|hello|yo|hai|namaskaram|good (morning|evening|afternoon))\b/.test(q)) {
    return {
      text: `Hello. I can answer anything on this page: what gets built, how pricing works, timelines and marketing. What problem do you want solved?`,
    }
  }

  if (/^(thanks|thank you|cheers|nice|cool|great|ok|okay)\b/.test(q)) {
    return {
      text: `Anytime. To take it further, the form at the bottom of the page goes straight to ${brand.full}.`,
      actions: ['enquiry'],
    }
  }

  // The money question, answered in full rather than one service at a time.
  if (has(q, 'cost', 'price', 'pricing', 'charge', 'budget', 'how much', 'rate', 'quote')) {
    const lines = services.map((s) => `· ${s.title}`).join('\n')
    return {
      text: `Every project is quoted to its requirements, so there is no fixed price list. The cost depends on the number of pages, whether the site takes bookings, and whether it needs an assistant or automation. Applications are quoted stage by stage, and marketing by the month. Send a short brief through the form and you get a quote before any work starts.\n\nWhat can be quoted:\n\n${lines}`,
      source: { label: 'Services', href: '#services' },
      actions: ['enquiry'],
    }
  }

  // "What do you do" should survey the whole shelf, in the order it is sold.
  if (has(q, 'services', 'what do you do', 'what do you offer', 'what can you do', 'what do you build')) {
    const lines = services.map((s) => `· ${s.title}`).join('\n')
    return {
      text: `${services.length} services, all from one team:\n\n${lines}\n\nEach is quoted to what you need. The Services section says what is in each.`,
      source: { label: 'Services', href: '#services' },
      actions: ['enquiry'],
    }
  }

  // Marketing as a whole is answered by the question written for it, not by
  // whichever of the four marketing cards happens to rank first.
  if (has(q, 'marketing', 'more leads', 'more customers', 'more enquiries', 'more patients', 'more sales')) {
    const entry = faq.find((f) => f.q.toLowerCase().includes('marketing'))
    if (entry) {
      return {
        text: entry.a,
        source: { label: 'Services', href: '#services' },
        actions: ['enquiry'],
      }
    }
  }

  // "start" on its own would also catch "startup".
  if (has(q, 'available', 'availability', 'are you free ', 'are you free?', 'free slot', 'busy', 'booked', 'capacity', 'can you start', 'start now', 'start soon', 'start immediately')) {
    return {
      text: `${availability.status}: ${availability.detail.toLowerCase()}. Scope is agreed before a project starts, which is why the schedule holds. If timing matters, say so in the enquiry and you will get a straight answer.`,
      source: { label: 'Contact', href: '#contact' },
      actions: ['enquiry'],
    }
  }

  // "speak" is deliberately not a bare keyword here: "do you speak Malayalam"
  // is a language question, not a request for the phone number.
  if (has(q, 'contact', 'email', 'who will reply', 'reply to me', 'reach you', 'hire', 'get in touch', 'talk to', 'speak to', 'speak with', 'call you')) {
    return {
      text: `Two ways: the form at the bottom of this page, or ${brand.email}. Either one reaches us directly, and you usually hear back the same day.`,
      source: { label: 'Contact', href: '#contact' },
      actions: ['enquiry', 'email'],
    }
  }

  // "Who does the work" is about the studio, not the portfolio, though "work"
  // pulls retrieval toward the Work section. Answered from the FAQ entry.
  if (has(q, 'who does the work', 'who will do', 'who will build', 'who builds', 'who works on', 'who will work on', 'outsource', 'subcontract', 'freelancer', 'in-house', 'in house', 'how many people work', 'size of your team', 'your team size')) {
    const f = faq.find((x) => x.q.toLowerCase().includes('outsource'))
    if (f) return { text: f.a, source: { label: 'FAQ', href: '#faq' } }
  }

  // "Show me your work" should survey the shelf, not hand over one arbitrary
  // project because it happened to rank first.
  if (work.length && has(q, 'your work', 'portfolio', 'case stud', 'examples', 'show me', 'projects you', 'previous work')) {
    const lines = work.map((w) => `· ${w.title} (${w.status}, ${w.year}) — ${w.role}`).join('\n')
    return {
      text: `${work.length} client projects so far:\n\n${lines}\n\nThe Work section has the detail on each, including what it was built with.`,
      source: { label: 'Work', href: '#work' },
    }
  }

  // A question every prospect asks and no site answers well.
  if (has(q, 'why you', 'why should', 'better than', 'different', 'instead of')) {
    return {
      text: `Because the pieces usually come from different vendors. One builds the site or the app, another runs the ads, a third wires up the automation, and nobody owns the result. Here one team does all of it and answers for it.`,
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
      text: `${cfg.fallback} ${brand.email}.`,
      actions: ['enquiry', 'email'],
    }
  }

  let text = condense(top.passage.text)

  // A second passage is only worth appending when it is nearly as strong as
  // the first — two genuinely good matches, not one good one and a runner-up.
  // Set loosely, this trails every reply off into a half-relevant paragraph,
  // which reads worse than a short confident answer.
  const second = hits[1]
  if (second && second.raw > CONFIDENCE_FLOOR * 2 && second.score > 0.85) {
    text += `\n\nAlso relevant — ${second.passage.title}: ${condense(second.passage.text, 200)}`
  }

  return {
    grounded: true,
    text,
    source: { label: top.passage.section, href: top.passage.href },
    actions: ['enquiry'],
  }
}
