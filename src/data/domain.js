/**
 * The site's address, in one place.
 *
 * Canonical links, Open Graph tags, the sitemap, robots.txt, the structured
 * data, llms.txt, the brochure and the social pack all read it from here.
 *
 * orbelis.co is the chosen domain but is not bought yet. Until it is bought
 * and pointed at Vercel, everything uses the working Vercel address, so no
 * page or image ever sends people to a domain that does not answer.
 *
 * When orbelis.co is live: set DOMAIN_LIVE to true, run `npm run build`,
 * `npm run brochure`, `npm run social` and `npm run brand`, and commit.
 */
export const DOMAIN_LIVE = false

export const DOMAIN = 'orbelis.co'
export const FALLBACK_URL = 'https://orbelis.vercel.app'

export const SITE_URL = DOMAIN_LIVE ? `https://${DOMAIN}` : FALLBACK_URL
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '')

/**
 * The address printed on images (posts, stories, banners). Null until the
 * domain is live: the Vercel address is fine as a link but not as something
 * to print on a poster, so images leave the line out until then.
 */
export const PRINT_HOST = DOMAIN_LIVE ? DOMAIN : null
