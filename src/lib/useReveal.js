import { useEffect, useRef } from 'react'

/**
 * Fade a block up the first time it scrolls into view.
 *
 * The hidden state is applied here, after mount, and only to blocks that start
 * below the fold. That ordering is the point: nothing is ever hidden in the
 * markup, so the page is complete with scripts off, and whatever is already on
 * screen when the page opens (or is jumped to by an anchor) never blinks out
 * and back in.
 *
 * Skipped entirely for reduced-motion users. The motion itself is two CSS
 * classes in index.css — `reveal` and `in`.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    el.classList.add('reveal')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('in')
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
