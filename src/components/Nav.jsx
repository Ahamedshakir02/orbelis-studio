import { useEffect, useRef, useState } from 'react'
import { brand, nav } from '../data/site.js'
import { lockScroll } from '../lib/scroll.js'

/**
 * Header. A name, four links and one action.
 *
 * In-page links are plain #hash anchors: the browser scrolls, CSS smooths it
 * and offsets it below this header. Nothing here intercepts a click except to
 * close the mobile menu first.
 *
 * Below 768px the links collapse into a menu. It is a real dialog-like
 * overlay: the page behind is held still, Escape closes it, and focus returns
 * to the button that opened it.
 */
export default function Nav() {
  const toggle = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    lockScroll(open, 'nav')
    return () => lockScroll(false, 'nav')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const links = [...nav, { label: 'Contact', href: '#contact' }]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#top" onClick={close} className="relative z-[95] font-display text-lg tracking-tight">
            {brand.name}
            <span className="text-brass">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-mist"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {/* Only once a real number is set in site.js — see brand.whatsapp. */}
            {brand.whatsapp && (
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-mist lg:inline-block"
              >
                WhatsApp
              </a>
            )}

            <a
              href="#contact"
              onClick={close}
              className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-brass transition-colors hover:text-mist sm:inline-block"
            >
              Start a project
            </a>

            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-[95] flex h-9 w-9 items-center justify-center md:hidden"
            >
              <span className="sr-only">{open ? 'Close' : 'Open'} menu</span>
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                <span
                  className={
                    'block h-px w-full bg-mist transition-transform duration-200 ' +
                    (open ? 'translate-y-[3px] rotate-45' : '')
                  }
                />
                <span
                  className={
                    'block h-px w-full bg-mist transition-transform duration-200 ' +
                    (open ? '-translate-y-[3px] -rotate-45' : '')
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — not rendered at all while closed, so nothing in it is
          reachable by keyboard or screen reader. */}
      <div id="mobile-menu" className="md:hidden">
        {open && (
          <div className="fixed inset-0 z-[92] flex flex-col justify-between bg-bg px-6 pb-10 pt-24">
            <nav aria-label="Mobile" className="flex flex-col border-t border-line">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="border-b border-line py-5 font-display text-2xl tracking-tight"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="space-y-2">
              <a href={'mailto:' + brand.email} className="block text-sm text-mist">
                {brand.email}
              </a>
              <p className="text-sm text-muted">{brand.location}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
