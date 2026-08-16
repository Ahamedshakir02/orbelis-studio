import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { brand } from '../data/site.js'
import { useScroll, scrollToTarget } from '../lib/scroll.js'

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
  const bar = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const decide = (s) => {
      const doc = document.documentElement
      const contact = document.getElementById('contact')
      const pastHero = s.scrollY > window.innerHeight * 0.9
      // Treat "contact is on screen" as reaching its top, not its middle —
      // by then the form is what the visitor is looking at.
      const atContact = contact
        ? s.scrollY + window.innerHeight > contact.offsetTop + 160
        : s.scrollY + window.innerHeight > doc.scrollHeight - 200
      setShow(pastHero && !atContact)
    }
    decide(useScroll.getState())
    return useScroll.subscribe(decide)
  }, [])

  useEffect(() => {
    const el = bar.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.to(el, {
      yPercent: show ? 0 : 140,
      autoAlpha: show ? 1 : 0,
      duration: reduce ? 0 : 0.45,
      ease: show ? 'expo.out' : 'power2.in',
    })
  }, [show])

  return (
    <div
      ref={bar}
      className="invisible fixed inset-x-0 bottom-0 z-[94] flex items-center gap-2 border-t border-line bg-bg/90 px-3 pt-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          scrollToTarget('#contact')
        }}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brass px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg"
      >
        Start a project
        <span aria-hidden>→</span>
      </a>

      <a
        href={`https://wa.me/${brand.whatsapp}`}
        target="_blank"
        rel="noreferrer noopener"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-mist"
      >
        <span className="sr-only">Message {brand.full} on WhatsApp</span>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
        </svg>
      </a>
    </div>
  )
}
