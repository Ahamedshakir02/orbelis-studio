/**
 * Single source of truth for every piece of copy on the site.
 *
 * VOICE. The studio speaks as "we", and the copy is about the client's
 * business, never about who works here: no founder, no team size, no CVs. Sentences
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
  tagline: 'Your ideas, built and launched.',
  email: 'orbelisstudio@gmail.com',
  /**
   * Phone, WhatsApp, street and social links are null until the real value
   * exists. Nothing renders while a field is null — not in the footer, not in
   * the mobile CTA, not in the structured data — so a placeholder can never
   * reach a visitor or a crawler. Fill one in and it appears everywhere.
   */
  // Display format, e.g. '+91 98765 43210'.
  phone: '+91 75105 33289',
  // Digits only, with country code — used to build wa.me links.
  whatsapp: '917510533289',
  location: 'Edappal, Kerala. Clients in India and the UAE',
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
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/orbelis/' },
    { label: 'Instagram', href: null },
  ],
}

/**
 * The WhatsApp link every button on the site uses, with a short opening line
 * already typed so the visitor only has to press send. Null while
 * brand.whatsapp is null, and every button hides itself then.
 */
export const whatsappHref = brand.whatsapp
  ? `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
      "Hi Orbelis, I'd like to talk about a project.",
    )}`
  : null

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
  'Start with the problem, not the package. Sometimes the answer is an app, sometimes a page, sometimes one automation.',
  'Shaped to how your business already runs, not a template it has to fit into.',
  'We own the result, from the first sketch to the campaign that brings people in.',
]

/**
 * ORDER MATTERS. What gets built leads (applications, websites, the brand),
 * then what keeps running (automation, the assistant, dashboards, care), then
 * the marketing that brings people to it: that is the order the studio sells
 * them in, and the first two get the wide cards. After those two
 * the cards sit three to a row, so keep the count at two plus a multiple of
 * three.
 *
 * `group` sorts the list into three bands: what gets built (Build), what keeps
 * running afterwards (Run), and what brings people in (Grow). `enquiry` is the matching option in `projectTypes`, so
 * "Get a quote" on a service opens the form with that service already chosen.
 *
 * There is no `price` field, on purpose. Projects are quoted to their
 * requirements, so the site states how pricing works and never a figure.
 */
