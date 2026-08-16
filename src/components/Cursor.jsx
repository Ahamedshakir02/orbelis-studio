import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * A custom cursor is the cheapest "this site is crafted" signal.
 * Two parts: an instant dot and a ring that lags behind via quickTo.
 * It grows when hovering anything marked data-cursor="grow".
 *
 * Hidden on touch devices (no pointer to track) and for reduced-motion users,
 * both of which get the real system cursor back via index.css.
 *
 * HOVER IS DELEGATED, NOT BOUND. An earlier version bound listeners to the
 * result of a single querySelectorAll on mount, so anything rendered later —
 * the assistant panel, the enquiry form — silently lost the hover state.
 * One listener on the document, matched with closest(), covers everything
 * including elements that do not exist yet.
 */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    let hovering = false

    const move = (e) => {
      xDot(e.clientX); yDot(e.clientY)
      xRing(e.clientX); yRing(e.clientY)

      // Cheaper than pointerenter on every target, and it survives re-renders.
      const isTarget = !!e.target.closest?.('[data-cursor="grow"], a, button')
      if (isTarget === hovering) return
      hovering = isTarget
      gsap.to(ring.current, {
        scale: isTarget ? 2.2 : 1,
        opacity: isTarget ? 0.5 : 1,
        duration: 0.3,
        ease: 'power3',
      })
    }

    // The cursor should vanish when the pointer leaves the window entirely,
    // otherwise it sits frozen at the last known position.
    const setVisible = (v) =>
      gsap.to([dot.current, ring.current], { autoAlpha: v ? 1 : 0, duration: 0.2 })

    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    document.documentElement.addEventListener('pointerenter', enter)

    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.removeEventListener('pointerenter', enter)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      <div
        ref={ring}
        className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mist/70"
      />
      <div
        ref={dot}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass"
      />
    </div>
  )
}
