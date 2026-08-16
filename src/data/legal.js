/**
 * Privacy policy and terms.
 *
 * NOT LEGAL ADVICE. This is an honest, specific description of what the site
 * and the studio actually do — which is the hard part, and the part a template
 * gets wrong. Have a lawyer read it before launch, particularly if you take
 * clients in the EU or UK, where GDPR obligations attach to the enquiry form.
 *
 * Written to be accurate about THIS site as built. If you add a tracker, a
 * chat widget, a CRM webhook or a hosted assistant endpoint, this file has to
 * change with it — a privacy policy that describes the wrong site is a
 * liability, not a shield.
 */
import { brand } from './site.js'

export const lastUpdated = '16 August 2026'

export const privacy = {
  slug: 'privacy',
  title: 'Privacy Policy',
  intro: `This policy covers ${brand.url} and the enquiries sent through it. It describes what is actually collected — which is very little — and what happens to it.`,
  sections: [
    {
      h: 'What is collected',
      p: [
        'The enquiry form collects the name, email address, project type, budget range and message you type into it. Nothing else is taken from that form, and none of it is inferred or enriched from other sources.',
        'The on-site assistant processes the questions you type into it in order to answer them. Retrieval runs in your own browser against this site\'s published content. If a hosted answering endpoint is configured, your question and the matched passages from this site are sent to it to phrase a reply.',
        'No account is created, because there is nothing here to log in to.',
      ],
    },
    {
      h: 'Cookies and analytics',
      p: [
        'This site sets no advertising cookies and runs no cross-site tracking.',
        'If privacy-preserving, cookieless analytics is enabled, it records aggregate page views and referrers with no cookie and no identifier that can single you out. If a cookie-setting analytics provider is ever enabled, it is loaded only after you accept it in the banner, and declining leaves it unloaded rather than merely hidden.',
        'Your choice is stored in your browser\'s local storage so you are not asked again. Clearing site data resets it.',
      ],
    },
    {
      h: 'How it is used',
      p: [
        'Enquiry details are used to reply to your enquiry and to carry out any work that follows. They are not sold, rented, traded, or used to market anything unrelated, and you will not be added to a mailing list for getting in touch.',
      ],
    },
    {
      h: 'Who else sees it',
      p: [
        'The site is served by a static hosting provider, which necessarily processes the network request that delivers the page. Enquiries arrive by email, so the email provider handles them in transit and at rest. Where a form-handling service or an answering endpoint is configured, that provider processes the submission in order to deliver it.',
        'Beyond those processors, nobody. There is no data broker, no advertising network and no subcontractor in the chain.',
      ],
    },
    {
      h: 'How long it is kept',
      p: [
        'Enquiry correspondence is kept while there is an active conversation or project, and for as long afterwards as is needed for tax and contractual records. Enquiries that go nowhere are deleted once it is clear they have.',
      ],
    },
    {
      h: 'Your rights',
      p: [
        `You can ask what is held about you, ask for it to be corrected, or ask for it to be deleted. Email ${brand.email} and it will be handled — normally within a few days, and without asking you to justify the request.`,
        'If you are in the EU or UK, the GDPR rights of access, rectification, erasure, restriction, portability and objection apply, and you may complain to your local supervisory authority.',
      ],
    },
    {
      h: 'Children',
      p: [
        'This is a business-to-business studio site. It is not directed at children and no information is knowingly collected from them.',
      ],
    },
    {
      h: 'Changes',
      p: [
        'If this policy changes, the date at the top changes with it. Material changes to what is collected will be described rather than quietly folded in.',
      ],
    },
  ],
}

export const terms = {
  slug: 'terms',
  title: 'Terms of Use',
  intro: `These terms cover use of ${brand.url}. Project work is governed by the written proposal and agreement for that project, not by this page — where the two differ, the signed agreement wins.`,
  sections: [
    {
      h: 'Using this site',
      p: [
        'You may read, share and link to this site freely. You may not scrape it at a volume that degrades it for other people, attempt to break into it, or copy its design and copy wholesale into a competing site.',
      ],
    },
    {
      h: 'Prices on this site',
      p: [
        'The ranges published here are real and current, and are shown so you can judge fit before contacting anyone. They are indicative, not a binding offer: what a specific project costs depends on its scope, and the number that binds is the one in a written proposal you have accepted.',
        'Prices are in Indian Rupees and exclude any taxes that apply.',
      ],
    },
    {
      h: 'The assistant',
      p: [
        'The assistant on this site answers from this site\'s own published content and declines when a question falls outside it. It is a demonstration of the studio\'s work and a convenience for visitors. It is not advice, not a quotation, and not a contract. Where its answer and a written proposal disagree, the proposal is correct.',
      ],
    },
    {
      h: 'Work, ownership and warranties',
      p: [
        'On full payment, the delivered site and its custom code are yours. Third-party dependencies stay under their own licences, and the studio keeps the right to describe and show the work in a portfolio unless the agreement says otherwise.',
        'The site is provided as it is. Everything here is built to a stated performance and accessibility standard and tested against it, but no site is warranted to be uninterrupted or error-free, and nothing here guarantees a commercial outcome.',
      ],
    },
    {
      h: 'Liability',
      p: [
        'Nothing in these terms limits liability for fraud, for death or personal injury caused by negligence, or for anything else that cannot lawfully be limited. Subject to that, liability arising out of this site is limited to the amount you have paid the studio, if any.',
      ],
    },
    {
      h: 'Governing law',
      p: [
        'These terms are governed by the laws of India, and the courts of Kerala have jurisdiction.',
      ],
    },
    {
      h: 'Contact',
      p: [`Questions about these terms go to ${brand.email}.`],
    },
  ],
}

export const notFound = {
  slug: '404',
  title: 'Page not found',
  intro:
    'That page does not exist — most likely an old link, or a typo in the address. Nothing is broken on your end.',
}
