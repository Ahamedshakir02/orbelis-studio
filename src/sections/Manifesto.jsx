import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'
import { manifesto } from '../data/site.js'

/**
 * BEAT 2 — a scrubbed reading section. Lines brighten from muted to full as
 * they pass the middle of the screen, so the scroll itself does the emphasis.
 */
export default function Manifesto() {
  const root = useGsap(() => {
    gsap.utils.toArray('.manifesto-line').forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        },
      )
    })
  }, [])

  return (
    <section ref={root} className="relative py-32 md:py-48">
      <div className="container-x">
        <p className="eyebrow mb-14">What we actually believe</p>
        <div className="max-w-4xl space-y-10">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className="manifesto-line font-display text-3xl leading-[1.15] tracking-tight md:text-5xl"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
