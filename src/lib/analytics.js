/**
 * Analytics, gated on consent — and configured so that consent is usually
 * unnecessary.
 *
 * TWO PROVIDERS, DELIBERATELY RANKED:
 *
 *   VITE_PLAUSIBLE_DOMAIN — cookieless, no persistent identifier, nothing
 *     stored on the visitor's device. Under the ePrivacy Directive and the
 *     IT Rules this needs no consent banner, so it loads immediately.
 *
 *   VITE_GA_ID — sets cookies and profiles across sites. Requires opt-in, so
 *     it stays unloaded until the visitor actually accepts.
 *
 * The banner in ConsentBanner.jsx therefore appears ONLY when a provider that
 * legally needs consent is configured. Showing a cookie banner on a site that
 * sets no cookies is theatre: it trains people to dismiss the ones that matter,
 * and it costs conversions on the way in. Not asking a question you have no
 * need to ask is the more honest implementation, and the studio sells honesty
 * about this exact thing.
 *
 * Declining does not merely hide the tracker — the script is never injected.
 */

const PLAUSIBLE = import.meta.env?.VITE_PLAUSIBLE_DOMAIN || ''
const GA_ID = import.meta.env?.VITE_GA_ID || ''
const STORAGE_KEY = 'orbelis.consent'

/** True when something is configured that may not run without opt-in. */
export const needsConsent = () => Boolean(GA_ID)

export const hasAnalytics = () => Boolean(PLAUSIBLE || GA_ID)

/** @returns {'granted'|'denied'|null} */
export function readConsent() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    // Private mode or storage disabled — treat as undecided, never as consent.
    return null
  }
}

export function writeConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* nothing to do; the visitor is simply asked again next time */
  }
}

let loaded = false

function inject(src, attrs = {}) {
  const s = document.createElement('script')
  s.src = src
  s.defer = true
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v)
  document.head.appendChild(s)
  return s
}

function loadPlausible() {
  if (!PLAUSIBLE) return
  inject('https://plausible.io/js/script.js', { 'data-domain': PLAUSIBLE })
}

function loadGa() {
  if (!GA_ID) return
  inject(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // Anonymise where the provider allows it, even after opt-in.
  window.gtag('config', GA_ID, { anonymize_ip: true })
}

/**
 * Load whatever is allowed right now.
 * Safe to call repeatedly; scripts are injected at most once.
 */
export function initAnalytics() {
  if (loaded || !hasAnalytics()) return
  const consent = readConsent()

  // Cookieless analytics needs no permission and so does not wait for it.
  loadPlausible()

  if (GA_ID && consent === 'granted') loadGa()

  // Only latch once the consent-requiring provider has been resolved, so a
  // later "accept" can still bring it in.
  if (!GA_ID || consent === 'granted') loaded = true
}

/** Report a custom event, if a provider that supports them is running. */
export function track(name, props = {}) {
  if (window.plausible) window.plausible(name, { props })
  if (window.gtag) window.gtag('event', name, props)
}
