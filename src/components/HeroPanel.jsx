import { assistant, services, flow } from '../data/site.js'

/**
 * The product, shown rather than described: one question answered from the
 * site's own content, then the three things automation does with it.
 *
 * Everything in it is read from site.js — the price is the real price, the
 * steps are the real flow — so it cannot promise something the page below
 * does not say. It plays once as the page opens, each line arriving in the
 * order it would happen, and then holds still.
 *
 * To a screen reader it is one described image: the same conversation is
 * available for real through the assistant button, and the steps are listed
 * properly in the automation section.
 */
const delay = (ms) => ({ '--d': `${ms}ms` })

export default function HeroPanel() {
  const landing = services[0]
  const after = flow.slice(2)

  return (
    <div
      role="img"
      aria-label={`Example: a visitor asks what a landing site costs, the assistant answers ${landing.price} from this site's content, and the enquiry is logged, followed up and reported automatically.`}
      className="rise rounded-2xl border border-line bg-surface p-5 md:p-6"
      style={delay(450)}
    >
      <div aria-hidden>
        <div className="flex items-center gap-2.5 border-b border-line pb-4">
          <span className="h-2 w-2 rounded-full bg-brass" />
          <span className="text-sm font-medium">{assistant.name}</span>
          <span className="text-xs text-muted">answers from this site</span>
        </div>

        <div className="space-y-3 py-5">
          <p className="rise ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-raised px-4 py-2.5 text-sm" style={delay(900)}>
            What does a landing site cost?
          </p>
          <div className="rise max-w-[90%]" style={delay(1600)}>
            <p className="w-fit rounded-2xl rounded-bl-md border border-line px-4 py-2.5 text-sm leading-relaxed">
              {landing.price}, delivered in two weeks. The price is published, not quoted on request.
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <span className="h-1 w-1 rounded-full bg-brass" />
              Services &amp; pricing
            </p>
          </div>
        </div>

        <ol className="space-y-2.5 border-t border-line pt-4">
          {after.map((step, i) => (
            <li key={step.step} className="rise flex items-center gap-3 text-sm" style={delay(2400 + i * 350)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-brass">
                <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{step.title}</span>
              <span className="ml-auto font-mono text-xs text-muted">{step.step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
