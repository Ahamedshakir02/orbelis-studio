import { brand } from '../data/site.js'
import HeroPanel from '../components/HeroPanel.jsx'

/**
 * The opening statement: who, what, one thing to do next — and beside it, the
 * product doing its job once.
 *
 * Two actions, two weights: brass for the one that matters, a quiet surface
 * button for the other.
 *
 * The lines arrive in reading order, a beat apart (`rise` in index.css, timed
 * by `--d`). It is an entrance, not a reveal: the text is in the markup from
 * the start and the animation only eases it in.
 */
const delay = (ms) => ({ '--d': `${ms}ms` })

export default function Hero() {
  return (
    <section id="top" className="tile">
      <div className="container-x grid items-center gap-12 pb-20 pt-28 md:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-44">
        <div className="lg:col-span-7">
          <p className="rise eyebrow mb-6" style={delay(0)}>
            {brand.full} — {brand.location}
          </p>

          <h1
            className="rise max-w-3xl text-[38px] font-semibold leading-[1.08] tracking-[-0.032em] md:text-[56px] lg:text-[52px]"
            style={delay(80)}
          >
            {/* One sentence per line wherever a line can hold one. */}
            Websites that work. <span className="text-muted md:block">Assistants that answer.</span>
          </h1>

          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg" style={delay(180)}>
            A one-person studio building fast, clear websites, the AI assistant
            behind them, and the automation that follows every enquiry through.
            Built in Kerala, for clinics, institutions, founders and brands who
            are tired of brochures.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay(280)}>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brass px-5 text-sm font-medium text-bg transition hover:bg-mist active:scale-[0.97]"
            >
              Start a project
              <span aria-hidden>→</span>
            </a>
            <a
              href="#work"
              className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-5 text-sm font-medium text-mist transition hover:bg-raised active:scale-[0.97]"
            >
              See the work
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroPanel />
        </div>
      </div>
    </section>
  )
}
