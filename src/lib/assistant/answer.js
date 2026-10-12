/**
 * Answer composition.
 *
 * Two layers, in order:
 *
 *   1. INTENTS — question shapes worth answering deterministically rather than
 *      statistically. "What does it cost", "what's your number" and "do you
 *      guarantee results" decide whether a visitor trusts the studio; they get
 *      a written answer, not the best-scoring paragraph. So do the questions
 *      the site has no answer to (refunds, registration), which must be
 *      declined honestly instead of matched to something that sounds close.
 *
 *   2. RETRIEVAL — everything else is answered from the passage that ranked
 *      highest, cited back to the section it came from. A short follow-up
 *      ("how long would that take?") is read together with the previous
 *      question, the way a person would read it.
 *
 * Below the confidence floor the assistant declines. That is the whole point of
 * a retrieval-grounded assistant and the reason clients buy this instead of a
 * raw model: it would rather say "I don't have that" than invent an answer.
 *
 * Intents match whole words (see `has`), never substrings: "free" must not
 * catch "freelancer", nor "rate" catch "separate".
 */
import { retrieve, CONFIDENCE_FLOOR } from './retrieve.js'
import {
  brand,
  services,
  work,
  availability,
  faq,
  process,
  capabilities,
  studio,
  assistant as cfg,
} from '../../data/site.js'

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** True when any phrase occurs in `q` as whole words. Phrases may end in `*` to allow a suffix. */
const has = (q, ...phrases) =>
  phrases.some((p) => {
    const open = p.endsWith('*')
    const body = escape(open ? p.slice(0, -1) : p)
    return new RegExp(`(^|[^\\w])${body}${open ? '' : '(?![\\w])'}`, 'i').test(q)
  })

const words = (q) => q.split(/\s+/).filter(Boolean).length

/** Every way to reach the studio that is actually set, as one sentence. */
function reachLine() {
  const ways = [`email ${brand.email}`]
  if (brand.phone) ways.push(`call ${brand.phone}`)
  if (brand.whatsapp) ways.push(`WhatsApp +${brand.whatsapp}`)
  ways.push('use the form at the bottom of this page')
  return ways.length > 1 ? `${ways.slice(0, -1).join(', ')} or ${ways[ways.length - 1]}` : ways[0]
}

const contactActions = () => ['enquiry', 'email', ...(brand.phone ? ['call'] : []), ...(brand.whatsapp ? ['whatsapp'] : [])]

/** An honest "not on the site" for a question a visitor reasonably asks. */
const notOnFile = (lead) => ({
  text: `${lead}, so I won't guess. Ask directly and you get a straight answer from the founder: ${reachLine()}.`,
  source: { label: 'Contact', href: '#contact' },
  actions: contactActions(),
})

// Tools a visitor may name that the site does or does not list.
const PLATFORMS = [
  'shopify', 'wordpress', 'woocommerce', 'wix', 'webflow', 'squarespace', 'magento', 'framer',
  'flutter', 'laravel', 'php', 'django', 'vue', 'angular', 'java', 'kotlin', 'swift', 'ruby',
  'react native', 'react', 'next.js', 'nextjs', 'node', 'python', 'firebase', 'mongodb', 'postgres', 'docker',
]
const DISPLAY = { wordpress: 'WordPress', woocommerce: 'WooCommerce', php: 'PHP', hubspot: 'HubSpot', n8n: 'n8n', 'make.com': 'Make.com' }
const CRMS = ['zoho', 'hubspot', 'salesforce', 'zapier', 'n8n', 'make.com', 'google sheets', 'excel', 'tally', 'odoo']

/**
 * @returns {{ text: string, source?: {label: string, href: string}, actions?: string[], enquiry?: string } | null}
 */
