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
