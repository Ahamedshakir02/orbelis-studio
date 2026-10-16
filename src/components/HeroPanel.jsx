import { useEffect, useRef, useState } from 'react'
import { services, heroStage } from '../data/site.js'

/**
 * The hero's image: three cards adrift, read left to right — you name the
 * problem, something gets built for it, it goes live.
 *
 * What gets built is the subject, and it is not one thing. The centre card
 * cycles through the solutions the studio builds (an app, a website, the
 * assistant, an automation), ticking through what each one includes. The cards
 * either side are the first and last steps of the process.
 *
 * Everything in it is read from site.js — the solutions are the services' own
 * titles and points, the outer cards are `heroStage` — so it cannot promise
 * something the page below does not say.
 *
 * MOTION, in three layers, each on its own element so they never fight over
 * `transform`:
 *   · `rise`   plays as the page opens — the cards, then each point — and
 *              again, quicker, each time the centre card changes solution.
 *   · `float`  then keeps the three cards adrift, slowly and out of step, so
 *              the stage reads as objects in space rather than a picture.
 *   · `plx`    leans each card a few pixels toward the pointer, the outer
 *              ones further, which is what gives the stage depth.
 * The pointer layer runs only for a mouse; all three stop for reduced motion,
 * and so does the rotation, which also pauses while the stage is off screen.
 *
 * To a screen reader it is one described image; the services are listed
 * properly in the band below.
 */
const delay = (ms) => ({ '--d': `${ms}ms` })
const layer = (depth, offset) => ({ '--depth': depth, '--fd': offset })

// How long each solution stays on the centre card.
const HOLD_MS = 4800

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
  const solutions = heroStage.solutions.map((e) => services.find((s) => s.enquiry === e)).filter(Boolean)
  // `turn` counts changes; 0 is the opening, which keeps the slow entrance.
  const [turn, setTurn] = useState(0)
  const solution = solutions[turn % solutions.length]

  // Rotation. Only while the stage is on screen and the tab is visible, and
  // never for reduced motion: the first solution simply stays.
  useEffect(() => {
    const el = stage.current
    if (!el || solutions.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let onScreen = true
    let timer = 0
    const schedule = () => {
      clearTimeout(timer)
      if (onScreen && !document.hidden) timer = setTimeout(() => setTurn((t) => t + 1), HOLD_MS)
    }
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      schedule()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', schedule)
    schedule()
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', schedule)
      clearTimeout(timer)
    }
  }, [turn, solutions.length])

  // The opening plays after the cards land; later turns start at once.
  const pointAt = (i) => (turn === 0 ? 1000 + i * 450 : 120 + i * 220)

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
      aria-label={`How a project works: you name the problem, I build what solves it (${solutions.map((s) => s.title).join(', ')}), and it goes live.`}
      className="relative mx-auto mt-14 max-w-[980px] md:mt-20"
    >
      <div aria-hidden>
        {/* The one light on the stage. It drifts the other way, a little. */}
        <div className="plx pointer-events-none absolute inset-0" style={layer(-10, '0s')}>
          <div className="glow absolute left-1/2 top-1/2 h-[380px] w-[680px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/20 blur-[110px]" />
        </div>

        <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_minmax(0,430px)_1fr]">
          <Step step={heroStage.before} at={500} depth={16} offset="-2.5s" className="lg:translate-y-8 lg:-rotate-2" />

          <div className="plx" style={layer(6, '0s')}>
            <div className="float">
              <div
                className="rise rounded-[22px] border border-line bg-surface p-5 text-left shadow-[0_30px_80px_-30px_rgb(0_0_0/0.35)] md:p-6"
                style={delay(450)}
              >
                <div className="flex items-center gap-2.5 border-b border-line pb-4">
                  <span className="h-2 w-2 rounded-full bg-brass" />
                  <span key={solution.title} className="rise text-sm font-medium" style={delay(0)}>
                    {solution.title}
                  </span>
                  <span className="text-xs text-muted">built for you</span>
                </div>

                {/* What this solution includes, one point after another. Keyed
                    by turn so the list is new, and rises again, each change.
                    The other solutions' lists sit invisibly in the same grid
                    cell, so the card is always as tall as the longest and the
                    page below never jumps when it changes. */}
                <div className="grid py-5">
                  {solutions.map((s) =>
                    s === solution ? null : (
                      <ol key={s.title} className="invisible space-y-3 [grid-area:1/1]">
                        {s.points.map((point) => (
                          <li key={point} className="flex items-center gap-3 text-[15px]">
                            <span className="h-[18px] w-[18px] shrink-0" />
                            <span>{point}</span>
                            <span className="ml-auto font-mono text-xs">00</span>
                          </li>
                        ))}
                      </ol>
                    ),
                  )}
                  <ol key={turn} className="space-y-3 [grid-area:1/1]">
                    {solution.points.map((point, i) => (
                      <li key={point} className="rise flex items-center gap-3 text-[15px]" style={delay(pointAt(i))}>
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass">
                          <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                          <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{point}</span>
                        <span className="ml-auto font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Which solution is showing, of how many. */}
                <div className="rise flex items-center gap-1.5 border-t border-line pt-4" style={delay(2900)}>
                  {solutions.map((s, i) => (
                    <span
                      key={s.title}
                      className={
                        'h-1.5 rounded-full transition-all duration-500 ' +
                        (i === turn % solutions.length ? 'w-6 bg-brass' : 'w-1.5 bg-line')
                      }
                    />
                  ))}
                  <span className="ml-auto text-xs text-muted">One studio, whatever it takes</span>
                </div>
              </div>
            </div>
          </div>

          <Step step={heroStage.after} at={3300} depth={16} offset="-5s" className="lg:-translate-y-8 lg:rotate-2" />
        </div>
      </div>
    </div>
  )
}
