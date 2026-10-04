# Orbelis Studio

Studio site for Orbelis Studio — fast, clear websites with a
retrieval-grounded AI assistant behind them, and the automation after it.

## Stack

| Layer | Choice |
|---|---|
| Build | Vite + React 18 |
| Styling | Tailwind CSS |
| Motion | CSS only — an entrance, a scroll reveal, a button press |

No animation library, no smooth-scroll loop and no WebGL. The page is a single
quiet column: it scrolls natively and is complete in the markup on first paint.

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

**Two themes, one set of names.** Colours are CSS variables in
`src/index.css`, one set for dark and one for light; `tailwind.config.js`
points every colour name at them, so no component carries a `dark:` variant.
An inline script in each HTML file sets the theme before first paint (stored
choice, else the system setting) and `ThemeToggle` flips it.

**One layout.** Every section goes through `src/components/Section.jsx`: a
full-width band, a label in the left column, content in the right. Bands
alternate between the page colour and its neighbour, and that change of colour
is the divider. Spacing and heading
scale are decided there, so the rhythm of the page is one decision rather than
twelve.

**Reading order.** Hero, Problems, Services, Automation flow, Work, Who it is
for, Process, Standards, Studio, Questions, Contact. A service company's
order: the pain, what is sold and for how much, how it works, then the proof
and the people. "Enquire" on a service opens the form with that service chosen
(`enquiry` on each entry in `services`).

**The accent has three roles.** `action` fills buttons, `link` colours text
and `brass` is the small decorative mark. In dark mode all three are brass; in
light mode brass cannot carry text on white, so buttons are near-black and
links a deep amber.

**Native scrolling.** In-page links are plain `#hash` anchors. CSS provides the
smoothing (`scroll-behavior`) and the offset below the sticky header
(`scroll-margin-top`), so both also apply to a page opened directly at an
anchor. `src/lib/scroll.js` holds the two shared helpers: `scrollToTarget`
for the assistant's citations, and `lockScroll` for overlays.

**Overlays hold their own lock.** The mobile menu and the assistant each lock
the page under their own name. One releasing cannot undo the other's lock.

**No script, still readable.** The FAQ is native `<details>`, the work and
services are plain lists, and nothing is hidden waiting for an animation. The
assistant and the enquiry form both work with no backend configured.

**Motion, three moves.** `rise` eases the hero in line by line; `reveal`
fades a section up the first time it scrolls into view; buttons give slightly
under the finger. All three live in `src/index.css`. `useReveal()` hides a
block only after mount and only if it starts below the fold, so nothing is
hidden in the markup and nothing already on screen blinks.

**The hero panel is real data.** `HeroPanel.jsx` shows one question answered
and the automation steps that follow, read from `site.js` — the price in it is
the published price.

**Sizes.** The label column appears from 1024px; below that every section uses
the full width. Interactive targets are at least 40px in both directions.

**Reduced motion.** `prefers-reduced-motion` turns off smooth scrolling, the
entrance, the reveal and the transitions. Print shows everything.

## Images

`public/og.svg` and `public/favicon.svg` are the sources. The PNGs the browser
and social platforms actually consume are exported from them:

```bash
npm run og      # public/og.png — the share card
npm run icons   # favicon PNGs, apple-touch-icon, manifest icons
npm run brochure  # public/orbelis-profile.pdf — the company profile
```

Both screenshot the SVG with the Chrome or Edge already on the machine, so
there is no headless-browser dependency and the designs stay text files
reviewable in a diff. Re-run after editing either SVG.

The company profile is different: `scripts/brochure.mjs` lays it out from
`src/data/site.js`, so it carries the same services, prices and work as the
page. Re-run it after any copy change — a PDF with last month's prices is the
kind of drift the single data file exists to prevent. The footer links to it,
and the same file can be uploaded to a flipbook host.

## Before launch

Blocking — the site should not go live with these:

- [ ] Point `brand.url`, the canonical and OG URLs in all four HTML files, `robots.txt` and `sitemap.xml` at the real domain
- [ ] Have a lawyer read `src/data/legal.js`, especially if you take EU or UK clients
- [ ] Set `VITE_FORM_ENDPOINT` and send a test enquiry end to end

Add when available — each is `null` in `src/data/site.js` and stays hidden
from the footer, the mobile CTA and the structured data until it is set:

- [ ] Street address in `brand.address.street`
- [ ] Phone and WhatsApp number in `brand.phone` / `brand.whatsapp`
- [ ] Social profile URLs in `brand.socials` — the studio's own profiles, not the bare domain
- [ ] Public URL for a work entry, as `href` — the card then links to it

Then:

- [ ] Add real case-study imagery to the work cards — `image` + `imageAlt` on each entry in `work`
- [ ] Set up the domain and a `hello@` mailbox
- [ ] Run Lighthouse; keep performance ≥ 90 on mobile
- [ ] Validate the JSON-LD in Google's Rich Results Test
- [ ] Re-run the assistant question set after any copy change
