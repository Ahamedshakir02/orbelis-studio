import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGsap } from '../lib/useGsap.js'

/**
 * Counts up once when scrolled into view. Reduced-motion users get the final
 * value immediately rather than a number that never resolves.
 */
export default function Counter({ value, suffix = '', className = '' }) {
  const [display, setDisplay] = useState(0)
  const done = useRef(false)

  const ref = useGsap(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      return
    }

    const obj = { v: 0 }
    gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => setDisplay(Math.round(obj.v)),
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        once: true,
        onEnter: () => (done.current = true),
      },
    })
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
