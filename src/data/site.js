/**
 * Single source of truth for every piece of copy on the site.
 *
 * VOICE. Orbelis is one person, so the copy says "I", never "we". Sentences
 * are short and plain, written for a clinic owner rather than a developer:
 * name what a thing does, not what it is called. No claim here is softer or
 * louder than what is actually delivered.
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
  'Most business websites look finished and answer nothing.',
  'A good one loads fast, says it plainly, and replies at 2am.',
  'One person builds yours. No account manager, no template.',
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
    body: 'One page with one job: making a stranger trust you in the first eight seconds. Clear structure, real typography, and a load time under a second.',
    points: ['Designed for your brand, not from a template', 'Built for phones first', 'SEO and analytics set up', 'Delivered in two weeks'],
  },
  {
    index: '02',
    group: 'Build',
    enquiry: 'Full site with booking',
    title: 'Full sites & booking',
    price: '₹80k — ₹1.5L',
    body: 'A complete site with the working parts underneath: enquiry forms, appointment requests, pages your team can edit themselves, and a dashboard that shows what is working.',
    points: ['As many pages as the business needs', 'Enquiry and booking forms', 'Your team edits the content', 'Kept fast as it grows'],
  },
  {
    index: '03',
    group: 'Run',
    enquiry: 'AI assistant layer',
    title: 'AI assistant layer',
    price: '+ ₹25k setup',
    body: 'An assistant that has read your own documents, prices and policies. It answers from them in your voice, shows where each answer came from, and hands over to a person when it should.',
    points: ['Answers only from your content', 'Malayalam and English', 'Hands over on WhatsApp', 'Updated every month'],
  },
  {
    index: '04',
    group: 'Run',
    enquiry: 'Business automation',
    title: 'Business automation',
    price: 'From ₹30k setup',
    body: 'The repetitive work between your tools, done without anyone retyping it. Enquiries followed up, leads logged, invoices and approvals moved along, reports compiled. It starts with a short audit of what is worth automating, because most of it is not.',
    points: ['WhatsApp and lead follow-up', 'CRM and spreadsheet sync', 'Invoices, onboarding, approvals', 'A weekly report of hours saved'],
  },
  {
    index: '05',
    group: 'Run',
    enquiry: 'Care & retainer',
    title: 'Care & retainer',
    price: '₹5k — ₹15k / month',
    body: 'Hosting, uptime, content changes, assistant updates, automation upkeep and a monthly report. The site stays fast and current instead of quietly going stale.',
    points: ['Managed hosting', 'Content changes', 'Assistant and automation upkeep', 'A monthly report'],
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
    stack: ['React', 'Tailwind', 'AI assistant'],
    metrics: [
      { k: 'Load', v: 'Under 1s on 4G' },
      { k: 'Assistant', v: 'Answers from clinic documents' },
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
      'An admissions microsite for colleges and training institutes — a programme explorer, the campus story, and an assistant that answers eligibility and fee questions before they reach the office phone.',
    stack: ['React', 'Tailwind', 'AI assistant'],
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
  { step: '04', title: 'Follow-up goes out', body: 'On WhatsApp or email, at the right moment. Nobody has to remember.' },
  { step: '05', title: 'You get the report', body: 'Weekly: what came in, what was answered, what still needs a person.' },
]

/** Who the studio builds for, and what each gets. */
export const audiences = [
  {
    title: 'Clinics & healthcare',
    body: 'Patients ask the same questions at every hour. The site answers them, and the front desk gets its day back.',
    outcomes: ['Appointment requests without phone tag', 'Timings, fees and preparation answered', 'Reminders sent automatically', 'Departments and doctors easy to find'],
  },
  {
    title: 'Institutions',
    body: 'Admissions season should not mean the office phone ringing all day about eligibility and fees.',
    outcomes: ['Programme explorer', 'Eligibility and fee questions answered', 'Every enquiry logged in one place', 'Content your staff can edit'],
  },
  {
    title: 'Founders',
    body: 'One page that makes a stranger trust you, and a way to catch everyone it convinces.',
    outcomes: ['A landing site in two weeks', 'Leads routed to your inbox and CRM', 'An assistant that knows the product', 'Analytics you can read'],
  },
  {
    title: 'Brands & companies',
    body: 'The work between your tools, taken off the people now doing it by hand.',
    outcomes: ['Follow-up that never forgets', 'Orders, invoices and approvals moved along', 'Reports that write themselves', 'The tools you already use, connected'],
  },
]

