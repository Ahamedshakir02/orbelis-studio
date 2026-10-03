import { Counter } from 'orbelis-studio'

const stats = [
  { value: 60, suffix: 'fps', label: 'Motion budget, enforced on mid-range phones' },
  { value: 2, suffix: ' weeks', label: 'Typical delivery, scope agreed up front' },
  { value: 1, suffix: '', label: 'Person on your project, start to finish' },
  { value: 90, suffix: '+', label: 'Lighthouse performance target on mobile' },
]

// The stats row as the site lays it out: display face, brass, rule above.
export const StatGrid = () => (
  <div className="grid gap-10 md:grid-cols-4 md:gap-8">
    {stats.map((s) => (
      <div key={s.label} className="border-t border-line pt-6">
        <Counter
          value={s.value}
          suffix={s.suffix}
          className="block font-display text-5xl tracking-tightest text-brass md:text-6xl"
        />
        <p className="mt-4 text-sm leading-relaxed text-muted">{s.label}</p>
      </div>
    ))}
  </div>
)

// One figure on its own.
export const SingleStat = () => (
  <div className="max-w-xs border-t border-line pt-6">
    <Counter value={90} suffix="+" className="block font-display text-6xl tracking-tightest text-brass" />
    <p className="mt-4 text-sm leading-relaxed text-muted">Lighthouse performance target on mobile</p>
  </div>
)

// Inline, in the mono label face.
export const InlineLabel = () => (
  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
    Delivered in <Counter value={14} suffix=" days" className="text-mist" />
  </p>
)