export const services = [
  {
    index: '01',
    group: 'Build',
    enquiry: 'SaaS or web application',
    title: 'SaaS & web applications',
    body: 'Software built for your business or your idea: a SaaS product, a customer portal, an internal tool, a mobile app. It starts as a first version real users can try, and is built so it can grow from there.',
    points: ['A first version for a startup', 'Custom web and mobile apps', 'Logins, payments and integrations', 'Built in stages, each with a date'],
  },
  {
    index: '02',
    group: 'Build',
    enquiry: 'Website or landing page',
    title: 'Websites & landing pages',
    body: 'From one landing page that turns a stranger into an enquiry to a complete site that takes bookings. Designed for your brand, not from a template, fast on a phone, and editable by your team where the content changes often.',
    points: ['One page, or as many as the business needs', 'Enquiry and booking forms', 'An editor for content that changes often', 'Small sites live in two weeks'],
  },
  {
    index: '03',
    group: 'Build',
    enquiry: 'Brand identity & UI/UX',
    title: 'Brand identity & UI/UX',
    body: 'How the business looks and how its product feels to use. A logo and a visual identity with rules you can follow, and screens designed so people find what they came for.',
    points: ['Logo and visual identity', 'Brand guidelines', 'Screen design for websites and apps', 'A check of where people get stuck'],
  },
  {
    index: '04',
    group: 'Run',
    enquiry: 'Business automation',
    title: 'Business automation',
    body: 'The repetitive work between your tools, done for you. Follow-ups go out, leads are logged, invoices and approvals move along, and the weekly report writes itself. It starts with a short audit of what is actually worth automating.',
    points: ['WhatsApp and lead follow-up', 'CRM and spreadsheet sync', 'Invoices, onboarding, approvals', 'A weekly report of what ran'],
  },
  {
    index: '05',
    group: 'Run',
    enquiry: 'AI assistant',
    title: 'AI assistant',
    body: 'A chat assistant that has read your prices, timings and policies. It answers customers day and night, in your words, and hands over to you when it should.',
    points: ['Answers only from your content', 'Replies at any hour', 'Hands over on WhatsApp', 'Kept current on the care plan'],
  },
  {
    index: '06',
    group: 'Run',
    enquiry: 'Dashboards & analytics',
    title: 'Dashboards & analytics',
    body: 'The numbers that run the business, in one place and up to date. We agree with you which figures matter, pull them out of the tools you already use, and put them on a dashboard that updates itself.',
    points: ['The few numbers that matter, agreed first', 'Live dashboards', 'Reports sent automatically', 'Pulled from your existing tools'],
  },
  {
    index: '07',
    group: 'Run',
    enquiry: 'Care plan',
    title: 'Care plan',
    body: 'Hosting, updates and a monthly report, so what we built stays fast and current instead of quietly going stale. Or take the tech team plan: monthly building time with the care plan included.',
    points: ['Managed hosting', 'Content changes', 'Assistant and automation upkeep', 'A monthly report'],
  },
  {
    index: '08',
    group: 'Grow',
    enquiry: 'Meta & Google ads',
    title: 'Meta & Google ads',
    body: 'Paid campaigns on Instagram, Facebook and Google. Google reaches the people already searching for what you sell; Meta reaches the ones who have not searched yet. We set the campaigns up, trace each enquiry back to the ad it came from, and move the budget to what works.',
    points: ['Campaign setup and targeting', 'Ad copy and creatives', 'Tracking from click to enquiry', 'A plain monthly report'],
  },
  {
    index: '09',
    group: 'Grow',
    enquiry: 'SEO',
    title: 'SEO',
    body: 'Being found on Google without paying for every click. We fix what holds the site back, write the pages people actually search for, and set up your Google Business Profile so nearby customers can find you. It builds over months, not days.',
    points: ['Technical and speed fixes', 'Pages for what people search for', 'Google Business Profile', 'A monthly ranking report'],
  },
  {
    index: '10',
    group: 'Grow',
    enquiry: 'Social media management',
    title: 'Social media management',
    body: 'Your Instagram, Facebook and LinkedIn planned and kept active, so the page looks alive when a customer checks it. The month is agreed in advance, the posts and captions are made for you, and comments and messages get answered.',
    points: ['A monthly content calendar', 'Posts, reels and captions', 'Comments and messages handled', 'A report on what worked'],
  },
  {
    index: '11',
    group: 'Grow',
    enquiry: 'Creative design',
    title: 'Creative design',
    body: 'The visuals everything else runs on: posters, ad creatives, reels and short videos, made to catch the eye in a busy feed and still look like your brand.',
    points: ['Posts and ad creatives', 'Reels and short videos', 'Motion graphics', 'Sized for every platform'],
  },
]

/**
 * `id` is the stable handle for an entry — titles get reworded, ids do not.
 * `href` is optional: add it once a project has a public URL and the card
 * grows a link; leave it off and nothing renders.
 */
export const work = [
  {
    id: 'holytouch',
    title: 'Holytouch',
    status: 'Client',
    year: '2026',
    role: 'Design & build',
    summary:
      'The marketing website for a construction and design firm in Kerala. It presents the firm and its services, and gives a visitor a way to get in touch.',
    stack: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    metrics: [
      { k: 'Market', v: 'Kerala' },
      { k: 'Scope', v: 'Design, build, launch' },
    ],
    accent: '#e8a33d',
  },
  {
    id: 'safari-typing',
    title: 'Safari Typing Services',
    status: 'Client',
    year: '2026',
    role: 'Website & SEO',
    summary:
      'The website for a typing and document services centre in Ajman, UAE. We built and launched it, then ran SEO audits. The audits found that Google had indexed none of its pages, and that a lack of reviews was holding back its Google Maps ranking.',
    stack: ['Website', 'SEO', 'Google Business Profile'],
    href: 'https://safaritypingservices.com',
    metrics: [
      { k: 'Market', v: 'Ajman, UAE' },
      { k: 'Scope', v: 'Build, launch, SEO audits' },
    ],
    accent: '#7fb3d5',
  },
]

/**
 * The problem section: ideas that never get built and problems that never get
 * solved. A visitor should recognise their own business in one of these three
 * before any service is named.
 */
