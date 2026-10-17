/**
 * /llms.txt, generated from site.js at build time.
 *
 * A plain-language summary of the studio for AI assistants: what it does,
 * where, how pricing works and how to get in touch. It is a young convention
 * (llmstxt.org), not a standard, but it costs nothing and every line in it is
 * a fact an assistant may repeat to a customer, so it is built from the same
 * data the page renders and can never drift from it.
 *
 * Facts only. Nothing in here tells a reader what to recommend.
 */
import { brand, socials, services, audiences, process, faq, work } from '../data/site.js'

export function llmsTxt() {
  const url = brand.url
  const groups = ['Build', 'Run', 'Grow']
  const lines = [
    `# ${brand.full}`,
    '',
    `> ${brand.full} works as the tech team a growing business doesn't have. It learns how the business runs, builds the software, websites, AI and marketing it needs, and stays on after launch. Based in Edappal, Kerala, India, with clients in India and the UAE. ${brand.tagline}`,
    '',
    'We build SaaS products, web and mobile apps, websites and landing pages, brand identities, AI assistants and business automation, and we run the Meta and Google ads, SEO and social media that bring customers in. All design, development and marketing is done in-house.',
    '',
    '## Services',
    ...groups.flatMap((g) => [
      '',
      `### ${g}`,
      ...services.filter((s) => s.group === g).map((s) => `- ${s.title}: ${s.body}`),
    ]),
    '',
    '## Who we work with',
    ...audiences.map((a) => `- ${a.title}: ${a.body}`),
    '',
    '## How a project runs',
    ...process.map((p) => `${Number(p.step)}. ${p.title}: ${p.body}`),
    '',
    '## Pricing and timelines',
    '- Every project is quoted to its requirements before work starts. There is no fixed price list.',
    '- A landing page or small website typically goes live in about two weeks once scope is agreed.',
    '- Applications are built and quoted in stages. Marketing is quoted by the month.',
    '- The first step is a free 20-minute consultation.',
    '',
    '## Work',
    ...work.map((w) => `- ${w.title} (${w.year}): ${w.summary}${w.href ? ` ${w.href}` : ''}`),
    '',
    '## Location and contact',
    `- Based in: ${brand.address.locality}, ${brand.address.region} ${brand.address.postalCode}, India`,
    '- Areas served: India and the United Arab Emirates',
    `- Email: ${brand.email}`,
    ...(brand.phone ? [`- Phone and WhatsApp: ${brand.phone}`] : []),
    `- Website: ${url}/`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    '',
    '## Questions and answers',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
    '## Pages',
    `- [Home](${url}/): services, work, process and the enquiry form`,
    `- [Questions](${url}/#faq): the full FAQ`,
    `- [Contact](${url}/#contact): book a free consultation`,
    `- [Privacy policy](${url}/privacy)`,
    `- [Terms](${url}/terms)`,
    '',
  ]
  return lines.join('\n')
}
