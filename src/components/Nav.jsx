import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { brand, nav, availability } from '../data/site.js'
import { useScroll } from '../lib/scroll.js'

/**
 * Fixed header. Fades in after the loader lifts, and gains a backdrop once
 * the user leaves the hero so it stays readable over content.
 */
export default function Nav({ ready }) {
  const root = useRef(null)
  const [solid, setSolid] = useState(false)

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

  return (
    <header
      ref={root}
      className={
        'fixed inset-x-0 top-0 z-[90] opacity-0 transition-colors duration-500 ' +
        (solid ? 'border-b border-line bg-bg/80 backdrop-blur-md' : 'border-b border-transparent')
      }
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="font-display text-lg tracking-tight" data-cursor="grow">
          {brand.name}
          <span className="text-brass">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
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
            data-cursor="grow"
            className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-colors hover:border-brass hover:text-brass"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  )
}
