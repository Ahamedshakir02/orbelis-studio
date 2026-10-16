/**
 * Export every piece of site copy to site-content.md, in page order, for
 * reading and editing outside the code.
 *
 * Everything in src/data/site.js is read from there. The section headings and
 * a few lines that live in the section components are written out below, so
 * when one of those changes in a .jsx file, change it here too. Re-run after
 * any copy change.
 *
 *   npm run content
 */
import { writeFileSync } from 'node:fs'
import * as d from '../src/data/site.js'

const o = []
const L = (s = '') => o.push(s)
const list = (a) => a.forEach((x) => L(`- ${x}`))
L('# Orbelis Studio: website content'); L()
L('Every piece of copy on orbelisstudio.com, in page order, generated from the site’s own data by `npm run content`. Edit the wording here and send it back, and we will put it into the site.'); L()
L(`**Tagline:** ${d.brand.tagline}  `); L(`**Email:** ${d.brand.email} · **Phone:** ${d.brand.phone} · **Location:** ${d.brand.location}`); L()
L('**Menu:** ' + d.nav.map((n) => n.label).join(' · ')); L()
L('---'); L(); L('## 1. Hero'); L()
L(`*Label:* ${d.brand.full} · Edappal, Kerala`); L()
L(`### ${d.brand.tagline}`); L()
L('Software, websites, AI and marketing, designed for how you work. Bring us an idea or a problem. We build what solves it and see it through to launch.'); L()
L('*Buttons:* Book a free consultation · See the services'); L()
L('*Menu button:* Free consultation · *Phone bar:* Book a free consultation'); L()
L('*Under the buttons:*'); list(d.assurances); L()
L('**Animated card under the hero**'); L()
L(`- Left card: **${d.heroStage.before.step} ${d.heroStage.before.title}**: ${d.heroStage.before.body}`)
L(`- Centre card, cycling: ${d.heroStage.solutions.map((e) => {
  const s = d.services.find((x) => x.enquiry === e)
  if (!s) throw new Error(`heroStage.solutions: no service with enquiry "${e}"`)
  return s.title
}).join(' → ')} (each shows its four points, with "built for you" and "Whatever the problem needs")`)
L(`- Right card: **${d.heroStage.after.step} ${d.heroStage.after.title}**: ${d.heroStage.after.body}`); L()
L('---'); L(); L('## 2. The problem'); L()
L(`### ${d.problemIntro.title}`); L(); L(d.problemIntro.intro); L()
d.problems.forEach((p, i) => { L(`**${i + 1}. ${p.title}**  `); L(p.body); L() })
L('---'); L(); L('## 3. Services'); L()
L('### Pick what you need.'); L(); L('What gets built first: apps, websites and the brand. Then what keeps them running, and the marketing that brings people in. Each is quoted to what you need.'); L()
for (const g of ['Build', 'Run', 'Grow']) {
  L(`#### ${g}`); L()
  d.services.filter((s) => s.group === g).forEach((s) => { L(`**${s.index} · ${s.title}**  `); L(s.body); L(); list(s.points); L() })
}
L('**Not sure which one?**  '); L('Most people are not. Tell us what is slowing the business down and we will tell you which of these fixes it, or that none of them does. *(Button: Ask us)*'); L()
L('---'); L(); L('## 4. Work'); L(); L('### Recent client work.'); L(); L('Shown with permission.'); L()
d.work.forEach((w) => { L(`**${w.title}** · ${w.status} · ${w.year} · ${w.role}  `); L(w.summary); L(); L(w.metrics.map((m) => `${m.k}: ${m.v}`).join(' · ') + (w.href ? ` · ${w.href}` : '')); L() })
L('---'); L(); L('## 5. Process'); L(); L('### From idea to launch, in four steps.'); L(); L('Scope is agreed before any work starts, which is why the date holds.'); L()
d.process.forEach((p) => { L(`**${p.step} ${p.title}**  `); L(p.body); L() })
L('---'); L(); L('## 6. One example'); L(); L('### An enquiry, handled end to end.'); L(); L('What one of these solutions looks like once it is running: an assistant answers, automation does the rest.'); L()
d.flow.forEach((f) => L(`${f.step}. **${f.title}**: ${f.body}`)); L()
L('---'); L(); L('## 7. Who it is for'); L(); L('### For businesses that run on enquiries.'); L(); L('Five kinds we build for, and what each one gets.'); L()
d.audiences.forEach((a) => { L(`**${a.title}**  `); L(a.body); L(); list(a.outcomes); L() })
L('---'); L(); L('## 8. Standards'); L(); L('### Numbers you can hold us to.'); L()
d.stats.forEach((s) => L(`- **${s.value}${s.suffix}**: ${s.label}`)); L()
L('---'); L(); L('## 9. Studio'); L(); L(`### ${d.studio.lead}`); L(); d.studio.body.forEach((p) => { L(p); L() })
L('*Beliefs:*'); list(d.manifesto); L()
L('*Facts:* ' + d.studio.facts.map((f) => `${f.k}: ${f.v}`).join(' · ')); L()
L('*Working with:* ' + d.capabilities.join(' · ')); L()
L('---'); L(); L('## 10. FAQ'); L(); L('### Straight answers.'); L()
d.faq.forEach((f) => { L(`**${f.q}**  `); L(f.a); L() })
L('---'); L(); L('## 11. Contact'); L(); L('*Label:* Book a free consultation'); L(); L('### Let’s talk about your business.'); L(); L('Tell us what you want to build or what is holding the business back. In a free 20-minute call we come back with a clear recommendation: what we would build, what it would cost, and what isn’t worth doing.'); L()
L('**Enquiry form**'); L()
L('- Name, Email'); L('- Business type: ' + d.businessTypes.join(' / ')); L('- Project type: ' + d.projectTypes.join(' / ')); L('- Budget: ' + d.budgets.join(' / '))
L('- What is slowing you down? (optional), example: "Late replies, reports built by hand"'); L('- What do you need?, example: "A booking system for our clinic, and a website that answers patients at night."'); L()
L(`*Availability:* ${d.availability.status}, ${d.availability.detail}`); L()
L('---'); L(); L(`## 12. Chat assistant (${d.assistant.name})`); L(); L(d.assistant.intro); L(); L('*Suggested questions:*'); list(d.assistant.suggestions); L()
L(`*When it doesn't know:* ${d.assistant.fallback}`); L()
writeFileSync(new URL('../site-content.md', import.meta.url), o.join('\n') + '\n')
console.log('Wrote site-content.md')
