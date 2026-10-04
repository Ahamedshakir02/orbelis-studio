import { useEffect, useRef } from 'react'
import { assistant, services, flow } from '../data/site.js'

/**
 * The product, shown rather than described: one enquiry arriving, answered
 * from the site's own content, and carried the rest of the way.
 *
 * It is the hero's image, in the place a product photograph would sit: a
 * conversation at the centre, the step before it on one side and the step
 * after it on the other, on a black stage with one soft light behind.
 *
 * Everything in it is read from site.js — the price is the real price, the
 * steps are the real flow — so it cannot promise something the page below
 * does not say.
 *
 * MOTION, in three layers, each on its own element so they never fight over
 * `transform`:
 *   · `rise`   plays once as the page opens — each line arrives in the order
 *                it would happen.
 *   · `float`  then keeps the three cards adrift, slowly and out of step, so
 *                the stage reads as objects in space rather than a picture.
 *   · `plx`    leans each card a few pixels toward the pointer, the nearer
 *                ones further, which is what gives the stage depth.
 * The pointer layer runs only for a mouse; all three stop for reduced motion.
 *
 * To a screen reader it is one described image: the same conversation is
 * available for real through the assistant button, and the steps are listed
 * properly in the automation section.
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
  const landing = services[0]
  const after = flow.slice(2)

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
      aria-label={`Example: a visitor asks what a landing site costs, the assistant answers ${landing.price} from this site's content, and the enquiry is logged, followed up and reported automatically.`}
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
                className="rise rounded-[22px] border border-line bg-surface p-5 text-left shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] md:p-6"
                style={delay(450)}
              >
                <div className="flex items-center gap-2.5 border-b border-line pb-4">
                  <span className="h-2 w-2 rounded-full bg-brass" />
                  <span className="text-sm font-medium">{assistant.name}</span>
                  <span className="text-xs text-muted">answers from this site</span>
                </div>

                <div className="space-y-3 py-5">
                  <p className="rise ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-raised px-4 py-2.5 text-sm" style={delay(900)}>
                    What does a landing site cost?
                  </p>
                  <div className="rise max-w-[90%]" style={delay(1600)}>
                    <p className="w-fit rounded-2xl rounded-bl-md border border-line px-4 py-2.5 text-sm leading-relaxed">
                      {landing.price}, delivered in two weeks. The price is published, not quoted on request.
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <span className="h-1 w-1 rounded-full bg-brass" />
                      Services &amp; pricing
                    </p>
                  </div>
                </div>

                <ol className="space-y-2.5 border-t border-line pt-4">
                  {after.map((step, i) => (
                    <li key={step.step} className="rise flex items-center gap-3 text-sm" style={delay(2400 + i * 350)}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass">
                        <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                        <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{step.title}</span>
                      <span className="ml-auto font-mono text-xs text-muted">{step.step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <Step step={flow[4]} at={3500} depth={16} offset="-5s" className="lg:-translate-y-8 lg:rotate-2" />
        </div>
      </div>
    </div>
  )
}
