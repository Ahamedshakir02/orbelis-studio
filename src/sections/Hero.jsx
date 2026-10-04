import { brand, assurances } from '../data/site.js'
import HeroPanel from '../components/HeroPanel.jsx'

/**
 * The opening band: one promise, one line of how, two actions, and the
 * product at work beneath them. Text-led on purpose: the statement gets the
 * first screen to itself.
 *
 * The headline is the outcome, not the service list, and automation comes
 * first: a visitor does not want "a website and an assistant", they want the
 * retyping gone and the enquiry that came in at night answered.
 *
 * The lines arrive in reading order, a beat apart (`rise` in index.css, timed
 * by `--d`). It is an entrance, not a reveal: the text is in the markup from
 * the start and the animation only eases it in.
 */
const delay = (ms) => ({ '--d': `${ms}ms` })

export default function Hero() {
  return (
    <section id="top" className="tile overflow-hidden">
      <div className="container-x pb-20 pt-32 text-center md:pb-28 md:pt-44">
        <p className="rise eyebrow" style={delay(0)}>
          {brand.full} · Automation, AI, apps, websites, marketing
        </p>

        <h1
          className="rise mx-auto mt-4 max-w-4xl text-[clamp(30px,8.4vw,40px)] font-semibold leading-[1.04] tracking-[-0.035em] [text-wrap:balance] md:text-[72px] lg:text-[80px]"
          style={delay(80)}
        >
          Automate the busywork. <span className="block text-muted">Answer every enquiry.</span>
        </h1>

        <p
          className="rise mx-auto mt-6 max-w-2xl text-lg leading-snug text-muted [text-wrap:balance] md:text-2xl md:leading-[1.3]"
          style={delay(180)}
        >
          I automate the repetitive work between your tools, add an assistant that replies from your own
          information, build the apps and websites they run on, and run the marketing that brings people in.
        </p>

        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3" style={delay(280)}>
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full bg-action px-6 text-[17px] text-onaction transition hover:bg-actionhover active:scale-[0.95]"
          >
            Start a project
          </a>
          <a
            href="#services"
            className="inline-flex h-11 items-center rounded-full border border-link px-6 text-[17px] text-link transition hover:bg-link/10 active:scale-[0.95]"
          >
            See the services
          </a>
        </div>

        {/* What a buyer wants settled before reading further. */}
        <ul
          className="rise mt-9 flex flex-col items-center gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7"
          style={delay(380)}
        >
          {assurances.map((a) => (
            <li key={a} className="flex items-center gap-2.5">
              <span className="h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden />
              {a}
            </li>
          ))}
        </ul>

        <HeroPanel />
      </div>
    </section>
  )
}
