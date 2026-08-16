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
| `VITE_PLAUSIBLE_DOMAIN` | No analytics |
| `VITE_GA_ID` | No Google Analytics, and no consent banner |

Copy them into a `.env.local`. Never put a model provider key in any of them —
anything prefixed `VITE_` is compiled into the client bundle and readable by
every visitor. The browser calls *our* endpoint; that endpoint calls the
provider.

## Pages

Four documents, not client-side routes, so each carries its own `<title>` and
description in the served markup:

| File | URL | Notes |
|---|---|---|
| `index.html` | `/` | The scroll experience |
| `privacy.html` | `/privacy` | Static, no canvas |
| `terms.html` | `/terms` | Static, no canvas |
| `404.html` | — | `noindex`, served with a real 404 status |

`public/_redirects` maps the clean URLs and the 404 status on Netlify and
Cloudflare Pages. On another host, reproduce those three rules — a missing
page returned as `200` is a soft 404 and gets the wrong URLs indexed.

Legal copy lives in `src/data/legal.js`. It describes **this** site
specifically. Add a tracker, a CRM webhook or a hosted assistant endpoint and
that file has to change with it.

## Analytics and consent

Cookieless analytics (Plausible) loads immediately and needs no banner.
Google Analytics sets cookies, so it is never injected until a visitor opts
in — and the consent banner exists **only** when `VITE_GA_ID` is set.

With the default setup no banner appears, which is correct rather than
missing. A cookie banner on a site that sets no cookies costs conversions and
teaches people to click through the ones that matter.

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

## Images

`public/og.svg` and `public/favicon.svg` are the sources. The PNGs the browser
and social platforms actually consume are exported from them:

```bash
npm run og      # public/og.png — the share card
npm run icons   # favicon PNGs, apple-touch-icon, manifest icons
```

Both screenshot the SVG with the Chrome or Edge already on the machine, so
there is no headless-browser dependency and the designs stay text files
reviewable in a diff. Re-run after editing either SVG.

## Before launch

Blocking — the site should not go live with these:

- [ ] **Real street address** in `brand.address.street` (`src/data/site.js`) — currently a marked placeholder, shown in the footer and emitted as structured data
- [ ] **Real phone and WhatsApp number** in `src/data/site.js` — both are `00000` placeholders
- [ ] **Real social URLs** — currently bare `github.com` / `linkedin.com` / `instagram.com`
- [ ] Point `brand.url`, the canonical and OG URLs in all four HTML files, `robots.txt` and `sitemap.xml` at the real domain
- [ ] Have a lawyer read `src/data/legal.js`, especially if you take EU or UK clients
- [ ] Set `VITE_FORM_ENDPOINT` and send a test enquiry end to end

Then:

- [ ] Add real case-study imagery to the work cards — `image` + `imageAlt` on each entry in `work`
- [ ] Set up the domain and a `hello@` mailbox
- [ ] Run Lighthouse; keep performance ≥ 90 on mobile
- [ ] Validate the JSON-LD in Google's Rich Results Test
- [ ] Re-run the assistant question set after any copy change
