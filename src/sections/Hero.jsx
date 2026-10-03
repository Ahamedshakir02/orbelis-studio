import { brand } from '../data/site.js'

/**
 * The opening statement: who, what, and one thing to do next. No object, no
 * reveal — the headline is simply there when the page arrives.
 *
 * Two actions, two weights: brass for the one that matters, a quiet surface
 * button for the other. Brass appears nowhere else above the fold.
 */
export default function Hero() {
  return (
    <section id="top" className="container-x pb-20 pt-32 md:pb-28 md:pt-44">
      <p className="eyebrow mb-6">
        {brand.full} — {brand.location}
      </p>

      <h1 className="max-w-3xl text-[40px] font-semibold leading-[1.08] tracking-[-0.032em] md:text-[56px] lg:text-[64px]">
        Websites that move. <span className="text-muted">Assistants that answer.</span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        A one-person studio building premium animated websites, the AI assistant
        behind them, and the automation that follows every enquiry through.
        Built in Kerala, for clinics, institutions, founders and brands who are
        tired of brochures.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-brass px-5 text-sm font-medium text-bg transition-colors hover:bg-mist"
        >
          Start a project
          <span aria-hidden>→</span>
        </a>
        <a
          href="#work"
          className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-5 text-sm font-medium text-mist transition-colors hover:bg-raised"
        >
          See the work
        </a>
      </div>
    </section>
  )
}
