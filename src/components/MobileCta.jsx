import { useEffect, useState } from 'react'
import { brand, whatsappHref } from '../data/site.js'
import { WhatsAppIcon } from './WhatsApp.jsx'

/**
 * Sticky call to action, phones only.
 *
 * On a phone the hero CTA scrolls away within one flick and the nav CTA is
 * behind a menu, which leaves the majority of traffic with no visible way to
 * act on a page selling projects. This keeps one always within thumb reach.
 *
 * It earns its space by staying out of the way:
 *   · hidden over the hero, where a real CTA is already on screen
 *   · hidden again over the contact section, where the form itself is the CTA
 *     and a floating duplicate would just cover it
 *   · padded for the iPhone home indicator via safe-area insets, so it is not
 *     half-swallowed by the system gesture bar
 *
 * WhatsApp sits beside it because for this audience — clinics, institutions,
 * founders in Kerala — it is the channel people actually reply on.
 */
export default function MobileCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const decide = () => {
      const contact = document.getElementById('contact')
      const y = window.scrollY
      const pastHero = y > window.innerHeight * 0.9
      // Treat "contact is on screen" as reaching its top, not its middle —
      // by then the form is what the visitor is looking at.
      const atContact = contact
        ? y + window.innerHeight > contact.offsetTop + 160
        : y + window.innerHeight > document.documentElement.scrollHeight - 200
      const visible = pastHero && !atContact
      setShow(visible)
      // Tells the floating WhatsApp button to step aside: the bar carries one.
      document.documentElement.toggleAttribute('data-cta', visible)
    }
    decide()
    window.addEventListener('scroll', decide, { passive: true })
    window.addEventListener('resize', decide)
    return () => {
      window.removeEventListener('scroll', decide)
      window.removeEventListener('resize', decide)
      document.documentElement.removeAttribute('data-cta')
    }
  }, [])

  return (
    <div
      // `inert` while hidden: off-screen is not the same as out of the tab order.
      inert={show ? undefined : ''}
      className={
        'fixed inset-x-0 bottom-0 z-[94] flex items-center gap-2 border-t border-line bg-bg/85 px-3 pt-3 backdrop-blur-xl transition-transform duration-300 md:hidden ' +
        (show ? 'translate-y-0' : 'translate-y-full')
      }
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href="#contact"
        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-action px-5 text-sm font-medium text-onaction"
      >
        Book a free consultation
        <span aria-hidden>→</span>
      </a>

      {/* Only once a real number is set — the primary CTA is flex-1, so it
          takes the full width on its own until then. */}
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-mist"
        >
          <span className="sr-only">Message {brand.full} on WhatsApp</span>
          <WhatsAppIcon size={19} />
        </a>
      )}
    </div>
  )
}
