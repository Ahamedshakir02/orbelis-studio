import { Cursor } from 'orbelis-studio'

// Mounted once beside the page content. The ring trails the pointer on
// desktop and grows over links, buttons and [data-cursor="grow"] targets.
export const OverLinks = () => (
  <div className="p-10">
    <Cursor />
    <p className="eyebrow mb-6">Move the pointer over these</p>
    <div className="flex flex-wrap items-center gap-6">
      <a
        href="#contact"
        className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg"
      >
        Start a project
      </a>
      <a href="#work" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-mist">
        See the work
      </a>
      <div data-cursor="grow" className="rounded-2xl border border-line bg-surface px-6 py-4 text-sm text-muted">
        A card marked data-cursor="grow"
      </div>
    </div>
  </div>
)
