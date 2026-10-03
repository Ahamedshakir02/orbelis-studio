# Building with Orbelis Studio

Orbelis is a dark, cinematic brand: near-black pages, off-white type, one brass accent. It is **dark-only** — there is no light theme.

## Setup

No provider or wrapper component is needed. Two things are required on every page:

1. Link `styles.css` (it imports the fonts and `_ds_bundle.css`).
2. Put all content on the page colour. The type is light, so on a white background it is invisible:

```jsx
<main className="bg-bg text-mist font-body min-h-screen">…</main>
```

## Styling idiom: Tailwind utility classes from a fixed stylesheet

Style with `className`. The stylesheet is a **compiled** Tailwind build, not the Tailwind runtime: only classes that exist in `_ds_bundle.css` do anything. The colour, font and helper classes below are guaranteed. For anything else, check `_ds_bundle.css` first and fall back to an inline `style` — do not assume an arbitrary Tailwind class exists.

| Family | Classes |
|---|---|
| Colours (each works as `bg-`, `text-`, `border-`) | `bg` #08090c page · `surface` #0f1116 cards · `raised` #161920 · `brass` #e8a33d accent · `ember` #b4762a · `mist` #e8eaf0 text · `muted` #878e9e secondary text · `line` #22262f borders |
| Fonts | `font-display` (Clash Display — headings, big numbers) · `font-body` (Inter) · `font-mono` (JetBrains Mono — labels) |
| Tracking | `tracking-tightest` on display headings; `tracking-tight` on smaller ones |
| Helpers | `container-x` (centred page gutter, max 1440px) · `eyebrow` (small uppercase mono label) · `rule` (1px divider) |

Conventions the site follows:

- Brass is for one thing per view: the primary action, a number, an index. Never body text.
- Headings: `font-display tracking-tightest`, large (`text-5xl md:text-7xl`), `leading-[0.95]`.
- Labels and buttons: `font-mono text-[11px] uppercase tracking-[0.18em]`.
- Cards: `rounded-2xl border border-line bg-surface/85 p-8`.
- Primary button: `rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg`.

## Components

Four motion primitives on `window.OrbelisStudio`; everything else is plain markup with the classes above.

- `Magnetic` — wraps one button or link so it leans toward the pointer. `strength` 0.3 for buttons, 0.15 for text links.
- `Marquee` — infinite ticker; `items` is an array of strings. Full width; do not put it inside a narrow column.
- `Counter` — counts up to `value` once when scrolled into view. Shows 0 until then; size and colour come from `className`.
- `Cursor` — decorative ring that trails the pointer. Mount once at the page root; takes no props; desktop only.

Read `components/general/<Name>/<Name>.prompt.md` for props and examples, and `_ds_bundle.css` for the full class list.

## Example

```jsx
const { Magnetic, Counter } = window.OrbelisStudio

<main className="bg-bg text-mist font-body min-h-screen">
  <section className="container-x py-24">
    <p className="eyebrow mb-5">What you can hold us to</p>
    <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">Small scope. Fast ship.</h2>
    <div className="mt-12 border-t border-line pt-6">
      <Counter value={90} suffix="+" className="block font-display text-6xl tracking-tightest text-brass" />
      <p className="mt-4 text-sm leading-relaxed text-muted">Lighthouse performance target on mobile</p>
    </div>
    <div className="mt-12">
      <Magnetic>
        <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bg">
          Start a project
        </a>
      </Magnetic>
    </div>
  </section>
</main>
```
