import { brand } from '../data/site.js'

/**
 * The opening statement: who, what, and one thing to do next. No object, no
 * reveal — the headline is simply there when the page arrives.
 */
export default function Hero() {
  return (
    <section id="top" className="container-x pb-20 pt-36 md:pb-28 md:pt-48">
      <p className="eyebrow mb-8">
        {brand.full} — {brand.location}
      </p>

      <h1 className="max-w-3xl font-display text-4xl leading-[1.02] tracking-tightest md:text-6xl">
        Websites that move. <span className="text-mist/50">Assistants that answer.</span>
      </h1>

      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        A one-person studio building premium animated websites, the AI assistant
        behind them, and the automation that follows every enquiry through.
        Built in Kerala, for clinics, institutions, founders and brands who are
        tired of brochures.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <a
          href="#contact"
          className="inline-flex items-center gap-3 rounded-full bg-brass px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-mist"
        >
          Start a project
          <span aria-hidden>→</span>
        </a>
        <a
          href="#work"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted underline-offset-4 transition-colors hover:text-mist hover:underline"
        >
          See the work
        </a>
      </div>
    </section>
  )
}
