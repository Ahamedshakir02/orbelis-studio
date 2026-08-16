/**
 * Structured data, generated from the same content the page renders.
 *
 * Two things this buys that meta tags alone do not:
 *
 *   · The FAQ block is eligible for rich results, so the questions this studio
 *     already answers on the page can answer them in the search listing too.
 *     Published prices are the differentiator; they should be visible before
 *     the click, not after it.
 *   · A ProfessionalService entity with a real location and price range is what
 *     local search reads. "Web designer near Edappal" is a query this studio
 *     should win and cannot win as an unlabelled div.
 *
 * Injected at runtime rather than hard-coded into index.html for the same
 * reason the assistant reads site.js: one source of truth. A price edited in
 * the data file must not leave a stale price in the markup — search engines
 * treat a mismatch between structured data and visible content as a reason to
 * distrust the whole block.
 */
import { brand, services, faq } from '../data/site.js'

function graph() {
  const priceRange = '₹40,000 — ₹1,50,000'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${brand.url}/#studio`,
        name: brand.full,
        description: `${brand.tagline} Premium animated websites with a retrieval-grounded AI assistant built in.`,
        url: brand.url,
        email: brand.email,
        priceRange,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Edappal',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        knowsLanguage: ['en', 'ml'],
        foundingDate: '2026',
        sameAs: brand.socials.map((s) => s.href),
        slogan: brand.tagline,
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 1 },
        makesOffer: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.body,
          },
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            description: s.price,
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
