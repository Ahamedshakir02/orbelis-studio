import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import Counter from '../components/Counter.jsx'
import Marquee from '../components/Marquee.jsx'
import { stats, marquee } from '../data/site.js'

/**
 * Hard numbers immediately after the manifesto. Claims are cheap; numbers with
 * a unit attached are the thing a sceptical buyer actually reads.
 */
export default function Stats() {
  const root = useGsap(() => {
    gsap.from('.stat-item', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.stat-grid', start: 'top 85%' },
    })
  }, [])

  return (
    <section ref={root} className="relative">
      <Marquee items={marquee} />

      <div className="container-x py-24 md:py-32">
        <p className="eyebrow mb-12">What you can hold us to</p>

        <div className="stat-grid grid gap-10 md:grid-cols-4 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="stat-item border-t border-line pt-6">
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="block font-display text-5xl tracking-tightest text-brass md:text-6xl"
              />
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
