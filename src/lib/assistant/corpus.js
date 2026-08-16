/**
 * The assistant's knowledge base.
 *
 * Built by projecting `src/data/site.js` into flat, retrievable passages. It is
 * derived, never duplicated: editing a price or a FAQ answer in site.js changes
 * what the assistant says, with no second copy to drift out of sync. That is the
 * same discipline we sell clients — the assistant reads the source of truth.
 *
 * Each passage carries the section it came from and an anchor, so an answer can
 * cite itself and offer to scroll the visitor to the proof on the page.
 */
import {
  brand,
  services,
  work,
  process,
  studio,
  faq,
  stats,
  availability,
  capabilities,
  manifesto,
} from '../../data/site.js'

/** Extra query words a passage should match that its prose does not contain. */
const money = 'price pricing cost costs charge fee fees budget quote rate rupees inr lakh'
const timing = 'time timeline duration schedule long weeks delivery deadline fast'

export const passages = [
  {
    id: 'brand',
    section: 'Studio',
    title: brand.full,
    href: '#top',
    text: `${brand.full}. ${brand.tagline} A one-person studio building premium animated websites with a retrieval-grounded AI assistant behind them, based in ${brand.location}.`,
    keywords: 'orbelis studio who what about intro name based located kerala india where',
  },
  {
    id: 'contact',
    section: 'Contact',
    title: 'Getting in touch',
    href: '#contact',
    text: `Email ${brand.email}, or send the enquiry form at the bottom of this page. The studio is in ${brand.location}. You talk to the person who writes the code — there is no account manager in between.`,
    keywords:
      'contact email reach call phone whatsapp hire start begin enquiry enquire quote talk speak book meeting get in touch',
  },
  {
    id: 'availability',
    section: 'Availability',
    title: 'Current availability',
    href: '#contact',
    text: `${availability.status}. ${availability.detail}. Scope is agreed before a project starts, so the schedule holds.`,
    keywords: 'available availability free busy booked slots capacity when can you start now taking',
  },
  {
    id: 'manifesto',
    section: 'Approach',
    title: 'What the studio believes',
    href: '#top',
    text: manifesto.join(' '),
    keywords: 'why different approach philosophy belief template agency brochure',
  },
  {
    id: 'pricing-overview',
    section: 'Services & pricing',
    title: 'What things cost',
    href: '#services',
    text: `Prices are published rather than quoted on request. ${services
      .map((s) => `${s.title}: ${s.price}`)
      .join('. ')}. Every project includes the performance budget and the accessibility pass — those are not billed as extras.`,
    keywords: `${money} how much expensive cheap afford total range`,
  },
  ...services.map((s) => ({
    id: `service-${s.index}`,
    section: 'Services & pricing',
    title: s.title,
    href: '#services',
    text: `${s.title} — ${s.price}. ${s.body} Includes: ${s.points.join(', ')}.`,
    keywords: `${money} service ${s.points.join(' ')}`,
  })),
  ...work.map((w) => ({
    id: `work-${w.title}`,
    section: 'Work',
    title: w.title,
    href: '#work',
    text: `${w.title} (${w.status}, ${w.year}). Role: ${w.role}. ${w.summary} Built with ${w.stack.join(', ')}. ${w.metrics.map((m) => `${m.k}: ${m.v}`).join('. ')}.`,
    keywords: 'work portfolio project case study example built client shipped previous',
  })),
  ...process.map((p) => ({
    id: `process-${p.step}`,
    section: 'Process',
    title: `${p.step} — ${p.title}`,
    href: '#process',
    text: `${p.title}: ${p.body}`,
    keywords: `process step stage how it works what happens ${timing}`,
  })),
  {
    id: 'process-timeline',
    section: 'Process',
    title: 'How long a build takes',
    href: '#process',
    text: 'Two weeks for most builds, from agreed scope to launch. Larger multi-page sites run three to four weeks. The schedule holds because scope is locked before code starts rather than renegotiated halfway.',
    keywords: `${timing} quick soon rush urgent`,
  },
  {
    id: 'studio-lead',
    section: 'Studio',
    title: 'Who does the work',
    href: '#studio',
    text: `${studio.lead} ${studio.body.join(' ')} ${studio.facts.map((f) => `${f.k}: ${f.v}`).join('. ')}.`,
    keywords:
      'who you team person founder solo freelancer experience background credentials qualified agency size subcontract',
  },
  {
    id: 'capabilities',
    section: 'Studio',
    title: 'Technology used',
    href: '#studio',
    text: `The studio works across: ${capabilities.join(', ')}.`,
    keywords:
      'tech stack technology framework react next node python language build tools wordpress shopify',
  },
  {
    id: 'stats',
    section: 'Studio',
    title: 'Standards held to',
    href: '#studio',
    text: stats.map((s) => `${s.value}${s.suffix} — ${s.label}`).join('. ') + '.',
    keywords: 'performance speed fps lighthouse fast slow mobile budget standard quality',
  },
  ...faq.map((f, i) => ({
    id: `faq-${i}`,
    section: 'FAQ',
    title: f.q,
    href: '#faq',
    text: f.a,
    keywords: f.q.toLowerCase(),
  })),
]
