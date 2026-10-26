/**
 * The social content pack: every post's caption, hashtags and slides.
 *
 *   npm run social     renders the images and rewrites README.md from this file
 *
 * Wording follows the company profile (company-profile/orbelis-company-profile.md):
 * we speak as "we", never about who works here; no languages are named; we say
 * "clients in India and the UAE", never "worldwide"; "two weeks" is only ever
 * said about websites and landing pages; the call to action is
 * "Book a free consultation".
 *
 * Positioning (approved 16 Oct 2026, strategy/orbelis-forward-deployed-2026-10-16.md):
 * we work inside the client's business like their own tech team. We learn how
 * it runs, build what it needs on its real information and stay until it is
 * used. Say it in plain words ("your own tech team, without the hiring"); the
 * phrase "forward deployed" is kept for the LinkedIn About only, and we never
 * say "engineers".
 *
 * Slide types (see scripts/social.mjs):
 *   statement  kicker, title[], muted[], sub
 *   point      n, title, body
 *   list       kicker, title, items[[name, line]]
 *   stats      kicker, title, items[[figure, unit, label]]
 *   chips      kicker, title, chips[], sub
 *   work       kicker, title, items[[name, place, line]]
 *   cta        (contact slide, no fields)
 */

import { SITE_URL, SITE_HOST } from '../../src/data/domain.js'

export const start = '2026-10-19' // Monday of week 1

