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
  tagline: 'Websites that work. Assistants that answer.',
  email: 'hello@orbelisstudio.com',
  /**
   * Phone, WhatsApp, street and social links are null until the real value
   * exists. Nothing renders while a field is null — not in the footer, not in
   * the mobile CTA, not in the structured data — so a placeholder can never
   * reach a visitor or a crawler. Fill one in and it appears everywhere.
   */
  // Display format, e.g. '+91 98765 43210'.
  phone: null,
  // Digits only, with country code — used to build wa.me links.
  whatsapp: null,
  location: 'Edappal, Kerala — working worldwide',
  url: 'https://orbelisstudio.com',

  /**
   * Postal address. Shown in the footer and emitted as schema.org PostalAddress,
   * which is what local search reads.
   *
   * `street` stays null until it is the real registered address. A business
   * address that does not resolve is worse than none: it fails verification,
   * and for anyone paying by invoice it reads as a warning sign.
   */
  address: {
    street: null,
    locality: 'Edappal',
    region: 'Kerala',
    postalCode: '679576',
    country: 'IN',
  },
  // `href` must be the studio's own profile URL, never the bare domain.
  socials: [
    { label: 'GitHub', href: null },
    { label: 'LinkedIn', href: null },
    { label: 'Instagram', href: null },
  ],
}

/** Only the social links that actually point somewhere. */
export const socials = brand.socials.filter((s) => s.href)

// In page order: what is sold comes before what has been built.
export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
]

export const manifesto = [
  'Most business websites are brochures: they look finished and answer nothing.',
  'We build the opposite: sites that load fast and say it plainly, an assistant behind them that knows your business and replies at 2am, and the automation that carries the enquiry the rest of the way.',
  'One person on your project. No account managers. No template.',
]

/**
 * `group` sorts the list into two bands: what gets built once, and what keeps
 * running afterwards. `enquiry` is the matching option in `projectTypes`, so
 * "Enquire" on a service opens the form with that service already chosen.
 */
export const services = [
  {
    index: '01',
    group: 'Build',
    enquiry: 'Brand or landing site',
    title: 'Brand & landing sites',
    price: '₹40k — ₹70k',
    body: 'A single, considered page built for one job: making a stranger trust you in eight seconds. Clear structure, real typography, sub-second load.',
    points: ['Considered layout & type', 'Mobile-first build', 'SEO + analytics', '2 week delivery'],
  },
  {
    index: '02',
    group: 'Build',
    enquiry: 'Full site with booking',
    title: 'Full sites & booking',
    price: '₹80k — ₹1.5L',
    body: 'Multi-page sites with the machinery underneath — enquiry flows, appointment requests, content you can edit yourself, and a dashboard that shows what is working.',
    points: ['Multi-page architecture', 'Forms & booking flows', 'CMS for your team', 'Performance budget enforced'],
  },
  {
    index: '03',
    group: 'Run',
    enquiry: 'AI assistant layer',
    title: 'AI assistant layer',
    price: '+ ₹25k setup',
    body: 'A retrieval-grounded assistant trained on your own documents, prices and policies. It answers in your voice, cites your material, and hands off to a human when it should.',
    points: ['RAG over your content', 'Malayalam + English', 'Escalation to WhatsApp', 'Monthly retraining'],
  },
  {
    index: '04',
    group: 'Run',
    enquiry: 'Business automation',
    title: 'Business automation',
    price: 'From ₹30k setup',
    body: 'The repetitive work between your tools, done without anyone retyping it. Enquiries followed up, leads logged, invoices and approvals moved along, and a report that writes itself. It starts with a short audit of what is actually worth automating, because most of it is not.',
    points: ['WhatsApp & lead follow-up', 'CRM & spreadsheet sync', 'Invoices, onboarding, approvals', 'Weekly report of hours saved'],
  },
  {
    index: '05',
    group: 'Run',
    enquiry: 'Care & retainer',
    title: 'Care & retainer',
    price: '₹5k — ₹15k / month',
    body: 'Hosting, uptime, content updates, assistant retraining, automation upkeep and a monthly report. The site stays fast and current instead of decaying quietly.',
    points: ['Managed hosting', 'Content updates', 'Assistant & automation upkeep', 'Monthly report'],
  },
]

/**
 * `id` is the stable handle for an entry — titles get reworded, ids do not.
 * `href` is optional: add it once a project has a public URL and the card
 * grows a link; leave it off and nothing renders.
 */
