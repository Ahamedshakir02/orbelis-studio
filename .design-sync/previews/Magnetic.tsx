import { Magnetic } from 'orbelis-studio'

// Orbelis is dark-only: every example sits on the page colour, because the
// type is light and disappears on a white card.

// The hero's primary call to action, as the site ships it.
export const PrimaryCta = () => (
  <div className="bg-bg p-10 text-mist">
    <Magnetic>
      <a
        href="#contact"
        className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-mist"
      >
        Start a project
        <span aria-hidden>→</span>
      </a>
    </Magnetic>
  </div>
)

// A gentler pull for text links — the footer email uses 0.15.
export const EmailLink = () => (
  <div className="bg-bg p-10 text-mist">
    <Magnetic strength={0.15}>
      <a
        href="mailto:hello@orbelisstudio.com"
        className="font-display text-2xl tracking-tight text-mist transition-colors hover:text-brass md:text-3xl"
      >
        hello@orbelisstudio.com
      </a>
    </Magnetic>
  </div>
)

// Primary and secondary actions side by side; only the primary is magnetic.
export const ActionRow = () => (
  <div className="bg-bg p-10 text-mist">
    <div className="flex items-center gap-4">
      <Magnetic>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-mist"
        >
          Start a project
          <span aria-hidden>→</span>
        </a>
      </Magnetic>
      <a
        href="#work"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-mist"
      >
        See the work
      </a>
    </div>
  </div>
)