export const linkedin = [
  {
    id: 'li-01-introducing-orbelis',
    day: 'Tue 20 Oct',
    format: 'Single image',
    slides: [
      { type: 'statement', kicker: 'Introducing Orbelis', title: ['Your ideas,'], muted: ['built and launched.'], sub: 'Your own tech team, without the hiring.' },
    ],
    caption: `Most businesses already know what would help them grow.

A booking system. A faster reply to every customer. A website that brings in enquiries instead of just sitting there.

What they usually don't have is a tech team to build it, and hiring one is out of reach for most.

That's the gap Orbelis fills. We work inside your business like your own tech team. We learn how you actually run, build what you need (software, websites, AI, design or marketing) and stay until it's working.

We work with businesses in India and the UAE.

The first step is a free 20-minute consultation. Tell us what you want to build or what's holding the business back, and we'll come back with a clear recommendation.

Book a free consultation: ${SITE_HOST}`,
    tags: ['#Orbelis', '#SmallBusiness', '#Kerala', '#WebDevelopment', '#DigitalTransformation'],
  },
  {
    id: 'li-02-ideas-that-never-get-built',
    day: 'Thu 22 Oct',
    format: 'Carousel (upload the PDF as a document)',
    slides: [
      { type: 'statement', kicker: 'Why businesses get stuck', title: ['Ideas that never', 'get built.'], muted: ['Problems that never', 'get solved.'] },
      { type: 'point', n: '01', title: 'The idea that stays an idea.', body: 'A new app, a booking system, a stronger website. You can see the opportunity, but without the right team it stays on paper.' },
      { type: 'point', n: '02', title: 'The problem that keeps costing money.', body: 'Enquiries answered too late. Customers lost to faster competitors. Processes that break as the business grows.' },
      { type: 'point', n: '03', title: 'The work no one should be doing.', body: 'Re-entering data between forms, spreadsheets and WhatsApp. Answering the same questions every day. Hours lost every week.' },
      { type: 'statement', kicker: 'Why it happens', title: ['An in-house tech team', 'is out of budget.'], muted: ['And most agencies', 'do one thing.'], sub: 'So the owner ends up managing several vendors who rarely work together.' },
      { type: 'cta' },
    ],
    caption: `Every business we talk to has two lists.

Ideas it wants to bring to life. Problems it needs to fix.

Both lists tend to stay the same length for years. Rarely for lack of trying: the technical team to deliver either one just isn't there.

We've broken down the three shapes this takes in the slides.

The fix isn't another vendor. It's a tech team of your own that learns how the business runs and stays with it, without the cost of hiring one.

Which one sounds most like your business right now?`,
    tags: ['#SmallBusiness', '#BusinessGrowth', '#Entrepreneurship', '#Automation'],
  },
  {
    id: 'li-03-how-we-work',
    day: 'Tue 27 Oct',
    format: 'Carousel (upload the PDF as a document)',
    slides: [
      { type: 'statement', kicker: 'How we work', title: ['Like your own'], muted: ['tech team.'], sub: 'Close to the business, in small steps, and still there after launch.' },
      { type: 'point', n: '01', title: 'Learn how you work.', body: 'A free consultation first. Then we look at how the business really runs: your tools, your customers’ questions and the jobs that eat your day.' },
      { type: 'point', n: '02', title: 'Pick what to build first.', body: 'The smallest thing that fixes the biggest problem, scoped and quoted before any work starts.' },
      { type: 'point', n: '03', title: 'Build it with you.', body: 'Built on your real information, with working pieces shown as we go, so there are no surprises at the end.' },
      { type: 'point', n: '04', title: 'Launch, then stay.', body: 'We launch it, show your people how to use it and check it’s working. Then we can stay on as your tech team.' },
      { type: 'cta' },
    ],
    caption: `Most businesses are asked to pick a package before anyone has looked at how they actually work.

We do it the other way round, the way your own tech team would:

1. Learn how you work: your tools, your customers' questions, the jobs that eat your day
2. Pick what to build first: the smallest thing that fixes the biggest problem, quoted before work starts
3. Build it with you: on your real information, with working pieces shown along the way
4. Launch, then stay: a project isn't finished when it's handed over, it's finished when your business is using it

Sometimes the honest answer is that you don't need anything from us. We'd rather say that than sell you something you won't use.

Book a free consultation: ${SITE_HOST}`,
    tags: ['#SmallBusiness', '#TechTeam', '#DigitalTransformation', '#Orbelis'],
  },
  {
    id: 'li-04-where-is-your-business',
    day: 'Thu 29 Oct',
    format: 'Carousel (upload the PDF as a document)',
    slides: [
      { type: 'statement', kicker: 'Four stages', title: ['Where is your', 'business right now?'], muted: ['The right first step', 'depends on it.'] },
      { type: 'point', n: '01', title: 'Just an idea', body: 'A landing page to test it with real people, then a first version of the product (MVP) built in stages.' },
      { type: 'point', n: '02', title: 'Launching', body: 'A brand, a website and the first campaign, built together so they look and sound like one business.' },
      { type: 'point', n: '03', title: 'Running', body: 'Automation, an AI assistant, dashboards and SEO, so the day-to-day takes less of your time.' },
      { type: 'point', n: '04', title: 'Growing', body: 'Custom software, ads at scale and a care plan that keeps everything fast and current.' },
      { type: 'cta' },
    ],
    caption: `"What do you actually need?" depends on where the business is.

A founder with an idea and a shop that's been open for ten years need very different things, even if both say "we need a website".

So we ask every new enquiry one question first: which stage are you at?

Swipe through the four stages and what we usually build first at each one.

Which stage are you at?`,
    tags: ['#Startups', '#SmallBusiness', '#BusinessGrowth', '#MVP'],
  },
  {
    id: 'li-05-build-design-grow-keep',
    day: 'Tue 3 Nov',
    format: 'Carousel (upload the PDF as a document)',
    slides: [
      { type: 'statement', kicker: 'What we do', title: ['Build. Design.'], muted: ['Grow. Keep.'], sub: 'One tech team, from the first sketch to the campaign that brings customers in.' },
      { type: 'list', kicker: 'Build', title: 'What gets made', items: [['SaaS and web applications', 'Portals, internal tools and mobile apps'], ['Websites and landing pages', 'Designed for the brand, fast on a phone'], ['AI assistants', 'Answer customers from your own content'], ['Business automation', 'Follow-ups, invoices, approvals, reports'], ['Dashboards', 'The few numbers that run the business']] },
      { type: 'list', kicker: 'Design', title: 'How it looks and feels', items: [['Brand identity', 'A logo and rules a team can follow'], ['UI/UX and product design', 'Screens people find their way around'], ['Creative design', 'Posters, ad creatives, reels and short videos']] },
      { type: 'list', kicker: 'Grow', title: 'Bringing customers in', items: [['Meta and Google ads', 'Every enquiry traced to the ad it came from'], ['SEO', 'Found on Google and Google Maps'], ['Social media management', 'Instagram, Facebook and LinkedIn kept active']] },
      { type: 'list', kicker: 'Keep', title: 'After launch', items: [['Care plan', 'Hosting, updates, content changes and a monthly report, so what we built stays fast and current'], ['Tech team plan', 'Building time every month and a monthly check-in on what to build next, with the care plan included']] },
      { type: 'cta' },
    ],
    caption: `Most agencies do one thing well. Then the business owner becomes the project manager, passing files between a developer, a designer and an ads person who never speak to each other.

Orbelis works as your own tech team instead, so everything is done in-house:

Build: software, websites, AI assistants, automation and dashboards
Design: brand identity, UI/UX and creative
Grow: Meta and Google ads, SEO and social media
Keep: a care plan after launch, or a monthly tech team plan to keep building

The campaign and the page it lands on are built together, by the same team that learned how your business runs.

Full list in the slides.`,
    tags: ['#WebDevelopment', '#Branding', '#DigitalMarketing', '#AI', '#Orbelis'],
  },
  {
    id: 'li-06-built-around-your-tools',
    day: 'Thu 5 Nov',
    format: 'Single image',
    slides: [
      { type: 'chips', kicker: 'How we build', title: 'Built around the tools you already use.', chips: ['WhatsApp', 'Spreadsheets', 'Your CRM', 'Email', 'Google Forms', 'Your website'], sub: 'We connect what you have instead of replacing it.' },
    ],
    caption: `New software usually comes with a hidden cost: everyone has to learn a new system, and half the team quietly goes back to the old way.

We start from the other end, the way your own tech team would: by learning how the business already runs. What does it use every day?

For most of the businesses we speak to, it's WhatsApp, a spreadsheet and email. So that's where we build.

An order that arrives on WhatsApp shows up in the sheet the team already checks. An invoice goes out when a job is marked done. The owner gets a short summary instead of chasing updates.

Nobody has to move to something new for it to work.

What's the one tool your business couldn't run without?`,
    tags: ['#Automation', '#WhatsAppBusiness', '#SmallBusiness', '#Productivity'],
  },
  {
    id: 'li-07-our-standards',
    day: 'Tue 10 Nov',
    format: 'Single image',
    slides: [
      { type: 'stats', kicker: 'Our standards', title: 'What we hold every website to.', items: [['<1', 's', 'load time on a mid-range phone over 4G'], ['90', '+', 'Google mobile speed score'], ['2', ' wks', 'typical website delivery once scope is agreed'], ['0', '', 'hand-offs to outside vendors']] },
    ],
    caption: `A website can look great and still lose customers.

Most visitors arrive on a phone, often on mobile data. If the page takes more than a few seconds, many of them leave before they've seen a single word.

So we build every site to a speed target, not just a design:

- Under 1 second to load on a mid-range phone over 4G
- 90+ on Google's mobile speed score
- Most websites live in two weeks once the scope is agreed
- No hand-offs to outside vendors: design, build and marketing stay under one roof

Curious how your own site does? Run it through PageSpeed Insights (pagespeed.web.dev) and look at the mobile score.`,
    tags: ['#WebDevelopment', '#WebPerformance', '#SEO', '#WebDesign'],
  },
  {
    id: 'li-08-work-so-far',
    day: 'Thu 12 Nov',
    format: 'Single image',
    slides: [
      { type: 'work', kicker: 'Recent work', title: 'Two businesses, two countries.', items: [['Holytouch', 'Kerala, India', 'Marketing website for a construction and design firm: designed, built and launched.'], ['Safari Typing Services', 'Ajman, UAE', 'Website for a typing and document services centre: built, launched and audited for search.']] },
    ],
    caption: `Two recent projects, one in Kerala and one in the UAE.

Holytouch is a construction and design firm in Kerala. We designed and built their marketing website: it presents the firm and its services and gives visitors a clear way to get in touch.

Safari Typing Services is a typing and document services centre in Ajman. We built and launched their website, then audited it for search so nearby customers can find it.

Different industries, different countries, same approach: understand the business first, then build the smallest thing that does the job well.

If your business is next, book a free consultation at ${SITE_HOST}`,
    tags: ['#WebDevelopment', '#Kerala', '#UAE', '#SmallBusiness', '#Orbelis'],
  },
]