export const problemIntro = {
  title: 'Ideas that never get built. Problems that never get solved.',
  intro: 'Every business has ideas it wants to bring to life and problems it needs to fix. What most lack is the technical team to deliver either.',
}

export const problems = [
  {
    title: 'The idea that stays an idea',
    body: 'A new app, a booking system, a stronger website. The business can see the opportunity, but without the right team it remains on paper.',
  },
  {
    title: 'The problem that keeps costing money',
    body: 'Enquiries answered too late, customers lost to faster competitors, processes that break as the business grows. Everyone knows the problem exists, but no one has the time or skills to solve it.',
  },
  {
    title: 'The work no one should be doing',
    body: 'Re-entering data between forms, spreadsheets and WhatsApp. Answering the same questions every day. Hours lost every week to tasks that could run on their own.',
  },
]

/**
 * The hero's image: a problem goes in on the left, a live solution comes out on
 * the right, and the centre card cycles through what gets built in between.
 * `solutions` are `enquiry` values from `services`, in the order they rotate.
 * The step numbers match the first and last steps of `process`.
 */
export const heroStage = {
  before: { step: '01', title: 'You name the problem', body: 'In plain words. We work out what would actually fix it.' },
  solutions: ['SaaS or web application', 'Website or landing page', 'AI assistant', 'Business automation'],
  after: { step: '04', title: 'It goes live', body: 'Fast on a phone, and kept current with a care plan if you want one.' },
}

/** One enquiry, followed end to end — what the assistant and automation do together. */
export const flow = [
  { step: '01', title: 'Enquiry arrives', body: 'By form, chat or WhatsApp, at any hour.' },
  { step: '02', title: 'Assistant answers', body: 'From your own documents, at any hour.' },
  { step: '03', title: 'Lead is logged', body: 'Into your CRM or spreadsheet, with what was asked.' },
  { step: '04', title: 'Follow-up goes out', body: 'On WhatsApp or email, at the right moment. Nobody has to remember.' },
  { step: '05', title: 'You get the report', body: 'Weekly: what came in, what was answered, what still needs a person.' },
]

/** Who the studio builds for, and what each gets. */
export const audiences = [
  {
    title: 'Brands & companies',
    body: 'Software built around how you already work, and the busywork between your tools taken off your people.',
    outcomes: ['Custom apps, portals and internal tools', 'Follow-up that never forgets', 'Reports that write themselves', 'The tools you already use, connected', 'Ads, SEO and social media run for you'],
  },
  {
    title: 'Clinics & healthcare',
    body: 'Patients ask the same questions at every hour. The site answers them, and the front desk gets its day back.',
    outcomes: ['Appointment requests without phone tag', 'Timings, fees and preparation answered', 'Reminders sent automatically', 'Departments and doctors easy to find', 'Found on Google by patients nearby'],
  },
  {
    title: 'Shops & local businesses',
    body: 'Retailers, restaurants, salons, showrooms and service businesses: customers nearby are searching and messaging, and the shop that answers first gets the sale.',
    outcomes: ['A website or online store', 'Orders and enquiries handled on WhatsApp', 'A Google Maps listing that brings in nearby customers', 'Social media kept active', 'Ads that keep customers coming back'],
  },
  {
    title: 'Institutions',
    body: 'Admissions season should not mean the office phone ringing all day about eligibility and fees.',
    outcomes: ['Courses easy to browse and compare', 'Eligibility and fee questions answered', 'Every enquiry logged in one place', 'Content your staff can update', 'Admission campaigns on Meta and Google'],
  },
  {
    title: 'Founders',
    body: 'One page that makes a stranger trust you, and a way to catch everyone it convinces.',
    outcomes: ['A landing page in two weeks', 'Leads routed to your inbox and CRM', 'An assistant that knows the product', 'Analytics you can read', 'A first version of your app, built in stages'],
  },
]

export const process = [
  {
    step: '01',
    title: 'Learn how you work',
    body: 'A free consultation first. Then we look at how your business really runs: your tools, your customers\' questions and the jobs that eat your day. In person in Kerala, online everywhere else.',
  },
  {
    step: '02',
    title: 'Pick what to build first',
    body: 'The smallest thing that fixes the biggest problem. It is scoped and quoted before any work starts, which is why the date holds.',
  },
  {
    step: '03',
    title: 'Build it with you',
    body: 'Built on your real information, with working pieces shown as we go, so there are no surprises at the end. A site or app has to be fast on a mid-range phone over 4G before we call it done.',
  },
  {
    step: '04',
    title: 'Launch, then stay',
    body: 'We launch it, show your people how to use it and check it is working. Then, if you want, we stay on as your tech team to keep it current and build what comes next.',
  },
]

