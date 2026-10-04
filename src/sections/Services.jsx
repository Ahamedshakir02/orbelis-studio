import Section from '../components/Section.jsx'
import { services } from '../data/site.js'

/**
 * Services as a shelf: one card each, the price at the bottom where a price
 * tag goes. Prices are on the page on purpose — it filters out the people who
 * were never going to pay, and saves everyone else a call.
 *
 * Each card can be enquired about directly — the form opens with that service
 * chosen — and the shelf ends by catching the visitor who cannot tell which
 * card is theirs, which is most of them.
 */
const enquire = (type) => () => window.dispatchEvent(new CustomEvent('orbelis:enquire', { detail: type }))

export default function Services() {
  return (
    <Section
      id="services"
      label="Services & pricing"
      title="Five things, done properly."
      intro="Two you build once. Three that keep running. Every price published."
    >
      {/* Two wide cards for what is built, three narrower for what runs. */}
      <div className="stagger grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {services.map((s, i) => (
          <article
            key={s.index}
            className={
              'flex flex-col lift rounded-[18px] border border-line bg-surface p-7 ' +
              (i < 2 ? 'lg:col-span-3' : 'lg:col-span-2')
            }
          >
            <p className="text-xs text-muted">
              <span className="font-mono">{s.index}</span> · {s.group}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>

            <ul className="mt-5 space-y-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-mist">
                  <span className="mt-[9px] inline-block h-px w-3 shrink-0 bg-brass" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <p className="text-xl font-semibold tracking-tight">{s.price}</p>
              <a
                href="#contact"
                onClick={enquire(s.enquiry)}
                className="inline-flex h-10 shrink-0 items-center gap-1 text-[15px] text-link underline-offset-4 hover:underline"
              >
                Enquire<span className="sr-only"> about {s.title}</span>
                <span aria-hidden>›</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 text-center">
        <p className="text-2xl font-semibold tracking-tight">Not sure which one you need?</p>
        <p className="mx-auto mt-2 max-w-md text-[17px] leading-snug text-muted">
          Most people are not. Tell me what is slowing the business down and I will tell you which
          of these fixes it, or that none of them does.
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-action px-6 text-[17px] text-onaction transition hover:bg-actionhover active:scale-[0.95]"
        >
          Describe the problem
        </a>
      </div>
    </Section>
  )
}
