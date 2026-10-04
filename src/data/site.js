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
  tagline: 'Automate the busywork. Answer every enquiry.',
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
  'A good one replies at 2am and hands the follow-up to automation.',
  'One person builds yours. No account manager, no template.',
]

/**
 * ORDER MATTERS. Automation leads, then the assistant, then the websites they
 * run on: that is the order the studio sells them in, and the first two get
 * the wide cards.
 *
 * `group` sorts the list into two bands: what gets built once, and what keeps
 * running afterwards. `enquiry` is the matching option in `projectTypes`, so
 * "Get a quote" on a service opens the form with that service already chosen.
 *
 * There is no `price` field, on purpose. Projects are quoted to their
 * requirements, so the site states how pricing works and never a figure.
 */
export const services = [
  {
    index: '01',
    group: 'Run',
    enquiry: 'Business automation',
    title: 'Business automation',
    body: 'The repetitive work between your tools, done for you. Follow-ups go out, leads are logged, invoices and approvals move along, and the weekly report writes itself. It starts with a short audit of what is actually worth automating.',
    points: ['WhatsApp and lead follow-up', 'CRM and spreadsheet sync', 'Invoices, onboarding, approvals', 'A weekly report of hours saved'],
  },
  {
    index: '02',
    group: 'Run',
    enquiry: 'AI assistant',
    title: 'AI assistant',
    body: 'A chat assistant that has read your prices, timings and policies. It answers customers day and night, in your words, and hands over to you when it should.',
    points: ['Answers only from your content', 'Malayalam and English', 'Hands over on WhatsApp', 'Updated every month'],
  },
  {
    index: '03',
    group: 'Build',
    enquiry: 'Full website',
    title: 'Full website',
    body: 'A complete site that takes bookings and enquiries, with pages your team can edit and a dashboard that shows what is working.',
    points: ['As many pages as the business needs', 'Enquiry and booking forms', 'Your team edits the content', 'Kept fast as it grows'],
  },
  {
    index: '04',
    group: 'Build',
    enquiry: 'Landing site',
    title: 'Landing site',
    body: 'One page built to do one thing: turn a stranger into an enquiry. Clear, fast, and live in two weeks.',
    points: ['Designed for your brand, not from a template', 'Built for phones first', 'SEO and analytics set up', 'Delivered in two weeks'],
  },
  {
    index: '05',
    group: 'Run',
    enquiry: 'Care plan',
    title: 'Care plan',
    body: 'Hosting, updates and a monthly report, so the site stays fast and current instead of quietly going stale.',
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
    title: 'The copy-paste job',
    body: 'A form, a spreadsheet, a WhatsApp group and an invoice tool, held together by someone retyping between them.',
  },
  {
    title: 'The late reply',
    body: 'A customer asks at ten at night. You answer at eleven the next morning. By then they have booked somewhere else.',
  },
  {
    title: 'The repeated answer',
    body: 'Timings, fees, eligibility, delivery. The same ten questions, typed out again by whoever picks up the phone.',
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
    title: 'Brands & companies',
    body: 'The work between your tools, taken off the people now doing it by hand.',
    outcomes: ['Follow-up that never forgets', 'Orders, invoices and approvals moved along', 'Reports that write themselves', 'The tools you already use, connected'],
  },
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
    body: 'Launch, then a care plan if you want one, to keep it fast, current and answering. A site is something you run, not something you buy once.',
  },
]

export const capabilities = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Three.js / R3F', 'GSAP',
  'Tailwind', 'FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase',
  'RAG pipelines', 'LLM integration', 'PyTorch', 'Docker', 'React Native',
]

export const studio = {
  lead: 'One person. No hand-offs.',
  body: [
    'Orbelis is me. You talk to the person who designs it, builds it and answers when something breaks. I work where three things meet: automation, applied machine learning and careful, fast websites. Most agencies do one of them; the useful work is in the overlap.',
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
  'Quoted to your requirements',
  'Most sites live in two weeks',
  'One person, start to finish',
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
    "I'm Orb, the kind of assistant Orbelis builds into client sites. I answer from this site's own content: services, automation, how pricing works, process and timelines. Ask anything, or start here:",
  suggestions: [
    'What can you automate for a business?',
    'How is a project priced?',
    'How long does a build take?',
    'Are you available right now?',
  ],
  // Shown when retrieval finds nothing confident enough to stand behind.
  fallback:
    "I don't have that on file. I only answer from this site's own content, so I won't guess. Ask directly:",
}

/** Project types offered in the enquiry form; mirrors the service list. */
export const projectTypes = [
  'Business automation',
  'AI assistant',
  'Full website',
  'Landing site',
  'Care plan',
  'Something else',
]

/** Asked in the enquiry form so the first reply can be specific to the business. */
export const businessTypes = [
  'Brand or company',
  'Clinic or healthcare',
  'School, college or institute',
  'Founder or startup',
  'Something else',
]

/** A rough band, so a quote can be shaped to it. "Not sure yet" is the default. */
export const budgets = [
  'Under ₹50k',
  '₹50k — ₹1L',
  '₹1L — ₹2L',
  'Above ₹2L',
  'Not sure yet',
]

export const faq = [
  {
    q: 'What can you automate?',
    a: 'The repetitive steps between your tools: following up an enquiry on WhatsApp or email, logging leads into a CRM or spreadsheet, sending reminders, moving invoices and approvals along, and compiling a weekly report. It starts with a short audit, and you are told plainly when something is not worth automating.',
  },
  {
    q: 'Do I have to change the tools I already use?',
    a: 'No. Automation is built around what your team already uses: your forms, spreadsheets, CRM, WhatsApp and email. Nobody has to move to something new.',
  },
  {
    q: 'How is a project priced?',
    a: 'To your requirements. There is no fixed price list, because a five-page site and a booking system with an assistant are not the same job. Send a short brief and you get a quote before any work starts, based on the number of pages, whether the site takes bookings, and whether it needs an assistant or automation.',
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
    q: 'Can I edit the site myself afterwards?',
    a: 'Yes. Sites whose content changes often come with an editor your team can use without touching code. For simpler sites, content changes are part of the care plan.',
  },
  {
    q: 'Do I have to take the care plan?',
    a: 'No. The site is yours either way, and you can host it wherever you like. The care plan exists because sites age: content goes stale, software needs updating, the assistant needs new material. It is optional.',
  },
  {
    q: 'Who actually does the work?',
    a: 'One person, and it is the person you talk to. No account managers, no subcontracting, nothing handed to someone you have never met.',
  },
]
