# design-sync notes — Orbelis Studio

Project: "Orbelis Studio Design System" (`projectId` in `config.json`). Scope agreed with the owner: tokens plus four primitives (`Magnetic`, `Marquee`, `Counter`, `Cursor`). Sections and anything that reads site copy are deliberately out.

## How the build works here

- This repo is an app, not a library: no package entry and no `.d.ts`. `.design-sync/build/` holds a small Vite library build (`entry.js`, `styles.css`, `tailwind.config.js`, `vite.config.js`) that writes `dist-ds/index.js` + `dist-ds/style.css`. Run `buildCmd` from `config.json` before the converter, and pass `--entry ./dist-ds/index.js`.
- Components are `export default` JSX, so the converter's synthesize-from-src fallback (`export *`) finds nothing. They are named in `entry.js` and pinned in `componentSrcMap`.
- No types, so props come from `dtsPropsFor` in `config.json`, hand-written from the JSX.
- The stylesheet is compiled Tailwind. `.design-sync/build/tailwind.config.js` spreads the site's own config, scans `src/**` and `.design-sync/previews/**`, and safelists the colour (`bg|text|border` × eight colours) and font utilities. A class used only in a preview exists only because previews are scanned — rebuild the library after editing a preview.
- Fonts are remote: Clash Display from Fontshare, Inter and JetBrains Mono from Google, imported at the top of `.design-sync/build/styles.css`. Nothing ships in `fonts/`.
- The root `.gitignore` ignores every `build` directory; `!.design-sync/build/` re-includes this one.
- Render check uses Playwright's Chromium, installed under `.ds-sync/` (gitignored). On a fresh clone: `cd .ds-sync && npm i esbuild ts-morph @types/react playwright && npx playwright install chromium`.

## Preview authoring

- The system is dark-only and preview cards have a white body. Every preview wraps its content in `<div className="bg-bg p-10 text-mist">`; without it the light type is invisible.
- `Marquee`, `Counter` and `Magnetic` use `cardMode: "column"` (wide content, flagged by `[GRID_OVERFLOW]`).

## Known render warns

- **Counter captures at 0.** The count-up runs for 1.6s after the card loads and the capture shoots immediately, so sheets show `0fps`, `0 weeks`, `0+`. Verified separately at rest (3s after load): `60fps`, `2 weeks`, `1`, `90+`. Not a failure.
- **Cursor shows no ring in a still image.** The ring is invisible until the pointer moves and is hidden below 768px. Verified with a moving pointer; the sheet shows only the hover targets.
- `tokens: 1 missing, below threshold` — a Tailwind internal variable; harmless.

## Re-sync risks

- `dtsPropsFor` is hand-written. If a prop is added, renamed or removed in `src/components/{Magnetic,Marquee,Counter,Cursor}.jsx`, update it by hand — nothing will flag the drift.
- `conventions.md` lists colour hex values and class names copied from `tailwind.config.js` and `src/index.css`. Re-validate against `ds-bundle/_ds_bundle.css` after any theme change.
- Preview copy (stats, ticker items, email address) is duplicated from `src/data/site.js`, not imported. It can go stale without breaking anything.
- Remote fonts need network access at render time; offline, designs fall back to Georgia / system fonts.
- First sync was built with Vite 5.4, Tailwind 3.4, Playwright as installed on 2026-10-04.