export const capabilities = [
  'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Firebase',
  'React Native', 'AI chat (LLM) integration',
]

export const studio = {
  lead: 'Your tech team, inside your business.',
  // From the company profile's long description and story; keep them in step.
  body: [
    'Most businesses know what would help them grow. What they lack is a tech team to build it, and hiring one is out of reach for most. Orbelis works as that team. We don\'t start from a menu of services. We start by learning how your business actually runs: the tools you use, the questions your customers ask and where time and money are lost.',
    'Then we build what fits, whether that\'s software, a website, an AI assistant, an automation, a brand or a campaign. We build it on your real information, show you working pieces early and change course as we learn. We don\'t treat a project as finished when it\'s handed over. It\'s finished when your business is using it, and we stay on to keep it working and improving.',
    'All design, development and marketing is delivered in-house, giving you a single point of accountability from start to finish. Every engagement is scoped and quoted before work begins, and ongoing support is available after launch to keep each solution secure, current and performing.',
    'Orbelis Studio was established in 2026 in Edappal, Kerala, to close a clear gap: growing businesses knew what would help them but lacked the technical team to deliver it. Agencies typically offered a single service, and building an in-house team was beyond the reach of most. Our early engagements include a construction and design firm in Kerala and a document services provider in Ajman, UAE.',
  ],
  facts: [
    { k: 'Based', v: 'Edappal, Kerala, India' },
    { k: 'Founded', v: '2026' },
    { k: 'Clients in', v: 'India & the UAE' },
    { k: 'Typical website', v: '2 weeks' },
  ],
}

export const availability = {
  status: 'Available',
  detail: 'Taking on new projects',
}

/** Three things a buyer wants settled before reading further. Shown under the hero. */
export const assurances = [
  'Quoted to your requirements',
  'Small sites live in two weeks',
  'Your tech team, without the hiring',
]

export const stats = [
  { value: '<1', suffix: 's', label: 'Website load target on a mid-range phone over 4G' },
  { value: 2, suffix: ' weeks', label: 'Typical website delivery, once scope is agreed' },
  { value: 0, suffix: '', label: 'Hand-offs to outside vendors on your project' },
  { value: 90, suffix: '+', label: 'Google speed score target on mobile' },
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
    "I'm Orb, the kind of assistant Orbelis builds into client sites. I answer from this site's own content: what gets built, how pricing works, process and timelines. Ask anything, or start here:",
  suggestions: [
    'What can you build for my business?',
    'How is a project priced?',
    'How long does a build take?',
    'Do you run ads and social media?',
  ],
  // Shown when retrieval finds nothing confident enough to stand behind.
  fallback:
    "I don't have that on file. I only answer from this site's own content, so I won't guess. Ask directly:",
}

/** Project types offered in the enquiry form; mirrors the service list. */
export const projectTypes = [
  'SaaS or web application',
  'Website or landing page',
  'Brand identity & UI/UX',
  'Business automation',
  'AI assistant',
  'Dashboards & analytics',
  'Care plan',
  'Meta & Google ads',
  'SEO',
  'Social media management',
  'Creative design',
  'Something else',
]

