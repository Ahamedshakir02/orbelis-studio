/**
 * Structured data, generated from the same content the page renders.
 *
 * Two things this buys that meta tags alone do not:
 *
 *   · The FAQ block is eligible for rich results, so the questions this studio
 *     already answers on the page can answer them in the search listing too.
 *   · A ProfessionalService entity with a real location is what local search
 *     reads. No price range is emitted: projects are quoted, not listed. "Web designer near Edappal" is a query this studio
 *     should win and cannot win as an unlabelled div.
 *
 * Injected at runtime rather than hard-coded into index.html for the same
 * reason the assistant reads site.js: one source of truth. A service edited in
 * the data file must not leave a stale one in the markup — search engines
 * treat a mismatch between structured data and visible content as a reason to
 * distrust the whole block.
 */
import { brand, socials, services, faq } from '../data/site.js'

function graph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${brand.url}/#studio`,
        name: brand.full,
        description: `${brand.tagline} Business automation, an AI assistant that answers from your own content, SaaS and web applications, fast websites, and the ads, SEO and social media that bring people to them.`,
        url: brand.url,
        email: brand.email,
        // Unset fields are left out entirely: a null or placeholder value in
        // structured data is worse than an absent one.
        ...(brand.phone && { telephone: brand.phone }),
        address: {
          '@type': 'PostalAddress',
          ...(brand.address.street && { streetAddress: brand.address.street }),
          addressLocality: brand.address.locality,
          addressRegion: brand.address.region,
          postalCode: brand.address.postalCode,
          addressCountry: brand.address.country,
        },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        knowsLanguage: ['en', 'ml'],
        foundingDate: '2026',
        ...(socials.length > 0 && { sameAs: socials.map((s) => s.href) }),
        slogan: brand.tagline,
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 1 },
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

export function injectStructuredData() {
  if (typeof document === 'undefined') return
  if (document.getElementById('orbelis-jsonld')) return

  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.id = 'orbelis-jsonld'
  el.textContent = JSON.stringify(graph())
  document.head.appendChild(el)
}
