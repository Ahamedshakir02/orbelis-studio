/**
 * Split an element's text into per-line/word/char spans for staggered reveals.
 * GSAP's official SplitText is a paid plugin; for most reveals this is enough.
 *
 * Wraps each word in an outer (overflow-hidden) + inner span so you can animate
 * yPercent from 100 for the classic "lines rising into view" effect.
 */
export function splitWords(el) {
  if (!el || el.dataset.split === 'true') return []
  const text = el.textContent
  el.textContent = ''
  const inners = []
  text.split(/(\s+)/).forEach((token) => {
    if (token.trim() === '') {
      el.appendChild(document.createTextNode(token))
      return
    }
    const outer = document.createElement('span')
    outer.style.display = 'inline-block'
    outer.style.overflow = 'hidden'
    outer.style.verticalAlign = 'top'
    const inner = document.createElement('span')
    inner.style.display = 'inline-block'
    inner.textContent = token
    outer.appendChild(inner)
    el.appendChild(outer)
    inners.push(inner)
  })
  el.dataset.split = 'true'
  return inners
}
