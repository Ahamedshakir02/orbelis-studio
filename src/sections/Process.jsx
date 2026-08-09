import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { process } from '../data/site.js'

/**
 * BEAT 5 — the process, revealed as a drawn line with staggered steps.
 * Play-once, not scrubbed: this is content arriving, not the world moving.
 */
export default function Process() {
  const root = useGsap(() => {
    gsap.from('.process-step', {
      y: 48,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.process-grid', start: 'top 80%' },
    })

    gsap.fromTo(
      '.process-rule',
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.process-grid', start: 'top 85%', end: 'bottom 60%', scrub: true },
      },
    )
  }, [])

  return (
    <section ref={root} id="process" className="relative py-32 md:py-48">
      <div className="container-x">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">How it runs</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            Small scope. Fast ship.
          </h2>
        </div>

        <div className="process-rule h-px w-full origin-left bg-line" />

        <div className="process-grid grid gap-10 pt-12 md:grid-cols-4 md:gap-8">
          {process.map((p) => (
            <div key={p.step} className="process-step">
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass">{p.step}</span>
              <h3 className="mt-4 font-display text-2xl tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
