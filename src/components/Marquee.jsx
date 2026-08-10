import { useMemo } from 'react'

/**
 * An infinite ticker. The track is duplicated once and translated by exactly
 * -50%, so the loop point is invisible. CSS animation rather than JS keeps it
 * off the main thread and out of the ScrollTrigger budget.
 */
export default function Marquee({ items, speed = 34 }) {
  const doubled = useMemo(() => [...items, ...items], [items])

  return (
    <div
      className="relative flex overflow-hidden border-y border-line py-5"
      role="presentation"
      aria-hidden
    >
      <div
        className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 motion-safe:animate-[marquee_linear_infinite]"
        style={{ animationDuration: speed + 's' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl tracking-tight text-mist/70 md:text-3xl">
              {item}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass" />
          </span>
        ))}
      </div>
    </div>
  )
}
