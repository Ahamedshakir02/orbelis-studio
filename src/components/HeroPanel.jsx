import { useEffect, useRef } from 'react'
import { services, flow } from '../data/site.js'

/**
 * The hero's image: three cards adrift, read left to right — an enquiry
 * arrives, automation does its work, you get the report.
 *
 * Automation is the subject. The centre card is not a conversation; it is the
 * automation service at work, ticking through the jobs it takes off a person.
 * The cards either side are the step before it and the step after it.
 *
 * Everything in it is read from site.js — the jobs are the automation
 * service's own points, the outer cards are the first and last steps of the
 * real flow — so it cannot promise something the page below does not say.
 *
 * MOTION, in three layers, each on its own element so they never fight over
 * `transform`:
 *   · `rise`   plays once as the page opens — the cards, then each job as it
 *              is done.
 *   · `float`  then keeps the three cards adrift, slowly and out of step, so
 *              the stage reads as objects in space rather than a picture.
 *   · `plx`    leans each card a few pixels toward the pointer, the outer
 *              ones further, which is what gives the stage depth.
 * The pointer layer runs only for a mouse; all three stop for reduced motion.
 *
 * To a screen reader it is one described image; the same steps are listed
 * properly in the "How it works" band.
 */
const delay = (ms) => ({ '--d': `${ms}ms` })
const layer = (depth, offset) => ({ '--depth': depth, '--fd': offset })

function Step({ step, at, depth, offset, className = '' }) {
  return (
    <div className="plx hidden lg:block" style={layer(depth, offset)}>
      <div className="float">
        <div
          className={'rise rounded-[18px] border border-line bg-surface/80 p-5 text-left backdrop-blur ' + className}
          style={delay(at)}
        >
          <p className="font-mono text-xs text-muted">{step.step}</p>
          <p className="mt-3 text-[17px] font-semibold leading-tight tracking-tight">{step.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
        </div>
      </div>
    </div>
  )
}

export default function HeroPanel() {
  const stage = useRef(null)
  const automation = services.find((s) => s.enquiry === 'Business automation') ?? services[0]
  const followUp = flow[3]

  // Pointer depth. Writes two numbers (-1..1) to the stage as CSS variables,
  // at most once a frame; the cards read them in CSS. No React state, so a
  // moving mouse never re-renders anything.
  useEffect(() => {
    const el = stage.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) return
        const x = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
        const y = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)
        el.style.setProperty('--px', Math.max(-1, Math.min(1, x)).toFixed(3))
        el.style.setProperty('--py', Math.max(-1, Math.min(1, y)).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={stage}
      role="img"
      aria-label={`How automation works: an enquiry arrives, automation handles ${automation.points.join(', ').toLowerCase()}, and you get the report.`}
      className="relative mx-auto mt-14 max-w-[980px] md:mt-20"
    >
      <div aria-hidden>
        {/* The one light on the stage. It drifts the other way, a little. */}
        <div className="plx pointer-events-none absolute inset-0" style={layer(-10, '0s')}>
          <div className="glow absolute left-1/2 top-1/2 h-[380px] w-[680px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/20 blur-[110px]" />
        </div>

        <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_minmax(0,430px)_1fr]">
          <Step step={flow[0]} at={500} depth={16} offset="-2.5s" className="lg:translate-y-8 lg:-rotate-2" />

          <div className="plx" style={layer(6, '0s')}>
            <div className="float">
              <div
                className="rise rounded-[22px] border border-line bg-surface p-5 text-left shadow-[0_30px_80px_-30px_rgb(0_0_0/0.35)] md:p-6"
                style={delay(450)}
              >
                <div className="flex items-center gap-2.5 border-b border-line pb-4">
                  <span className="h-2 w-2 rounded-full bg-brass" />
                  <span className="text-sm font-medium">Automation</span>
                  <span className="text-xs text-muted">at work</span>
                </div>

                {/* The jobs it takes off a person, done one after another. */}
                <ol className="space-y-3 py-5">
                  {automation.points.map((job, i) => (
                    <li key={job} className="rise flex items-center gap-3 text-[15px]" style={delay(1000 + i * 450)}>
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass">
                        <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                        <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{job}</span>
                      <span className="ml-auto font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                    </li>
                  ))}
                </ol>

                <p className="rise border-t border-line pt-4 text-sm leading-relaxed text-muted" style={delay(2900)}>
                  {followUp.body}
                </p>
              </div>
            </div>
          </div>

          <Step step={flow[4]} at={3300} depth={16} offset="-5s" className="lg:-translate-y-8 lg:rotate-2" />
        </div>
      </div>
    </div>
  )
}
