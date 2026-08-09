import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { services } from '../data/site.js'

/**
 * BEAT 4 — sticky-stacked service cards. Each card pins, then the next one
 * scrolls over it while the outgoing card recedes. Prices are on the page on
 * purpose: it filters out the people who were never going to pay.
 */
export default function Services() {
  const root = useGsap(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray('.service-card')
      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 12%',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    })

    // Heading reveal on every viewport.
    gsap.from('.services-head', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.services-head', start: 'top 85%' },
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="services" className="relative py-32 md:py-48">
      <div className="container-x">
        <div className="services-head mb-16 max-w-3xl md:mb-24">
          <p className="eyebrow mb-5">Services & pricing</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            Four things, done properly.
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted">
            Fixed ranges, not "request a quote". Every project includes the
            performance budget and the accessibility pass — those are not extras.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {services.map((s) => (
            <article
              key={s.index}
              className="service-card sticky top-24 rounded-2xl border border-line bg-surface/85 p-8 backdrop-blur-md md:p-12"
              data-cursor="grow"
            >
              <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-1">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brass">
                    {s.index}
                  </span>
                </div>

                <div className="md:col-span-6">
                  <h3 className="font-display text-3xl tracking-tight md:text-4xl">{s.title}</h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                    {s.body}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <ul className="space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-mist">
                        <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <span className="font-display text-2xl text-brass md:text-3xl">{s.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
