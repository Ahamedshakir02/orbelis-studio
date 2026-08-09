# Orbelis Studio

Studio site for Orbelis Studio — premium animated websites with a
retrieval-grounded AI assistant behind them.

## Stack

| Layer | Choice |
|---|---|
| Build | Vite + React 18 |
| Motion | GSAP + ScrollTrigger |
| Smooth scroll | Lenis (driven by the GSAP ticker) |
| 3D | React Three Fiber + drei |
| Styling | Tailwind CSS |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Editing the content

Every piece of copy lives in `src/data/site.js` — services, prices, case
studies, process, capabilities, contact details. Nothing is hard-coded in the
components, so changing the studio name or the pricing is a one-file edit.

## Architecture notes

**One ticker.** Lenis is driven by `gsap.ticker` with `lagSmoothing(0)`, and
`ScrollTrigger.update` is called from Lenis's scroll event. Never add a second
`requestAnimationFrame` loop — two clocks fighting is the usual cause of scroll
stutter. See `src/lib/SmoothScroll.jsx`.

**3D reads scroll from a store, not props.** `src/lib/scroll.js` holds scroll
progress and velocity. The hero object reads it inside `useFrame`, so scrolling
never triggers a React re-render.

**Scroll spine.** The page is choreographed as six beats:

1. Hero — headline rises into the turning orb
2. Manifesto — lines brighten on scrub
3. Work — pinned horizontal gallery
4. Services — sticky-stacked cards
5. Process — drawn rule with staggered steps
6. Contact — oversized CTA

**Graceful degradation.** `prefers-reduced-motion` swaps the WebGL canvas for a
static gradient and disables the reveals. The horizontal gallery falls back to a
vertical stack below 768px.

## Before launch

- [ ] Replace placeholder phone number and social URLs in `src/data/site.js`
- [ ] Add real case-study imagery or video captures to the work cards
- [ ] Set up the domain and a `hello@` mailbox
- [ ] Run Lighthouse; keep performance ≥ 90 on mobile
- [ ] Add a favicon and an OG share image
