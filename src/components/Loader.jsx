import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { brand } from '../data/site.js'

/**
 * A short, deliberate preloader buys two things: time to warm the WebGL
 * context, and a moment of brand before the reveal. Kept under ~2s —
 * long loaders read as slow, not premium.
 */
export default function Loader({ onDone }) {
  const root = useRef(null)
  const bar = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(root.current, { yPercent: -100 })
      onDone?.()
      return
    }

    const obj = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
          onComplete: () => onDone?.(),
        })
      },
    })

    tl.to(obj, {
      v: 100,
      duration: 1.3,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.v))
        if (bar.current) gsap.set(bar.current, { scaleX: obj.v / 100 })
      },
    })

    return () => tl.kill()
  }, [onDone])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg px-6 py-6 md:px-10"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-display text-xl tracking-tight">
          {brand.name}
          <span className="text-brass">.</span>
        </span>
        <span className="eyebrow">Loading</span>
      </div>

      <div>
        <div className="mb-5 h-px w-full bg-line">
          <div ref={bar} className="h-px w-full origin-left scale-x-0 bg-brass" />
        </div>
        <div className="flex items-end justify-between">
          <p className="max-w-xs text-sm text-muted">{brand.tagline}</p>
          <span className="font-display text-6xl tabular-nums leading-none md:text-8xl">
            {count}
          </span>
        </div>
      </div>
    </div>
  )
}
