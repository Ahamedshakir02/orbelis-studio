import { useEffect, useState } from 'react'
import { needsConsent, readConsent, writeConsent, initAnalytics } from '../lib/analytics.js'

/**
 * Consent banner.
 *
 * Renders only when something is configured that genuinely cannot run without
 * permission (see analytics.js). With the default privacy-first setup there is
 * no cookie to consent to, so nothing appears — which is the correct outcome,
 * not a missing feature. A banner on a site that sets no cookies is theatre
 * that costs conversions and teaches people to dismiss the ones that matter.
 *
 * Accept and Decline are given equal visual weight. A greyed-out decline next
 * to a bright accept is a dark pattern, and under the GDPR a consent obtained
 * that way is not freely given — so it is also not valid.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Cookieless analytics starts immediately; this only resolves the rest.
    initAnalytics()
    if (needsConsent() && readConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  const decide = (value) => {
    writeConsent(value)
    setVisible(false)
    if (value === 'granted') initAnalytics()
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      className="fixed inset-x-3 bottom-3 z-[97] rounded-2xl border border-line bg-surface/95 p-5 backdrop-blur-xl md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        Cookies
      </p>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        This site would like to use analytics cookies to understand which pages
        are read. Nothing is shared with advertisers, and declining costs you
        nothing on this site.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => decide('granted')}
          data-cursor="grow"
          className="rounded-full bg-brass px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-mist"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide('denied')}
          data-cursor="grow"
          className="rounded-full border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist transition-colors hover:border-brass hover:text-brass"
        >
          Decline
        </button>
        <a
          href="/privacy"
          data-cursor="grow"
          className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-mist"
        >
          Privacy policy
        </a>
      </div>
    </div>
  )
}
