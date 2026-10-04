import { useEffect, useRef } from 'react'
import { flow } from '../data/site.js'

/**
 * The hero's image: the product, at work, large enough to be the first thing
 * seen.
 *
 * A browser window holding a client's site. On the left, the site itself; on
 * the right, the assistant answering a customer; along the bottom, the three
 * things automation does next. Two notifications float beside it. It is the
 * whole offer in one picture — the site, the assistant, the automation — so a
 * visitor understands what is sold before reading a word of the page.
 *
 * It is an EXAMPLE and is labelled as one underneath. The business in it is
 * deliberately generic: no real client is being shown. The automation steps
 * are the real ones, read from site.js.
 *
 * MOTION, in three layers, each on its own element so they never fight over
 * `transform`:
 *   · `rise`   plays once as the page opens — the window, then the
 *                conversation line by line, then the automation ticks.
 *   · `float`  then keeps the window and its notifications adrift, slowly
 *                and out of step, so it reads as an object rather than a
 *                picture.
 *   · `plx`    leans each piece a few pixels toward the pointer, the nearer
 *                ones further, which is what gives it depth.
 * The pointer layer runs only for a mouse; all three stop for reduced motion.
 *
 * To a screen reader it is one described image. The real assistant is the
 * button in the corner, and the steps are listed properly further down.
 */
const delay = (ms) => ({ '--d': `${ms}ms` })
const layer = (depth, offset) => ({ '--depth': depth, '--fd': offset })

const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass">
    <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * A notification adrift beside the window: one automation step, as it would
 * arrive. Shown only where there is room for it to sit clear of the window —
 * on a narrower screen it would cover the very thing it is decorating.
 */
function Notice({ step, at, depth, offset, className }) {
  return (
    <div className={'plx absolute z-10 hidden w-[220px] min-[1500px]:block ' + className} style={layer(depth, offset)}>
      <div className="float">
        <div
          className="rise rounded-2xl border border-line bg-surface/90 p-4 text-left shadow-[0_20px_50px_-20px_rgb(0_0_0/0.4)] backdrop-blur"
          style={delay(at)}
        >
          <p className="flex items-center gap-2 text-[13px] font-semibold tracking-tight">
            <Tick />
            {step.title}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.body}</p>
        </div>
      </div>
    </div>
  )
}

export default function HeroPanel() {
  const stage = useRef(null)
  const after = flow.slice(2)

  // Pointer depth. Writes two numbers (-1..1) to the stage as CSS variables,
  // at most once a frame; the pieces read them in CSS. No React state, so a
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
      aria-label="Example: a business website in a browser window. A customer asks the assistant whether the business is open on Sunday and gets an answer from the site's own timings. Below, the enquiry is logged, a follow-up goes out and a report is sent."
      className="relative mx-auto mt-12 max-w-[1000px] md:mt-16"
    >
      <div aria-hidden>
        {/* The one light on the stage. It drifts the other way, a little. */}
        <div className="plx pointer-events-none absolute inset-0" style={layer(-10, '0s')}>
          <div className="glow absolute left-1/2 top-1/2 h-[460px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/25 blur-[120px]" />
        </div>

        <Notice step={flow[2]} at={2600} depth={20} offset="-2.5s" className="-left-[236px] top-[120px] -rotate-2" />
        <Notice step={flow[3]} at={3000} depth={20} offset="-5s" className="-right-[236px] bottom-[110px] rotate-2" />

        <div className="plx relative" style={layer(6, '0s')}>
          <div className="float">
            <div
              className="rise overflow-hidden rounded-[22px] border border-line bg-surface text-left shadow-[0_40px_100px_-30px_rgb(0_0_0/0.45)]"
              style={delay(350)}
            >
              {/* Browser bar */}
              <div className="flex h-11 items-center gap-2 border-b border-line px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="mx-auto rounded-full bg-raised px-4 py-1 text-xs text-muted">yourbusiness.com</span>
                <span className="w-[46px]" />
              </div>

              <div className="grid md:grid-cols-[1.3fr_1fr]">
                {/* The site */}
                <div className="p-6 md:p-10">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                      <span className="h-2 w-2 rounded-full bg-brass" />
                      Your business
                    </p>
                    <p className="hidden gap-5 text-xs text-muted sm:flex">
                      <span>Services</span>
                      <span>Timings</span>
                      <span>Book</span>
                    </p>
                  </div>

                  <p className="mt-9 max-w-sm text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[40px]">
                    Book a visit without the phone tag.
                  </p>
                  <p className="mt-3 text-sm text-muted">Open today until 8pm.</p>

                  <p className="mt-6 flex items-center gap-4 text-sm">
                    <span className="rounded-full bg-action px-4 py-2 text-onaction">Request a visit</span>
                    <span className="text-muted">See services</span>
                  </p>

                  {/* The rest of the page, suggested. */}
                  <div className="mt-9 hidden grid-cols-3 gap-3 md:grid">
                    <span className="h-16 rounded-xl bg-raised" />
                    <span className="h-16 rounded-xl bg-raised" />
                    <span className="h-16 rounded-xl bg-raised" />
                  </div>
                </div>

                {/* The assistant */}
                <div className="flex flex-col border-t border-line bg-tile p-5 md:border-l md:border-t-0">
                  <div className="flex items-center gap-2.5 border-b border-line pb-3">
                    <span className="h-2 w-2 rounded-full bg-brass" />
                    <span className="text-sm font-medium">Assistant</span>
                    <span className="text-xs text-muted">answers from this site</span>
                  </div>

                  <div className="flex-1 space-y-3 py-4">
                    <p className="rise ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-action px-4 py-2.5 text-sm text-onaction" style={delay(900)}>
                      Are you open on Sunday?
                    </p>
                    <div className="rise max-w-[92%]" style={delay(1500)}>
                      <p className="w-fit rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-2.5 text-sm leading-relaxed">
                        Yes, 9am to 1pm on Sundays. Shall I request a visit for you?
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                        <span className="h-1 w-1 rounded-full bg-brass" />
                        From the Timings page
                      </p>
                    </div>
                    <p className="rise ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-action px-4 py-2.5 text-sm text-onaction" style={delay(2100)}>
                      Yes, tomorrow morning.
                    </p>
                  </div>

                  <p className="rounded-full border border-line bg-surface px-4 py-2.5 text-xs text-muted">Ask anything…</p>
                </div>
              </div>

              {/* What automation does next */}
              <ol className="grid border-t border-line sm:grid-cols-3">
                {after.map((step, i) => (
                  <li
                    key={step.step}
                    className={'rise flex items-center gap-2.5 px-5 py-4 text-sm ' + (i ? 'border-t border-line sm:border-l sm:border-t-0' : '')}
                    style={delay(2600 + i * 350)}
                  >
                    <Tick />
                    <span>{step.title}</span>
                    <span className="ml-auto font-mono text-xs text-muted">{step.step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <p className="rise mt-6 text-xs text-muted" style={delay(3400)}>
        An example. Yours is built around your own business and documents.
      </p>
    </div>
  )
}