export const instagram = [
  {
    id: 'ig-01-your-ideas-built-and-launched',
    day: 'Mon 19 Oct',
    format: 'Single image',
    slides: [
      { type: 'statement', kicker: 'Orbelis', title: ['Your ideas,'], muted: ['built and launched.'], sub: 'Your own tech team, without the hiring.' },
    ],
    caption: `Hello, we're Orbelis 👋

Your own tech team, without the hiring. We learn how your business runs, build what it needs and stay until it works.

Software, websites, AI, design and marketing, for businesses in India and the UAE.

First step? A free consultation. Link in bio.`,
    tags: ['#orbelis', '#kerala', '#edappal', '#malappuram', '#keralabusiness', '#smallbusinessindia', '#uaebusiness', '#webdesign', '#appdevelopment', '#digitalmarketing'],
  },
  {
    id: 'ig-02-what-we-build',
    day: 'Fri 23 Oct',
    format: 'Carousel, 6 slides',
    slides: [
      { type: 'statement', kicker: 'What we do', title: ['Build. Design.'], muted: ['Grow. Keep.'], sub: 'One tech team for all of it. Swipe →' },
      { type: 'list', kicker: 'Build', title: 'What gets made', items: [['Apps and software', 'Portals, tools and mobile apps'], ['Websites', 'Fast on a phone, built to bring enquiries'], ['AI assistants', 'Answer customers at any hour'], ['Automation', 'The busywork, done for you']] },
      { type: 'list', kicker: 'Design', title: 'How it looks', items: [['Brand identity', 'Logo and visual identity'], ['UI/UX', 'Screens people enjoy using'], ['Creatives', 'Posters, ads, reels and short videos']] },
      { type: 'list', kicker: 'Grow', title: 'Bringing customers in', items: [['Meta and Google ads', 'Every enquiry traced to its ad'], ['SEO', 'Found on Google and Google Maps'], ['Social media', 'Planned, posted and answered']] },
      { type: 'list', kicker: 'Keep', title: 'After launch', items: [['Care plan', 'Hosting, updates and a monthly report, so it stays fast and current'], ['Tech team plan', 'Building time every month, so the next idea gets built too']] },
      { type: 'cta' },
    ],
    caption: `Your own tech team for the whole job 🛠️

Build → apps, websites, AI assistants and automation
Design → brand identity, UI/UX and creatives
Grow → ads, SEO and social media
Keep → a care plan, or a monthly tech team plan

No juggling five vendors, and no hiring. Save this for when you need it 📌`,
    tags: ['#orbelis', '#webdevelopment', '#appdevelopment', '#branding', '#uiux', '#digitalmarketing', '#seo', '#keralabusiness', '#smallbusinessindia'],
  },
  {
    id: 'ig-03-for-shops-and-local-businesses',
    day: 'Mon 26 Oct',
    format: 'Carousel, 6 slides',
    slides: [
      { type: 'statement', kicker: 'For shops and local businesses', title: ['More customers,'], muted: ['less running around.'], sub: 'Retail, restaurants, salons, showrooms and services.' },
      { type: 'point', n: '01', title: 'A website or online store', body: 'Your products, prices and timings online, fast on a phone, with one tap to call or message.' },
      { type: 'point', n: '02', title: 'Orders on WhatsApp, handled', body: 'Orders and enquiries that come in on WhatsApp, answered and kept track of, not lost in the chat.' },
      { type: 'point', n: '03', title: 'Found on Google Maps', body: 'A Google Business Profile that shows up when people nearby search for what you sell.' },
      { type: 'point', n: '04', title: 'Customers who come back', body: 'Social media and ads that keep your shop in front of the people who already know it.' },
      { type: 'cta' },
    ],
    caption: `Running a shop, restaurant, salon or showroom? 🏪

Here's what usually makes the biggest difference:

1️⃣ A website or online store that works on a phone
2️⃣ WhatsApp orders and enquiries that never slip through
3️⃣ Showing up on Google Maps when people nearby search
4️⃣ Social media and ads that bring customers back

Not sure where to start? That's what the free consultation is for. We learn how your shop runs first, then build what helps most. Link in bio.`,
    tags: ['#orbelis', '#localbusiness', '#shoplocal', '#keralabusiness', '#edappal', '#malappuram', '#googlemaps', '#whatsappbusiness', '#smallbusinessindia'],
  },
  {
    id: 'ig-04-you-dont-need-to-know',
    day: 'Fri 30 Oct',
    format: 'Single image',
    slides: [
      { type: 'statement', kicker: 'Free consultation', title: ['You don’t need to know', 'which service you need.'], muted: ['That’s our job.'], sub: 'Tell us the problem. We’ll tell you what would fix it.' },
    ],
    caption: `Website? App? Ads? Automation? 🤔

You don't have to figure that out before talking to us.

Book a free 20-minute consultation, tell us what you want to build or what's holding the business back, and we'll come back with:

✅ What we'd build
✅ What it would cost
✅ What isn't worth doing

Link in bio, or WhatsApp us on +91 75105 33289.`,
    tags: ['#orbelis', '#freeconsultation', '#smallbusiness', '#keralabusiness', '#uaebusiness', '#entrepreneur', '#businessgrowth'],
  },
  {
    id: 'ig-05-for-clinics',
    day: 'Mon 2 Nov',
    format: 'Carousel, 5 slides',
    slides: [
      { type: 'statement', kicker: 'For clinics and healthcare', title: ['Fewer missed calls.'], muted: ['More booked', 'appointments.'] },
      { type: 'point', n: '01', title: 'Questions answered at any hour', body: 'Timings, fees, doctors and directions, answered from your own information, even after the front desk closes.' },
      { type: 'point', n: '02', title: 'Appointments without phone tag', body: 'Patients request a slot in a few taps. Your team confirms it instead of calling back three times.' },
      { type: 'point', n: '03', title: 'Found by patients nearby', body: 'A website and Google Maps listing that show up when someone nearby searches for care.' },
      { type: 'cta' },
    ],
    caption: `For clinics, the phone never stops ringing, and the same questions come in all day 📞

What are your timings? What's the consultation fee? Is the doctor in today?

We help clinics:
🩺 Answer patients' questions at any hour
📅 Take appointment requests without phone tag
📍 Get found by patients nearby on Google

Swipe to see how, and book a free consultation via the link in bio.`,
    tags: ['#orbelis', '#clinic', '#healthcare', '#dentalclinic', '#clinicmarketing', '#keralabusiness', '#uaebusiness', '#healthcaremarketing'],
  },
  {
    id: 'ig-06-what-we-stand-for',
    day: 'Fri 6 Nov',
    format: 'Carousel, 6 slides',
    slides: [
      { type: 'statement', kicker: 'Our values', title: ['Four words'], muted: ['we work by.'] },
      { type: 'point', n: '01', title: 'Curiosity', body: 'We start with the problem, not the package. Sometimes the answer is an app, sometimes a page, sometimes nothing at all.' },
      { type: 'point', n: '02', title: 'Craft', body: 'Shaped to how your business already runs, fast and clean, never from a template.' },
      { type: 'point', n: '03', title: 'Ownership', body: 'A project isn’t done when it’s handed over. It’s done when your business is using it, and we stay until it is.' },
      { type: 'point', n: '04', title: 'Honesty', body: 'Quotes before work, real timelines, and a plain "this isn’t worth building" when that’s the truth.' },
      { type: 'cta' },
    ],
    caption: `Curiosity. Craft. Ownership. Honesty. ✨

Four words, and what each one means in practice when you work with us. Swipe through 👉`,
    tags: ['#orbelis', '#values', '#design', '#webdevelopment', '#keralabusiness', '#smallbusinessindia'],
  },
  {
    id: 'ig-07-admission-season-sorted',
    day: 'Mon 9 Nov',
    format: 'Carousel, 5 slides',
    slides: [
      { type: 'statement', kicker: 'For schools, colleges and institutes', title: ['Admission season,'], muted: ['sorted.'] },
      { type: 'point', n: '01', title: 'Every enquiry answered', body: 'Eligibility, fees, courses and deadlines answered straight away, from your own prospectus.' },
      { type: 'point', n: '02', title: 'Logged in one place', body: 'Every enquiry kept in one list, so no student who asked is forgotten when follow-up time comes.' },
      { type: 'point', n: '03', title: 'Campaigns that fill seats', body: 'Admission ads and social media aimed at the students and parents you want to reach.' },
      { type: 'cta' },
    ],
    caption: `Admission season = hundreds of the same questions 🎓

Eligibility? Fees? Last date? Hostel?

We help schools, colleges and institutes:
📚 Answer admission enquiries the moment they arrive
🗂️ Keep every enquiry in one place for follow-up
📣 Run admission campaigns that reach the right students

Get ready before the rush. Free consultation via the link in bio.`,
    tags: ['#orbelis', '#admissions', '#education', '#college', '#school', '#institute', '#keralaeducation', '#edtech'],
  },
  {
    id: 'ig-08-from-idea-to-launch',
    day: 'Fri 13 Nov',
    format: 'Carousel, 5 slides',
    slides: [
      { type: 'statement', kicker: 'For founders and startups', title: ['Got an idea?'], muted: ['Let’s build it.'] },
      { type: 'point', n: '01', title: 'Test it first', body: 'A landing page that explains the idea and builds trust fast. Most go live in two weeks.' },
      { type: 'point', n: '02', title: 'Build a first version', body: 'An MVP real users can try, built in stages with a date for each one.' },
      { type: 'point', n: '03', title: 'Launch and grow', body: 'Brand, launch campaign and a care plan, so the product keeps getting better after day one.' },
      { type: 'cta' },
    ],
    caption: `Every product starts as an idea someone couldn't stop thinking about 💡

Here's how we take a founder's idea to launch:

1. Test it with a landing page (live in about two weeks)
2. Build a first version real users can try
3. Launch it, market it and keep improving it, as your own tech team

Got an idea you keep coming back to? Tell us about it. Free consultation via the link in bio 🚀`,
    tags: ['#orbelis', '#startup', '#founder', '#mvp', '#startupindia', '#appdevelopment', '#saas', '#entrepreneur'],
  },
]

