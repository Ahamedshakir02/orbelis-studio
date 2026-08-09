import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * A custom cursor is the cheapest "this site is crafted" signal.
 * Two parts: an instant dot and a ring that lags behind via quickTo.
 * It grows when hovering anything marked data-cursor="grow".
 *
 * Hidden on touch devices (no pointer to track).
 */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    const move = (e) => {
      xDot(e.clientX); yDot(e.clientY)
      xRing(e.clientX); yRing(e.clientY)
    }
    window.addEventListener('pointermove', move)

    const grow = () => gsap.to(ring.current, { scale: 2.2, opacity: 0.5, duration: 0.3 })
    const shrink = () => gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 })
    const targets = document.querySelectorAll('[data-cursor="grow"]')
    targets.forEach((el) => {
      el.addEventListener('pointerenter', grow)
      el.addEventListener('pointerleave', shrink)
    })

    return () => {
      window.removeEventListener('pointermove', move)
      targets.forEach((el) => {
        el.removeEventListener('pointerenter', grow)
        el.removeEventListener('pointerleave', shrink)
      })
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sand/70"
      />
      <div
        ref={dot}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand"
      />
    </div>
  )
}
