import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { work } from '../data/site.js'

/**
 * BEAT 3 — the pinned horizontal gallery.
 *
 * Vertical scroll pans a wide track sideways at 1:1, so the gesture stays
 * predictable. `invalidateOnRefresh` recomputes the distance on resize and
 * rotate; without it the panel breaks on mobile orientation change.
 *
 * Below 768px the track falls back to a normal vertical stack — forced
 * horizontal scroll on a phone is a usability trap, not a flourish.
 */
export default function Work() {
  const root = useGsap(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = document.querySelector('.work-track')
      if (!track) return

      const getDistance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.work-gallery',
          start: 'top top',
          end: () => '+=' + getDistance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Progress bar tracks how far through the gallery the user is.
      gsap.to('.work-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.work-gallery',
          start: 'top top',
          end: () => '+=' + getDistance(),
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="work" className="relative">
      <div className="container-x mb-12 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-5">Selected work</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            Built, not templated.
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted md:block">
          Concept builds are labelled as such. Nothing here pretends to be a
          client engagement that was not one.
        </p>
      </div>

      <div className="work-gallery relative md:h-[100svh] md:overflow-hidden">
        <div className="work-track container-x flex flex-col gap-6 md:h-full md:flex-row md:items-center md:gap-8 md:pr-[20vw]">
          {work.map((item) => (
            <article
              key={item.title}
              className="group relative flex w-full shrink-0 flex-col justify-between rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur-sm transition-colors hover:border-brass/40 md:h-[62vh] md:w-[46vw] md:p-10"
              data-cursor="grow"
            >
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.accent }}
                    aria-hidden
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {item.status} · {item.year}
                  </span>
                </div>

                <h3 className="font-display text-4xl tracking-tight md:text-5xl">{item.title}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {item.role}
                </p>

                <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                  {item.summary}
                </p>
              </div>

              <div className="mt-10">
                <dl className="mb-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
                  {item.metrics.map((m) => (
                    <div key={m.k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {m.k}
                      </dt>
                      <dd className="mt-1 text-sm text-mist">{m.v}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="flex flex-wrap gap-2">
                  {item.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="container-x absolute inset-x-0 bottom-8 hidden md:block">
          <div className="h-px w-full bg-line">
            <div className="work-progress h-px w-full origin-left scale-x-0 bg-brass" />
          </div>
        </div>
      </div>
    </section>
  )
}
