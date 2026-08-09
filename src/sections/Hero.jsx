import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { splitWords } from '../lib/splitText.js'
import { brand } from '../data/site.js'
import Magnetic from '../components/Magnetic.jsx'

/**
 * BEAT 1 — the orb is already turning behind; the headline rises into it.
 *
 * The intro waits for the loader (`ready`) so the reveal is never half-hidden
 * behind the curtain.
 */
export default function Hero({ ready }) {
  const headline = useRef(null)

  const root = useGsap(() => {
    // Parallax the hero copy out as the page moves on.
    gsap.to('.hero-inner', {
      yPercent: -12,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const inners = splitWords(headline.current)

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    if (reduce) {
      tl.set([inners, '.hero-fade'], { y: 0, opacity: 1 })
    } else {
      tl.from(inners, { yPercent: 115, duration: 1.1, stagger: 0.055 })
        .from('.hero-fade', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.65')
    }
    return () => tl.kill()
  }, [ready])

  return (
    <section ref={root} id="top" className="hero relative min-h-[100svh] w-full">
      <div className="hero-inner container-x flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-20">
        <p className="hero-fade eyebrow mb-8">
          {brand.full} — {brand.location}
        </p>

        <h1
          ref={headline}
          className="font-display text-[13vw] leading-[0.86] tracking-tightest md:text-[9.5vw] lg:text-[8.5vw]"
        >
          Websites that move. Assistants that answer.
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-base leading-relaxed text-muted md:text-lg">
            A one-person studio building premium animated websites with a
            retrieval-grounded AI assistant behind them. Built in Kerala, for
            clinics, institutions and founders who are tired of brochures.
          </p>

          <div className="hero-fade flex items-center gap-4">
            <Magnetic>
              <a
                href="#contact"
                data-cursor="grow"
                className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-mist"
              >
                Start a project
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <a
              href="#work"
              data-cursor="grow"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-mist"
            >
              See the work
            </a>
          </div>
        </div>
      </div>

      <div className="hero-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="eyebrow">Scroll</span>
      </div>
    </section>
  )
}