function matchIntent(query) {
  const q = query.toLowerCase().trim()

  if (/^(hi|hey|hello|yo|hai|hii+|namaskaram|good (morning|evening|afternoon))\b/.test(q) && words(q) <= 4) {
    return {
      text: `Hello. I can answer anything on this page: services, how pricing works, timelines, what the assistant does, what can be automated. What does your business need?`,
    }
  }

  if (/^(thanks|thank you|thx|cheers|nice|cool|great|ok|okay|got it)\b/.test(q) && words(q) <= 4) {
    return {
      text: `Anytime. When you're ready, the form at the bottom of the page goes straight to the founder, and you get a quote before any work starts.`,
      actions: ['enquiry'],
    }
  }

  // Results. A lead system sold with a promise of leads is a red flag, so the
  // answer is a plain no, followed by what the visitor does get.
  if (
    has(q, 'guarantee*', 'promise*', 'assure*', 'roi', 'money back', '100%') ||
    /\b(will|can) (i|we|you) (get|rank|be on|reach|make)\b.*\b(leads?|customers?|patients?|sales|first|top|#1|page one|first page|revenue|followers)\b/.test(q) ||
    has(q, 'rank #1', 'rank first', 'number one on google', 'first page of google', 'top of google')
  ) {
    if (has(q, 'time*', 'deadline*', 'week*', 'deliver*', 'on time', 'launch*')) {
      return {
        text: `The schedule is agreed in writing before code starts, and it holds because scope is locked then rather than renegotiated halfway. Most websites take two weeks; larger sites three to four; applications are built in stages with a date for each.`,
        source: { label: 'Process', href: '#process' },
        actions: ['enquiry'],
      }
    }
    return {
      text: `No. Nobody honest can promise a number of leads, sales or a Google ranking. What you do get: the ad spend goes straight from your own account to Meta or Google, so you see every rupee, and you get a plain report of what was spent and what came in. SEO builds over months, not days.`,
      source: { label: 'FAQ', href: '#faq' },
      actions: ['enquiry'],
    }
  }

  // Phone and WhatsApp, before the generic contact intent and before
  // retrieval, which would otherwise match "number" to the dashboards card.
  // "WhatsApp" alone is usually about WhatsApp automation, so it only counts
  // here when the visitor is plainly asking how to reach the studio on it.
  if (
    has(q, 'phone*', 'telephone', 'mobile number', 'contact number', 'your number', 'call you', 'can i call', 'ring you', 'your whatsapp', 'whatsapp number', 'on whatsapp?', 'reach you on whatsapp', 'message you on whatsapp') ||
    /^(whatsapp|phone|number|mobile)\??$/.test(q)
  ) {
    const lines = []
    if (brand.phone) lines.push(`Phone: ${brand.phone}`)
    if (brand.whatsapp) lines.push(`WhatsApp: +${brand.whatsapp}`)
    lines.push(`Email: ${brand.email}`)
    return {
      text: `${lines.join('\n')}\n\nOr use the form at the bottom of the page. Either way it reaches the founder, not an account manager.`,
      source: { label: 'Contact', href: '#contact' },
      actions: contactActions(),
    }
  }

  if (
    has(q, 'where are you', 'where is orbelis', 'where is the studio', 'are you based', 'based in', 'based out of', 'located', 'location', 'address', 'your office', 'which city', 'which country', 'which state', 'visit you') ||
    has(q, 'outside india', 'abroad', 'international*', 'overseas', 'other countr*', 'worldwide', 'gulf', 'uae', 'dubai', 'usa', 'uk', 'europe', 'remote*')
  ) {
    const street = brand.address?.street
    return {
      text: `${brand.full} is based in ${brand.address.locality}, ${brand.address.region}, India, and works with clients worldwide.${
        street ? ` The address is ${street}, ${brand.address.locality} ${brand.address.postalCode}.` : ' There is no public street address on the site; to meet in person, ask by email.'
      }`,
      source: { label: 'Contact', href: '#contact' },
      actions: ['enquiry', 'email'],
    }
  }

  if (has(q, 'registered', 'registration', 'gst*', 'legal entity', 'pvt', 'private limited', 'llp', 'incorporated', 'msme', 'udyam', 'company details', 'tax invoice', 'license*', 'licence*')) {
    return notOnFile("Company registration and tax details aren't on this site")
  }

  if (has(q, 'refund*', 'money back', 'advance', 'deposit', 'upfront', 'up front', 'payment terms', 'payment method*', 'pay in', 'instalment*', 'installment*', 'milestone payment*', 'upi', 'credit card', 'bank transfer', 'emi', 'how do i pay', 'pay you', 'cancel*', 'contract')) {
    return notOnFile("Payment terms, deposits and refunds aren't published on this site")
  }

  // A named tool: say plainly whether it is on the list, rather than pasting
  // the whole stack and leaving the visitor to work it out.
  const crm = CRMS.find((t) => has(q, t))
  if (crm) {
    const faqTools = faq.find((f) => f.q.toLowerCase().includes('change the tools'))
    return {
      text: `${faqTools ? faqTools.a.replace(/^No\.\s*/, '') : 'Automation is built around the tools you already use.'} Whether a particular connection with ${DISPLAY[crm] || crm.replace(/\b\w/g, (c) => c.toUpperCase())} is worth building is settled in the short audit that starts every automation project.`.replace(/\s+/g, ' '),
      source: { label: 'FAQ', href: '#faq' },
      actions: ['enquiry'],
      enquiry: 'Business automation',
    }
  }
  const platform = PLATFORMS.find((t) => has(q, t))
  if (platform) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '')
    const listed = capabilities.find((c) => norm(c).startsWith(norm(platform)) || norm(platform).startsWith(norm(c)))
    const name = listed || DISPLAY[platform] || platform.replace(/\b\w/g, (c) => c.toUpperCase())
    return {
      text: listed
        ? `Yes, ${name} is part of the stack. The studio works across ${capabilities.join(', ')}.`
        : `${name} isn't one of the tools the studio lists. Sites and apps here are custom-built, mainly with ${capabilities.slice(0, 6).join(', ')}, and sites that change often come with an editor your team can use. If ${name} matters for your project, say so in the enquiry and you'll get a straight answer on whether it fits.`,
      source: { label: 'Studio', href: '#studio' },
      actions: ['enquiry'],
    }
  }

  // Anything about automating, unless it is plainly about the chat assistant,
  // gets the answer written for it. Retrieval alone sends "automate my
  // emails" to the contact card, because that card mentions email.
  if (has(q, 'automat*', 'workflow*') && !has(q, 'assistant', 'chatbot*', 'chat bot', 'bot')) {
    const entry = faq.find((f) => f.q.toLowerCase().includes('automate'))
    if (entry) {
      return {
        text: `${/^(do|can|could|will|is it possible)\b/.test(q) ? 'Yes. ' : ''}${entry.a}`,
        source: { label: 'Services', href: '#services' },
        actions: ['enquiry'],
        enquiry: 'Business automation',
      }
    }
  }

  if (has(q, 'what is orbelis', 'about orbelis', 'about you', 'about the studio', 'tell me about', 'what is this', 'what does orbelis do', 'who are orbelis')) {
    return {
      text: `${brand.full} is a founder-led studio in ${brand.address.locality}, ${brand.address.region}. It automates the repetitive work in a business, adds an AI assistant that answers from the business's own content, builds websites, SaaS products and web apps, and runs the marketing that brings people to them.`,
      source: { label: 'Studio', href: '#studio' },
      actions: ['enquiry'],
    }
  }

  if (has(q, 'your process', 'the process', 'how do you work', 'how does it work', 'what are the steps', 'steps involved', 'how you work', 'working process')) {
    return {
      text: `Four steps:\n\n${process.map((p) => `· ${p.title}: ${p.body.split('. ')[0].replace(/\.$/, '')}.`).join('\n')}\n\nMost websites go from agreed scope to launch in two weeks.`,
      source: { label: 'Process', href: '#process' },
      actions: ['enquiry'],
    }
  }

  if (has(q, 'tech stack', 'stack', 'what tech', 'which tech', 'tech do you', 'tech you', 'technolog*', 'framework*', 'programming', 'built with', 'what do you use', 'which tools', 'what tools')) {
    return {
      text: `The studio works across ${capabilities.join(', ')}. The tool is chosen for the job: a landing page does not need what a SaaS product needs.`,
      source: { label: 'Studio', href: '#studio' },
      actions: ['enquiry'],
    }
  }

  // "What's your name" is a question to Orb; "who runs it" is about the founder.
  if (has(q, 'your name', 'who are you', 'are you a bot', 'are you human', 'are you real', 'are you ai')) {
    return {
      text: `I'm ${cfg.name}, the assistant on this site, and the kind of assistant Orbelis builds for clients. I answer only from the site's own content. For anything I can't answer, the founder replies in person: ${reachLine()}.`,
      actions: ['enquiry'],
    }
  }

  if (has(q, 'founder', 'who runs', 'who owns', 'who is behind', 'freelanc*', 'solo', 'one person', 'one-man', 'team size', 'how many people', 'how big', 'how many employees', 'your staff', 'your team', 'are you an agency', 'your experience', 'years of experience', 'how experienced', 'qualification*', 'your background')) {
    return {
      // The site's copy is in the founder's voice ("I run Orbelis"); Orb is a
      // different speaker, so this is said about the founder, not as them.
      text: `${studio.lead} Orbelis is run by its founder: you talk to the person who designs it, builds it and answers when something breaks, with no account manager in between. The founder is a computer science and engineering graduate with a background in NLP and deep learning, and builds web and mobile apps as well as the automation and marketing.`,
      source: { label: 'Studio', href: '#studio' },
      actions: ['enquiry'],
    }
  }

  // The money question, answered in full rather than one service at a time.
  if (has(q, 'cost*', 'price*', 'pricing', 'charge*', 'budget', 'how much', 'rate', 'rates', 'quote*', 'quotation', 'fee', 'fees', 'expensive', 'cheap*', 'afford*', 'package*', 'rupees', 'lakh*', '₹')) {
    const lines = services.map((s) => `· ${s.title}`).join('\n')
    return {
      text: `Every project is quoted to its requirements, so there is no fixed price list. The cost depends on the number of pages, whether the site takes bookings, and whether it needs an assistant or automation. Applications are quoted stage by stage, and marketing by the month. Send a short brief through the form and you get a quote before any work starts.\n\nWhat can be quoted:\n\n${lines}`,
      source: { label: 'Services', href: '#services' },
      actions: ['enquiry'],
    }
  }

  // "What do you do" should survey the whole shelf, in the order it is sold.
  if (has(q, 'services', 'what do you do', 'what do you offer', 'what can you do', 'what do you build', 'what all do you do')) {
    const lines = services.map((s) => `· ${s.title}`).join('\n')
    return {
      text: `${services.length} things, all founder-led:\n\n${lines}\n\nEach is quoted to what you need. Tell me about your business and I'll say which fits.`,
      source: { label: 'Services', href: '#services' },
      actions: ['enquiry'],
    }
  }

  // Marketing as a whole is answered by the question written for it, not by
  // whichever of the four marketing cards happens to rank first.
  if (has(q, 'marketing', 'digital marketing', 'more leads', 'more customers', 'more enquiries', 'more patients', 'more sales', 'more students', 'more admissions')) {
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
  if (has(q, 'available', 'availability', 'busy', 'booked', 'capacity', 'can you start', 'start now', 'start soon', 'start immediately', 'taking new', 'taking on', 'free to start')) {
    return {
      text: `${availability.status}: ${availability.detail.toLowerCase()}. Scope is agreed before a project starts, which is why the schedule holds. If timing matters, say so in the enquiry and you will get a straight answer.`,
      source: { label: 'Contact', href: '#contact' },
      actions: ['enquiry'],
    }
  }

  // "speak" is deliberately not a bare keyword here: "do you speak Malayalam"
  // is a language question, not a request for the phone number.
  if (has(q, 'contact you', 'contact details', 'contact info*', 'how to contact', 'how do i contact', 'how can i contact', 'your email', 'email you', 'email address', 'email id', 'reach you', 'hire you', 'get in touch', 'talk to', 'speak to', 'speak with', 'how do i start', 'how to start', 'get started', 'next step*', 'book a call', 'book a meeting', 'schedule a meeting', 'meet you', 'consultation', 'enquire', 'make an enquiry', 'send an enquiry')) {
    return {
      text: `You can ${reachLine()}. Every route reaches the founder, the person who writes the code. A short brief (what the business does and what you need) is enough to get a quote.`,
      source: { label: 'Contact', href: '#contact' },
      actions: contactActions(),
    }
  }

  // "Show me your work" should survey the shelf, not hand over one arbitrary
  // project because it happened to rank first.
  if (has(q, 'your work', 'how many projects', 'projects have you', 'portfolio', 'case stud*', 'examples', 'show me', 'projects you', 'previous work', 'past work', 'clients you', 'who have you worked')) {
    const lines = work.map((w) => `· ${w.title} (${w.status}, ${w.year}) — ${w.role}`).join('\n')
    return {
      text: `${work.length} on the page, and the status on each is honest:\n\n${lines}\n\nThe Work section has the detail on each, including what it was built with.`,
      source: { label: 'Work', href: '#work' },
    }
  }

  // A question every prospect asks and no site answers well.
  if (has(q, 'why you', 'why should', 'better than', 'different from', 'instead of', 'why orbelis')) {
    return {
      text: `Because the pieces usually come from different vendors. One builds the site or the app, another runs the ads, a third wires up the automation, and nobody owns the result. Here it is all done in one studio, and you talk to the founder directly.`,
      source: { label: 'Studio', href: '#studio' },
      actions: ['enquiry'],
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

/** "I need a website for my clinic": a visitor describing a project, not asking a question. */
const isNeed = (q) =>
  /\b(i|we)('?m| am| are)? ?(need|want|would like|'d like|am looking|are looking|looking|planning|plan|thinking of|require)\b/i.test(q) ||
  /\b(i|we) (run|own|have|manage) an? \b/i.test(q)

/** A follow-up that only makes sense with the previous question attached. */
const isFollowUp = (q) =>
  words(q) <= 8 && /\b(that|it|this|those|them|same|such)\b/i.test(q)

const serviceFor = (passage) =>
  passage.id.startsWith('service-') ? services.find((s) => `service-${s.index}` === passage.id) : null

/**
 * @param {string} query
 * @param {{role: 'user'|'assistant', text: string}[]} history
 */
export function answer(query, history = []) {
  const intent = matchIntent(query)
  if (intent) return { ...intent, grounded: true }

  const previous = [...history].reverse().find((m) => m.role === 'user')?.text
  let hits = retrieve(query, 3)

  // Read a short follow-up together with what was asked before it, and use
  // whichever reading is the more confident one.
  if (previous && (isFollowUp(query) || !hits[0] || hits[0].raw < CONFIDENCE_FLOOR)) {
    const joined = retrieve(`${previous} ${query}`, 3)
    if (joined[0] && (!hits[0] || joined[0].raw > hits[0].raw)) hits = joined
  }
  const top = hits[0]

  if (!top || top.raw < CONFIDENCE_FLOOR) {
    return {
      grounded: false,
      text: `${cfg.fallback} ${reachLine().replace(/^email /, '')}. A person replies, usually the same day.`,
      actions: contactActions(),
    }
  }

  let text = condense(top.passage.text)
  const service = serviceFor(top.passage)

  // "Do you build mobile apps?" deserves a yes before the description. Only
  // for a service card, and only when the visitor's own words appear on it,
  // so a loose match never turns into a confident yes.
  if (service && /^(do|can|could|will) (you|orbelis)\b|^(is it possible|are you able)\b/i.test(query.trim())) {
    const card = `${service.title} ${service.body} ${service.points.join(' ')}`.toLowerCase()
    const own = query.toLowerCase().match(/[a-z]{4,}/g) || []
    const stop = new Set(['build', 'make', 'create', 'offer', 'provide', 'with', 'your', 'that', 'this', 'also', 'like', 'help'])
    if (own.some((w) => !stop.has(w) && card.includes(w.replace(/s$/, '')))) text = `Yes. ${text}`
  }

  // A second passage is only worth appending when it is nearly as strong as
  // the first — two genuinely good matches, not one good one and a runner-up.
  // Set loosely, this trails every reply off into a half-relevant paragraph,
  // which reads worse than a short confident answer.
  const second = hits[1]
  if (second && second.raw > CONFIDENCE_FLOOR * 2 && second.score > 0.85) {
    text += `\n\nAlso relevant — ${second.passage.title}: ${condense(second.passage.text, 200)}`
  }

  // A visitor describing a project is a lead: say what happens next.
  if (isNeed(query)) {
    text += `\n\nNext step: send a short brief through the form (what the business does and what you need) and you get a quote before any work starts.`
  }

  return {
    grounded: true,
    text,
    source: { label: top.passage.section, href: top.passage.href },
    actions: ['enquiry'],
    ...(service ? { enquiry: service.enquiry } : {}),
  }
}