export const work = [
  {
    id: 'dr-evide',
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
    id: 'clinic-site',
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
    id: 'institution-microsite',
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

/** The three costs a visitor recognises before any service is named. */
export const problems = [
  {
    title: 'Enquiries go cold after hours',
    body: 'Someone asks at ten at night, gets a reply at eleven the next morning, and has already booked somewhere else.',
  },
  {
    title: 'The same ten questions, answered by hand',
    body: 'Timings, fees, eligibility, delivery. Typed out again by whoever happens to pick up the phone.',
  },
  {
    title: 'Work that lives in copy and paste',
    body: 'A form, a spreadsheet, a WhatsApp group and an invoice tool, held together by a person retyping between them.',
  },
]

/** One enquiry, followed end to end — what the assistant and automation do together. */
export const flow = [
  { step: '01', title: 'Enquiry arrives', body: 'By form, chat or WhatsApp, at any hour.' },
  { step: '02', title: 'Assistant answers', body: 'From your own documents, in Malayalam or English.' },
  { step: '03', title: 'Lead is logged', body: 'Into your CRM or spreadsheet, with what was asked.' },
  { step: '04', title: 'Follow-up goes out', body: 'On WhatsApp or email, at the right moment, without anyone remembering to.' },
  { step: '05', title: 'You get the report', body: 'Weekly: what came in, what was answered, what still needs a person.' },
]

/** Who the studio builds for, and what each gets. */
export const audiences = [
  {
    title: 'Clinics & healthcare',
    body: 'Patients ask the same questions at every hour. The site answers them and the front desk gets its day back.',
    outcomes: ['Appointment requests without phone tag', 'Timings, fees and preparation answered', 'Reminders sent automatically', 'Departments and doctors easy to find'],
  },
  {
    title: 'Institutions',
    body: 'Admissions season should not mean the office phone ringing all day about eligibility.',
    outcomes: ['Programme explorer', 'Eligibility and fee questions answered', 'Every enquiry logged in one place', 'Content your staff can edit'],
  },
  {
    title: 'Founders',
    body: 'One page that makes a stranger trust you, and a way to catch everyone it convinces.',
    outcomes: ['A landing site in two weeks', 'Leads routed to your inbox and CRM', 'An assistant that knows the product', 'Analytics you can read'],
  },
  {
    title: 'Brands & companies',
    body: 'The work between your tools, taken off the people currently doing it by hand.',
    outcomes: ['Follow-up that never forgets', 'Orders, invoices and approvals moved along', 'Reports that write themselves', 'The tools you already use, connected'],
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
    body: 'One art direction, one layout, one voice — agreed before a line of code. Hedged design is the expensive kind.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Built against a real performance budget. Fast on a mid-range phone over 4G is a requirement, not a stretch goal.',
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
    'The studio sits at an unusual intersection: careful, fast front-end work on one side, applied machine learning on the other. Most agencies do one or the other. The interesting work lives where they meet — a site that reads clearly and an assistant behind it that actually knows your business.',
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
  detail: 'Taking on new projects',
}

/** Three things a buyer wants settled before reading further. Shown under the hero. */
export const assurances = [
  'Prices published, not quoted',
  'Most builds ship in two weeks',
  'You talk to the person who builds it',
]

export const marquee = [
  'Fast websites',
  'AI assistants',
  'Business automation',
  'Clinics & healthcare',
  'Institutions',
  'Founders',
  'Brands',
  'Malayalam + English',
  'Two week builds',
  'No paid ranking',
]

export const stats = [
  { value: '<1', suffix: 's', label: 'Load target on 4G, held on mid-range phones' },
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
    "I'm Orb — the same kind of assistant we build into client sites. I answer from this studio's own material: services, automation, prices, process, timelines. Ask me anything, or take a shortcut:",
  suggestions: [
    'What does a landing site cost?',
    'How long does a build take?',
    'What can you automate for a business?',
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
  'Business automation',
  'Care & retainer',
  'Something else',
]

/** Asked in the enquiry form so the first reply can be specific to the business. */
export const businessTypes = [
  'Clinic or healthcare',
  'School, college or institute',
  'Brand or company',
  'Founder or startup',
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
    a: 'A landing site runs ₹40,000 to ₹70,000, a full site with booking flows ₹80,000 to ₹1.5 lakh, and the AI assistant adds ₹25,000 to set up, and business automation starts at ₹30,000. Ranges are on this page on purpose — you should know before you call.',
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
    q: 'What can you automate?',
    a: 'The repetitive steps between tools: following up an enquiry on WhatsApp or email, logging leads into a CRM or spreadsheet, sending reminders, moving invoices and approvals along, and compiling a weekly report. It starts with a short audit, and anything not worth automating gets said so.',
  },
  {
    q: 'Do I have to change the tools I already use?',
    a: 'No. Automation is built around what your team already works in — your forms, spreadsheets, CRM, WhatsApp and email — rather than asking everyone to move to something new.',
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
