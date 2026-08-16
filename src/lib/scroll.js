import { create } from 'zustand'

/**
 * Global scroll state.
 *
 * Why a store and not props: the R3F canvas lives in its own renderer tree.
 * Passing scroll progress down through React props forces re-renders every
 * frame and fights the render loop. Instead Lenis writes here once per frame,
 * and useFrame inside the canvas reads `getState().progress` with zero React
 * re-renders. This is the pattern that keeps 3D + scroll at 60fps.
 */
export const useScroll = create((set) => ({
  // 0..1 progress through the whole page
  progress: 0,
  // raw pixel scroll
  scrollY: 0,
  // current velocity (useful for motion-reactive effects)
  velocity: 0,
  set,
}))

// Non-reactive setter for the per-frame hot path. Calling the store's
// set() every frame is fine, but reading via getState avoids subscriptions.
export const setScroll = (payload) => useScroll.setState(payload)
export const getScroll = () => useScroll.getState()

/**
 * A handle on the live Lenis instance.
 *
 * Anything that needs to move the page programmatically (the assistant jumping
 * to a cited section, a modal locking the scroll) MUST go through Lenis. Calling
 * scrollIntoView() or window.scrollTo() instead fights the smooth-scroll loop
 * and produces the classic snap-then-drift.
 */
let lenisInstance = null
export const setLenis = (l) => {
  lenisInstance = l
}
export const getLenis = () => lenisInstance

/** Smooth-scroll to a selector or element, falling back to native if Lenis is gone. */
export function scrollToTarget(target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -80, duration: 1.2, ...opts })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Freeze/unfreeze the page — used while a full-screen overlay is open. */
export function lockScroll(locked) {
  if (!lenisInstance) return
  if (locked) lenisInstance.stop()
  else lenisInstance.start()
}