/** Asked in the enquiry form so the first reply can be specific to the business. */
export const businessTypes = [
  'Brand or company',
  'Clinic or healthcare',
  'Shop or local business',
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

/**
 * Each answer is written to stand on its own: answer engines lift one Q&A out
 * of the page and quote it, so an answer that leans on the one above it gets
 * quoted wrong. The first sentence answers the question; the rest supports it.
 * The same list feeds the FAQPage structured data and llms.txt.
 */
export const faq = [
  {
    q: 'What is Orbelis Studio?',
    a: 'Orbelis Studio is your own tech team, without the hiring. We are based in Edappal, Kerala, India, and work with clients in India and the UAE. We learn how your business runs, then build what it needs: SaaS products and web apps, websites and landing pages, brand identities, AI assistants and business automation, and the ads, SEO and social media that bring people in. Every project is scoped and quoted before work begins, and we can stay on each month after launch.',
  },
  {
    q: 'What do you build?',
    a: 'Whatever the problem needs: a SaaS product or web app, a website or landing page, a brand, an AI assistant, automation between your tools, or the marketing that brings people in. You describe the problem, we suggest the smallest thing that solves it, and we say so when the answer is none of these.',
  },
  {
    q: 'What does "your own tech team" mean?',
    a: 'It means we work the way an in-house team would. We learn how your business runs before suggesting anything, build in small steps you can see, and stay after launch to keep it working and build what comes next. You get the attention of an in-house team without having to hire one.',
  },
  {
    q: 'How is a project priced?',
    a: 'To your requirements. There is no fixed price list, because a five-page site and a booking system with an assistant are not the same job. Send a short brief and you get a quote before any work starts, based on the number of pages, whether the site takes bookings, and whether it needs an assistant or automation. Applications are quoted stage by stage. Marketing work is quoted by the month, to the channels you want run.',
  },
  {
    q: 'How long does it take?',
    a: 'About two weeks for a landing page or a small site, from agreed scope to launch. Larger sites take three to four weeks. Apps are built in stages, with a date agreed for each, and SEO builds over months. The schedule holds because scope is locked before work starts, not renegotiated halfway.',
  },
  {
    q: 'Do you build SaaS products and web applications?',
    a: 'Yes. SaaS products, customer portals, internal tools, dashboards and mobile apps. A build starts with a first version real users can try, and grows in agreed stages from there.',
  },
  {
    q: 'What can you automate?',
    a: 'The repetitive steps between your tools: following up an enquiry on WhatsApp or email, logging leads into a CRM or spreadsheet, sending reminders, moving invoices and approvals along, and compiling a weekly report. It starts with a short audit, and you are told plainly when something is not worth automating.',
  },
  {
    q: 'Do I have to change the tools I already use?',
    a: 'No. What we build works with the tools your team already uses: your forms, spreadsheets, CRM, WhatsApp and email. Nobody has to move to something new.',
  },
  {
    q: 'What is the AI assistant, in plain terms?',
    a: 'A chat window on your site that has read your own documents: prices, timings, policies, procedures. It answers from those rather than making things up, replies at any hour, and hands over to a person when a question is beyond it.',
  },
  {
    q: 'Do you do marketing as well?',
    a: 'Yes. Meta and Google ads, SEO, social media management, and the creative design for all of them. They work best as one lead system: ads and search bring people in, the landing page turns them into enquiries, and automation follows each one up. You can also take any one of them on its own.',
  },
  {
    q: 'Who pays for the ads?',
    a: 'You do, straight to Meta or Google from your own ad account, so you can see everything that is spent. Our fee is for running the campaigns and is quoted separately. We do not promise a number of leads; we report what was spent and what came in.',
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
    q: 'Can you stay on as our tech team every month?',
    a: 'Yes. The tech team plan is a monthly plan with a set amount of building time each month, a monthly check-in on what to build next, and the care plan included. It is quoted to your business, like every project, and you can stop it at any time.',
  },
  {
    q: 'What happens on the free consultation?',
    a: 'A 20-minute call. You tell us what you want to build or what is holding the business back, and you do not need to know which service you want. We come back with a clear recommendation: what we would build, what it would cost, and what is not worth doing.',
  },
  {
    q: 'Where are you based? Do you work outside Kerala?',
    a: 'We are based in Edappal, Kerala, and work with clients across India and in the UAE. In Kerala we can meet in person; everywhere else, calls and reviews happen online, so you do not need to be near Edappal to work with us.',
  },
  {
    q: 'Do you set up Google Business Profile and local SEO?',
    a: 'Yes. Local SEO is part of our SEO service: we set up or complete your Google Business Profile, keep your name, address and phone number the same everywhere they appear, and build the pages nearby customers search for. Results build over months, not days.',
  },
  {
    q: 'Who does the work? Do you outsource it?',
    a: 'Everything is done in-house at Orbelis: design, build and marketing. Nothing is handed to an outside vendor you have never met, and one studio answers for the result.',
  },
  {
    q: 'How do I contact Orbelis Studio?',
    a: `Email ${brand.email}, call or WhatsApp ${brand.phone}, or use the enquiry form on this page. The first step is a free 20-minute consultation.`,
  },
]
