/**
 * Structured data, generated from the same content the page renders.
 *
 * Two things this buys that meta tags alone do not:
 *
 *   · The FAQ block. Google has limited FAQ rich results to a few kinds of site
 *     since 2023, but Bing and AI answer engines still read it.
 *   · A ProfessionalService entity with a real location is what local search
 *     reads. No price range is emitted: projects are quoted, not listed. "Web designer near Edappal" is a query this studio
 *     should win and cannot win as an unlabelled div.
 *
 * Generated from site.js rather than hard-coded, for the same reason the
 * assistant reads site.js: one source of truth. The build writes it into the
 * served index.html (scripts/prerender.mjs), so crawlers that never run
 * JavaScript read it too; in dev it is injected at runtime. A service edited in
 * the data file must not leave a stale one in the markup — search engines
 * treat a mismatch between structured data and visible content as a reason to
 * distrust the whole block.
 */
import { brand, socials, services, faq } from '../data/site.js'

export function graph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // ProfessionalService is a LocalBusiness, which is an Organization, so
        // this one node answers both the "who is this company" and the "is
        // there one near me" questions.
        '@type': 'ProfessionalService',
        '@id': `${brand.url}/#studio`,
        name: brand.full,
        alternateName: brand.name,
        description: `${brand.tagline} Your own tech team, without the hiring: we learn how a business runs, then build what it needs (SaaS and web applications, fast websites, brand and product design, AI assistants and business automation, and the ads, SEO and social media that bring people in) and stay on after launch.`,
        url: brand.url,
        logo: `${brand.url}/icon-512.png`,
        image: `${brand.url}/og.png`,
        email: brand.email,
        // Unset fields are left out entirely: a null or placeholder value in
        // structured data is worse than an absent one.
        ...(brand.phone && { telephone: brand.phone }),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: brand.email,
          ...(brand.phone && { telephone: brand.phone }),
          areaServed: ['IN', 'AE'],
        },
        address: {
          '@type': 'PostalAddress',
          ...(brand.address.street && { streetAddress: brand.address.street }),
          addressLocality: brand.address.locality,
          addressRegion: brand.address.region,
          postalCode: brand.address.postalCode,
          addressCountry: brand.address.country,
        },
        areaServed: [
          { '@type': 'City', name: 'Edappal' },
          { '@type': 'AdministrativeArea', name: 'Malappuram' },
          { '@type': 'State', name: 'Kerala' },
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
        foundingDate: '2026',
        ...(socials.length > 0 && { sameAs: socials.map((s) => s.href) }),
        slogan: brand.tagline,
        knowsAbout: services.map((s) => s.title),
        makesOffer: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.body,
          },
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${brand.url}/#website`,
        url: brand.url,
        name: brand.full,
        publisher: { '@id': `${brand.url}/#studio` },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${brand.url}/#webpage`,
        url: `${brand.url}/`,
        name: `${brand.full} | ${brand.tagline}`,
        isPartOf: { '@id': `${brand.url}/#website` },
        about: { '@id': `${brand.url}/#studio` },
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        '@id': `${brand.url}/#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}

/** The same block as a <script> tag, for the build to write into index.html. */
export function structuredDataTag() {
  // `<` is escaped so no string in the data can close the script element.
  const json = JSON.stringify(graph()).replace(/</g, '\\u003c')
  return `<script type="application/ld+json" id="orbelis-jsonld">${json}</script>`
}

export function injectStructuredData() {
  if (typeof document === 'undefined') return
  if (document.getElementById('orbelis-jsonld')) return

  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.id = 'orbelis-jsonld'
  el.textContent = JSON.stringify(graph())
  document.head.appendChild(el)
}
