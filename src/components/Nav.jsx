import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { brand, nav, availability } from '../data/site.js'
import { useScroll, scrollToTarget, lockScroll } from '../lib/scroll.js'

/**
 * Fixed header. Fades in after the loader lifts, and gains a backdrop once
 * the user leaves the hero so it stays readable over content.
 *
 * Two things the first version got wrong:
 *
 * 1. The links were `hidden md:flex` with no mobile alternative, so on the
 *    devices that carry most of the traffic there was no way to reach Work,
 *    Services, Process or Studio at all. Now there is a menu.
 * 2. Anchors jumped natively. Lenis owns the scroll position, so a native jump
 *    teleports past all the ScrollTrigger work instead of travelling through
 *    it. Every in-page link is routed through Lenis instead.
 */
export default function Nav({ ready }) {
  const root = useRef(null)
  const menu = useRef(null)
  const toggle = useRef(null)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!ready) return
    gsap.fromTo(
      root.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.1 },
    )
  }, [ready])

  useEffect(
    () => useScroll.subscribe((s) => setSolid(s.scrollY > window.innerHeight * 0.6)),
    [],
  )

  // Menu open/close: freeze the page, stagger the links in.
  useEffect(() => {
    const el = menu.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      lockScroll(true)
      const tl = gsap.timeline()
      tl.set(el, { autoAlpha: 1 })
      if (!reduce) {
        tl.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' })
          .from('.mobile-link', { y: 40, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'expo.out' }, '-=0.35')
      }
      return () => tl.kill()
    }

    lockScroll(false)
    gsap.to(el, { autoAlpha: 0, duration: reduce ? 0 : 0.3, ease: 'power2.in' })
  }, [open])

  // Never leave the page frozen if this unmounts mid-animation.
  useEffect(() => () => lockScroll(false), [])

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

  /** Route in-page links through Lenis so the travel is smooth, not a teleport. */
  const goTo = useCallback((e, href) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    setOpen(false)
    // Let the scroll lock release before asking Lenis to move.
    requestAnimationFrame(() => scrollToTarget(href))
  }, [])

  return (
    <>
      <header
        ref={root}
        className={
          'fixed inset-x-0 top-0 z-[90] opacity-0 transition-colors duration-500 ' +
          (solid && !open
            ? 'border-b border-line bg-bg/80 backdrop-blur-md'
            : 'border-b border-transparent')
        }
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            onClick={(e) => goTo(e, '#top')}
            className="relative z-[95] font-display text-lg tracking-tight"
            data-cursor="grow"
          >
            {brand.name}
            <span className="text-brass">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => goTo(e, item.href)}
                data-cursor="grow"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-mist"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Availability status — scarcity that happens to be true. */}
            <span className="hidden items-center gap-2 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {availability.detail}
              </span>
            </span>

            <a
              href="#contact"
              onClick={(e) => goTo(e, '#contact')}
              data-cursor="grow"
              className="hidden rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-colors hover:border-brass hover:text-brass sm:inline-block"
            >
              Start a project
            </a>

            {/* Mobile toggle */}
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-cursor="grow"
              className="relative z-[95] flex h-9 w-9 items-center justify-center md:hidden"
            >
              <span className="sr-only">{open ? 'Close' : 'Open'} menu</span>
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                <span
                  className={
                    'block h-px w-full bg-mist transition-transform duration-300 ' +
                    (open ? 'translate-y-[3px] rotate-45' : '')
                  }
                />
                <span
                  className={
                    'block h-px w-full bg-mist transition-transform duration-300 ' +
                    (open ? '-translate-y-[3px] -rotate-45' : '')
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={menu}
        id="mobile-menu"
        className={
          'invisible fixed inset-0 z-[92] flex flex-col justify-between bg-bg px-6 pb-10 pt-24 opacity-0 md:hidden ' +
          (open ? '' : 'pointer-events-none')
        }
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => goTo(e, item.href)}
              tabIndex={open ? 0 : -1}
              className="mobile-link flex items-baseline gap-4 border-b border-line py-5 font-display text-4xl tracking-tightest"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-brass">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => goTo(e, '#contact')}
            tabIndex={open ? 0 : -1}
            className="mobile-link flex items-baseline gap-4 border-b border-line py-5 font-display text-4xl tracking-tightest text-brass"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-brass">
              0{nav.length + 1}
            </span>
            Contact
          </a>
        </nav>

        <div className="mobile-link space-y-2">
          <p className="eyebrow">{availability.status} — {availability.detail}</p>
          <a
            href={'mailto:' + brand.email}
            tabIndex={open ? 0 : -1}
            className="block font-display text-xl tracking-tight text-mist"
          >
            {brand.email}
          </a>
          <p className="text-sm text-muted">{brand.location}</p>
        </div>
      </div>
    </>
  )
}
