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
L('Every piece of copy on orbelisstudio.com, in page order, generated from the site’s own data by `npm run content`. Edit the wording here and send it back, and I will put it into the site.'); L()
L(`**Tagline:** ${d.brand.tagline}  `); L(`**Email:** ${d.brand.email} · **Phone:** ${d.brand.phone} · **Location:** ${d.brand.location}`); L()
L('**Menu:** ' + d.nav.map((n) => n.label).join(' · ')); L()
L('---'); L(); L('## 1. Hero'); L()
L(`*Label:* ${d.brand.full} · Software, websites, AI, marketing`); L()
L(`### ${d.brand.tagline}`); L()
L('Software, websites, AI and marketing, designed for how you actually work. Tell me the problem and I build what solves it, from what if to live.'); L()
L('*Buttons:* Start a project · See the services'); L()
L('*Under the buttons:*'); list(d.assurances); L()
L('**Animated card under the hero**'); L()
L(`- Left card: **${d.heroStage.before.step} ${d.heroStage.before.title}**: ${d.heroStage.before.body}`)
L(`- Centre card, cycling: ${d.heroStage.solutions.map((e) => d.services.find((s) => s.enquiry === e).title).join(' → ')} (each shows its four points, with "built for you" and "One studio, whatever it takes")`)
L(`- Right card: **${d.heroStage.after.step} ${d.heroStage.after.title}**: ${d.heroStage.after.body}`); L()
L('---'); L(); L('## 2. The problem'); L()
L('### Good ideas stuck at "what if".'); L(); L('Most businesses know what would help. What they lack is a tech team to build it.'); L()
d.problems.forEach((p, i) => { L(`**${i + 1}. ${p.title}**  `); L(p.body); L() })
L('---'); L(); L('## 3. Services'); L()
L('### Pick what you need.'); L(); L('What gets built first: apps, websites and the brand. Then what keeps them running, and the marketing that brings people in. Each is quoted to what you actually need.'); L()
for (const g of ['Build', 'Run', 'Grow']) {
  L(`#### ${g}`); L()
  d.services.filter((s) => s.group === g).forEach((s) => { L(`**${s.index} · ${s.title}**  `); L(s.body); L(); list(s.points); L() })
}
L('**Not sure which one?**  '); L('Most people are not. Tell me what is slowing the business down and I will tell you which of these fixes it, or that none of them does. *(Button: Ask me)*'); L()
L('---'); L(); L('## 4. Work'); L(); L('### Proof, labelled honestly.'); L(); L('Client work, shown with permission.'); L()
d.work.forEach((w) => { L(`**${w.title}** · ${w.status} · ${w.year} · ${w.role}  `); L(w.summary); L(); L(w.metrics.map((m) => `${m.k}: ${m.v}`).join(' · ') + (w.href ? ` · ${w.href}` : '')); L() })
L('---'); L(); L('## 5. Process'); L(); L('### From what if to live, in four steps.'); L(); L('Scope is fixed before any code is written, which is why the date holds.'); L()
d.process.forEach((p) => { L(`**${p.step} ${p.title}**  `); L(p.body); L() })
L('---'); L(); L('## 6. One example'); L(); L('### One example: an enquiry, handled end to end.'); L(); L('What one of these solutions looks like once it is running: an assistant answers, automation does the rest.'); L()
d.flow.forEach((f) => L(`${f.step}. **${f.title}**: ${f.body}`)); L()
L('---'); L(); L('## 7. Who it is for'); L(); L('### For businesses that run on enquiries.'); L(); L('Four kinds I build for, and what each one gets.'); L()
d.audiences.forEach((a) => { L(`**${a.title}**  `); L(a.body); L(); list(a.outcomes); L() })
L('---'); L(); L('## 8. Standards'); L(); L('### Numbers you can hold me to.'); L()
d.stats.forEach((s) => L(`- **${s.value}${s.suffix}**: ${s.label}`)); L()
L('---'); L(); L('## 9. Studio'); L(); L(`### ${d.studio.lead}`); L(); d.studio.body.forEach((p) => { L(p); L() })
L('*Beliefs:*'); list(d.manifesto); L()
L('*Facts:* ' + d.studio.facts.map((f) => `${f.k}: ${f.v}`).join(' · ')); L()
L('*Working with:* ' + d.capabilities.join(' · ')); L()
L('---'); L(); L('## 10. FAQ'); L(); L('### Straight answers.'); L()
d.faq.forEach((f) => { L(`**${f.q}**  `); L(f.a); L() })
L('---'); L(); L('## 11. Contact'); L(); L('### Tell me what you want built.'); L(); L('Or the problem you want gone. You get a straight answer, usually the same day.'); L()
L('**Enquiry form**'); L()
L('- Name, Email'); L('- Business type: ' + d.businessTypes.join(' / ')); L('- Project type: ' + d.projectTypes.join(' / ')); L('- Budget: ' + d.budgets.join(' / '))
L('- What is slowing you down? (optional), example: "Late replies, reports built by hand"'); L('- What do you need built?, example: "A booking system for our clinic, and a website that answers patients at night."'); L()
L(`*Availability:* ${d.availability.status}, ${d.availability.detail}`); L()
L('---'); L(); L(`## 12. Chat assistant (${d.assistant.name})`); L(); L(d.assistant.intro); L(); L('*Suggested questions:*'); list(d.assistant.suggestions); L()
L(`*When it doesn't know:* ${d.assistant.fallback}`); L()
writeFileSync(new URL('../site-content.md', import.meta.url), o.join('\n') + '\n')
console.log('Wrote site-content.md')
