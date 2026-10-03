import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { flow } from '../data/site.js'

/**
 * One enquiry followed end to end — the assistant and the automation shown as
 * a single sequence rather than described as two services.
 *
 * An ordered list, because it is one: the order is the content. The connecting
 * rule draws with the scroll; the steps themselves play once.
 */
export default function Flow() {
  const root = useGsap(() => {
    gsap.from('.flow-step', {
      y: 32,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: '.flow-grid', start: 'top 82%' },
    })

    gsap.fromTo(
      '.flow-rule',
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.flow-grid', start: 'top 85%', end: 'bottom 60%', scrub: true },
      },
    )
  }, [])

  return (
    <section ref={root} className="relative pb-32 md:pb-48">
      <div className="container-x">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">What automation looks like</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            One enquiry, start to finish.
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted">
            Nobody remembers to do any of this. That is the point.
          </p>
        </div>

        <div className="flow-rule h-px w-full origin-left bg-brass/60" />

        <ol className="flow-grid grid gap-4 pt-10 md:grid-cols-5">
          {flow.map((f) => (
            <li
              key={f.step}
              className="flow-step rounded-xl border border-line bg-surface/85 p-6 backdrop-blur-md"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass">{f.step}</span>
              <h3 className="mt-4 font-display text-xl tracking-tight">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
