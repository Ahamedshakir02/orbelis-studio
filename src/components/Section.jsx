/**
 * The one layout every section shares: a full-width band, a small label in
 * the left column, the content in the right. Bands alternate between the page
 * colour and its neighbour (`.tile` in index.css); that change is the divider.
 *
 * Kept as a component so the rhythm of the page is decided in one place. A
 * minimal page lives or dies on consistent spacing, and nine sections each
 * choosing their own padding is how that consistency goes.
 *
 * Sections sit 96px apart. Titles are set at 40px, weight 600, with tight
 * negative tracking — one voice with the body text, only heavier.
 */
export default function Section({ id, label, title, intro, children }) {
  return (
    <section id={id} className="tile py-16 md:py-24">
      <div className="container-x grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <p className="eyebrow md:sticky md:top-20">{label}</p>
        </div>

        <div className="md:col-span-9">
          {title && (
            <h2 className="max-w-2xl text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[40px]">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
          )}
          <div className={title || intro ? 'mt-10 md:mt-12' : ''}>{children}</div>
        </div>
      </div>
    </section>
  )
}
