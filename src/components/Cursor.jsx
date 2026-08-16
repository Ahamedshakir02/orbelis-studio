import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * A trailing accent ring that follows the pointer.
 *
 * THE SYSTEM CURSOR STAYS VISIBLE. The previous version hid it with
 * `cursor: none` and drew its own dot in place of it — which meant a single
 * styling mistake (and there was one: the colour token did not exist) left
 * visitors with no cursor at all, and left anyone relying on the OS cursor
 * theme or a high-contrast pointer worse off for no gain.
 *
 * So this is decoration layered *behind* the real pointer rather than a
 * replacement for it. If it fails to render, nothing is lost. It is skipped
 * entirely on touch devices, where there is no pointer to trail, and for
 * reduced-motion users, for whom a lagging element chasing the cursor is
 * exactly the kind of movement they asked not to see.
 */
export default function Cursor() {
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ring.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })

    let hovering = false
    let seen = false

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)

      // Do not paint the ring at 0,0 before the pointer has ever moved.
      if (!seen) {
        seen = true
        gsap.to(el, { autoAlpha: 1, duration: 0.3 })
      }

      const target = !!e.target.closest?.('a, button, input, select, textarea, [data-cursor="grow"]')
      if (target === hovering) return
      hovering = target
      gsap.to(el, {
        scale: target ? 1.9 : 1,
        borderColor: target ? 'rgba(232,163,61,0.9)' : 'rgba(232,163,61,0.35)',
        duration: 0.3,
        ease: 'power3',
      })
    }

    const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 })
    const show = () => seen && gsap.to(el, { autoAlpha: 1, duration: 0.2 })

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    document.documentElement.addEventListener('pointerenter', show)

    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      document.documentElement.removeEventListener('pointerenter', show)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      <div
        ref={ring}
        className="invisible absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: 'rgba(232,163,61,0.35)' }}
      />
    </div>
  )
}
