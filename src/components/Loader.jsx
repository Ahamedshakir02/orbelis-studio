import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { brand } from '../data/site.js'

const SHARDS = 12
// Radii are in viewBox units on a 120x120 box centred at 60,60 — so anything
// past ~54 puts the shards (which are ~5 units across) outside the box and
// silently clips them. Scattered sits just inside that limit.
const SCATTERED = 52
const ASSEMBLED = 22
const RING_R = 30
const RING_C = 2 * Math.PI * RING_R

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
 * once.
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

    // Each shard keeps its own tumble so the swarm does not rotate as one body.
    const spins = Array.from({ length: SHARDS }, (_, i) => ((i * 47) % 100) / 100 - 0.5)

    const paint = (v) => {
      const t = v / 100
      const eased = t * t * (3 - 2 * t) // smoothstep, matching the hero object
      const radius = SCATTERED + (ASSEMBLED - SCATTERED) * eased

      shards.current.forEach((el, i) => {
        if (!el) return
        const angle = (i / SHARDS) * Math.PI * 2
        const x = 60 + Math.cos(angle) * radius
        const y = 60 + Math.sin(angle) * radius
        const spin = (1 - eased) * spins[i] * 420
        const scale = 0.55 + eased * 0.45
        el.setAttribute(
          'transform',
          `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${spin.toFixed(1)}) scale(${scale.toFixed(3)})`,
        )
      })

      if (ring.current) {
        ring.current.style.strokeDashoffset = String(RING_C * (1 - t))
      }
    }

    paint(0)

    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        const out = gsap.timeline({ onComplete: () => done.current?.() })
        out
          .to(content.current, { autoAlpha: 0, y: -20, duration: 0.4, ease: 'power2.in' })
          .to(
            columns.current,
            {
              yPercent: -100,
              duration: 0.9,
              ease: 'expo.inOut',
              stagger: 0.07,
            },
            '-=0.15',
          )
          // Take the container out of the flow so nothing under it is trapped.
          .set(root.current, { autoAlpha: 0 })
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

    return () => tl.kill()
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
              <g key={i} ref={(el) => (shards.current[i] = el)}>
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
