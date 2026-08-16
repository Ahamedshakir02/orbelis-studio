/**
 * Single source of truth for every piece of copy on the site.
 *
 * The studio name is deliberately isolated here: if the brand changes, edit
 * `brand` and nothing else in the codebase needs to move.
 */

export const brand = {
  name: 'Orbelis',
  suffix: 'Studio',
  full: 'Orbelis Studio',
  tagline: 'Websites that move. Assistants that answer.',
  email: 'hello@orbelisstudio.com',
  phone: '+91 00000 00000',
  // Digits only, with country code — used to build wa.me links.
  whatsapp: '910000000000',
  location: 'Edappal, Kerala — working worldwide',
  url: 'https://orbelisstudio.com',

  /**
   * Postal address. Shown in the footer and emitted as schema.org PostalAddress,
   * which is what local search reads.
   *
   * PLACEHOLDER — `street` must be replaced with the real registered address
   * before launch. A business address that does not resolve is worse than none:
   * it fails verification, and for anyone paying by invoice it reads as a
   * warning sign.
   */
  address: {
    street: '[REPLACE — street address]',
    locality: 'Edappal',
    region: 'Kerala',
    postalCode: '679576',
    country: 'IN',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
  ],
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
]

export const manifesto = [
  'Most business websites are brochures that sit still and answer nothing.',
  'We build the opposite: sites that move with intent, and an assistant behind them that knows your business and replies at 2am.',
  'One person on your project. No account managers. No template.',
]

export const services = [
  {
    index: '01',
    title: 'Brand & landing sites',
    price: '₹40k — ₹70k',
    body: 'A single, considered page built for one job: making a stranger trust you in eight seconds. Scroll-driven motion, real typography, sub-second load.',
    points: ['Custom motion design', 'Mobile-first build', 'SEO + analytics', '2 week delivery'],
  },
  {
    index: '02',
    title: 'Full sites & booking',
    price: '₹80k — ₹1.5L',
    body: 'Multi-page sites with the machinery underneath — enquiry flows, appointment requests, content you can edit yourself, and a dashboard that shows what is working.',
    points: ['Multi-page architecture', 'Forms & booking flows', 'CMS for your team', 'Performance budget enforced'],
  },
  {
    index: '03',
    title: 'AI assistant layer',
    price: '+ ₹25k setup',
    body: 'A retrieval-grounded assistant trained on your own documents, prices and policies. It answers in your voice, cites your material, and hands off to a human when it should.',
    points: ['RAG over your content', 'Malayalam + English', 'Escalation to WhatsApp', 'Monthly retraining'],
  },
  {
    index: '04',
    title: 'Care & retainer',
    price: '₹5k — ₹15k / month',
    body: 'Hosting, uptime, content updates, assistant retraining and a monthly report. The site stays fast and current instead of decaying quietly.',
    points: ['Managed hosting', 'Content updates', 'Assistant upkeep', 'Monthly report'],
  },
]

export const work = [
  {
    title: 'Dr Evide',
    status: 'Live',
    year: '2026',
    role: 'Product, engineering, ranking design',
    summary:
      'Symptom-to-specialty routing and trust-ranked doctor discovery for Kerala. Doctors are ranked by verified credentials, experience and authentic reviews — never by who paid. The no-paid-ranking rule is enforced by a CI check, not a promise.',
    stack: ['Next.js', 'PostGIS', 'LLM routing', 'TypeScript'],
    metrics: [
      { k: 'Ranking', v: 'Deterministic, versioned' },
      { k: 'Emergency triage', v: 'Runs locally first' },
    ],
    accent: '#e8a33d',
  },
  {
    title: 'Clinic site + assistant',
    status: 'Concept',
    year: '2026',
    role: 'Design & build concept',
    summary:
      'A demonstration build for multi-specialty clinics: department routing, doctor profiles, appointment requests, and an assistant that answers timings, fees and preparation instructions in Malayalam or English.',
    stack: ['React', 'GSAP', 'RAG assistant'],
    metrics: [
      { k: 'Load', v: 'Under 1s on 4G' },
      { k: 'Assistant', v: 'Grounded in clinic docs' },
    ],
    accent: '#7fb3d5',
  },
  {
    title: 'Institution microsite',
    status: 'Concept',
    year: '2026',
    role: 'Design & build concept',
    summary:
      'An admissions microsite for colleges and training institutes — programme explorer, scroll-driven campus story, and an assistant that handles eligibility and fee questions before they reach the office phone.',
    stack: ['React', 'R3F', 'Assistant'],
    metrics: [
      { k: 'Enquiry flow', v: 'Form + WhatsApp' },
      { k: 'Content', v: 'Editable by staff' },
    ],
    accent: '#a3d5a1',
  },
]

