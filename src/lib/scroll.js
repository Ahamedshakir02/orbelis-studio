/**
 * Scrolling, the plain way.
 *
 * The page scrolls natively. There is no smooth-scroll loop and no scroll
 * store: nothing on the site reacts to scroll position except the mobile CTA
 * bar, which listens for itself. What is left here is the two things more than
 * one component needs.
 */

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scroll to a selector or element. The offset for the sticky header lives in
 * CSS (`scroll-margin-top` on sections), so it also applies to plain #hash
 * links and to a page opened directly at an anchor.
 */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' })
}

/**
 * Who is currently holding the page still.
 *
 * A set of owners rather than one flag: the mobile menu and the assistant lock
 * and release on their own schedule, and each releases on mount as a safety
 * net. With a single flag, one overlay releasing undoes the other's lock.
 */
const locks = new Set()

/** Freeze/unfreeze the page — used while a full-screen overlay is open. */
export function lockScroll(locked, owner = 'page') {
  if (locked) locks.add(owner)
  else locks.delete(owner)
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = locks.size ? 'hidden' : ''
  }
}
