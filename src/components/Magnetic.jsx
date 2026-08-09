import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Wraps a child so it leans toward the cursor. High craft-per-line, and one of
 * the details that separates a considered build from a template.
 * Disabled on touch and for reduced-motion users.
 */
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3' })
    }
    const leave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return (
    <div ref={ref} className={'inline-block will-change-transform ' + className}>
      {children}
    </div>
  )
}