export const process = [
  {
    step: '01',
    title: 'Scope',
    body: 'We strip the brief to the narrowest version that still wins. Most projects are half the size they first appear, and the smaller version ships.',
  },
  {
    step: '02',
    title: 'Direction',
    body: 'One art direction, one hero idea, one scroll spine — agreed before a line of code. Hedged design is the expensive kind.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Motion and 3D wired against a real performance budget. Sixty frames a second on a mid-range phone is a requirement, not a stretch goal.',
  },
  {
    step: '04',
    title: 'Ship & keep',
    body: 'Launch, then a retainer that keeps it fast, current and answering. A site is a thing you run, not a thing you buy once.',
  },
]

export const capabilities = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Three.js / R3F', 'GSAP',
  'Tailwind', 'FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase',
  'RAG pipelines', 'LLM integration', 'PyTorch', 'Docker', 'React Native',
]

export const studio = {
  lead: 'Orbelis is a one-person studio. You work with the person who writes the code.',
  body: [
    'The studio sits at an unusual intersection: award-grade front-end motion on one side, applied machine learning on the other. Most agencies do one or the other. The interesting work lives where they meet — a site that feels expensive and an assistant behind it that actually knows your business.',
    'Background in NLP and deep learning, certified across Microsoft Azure AI, Google generative AI and IBM data science tracks. Currently building Dr Evide, a trust-ranked doctor discovery product for Kerala.',
  ],
  facts: [
    { k: 'Based', v: 'Kerala, India' },
    { k: 'Founded', v: '2026' },
    { k: 'Team', v: 'One, deliberately' },
    { k: 'Typical build', v: '2 weeks' },
  ],
}

export const availability = {
  status: 'Available',
  detail: 'Taking two projects for September',
}

export const marquee = [
  'Animated websites',
  'AI assistants',
  'Clinics & healthcare',
  'Institutions',
  'Founders',
  'Malayalam + English',
  'Two week builds',
  'No paid ranking',
]

export const stats = [
  { value: 60, suffix: 'fps', label: 'Motion budget, enforced on mid-range phones' },
  { value: 2, suffix: ' weeks', label: 'Typical delivery, scope agreed up front' },
  { value: 1, suffix: '', label: 'Person on your project, start to finish' },
  { value: 90, suffix: '+', label: 'Lighthouse performance target on mobile' },
]

/**
 * The on-site assistant.
 *
 * This is the studio's own product running on the studio's own site, so it plays
 * by the same rules we sell: it answers from the content in this file and
 * nothing else, and it says so when a question falls outside that material.
 * The temptation to let it improvise is the temptation to ship a liar.
 */
export const assistant = {
  name: 'Orb',
  intro:
    "I'm Orb — the same kind of assistant we build into client sites. I answer from this studio's own material: services, prices, process, timelines. Ask me anything, or take a shortcut:",
  suggestions: [
    'What does a landing site cost?',
    'How long does a build take?',
    'What exactly is the AI assistant?',
    'Are you available right now?',
  ],
  // Shown when retrieval finds nothing confident enough to stand behind.
  fallback:
    "I don't have that on file. I only answer from this studio's own material, so rather than guess, that one is worth asking directly —",
}

/** Project types offered in the enquiry form; mirrors the service list. */
export const projectTypes = [
  'Brand or landing site',
  'Full site with booking',
  'AI assistant layer',
  'Care & retainer',
  'Something else',
]

export const budgets = [
  'Under ₹40k',
  '₹40k — ₹70k',
  '₹80k — ₹1.5L',
  '₹1.5L+',
  'Not sure yet',
]

export const faq = [
  {
    q: 'What does a project actually cost?',
    a: 'A landing site runs ₹40,000 to ₹70,000, a full site with booking flows ₹80,000 to ₹1.5 lakh, and the AI assistant adds ₹25,000 to set up. Ranges are on this page on purpose — you should know before you call.',
  },
  {
    q: 'How long does it take?',
    a: 'Two weeks for most builds, from agreed scope to launch. Larger sites run three to four. The schedule holds because scope is locked before code starts, not renegotiated halfway.',
  },
  {
    q: 'What is the AI assistant, in plain terms?',
    a: 'A chat window on your site that has read your own documents — prices, timings, policies, procedures. It answers from that material rather than making things up, replies in Malayalam or English, and hands off to a human when a question is beyond it.',
  },
  {
    q: 'Can I edit the site myself afterwards?',
    a: 'Yes. Sites with regularly changing content ship with a CMS your team can use without touching code. For simpler sites, content edits are part of the retainer.',
  },
  {
    q: 'Do I have to take the monthly retainer?',
    a: 'No. The site is yours either way, and you can host it wherever you like. The retainer exists because sites decay — content goes stale, dependencies age, the assistant needs retraining. It is not a hostage arrangement.',
  },
  {
    q: 'Who actually does the work?',
    a: 'One person, and it is the same person you talk to. No account managers, no subcontracting, no work handed to someone you have never met.',
  },
]
