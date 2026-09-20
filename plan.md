# Outofthings.io — V1 Technology Lab Website Plan

## Summary

Transform the existing React/Vite site from the Orbelis service-studio model into an original **Outofthings.io** technology-lab brand.

V1 will truthfully present Outofthings as an independent builder brand: it explores ideas, ships experiments, and turns useful work into products. It will not invent a portfolio, imply a team, sell agency services, or show unfinished concepts as products.

Visual recipe: Vercel-inspired restraint in layout and UI density, but an original dark Outofthings “emergence/assembly” system—precise grid, modular fragments, and subtle stateful motion rather than Vercel styling, generic gradients, or decorative 3D.

## Implementation Changes

- Replace all Orbelis identity, metadata, manifest, SEO, schema, favicon/OG source assets, legal references, and public copy with Outofthings.io equivalents.
  - Brand name: `OUTOFTHINGS` with `.io` as a contextual suffix.
  - Primary positioning: “A technology lab turning ideas, observations, and experiments into useful things.”
  - Primary CTA: `Explore the lab`; secondary CTA: `Get in touch`.
  - Publish `hello@outofthings.io`; render GitHub only after the official organization URL is configured.
- Retain the Vite + React + Tailwind + GSAP foundation, static legal-page build, smooth-scroll utilities, responsive navigation, SEO helpers, and accessibility baseline.
- Remove service pricing, client enquiry framing, availability/scarcity messaging, client portfolio claims, and the on-site agency assistant/corpus.
- Replace the WebGL orb with a lightweight, original SVG/CSS “assembly field”: discrete geometric parts align and separate with scroll or pointer state; it is decorative, hidden from assistive technology, static under reduced motion, and adds no new rendering dependency.
- Replace the current broad `site.js` with typed-by-convention content modules:
  - `brand`: positioning, mission, contact, social configuration, metadata.
  - `projects`: extensible fields for id, slug, name, description, category, status, technologies, links, timestamps, and featured state.
  - `experiments`: same stable identifiers plus optional demo, repository, and article links.
  - `lifecycle`: `Idea → Experiment → Prototype → Building → Live → Product → Scale / Archive`.
  - Empty collections remain empty and render an honest “not public yet” state—never fictional cards.
- Build the homepage in this order:
  1. Hero with clear lab positioning and an original assembly-field visual.
  2. “What we build” covering products, experiments, open source, and research without overstating current output.
  3. Current state / lab log, explicitly showing that no projects are public yet.
  4. The lifecycle and philosophy: build, learn, ship, archive when appropriate.
  5. Open-source/GitHub invitation, conditionally linked when the organization exists.
  6. About Outofthings and concise contact footer.
- Keep the v1 information architecture single-page and data-driven. Do not add a router, CMS, GitHub API integration, project detail routes, or database before real published projects require them.
  - Reserve future URL conventions: `/projects/:slug`, `/products/:slug`, `/experiments/:slug`, `/labs`, and `/open-source`.
  - Add a static page only when it has real content and distinct metadata.
- Replace the current agency-specific legal language with accurate site terms and privacy copy. With an email-only contact path and no analytics enabled, state only actual processing; update policy before adding a form, waitlist, tracking, hosted chat, or GitHub API integration.

## Design and Interaction System

- Use a near-black neutral foundation, high-contrast off-white text, cool gray support tones, and one controlled electric-blue/violet accent. Accent color communicates links, status, focus, and active states—not decoration.
- Use one modern sans font for display/body and a mono face only for project state, category, dates, and technical labels. No multiple display fonts or all-caps marketing headlines.
- Create reusable primitives for section headers, status badges, category chips, project cards, empty states, links, buttons, lifecycle steps, and content grids.
- Motion remains brief and meaningful: navigation state, card focus/hover, section entrance, and assembly-field transformation. It must not pin core content, hide copy, or impair mobile scrolling.
- Preserve semantic landmarks, skip link, keyboard-visible focus, valid heading hierarchy, alt-text enforcement for future project images, responsive layouts, and `prefers-reduced-motion` alternatives.

## Verification and Launch Criteria

- Run the production build and verify all generated routes, legal pages, redirects, metadata, sitemap, robots file, manifest, canonical URL, Open Graph data, and favicon assets reference `outofthings.io`.
- Test the homepage at mobile, tablet, laptop, and wide-desktop breakpoints; test keyboard navigation, focus visibility, reduced motion, no-JavaScript reading fallback, and contrast.
- Confirm that no Orbelis name, agency wording, fake project data, placeholder address, placeholder phone number, unavailable social URL, or client-service pricing remains in public output.
- Validate that empty project/experiment states are intentional and clear, and that future data entries render safely with absent optional images and links.
- Before deployment: verify ownership and mail delivery for `hello@outofthings.io`, register/configure the GitHub organization before its link appears, confirm domain/DNS/HTTPS, and have legal copy reviewed if data collection expands.

## Assumptions

- Outofthings.io is an independent brand, not a public rename of Orbelis Studio.
- V1 intentionally has no publicly listed projects, products, experiments, or open-source repositories; credibility comes from clarity and restraint until real work is ready.
- Contact is email-first at `hello@outofthings.io`; no contact form, waitlist, analytics, or assistant ships in v1.
- The existing repository remains the implementation base because its React/Vite architecture and accessibility/performance safeguards are reusable.
