import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { audiences } from '../data/site.js'

/**
 * Who the studio builds for, and what each one gets. Outcomes are listed as
 * things delivered, not results promised — a studio this size can stand behind
 * what it ships, not behind a number it does not control.
 */
export default function Audience() {
  const root = useGsap(() => {
    gsap.from('.audience-item', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.audience-grid', start: 'top 82%' },
    })
  }, [])

  return (
    <section ref={root} className="relative pb-32 md:pb-48">
      <div className="container-x">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">Who it is for</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            Built for four kinds of business.
          </h2>
        </div>

        <div className="audience-grid grid gap-6 md:grid-cols-2 md:gap-8">
          {audiences.map((a) => (
            <article
              key={a.title}
              className="audience-item rounded-2xl border border-line bg-surface/85 p-8 backdrop-blur-md md:p-10"
            >
              <h3 className="font-display text-3xl tracking-tight">{a.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">{a.body}</p>
              <ul className="mt-8 grid gap-2 border-t border-line pt-6 sm:grid-cols-2">
                {a.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-mist">
                    <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
