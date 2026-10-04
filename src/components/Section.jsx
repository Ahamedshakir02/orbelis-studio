import { useReveal } from '../lib/useReveal.js'

/**
 * One band of the page: a full-width tile with a single statement, centred,
 * and whatever supports it underneath.
 *
 * This is the brand's unit of composition. Each band says one thing in a
 * short headline, adds at most one line beneath it, and then gets out of the
 * way of its content. Bands alternate background (`.tile` in index.css) and
 * that change of colour is the only divider.
 *
 * Every band follows the visitor's theme. Nothing is pinned dark: a black
 * band in the light theme reads as something that failed to switch.
 */
export default function Section({ id, label, title, intro, children, width = 'wide' }) {
  const body = useReveal()

  return (
    <section id={id} className="tile py-20 md:py-32">
      <div className="container-x">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{label}</p>
          {title && (
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] md:text-[48px] lg:text-[56px]">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-snug text-muted [text-wrap:balance] md:text-[21px] md:leading-[1.4]">
              {intro}
            </p>
          )}
        </header>

        <div ref={body} className={'mx-auto mt-12 md:mt-16 ' + (width === 'narrow' ? 'max-w-3xl' : 'max-w-[980px]')}>
          {children}
        </div>
      </div>
    </section>
  )
}
