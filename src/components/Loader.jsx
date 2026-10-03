import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { brand } from '../data/site.js'
import { lockScroll } from '../lib/scroll.js'

const SHARDS = 12
// Radii are in viewBox units on a 120x120 box centred at 60,60 — so anything
// past ~54 puts the shards (which are ~5 units across) outside the box and
// silently clips them. Scattered sits just inside that limit.
const SCATTERED = 52
const ASSEMBLED = 22
const RING_R = 30
const RING_C = 2 * Math.PI * RING_R

// Each shard keeps its own tumble so the swarm does not rotate as one body.
const SPINS = Array.from({ length: SHARDS }, (_, i) => ((i * 47) % 100) / 100 - 0.5)

/**
 * Where shard `i` sits at progress `t` (0 scattered, 1 assembled).
 *
 * Used by the render as well as the animation: the first frame is painted from
 * the markup, before any effect runs, so the markup has to carry the scattered
 * positions itself. Left to the effect, every shard spends that frame stacked
 * in the corner of the box.
 */
function shardTransform(i, t) {
  const eased = t * t * (3 - 2 * t) // smoothstep, matching the hero object
  const radius = SCATTERED + (ASSEMBLED - SCATTERED) * eased
  const angle = (i / SHARDS) * Math.PI * 2
  const x = 60 + Math.cos(angle) * radius
  const y = 60 + Math.sin(angle) * radius
  const spin = (1 - eased) * SPINS[i] * 420
  const scale = 0.55 + eased * 0.45
  return `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${spin.toFixed(1)}) scale(${scale.toFixed(3)})`
}

/**
 * The preloader.
 *
 * It buys two things — time to warm the WebGL context, and a moment of brand
 * before the reveal — so the only question is what to do with the ~2 seconds.
 * A bar and a number is the default answer and reads as a progress indicator
 * on any site at all.
 *
 * This one rehearses the page's own idea instead: twelve shards converge from
 * scattered to locked while a ring draws around them, which is precisely what
 * the hero object does over the first third of the scroll. By the time the
 * curtain lifts the visitor has already been taught the motif, and the real
 * object is waiting in the same position the loader's was.
 *
 * The exit is a staggered column wipe rather than one panel sliding up —
 * fragments again, and it uncovers the hero left-to-right instead of all at
 * once. `onDone` fires as the wipe begins, not after it: the hero's own intro
 * plays into the opening curtain, instead of the finished hero being shown
 * through the gaps and then replaying once the curtain has gone.
 *
 * The page is held still while the loader is up. Without that a wheel or a
 * swipe scrolls the document underneath, and the curtain lifts on the middle
 * of the page with the hero already gone.
 *
 * Kept under two seconds. Long loaders read as slow, not premium.
 */
export default function Loader({ onDone }) {
  const root = useRef(null)
  const columns = useRef([])
  const content = useRef(null)
  const shards = useRef([])
  const ring = useRef(null)
  const [count, setCount] = useState(0)

  // onDone is a new function identity on every parent render. Holding it in a
  // ref keeps it out of the effect's dependencies — otherwise a state change
  // upstream restarts the whole timeline mid-flight.
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(root.current, { autoAlpha: 0 })
      done.current?.()
      return
    }

    // Two locks, because there are two ways to scroll. Stopping Lenis covers
    // the wheel; touch and the keyboard scroll natively, so the document is
    // made unscrollable as well.
    const html = document.documentElement
    const release = () => {
      html.style.overflow = ''
      lockScroll(false, 'loader')
    }
    html.style.overflow = 'hidden'
    lockScroll(true, 'loader')

    const paint = (v) => {
      const t = v / 100
      shards.current.forEach((el, i) => el?.setAttribute('transform', shardTransform(i, t)))
      if (ring.current) {
        ring.current.style.strokeDashoffset = String(RING_C * (1 - t))
      }
    }

    let out = null
    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        out = gsap.timeline()
        out
          .to(content.current, { autoAlpha: 0, y: -20, duration: 0.4, ease: 'power2.in' })
          // The hero starts its intro here, as the first column begins to lift.
          .add(() => done.current?.(), '-=0.15')
          .to(
            columns.current,
            {
              yPercent: -100,
              duration: 0.9,
              ease: 'expo.inOut',
              stagger: 0.07,
            },
            '<',
          )
          // Take the container out of the flow so nothing under it is trapped,
          // and give the page back.
          .set(root.current, { autoAlpha: 0 })
          .add(release)
      },
    })

    tl.to(obj, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.v))
        paint(obj.v)
      },
    })

    return () => {
      tl.kill()
      out?.kill()
      // Never leave the page frozen if this unmounts mid-animation.
      release()
    }
  }, [])

  const label = count < 35 ? 'Loading' : count < 80 ? 'Assembling' : 'Ready'

  return (
    <div ref={root} className="fixed inset-0 z-[200]">
      {/* The curtain itself: columns that leave in sequence. */}
      <div className="absolute inset-0 flex" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            ref={(el) => (columns.current[i] = el)}
            className="h-full flex-1 bg-bg"
          />
        ))}
      </div>

      <div
        ref={content}
        className="absolute inset-0 flex flex-col justify-between px-6 py-6 md:px-10"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-baseline justify-between">
          <span className="font-display text-xl tracking-tight">
            {brand.name}
            <span className="text-brass">.</span>
          </span>
          <span className="eyebrow">{label}</span>
        </div>

        {/* The orb, assembling — the same move the hero object makes on scroll. */}
        <div className="flex flex-1 items-center justify-center">
          <svg
            width="240"
            height="240"
            viewBox="0 0 120 120"
            className="max-w-[52vw]"
            aria-hidden
          >
            <circle
              ref={ring}
              cx="60"
              cy="60"
              r={RING_R}
              fill="none"
              stroke="#e8a33d"
              strokeWidth="1"
              opacity="0.55"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C}
              transform="rotate(-90 60 60)"
            />
            {Array.from({ length: SHARDS }, (_, i) => (
              <g key={i} ref={(el) => (shards.current[i] = el)} transform={shardTransform(i, 0)}>
                <path d="M 0 -5 L 4.3 2.5 L -4.3 2.5 Z" fill="#e8a33d" />
              </g>
            ))}
          </svg>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="max-w-xs text-sm text-muted">{brand.tagline}</p>
          <span className="font-display text-6xl tabular-nums leading-none md:text-8xl">
            {count}
          </span>
        </div>
      </div>
    </div>
  )
}