export const process = [
  {
    step: '01',
    title: 'Scope',
    body: 'I cut the brief to the smallest version that still does the job. Most projects are half the size they first look, and the smaller one ships.',
  },
  {
    step: '02',
    title: 'Direction',
    body: 'One look, one layout, one voice, agreed with you before any code is written.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Built to a speed target, not only a design. It has to be fast on a mid-range phone over 4G before I call it done.',
  },
  {
    step: '04',
    title: 'Ship & keep',
    body: 'Launch, then a retainer if you want one, to keep it fast, current and answering. A site is something you run, not something you buy once.',
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
    'I work where two things meet: careful, fast front-end work and applied machine learning. Most agencies do one or the other. The useful work is in the overlap: a site that reads clearly, with an assistant behind it that actually knows your business.',
    'My background is in NLP and deep learning, with certifications across Microsoft Azure AI, Google generative AI and IBM data science. I am currently building Dr Evide, a trust-ranked doctor discovery product for Kerala.',
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
  { value: '<1', suffix: 's', label: 'Load target on 4G, on a mid-range phone' },
  { value: 2, suffix: ' weeks', label: 'Typical delivery, once scope is agreed' },
  { value: 1, suffix: '', label: 'Person on your project, start to finish' },
  { value: 90, suffix: '+', label: 'Lighthouse performance target on mobile' },
]

/**
 * The on-site assistant.
 *
 * This is the studio's own product running on the studio's own site, so it plays
 * by the same rules it is sold on: it answers from the content in this file and
 * nothing else, and it says so when a question falls outside that material.
 * The temptation to let it improvise is the temptation to ship a liar.
 */
export const assistant = {
  name: 'Orb',
  intro:
    "I'm Orb, the kind of assistant Orbelis builds into client sites. I answer from this site's own content: services, automation, prices, process and timelines. Ask anything, or start here:",
  suggestions: [
    'What does a landing site cost?',
    'How long does a build take?',
    'What can you automate for a business?',
    'Are you available right now?',
  ],
  // Shown when retrieval finds nothing confident enough to stand behind.
  fallback:
    "I don't have that on file. I only answer from this site's own content, so I won't guess. Ask directly:",
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
    a: 'A landing site is ₹40,000 to ₹70,000. A full site with booking is ₹80,000 to ₹1.5 lakh. The AI assistant adds ₹25,000 to set up, and business automation starts at ₹30,000. The ranges are published on purpose: you should know before you call.',
  },
  {
    q: 'How long does it take?',
    a: 'Two weeks for most builds, from agreed scope to launch. Larger sites take three to four. The schedule holds because scope is locked before code starts, not renegotiated halfway.',
  },
  {
    q: 'What is the AI assistant, in plain terms?',
    a: 'A chat window on your site that has read your own documents: prices, timings, policies, procedures. It answers from those rather than making things up, replies in Malayalam or English, and hands over to a person when a question is beyond it.',
  },
  {
    q: 'What can you automate?',
    a: 'The repetitive steps between your tools: following up an enquiry on WhatsApp or email, logging leads into a CRM or spreadsheet, sending reminders, moving invoices and approvals along, and compiling a weekly report. It starts with a short audit, and you are told plainly when something is not worth automating.',
  },
  {
    q: 'Do I have to change the tools I already use?',
    a: 'No. Automation is built around what your team already uses: your forms, spreadsheets, CRM, WhatsApp and email. Nobody has to move to something new.',
  },
  {
    q: 'Can I edit the site myself afterwards?',
    a: 'Yes. Sites whose content changes often come with an editor your team can use without touching code. For simpler sites, content changes are part of the retainer.',
  },
  {
    q: 'Do I have to take the monthly retainer?',
    a: 'No. The site is yours either way, and you can host it wherever you like. The retainer exists because sites age: content goes stale, software needs updating, the assistant needs new material. It is optional.',
  },
  {
    q: 'Who actually does the work?',
    a: 'One person, and it is the person you talk to. No account managers, no subcontracting, nothing handed to someone you have never met.',
  },
]
