/**
 * Lift the loader.
 *
 * The loader itself is not a React component. It is markup and CSS inlined in
 * index.html, so it is on screen with the very first bytes — before this
 * bundle, the stylesheet or the fonts have arrived. That is the whole point of
 * a loader; one that needs the app to load before it can appear covers
 * nothing. This file is only the other half: taking it away.
 *
 * It lifts when two things are true:
 *   · the fonts are in, because they decide the hero's line breaks and a
 *     headline that reflows as the curtain lifts is the thing a loader exists
 *     to hide;
 *   · the wordmark has finished appearing (about a second from navigation),
 *     so a fast connection does not flash half a logo and vanish.
 * Neither wait is open-ended: fonts get 2.5s, then the page shows regardless.
 *
 * While it is up, <html> carries `loading`: the page cannot scroll, and the
 * hero's entrance is held (see `.rise` in index.css) so it plays as the
 * loader leaves rather than unseen behind it.
 */
const DRAW_MS = 1100
const FONT_PATIENCE_MS = 2500

export function liftLoader() {
  const el = document.getElementById('loader')
  const html = document.documentElement
  if (!el) {
    html.classList.remove('loading')
    return
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fonts = document.fonts?.ready ?? Promise.resolve()
  const patience = new Promise((resolve) => setTimeout(resolve, FONT_PATIENCE_MS))

  Promise.race([fonts, patience]).then(() => {
    // performance.now() counts from navigation, which is when the reveal began.
    const wait = reduce ? 0 : Math.max(0, DRAW_MS - performance.now())
    setTimeout(() => {
      html.classList.remove('loading')
      el.classList.add('done')
      // Out of the tree once faded, so it cannot trap a click or a screen reader.
      setTimeout(() => el.remove(), 600)
    }, wait)
  })
}
