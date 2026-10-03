import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { problems } from '../data/site.js'

/**
 * The costs, named before the services that remove them. A visitor who
 * recognises their own week in these three reads the price list differently.
 * Play-once reveal, like Process: content arriving, not the world moving.
 */
export default function Problems() {
  const root = useGsap(() => {
    gsap.from('.problem-item', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.problem-grid', start: 'top 82%' },
    })
  }, [])

  return (
    <section ref={root} className="relative pt-32 md:pt-48">
      <div className="container-x">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">Where the time goes</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            Three things that quietly cost you.
          </h2>
        </div>

        <div className="problem-grid grid gap-6 md:grid-cols-3 md:gap-8">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="problem-item rounded-2xl border border-line bg-surface/85 p-8 backdrop-blur-md"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-2xl tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
