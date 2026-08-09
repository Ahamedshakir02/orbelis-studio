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
  location: 'Edappal, Kerala — working worldwide',
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
