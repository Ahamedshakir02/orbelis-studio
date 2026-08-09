import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setScroll } from './scroll.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * The single source of truth for scrolling.
 *
 * THE THREE LINES PEOPLE GET WRONG:
 *   1. lenis.on('scroll', ScrollTrigger.update)  -> ScrollTrigger reads Lenis, not native scroll
 *   2. gsap.ticker.add((t) => lenis.raf(t * 1000)) -> Lenis is driven by GSAP's clock, one loop
 *   3. gsap.ticker.lagSmoothing(0) -> stop GSAP from "catching up" after a frame drop, which
 *      causes the scroll-jump / desync everyone complains about
 *
 * If you run your own requestAnimationFrame loop AND gsap.ticker, you get two
 * clocks fighting and the scroll stutters. Don't. One ticker, this one.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Respect users who asked the OS to reduce motion.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      duration: reduce ? 0 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: !reduce,
      syncTouch: false, // native momentum on touch feels better than forced smoothing
    })

    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      const limit = lenis.limit || 1
      setScroll({
        progress: e.scroll / limit,
        scrollY: e.scroll,
        velocity: e.velocity,
      })
    })

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Let layout settle (fonts, images) before ScrollTrigger measures.
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return children
}
