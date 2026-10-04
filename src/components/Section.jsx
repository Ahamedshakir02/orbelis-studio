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
 * `dark` makes a band black in both themes — used sparingly, for the moments
 * that should feel like the lights going down. It works by re-scoping the
 * colour variables, so everything inside simply reads as the dark theme.
 */
export default function Section({ id, label, title, intro, children, dark = false, width = 'wide' }) {
  const body = useReveal()

  return (
    <section
      id={id}
      data-theme={dark ? 'dark' : undefined}
      className={'tile py-20 md:py-32' + (dark ? ' tile-dark text-mist' : '')}
    >
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
