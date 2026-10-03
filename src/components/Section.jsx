/**
 * The one layout every section shares: a hairline, a small label in the left
 * column, the content in the right.
 *
 * Kept as a component so the rhythm of the page is decided in one place. A
 * minimal page lives or dies on consistent spacing, and nine sections each
 * choosing their own padding is how that consistency goes.
 */
export default function Section({ id, label, title, intro, children }) {
  return (
    <section id={id} className="border-t border-line py-16 md:py-24">
      <div className="container-x grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-24">{label}</p>
        </div>

        <div className="md:col-span-9">
          {title && (
            <h2 className="max-w-2xl font-display text-3xl leading-[1.08] tracking-tight md:text-4xl">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{intro}</p>
          )}
          <div className={title || intro ? 'mt-10 md:mt-12' : ''}>{children}</div>
        </div>
      </div>
    </section>
  )
}
