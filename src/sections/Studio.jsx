import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { studio, capabilities } from '../data/site.js'

/**
 * BEAT 6 — who is behind it. The portfolio half of the site: capabilities and
 * credentials, framed as studio facts rather than a CV.
 */
export default function Studio() {
  const root = useGsap(() => {
    gsap.from('.studio-reveal', {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.studio-body', start: 'top 82%' },
    })

    gsap.from('.cap-chip', {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.02,
      scrollTrigger: { trigger: '.cap-grid', start: 'top 88%' },
    })
  }, [])

  return (
    <section ref={root} id="studio" className="relative py-32 md:py-48">
      <div className="container-x">
        <p className="eyebrow studio-reveal mb-5">The studio</p>

        <div className="studio-body grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <h2 className="studio-reveal font-display text-4xl leading-[1.02] tracking-tightest md:text-6xl">
              {studio.lead}
            </h2>
            <div className="mt-8 space-y-5">
              {studio.body.map((p, i) => (
                <p key={i} className="studio-reveal max-w-xl text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <dl className="studio-reveal grid grid-cols-2 gap-6 border-t border-line pt-8">
              {studio.facts.map((f) => (
                <div key={f.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-lg text-mist">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20">
          <p className="eyebrow mb-6">Working with</p>
          <ul className="cap-grid flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <li
                key={c}
                className="cap-chip rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-brass/50 hover:text-mist"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