export const stories = [
  {
    id: 'story-01-book-a-free-consultation',
    day: 'Mon 19 Oct, and again any quiet day',
    format: 'Story',
    note: `Add a Link sticker over the button area, pointing to ${SITE_HOST}.`,
    slide: { type: 'cta' },
  },
  {
    id: 'story-02-which-stage-are-you-at',
    day: 'Thu 29 Oct (with the LinkedIn stages post)',
    format: 'Story',
    note: 'Add a Poll sticker in the empty space with four options: Just an idea / Launching / Running / Growing.',
    slide: { type: 'statement', kicker: 'Quick question', title: ['Which stage is', 'your business at?'], muted: ['Vote below ↓'] },
  },
  {
    id: 'story-03-your-own-tech-team',
    day: 'Tue 27 Oct (with the LinkedIn how-we-work post)',
    format: 'Story',
    note: `Add a Link sticker pointing to ${SITE_HOST}, or a Question sticker: "What would you build if you had a tech team?"`,
    slide: { type: 'statement', kicker: 'Orbelis', title: ['Your own tech team,'], muted: ['without the hiring.'], sub: 'We learn how you run, build what you need and stay until it works.' },
  },
]

export const instagramProfile = {
  name: 'Orbelis | Tech team',
  username: '@orbelis.co',
  category: 'Software company',
  bio: [
    'Your own tech team, without the hiring.',
    'Apps · Web · AI · Design · Marketing',
    '📍 Edappal, Kerala · India & UAE',
    '👇 Book a free consultation',
  ],
  link: SITE_URL,
  contact: ['Email: orbelisstudio@gmail.com', 'Phone / WhatsApp: +91 75105 33289'],
  highlights: ['About', 'Services', 'Work', 'Contact'],
}
