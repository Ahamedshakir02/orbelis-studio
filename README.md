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

That file feeds three things at once, which is the point: the rendered page,
the assistant's knowledge base, and the JSON-LD structured data. Edit a price
there and the page, the answers and the search listing all move together.

## Configuration

Both are optional. The site works with neither set — that is deliberate.

| Variable | Effect when unset |
|---|---|
| `VITE_FORM_ENDPOINT` | Enquiries open a prefilled mail draft instead of posting JSON |
| `VITE_ASSISTANT_ENDPOINT` | The assistant answers from local retrieval only |

Copy them into a `.env.local`. Never put a model provider key in either — the
browser calls *our* endpoint, and that endpoint calls the provider.

## The assistant

`src/lib/assistant/` is the studio's own product running on its own site.

- `corpus.js` projects `site.js` into flat passages, each carrying a section
  label and an anchor so an answer can cite itself.
- `retrieve.js` is BM25 with domain synonyms and a title-coverage bonus. No
  dependencies, no embeddings — the corpus is forty short paragraphs about one
  business, and shipping a transformer to search it would be theatre. The
  interface does not change if a client corpus ever justifies a vector store.
- `answer.js` handles the handful of intents that decide whether a visitor
  becomes a client (cost, availability, contact, work) in writing, and answers
  everything else from the top-ranked passage.
- `ask.js` is the entry point. Retrieval always runs locally; the endpoint, if
  configured, only rephrases.

**The confidence floor is the feature.** Below it the assistant declines and
points at a human. An assistant that invents a price is worse than no
assistant, and "it would rather say I don't know" is the thing being sold.

When you change the copy, re-run the question set before shipping — ranking is
tuned against real questions, not vibes.

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
vertical stack below 768px. The assistant and the enquiry form both work with
no backend configured, and the custom cursor stands down for touch and
reduced-motion users.

**One scroll owner.** Nothing calls `scrollIntoView()` or `window.scrollTo()`.
In-page anchors are intercepted once in `SmoothScroll.jsx` and routed through
Lenis; overlays freeze the page with `lockScroll()`. A native jump alongside a
smooth-scroll loop is the "it snapped and then slid" bug.

## The share image

`public/og.svg` is the source; `public/og.png` is what the meta tags point at,
because no social platform renders SVG. Re-export after editing:

```bash
npm run og
```

It screenshots the SVG with the Chrome or Edge already on the machine — no
headless-browser dependency, and the design stays reviewable in a diff.

## Before launch

- [ ] Replace placeholder phone number, WhatsApp number and social URLs in `src/data/site.js`
- [ ] Point `brand.url`, `index.html` canonical/OG URLs, `robots.txt` and `sitemap.xml` at the real domain
- [ ] Set `VITE_FORM_ENDPOINT` and send a test enquiry end to end
- [ ] Add real case-study imagery or video captures to the work cards
- [ ] Set up the domain and a `hello@` mailbox
- [ ] Run Lighthouse; keep performance ≥ 90 on mobile
- [ ] Validate the JSON-LD in Google's Rich Results Test
