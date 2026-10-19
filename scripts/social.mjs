/**
 * Render the social content pack to content/social/.
 *
 *   npm run social
 *
 * Every caption and slide lives in content/social/posts.js; this script turns
 * them into images and rewrites content/social/README.md (the posting
 * calendar with every caption), so the pictures and the words cannot drift
 * apart. Re-run after changing a post.
 *
 * WHAT COMES OUT
 *   linkedin/<post>/slide-NN.png    1080x1350, one per slide
 *   linkedin/<post>/<post>.pdf      carousels only: LinkedIn takes a carousel as
 *                                   a PDF uploaded with "Add a document"
 *   instagram/<post>/slide-NN.png   1080x1350 (4:5), in swipe order
 *   stories/<story>.png             1080x1920
 *   README.md                       calendar, captions, hashtags, Instagram bio
 *
 * Rendering takes several minutes. After changing only captions, run
 * `npm run social -- --text` to rewrite README.md alone.
 *
 * Rendered with the Chrome or Edge already on the machine, like the brand kit.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { findBrowser } from './render.mjs'
import { brand } from '../src/data/site.js'
import { linkedin, instagram, stories, instagramProfile, start } from '../content/social/posts.js'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outDir = join(root, 'content', 'social')

const INK = '#08090c'
const LINE = '#242831'
const MIST = '#e8eaf0'
const MUTED = '#878e9e'
const BRASS = '#e8a33d'
const host = brand.url.replace(/^https?:\/\//, '')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const wordmark = (px, color = MIST) =>
  `<span style="font-family:'Clash Display',Georgia,serif;font-weight:600;font-size:${px}px;letter-spacing:-0.03em;color:${color};line-height:1">${brand.name}<span style="color:${BRASS}">.</span></span>`

const glow = (x, y, r) =>
  `<div style="position:absolute;left:${x}px;top:${y}px;width:${r * 2}px;height:${r * 2}px;margin:-${r}px 0 0 -${r}px;border-radius:50%;background:radial-gradient(circle,rgba(232,163,61,0.28),rgba(232,163,61,0.06) 55%,rgba(232,163,61,0) 72%)"></div>`

const kicker = (text) =>
  `<div style="font-family:Inter,sans-serif;font-weight:600;font-size:26px;letter-spacing:0.14em;text-transform:uppercase;color:${BRASS}">${esc(text)}</div>`

const sans = (px, color, weight = 400, extra = '') =>
  `font-family:Inter,sans-serif;font-weight:${weight};font-size:${px}px;color:${color};${extra}`

const H = (px) => sans(px, MIST, 600, 'line-height:1.04;letter-spacing:-0.035em')

// ---------------------------------------------------------------- slide bodies

const bodies = {
  statement: (s, big) => `
    <div style="display:flex;flex-direction:column;gap:44px">
      ${s.kicker ? kicker(s.kicker) : ''}
      <div style="${H(big ? 112 : 100)}">
        ${s.title.map((l) => `<div>${esc(l)}</div>`).join('')}
        ${(s.muted ?? []).map((l) => `<div style="color:${MUTED}">${esc(l)}</div>`).join('')}
      </div>
      ${s.sub ? `<div style="${sans(38, MUTED, 400, 'line-height:1.35;max-width:820px')}">${esc(s.sub)}</div>` : ''}
    </div>`,

  point: (s) => `
    <div style="display:flex;flex-direction:column;gap:40px">
      <div style="font-family:'Clash Display',Georgia,serif;font-weight:600;font-size:200px;line-height:0.9;color:${BRASS};letter-spacing:-0.04em">${esc(s.n)}</div>
      <div style="${H(84)}">${esc(s.title)}</div>
      <div style="${sans(40, MUTED, 400, 'line-height:1.4;max-width:860px')}">${esc(s.body)}</div>
    </div>`,

  list: (s) => `
    <div style="display:flex;flex-direction:column;gap:36px">
      ${kicker(s.kicker)}
      <div style="${H(84)}">${esc(s.title)}</div>
      <div style="margin-top:20px">
        ${s.items.map(([name, line]) => `
          <div style="border-top:1px solid ${LINE};padding:30px 0">
            <div style="${sans(42, MIST, 600, 'letter-spacing:-0.02em')}">${esc(name)}</div>
            <div style="${sans(30, MUTED, 400, 'margin-top:10px;line-height:1.35')}">${esc(line)}</div>
          </div>`).join('')}
      </div>
    </div>`,

  stats: (s) => `
    <div style="display:flex;flex-direction:column;gap:36px">
      ${kicker(s.kicker)}
      <div style="${H(84)}">${esc(s.title)}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 56px;margin-top:30px">
        ${s.items.map(([fig, unit, label]) => `
          <div style="border-top:1px solid ${LINE};padding:36px 0 44px">
            <div style="${sans(124, MIST, 600, 'line-height:1;letter-spacing:-0.045em')}">${esc(fig)}<span style="color:${BRASS};font-size:60px;letter-spacing:-0.02em">${esc(unit)}</span></div>
            <div style="${sans(30, MUTED, 400, 'margin-top:18px;line-height:1.35')}">${esc(label)}</div>
          </div>`).join('')}
      </div>
    </div>`,

  chips: (s) => `
    <div style="display:flex;flex-direction:column;gap:44px">
      ${kicker(s.kicker)}
      <div style="${H(96)}">${esc(s.title)}</div>
      <div style="display:flex;flex-wrap:wrap;gap:18px;margin-top:10px">
        ${s.chips.map((c) => `<div style="${sans(36, MIST, 500)};border:1.5px solid #3a3f4b;border-radius:999px;padding:18px 34px">${esc(c)}</div>`).join('')}
      </div>
      <div style="${sans(38, MUTED, 400, 'line-height:1.35;max-width:820px')}">${esc(s.sub)}</div>
    </div>`,

  work: (s) => `
    <div style="display:flex;flex-direction:column;gap:36px">
      ${kicker(s.kicker)}
      <div style="${H(92)}">${esc(s.title)}</div>
      <div style="display:flex;flex-direction:column;gap:28px;margin-top:24px">
        ${s.items.map(([name, place, line]) => `
          <div style="border:1px solid ${LINE};border-radius:28px;padding:44px;background:rgba(255,255,255,0.025)">
            <div style="display:flex;justify-content:space-between;align-items:baseline;gap:20px">
              <div style="${sans(48, MIST, 600, 'letter-spacing:-0.02em')}">${esc(name)}</div>
              <div style="${sans(28, BRASS, 500)}">${esc(place)}</div>
            </div>
            <div style="${sans(32, MUTED, 400, 'margin-top:18px;line-height:1.4')}">${esc(line)}</div>
          </div>`).join('')}
      </div>
    </div>`,

  cta: () => `
    <div style="display:flex;flex-direction:column;gap:48px">
      ${kicker('Free consultation')}
      <div style="${H(104)}"><div>Let’s talk about</div><div style="color:${MUTED}">your business.</div></div>
      <div style="align-self:flex-start;background:${BRASS};color:${INK};${sans(40, INK, 600)};border-radius:999px;padding:30px 52px">Book a free consultation</div>
      <div style="display:flex;flex-direction:column;gap:18px;margin-top:8px">
        ${[`WhatsApp  ${brand.phone}`, brand.email, host].map((t) => `<div style="${sans(36, MIST, 400)}">${esc(t)}</div>`).join('')}
      </div>
    </div>`,
}

// ---------------------------------------------------------------- frames

/** A 1080-wide slide: wordmark top-left, page count top-right, footer rule. */
function frame(slide, { w, h, page, total }) {
  const story = h > 1500
  const pad = 84
  const g = [glow(900, 220, 460), glow(180, h - 200, 380), glow(940, h - 320, 420)][(page - 1) % 3]
  const counter = total > 1 ? `<div style="${sans(28, MUTED, 500, 'letter-spacing:0.04em')}">${String(page).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>` : ''
  const swipe = total > 1 && page < total ? `<div style="${sans(28, MUTED, 500)}">Swipe →</div>` : `<div style="${sans(28, BRASS, 500)}">Book a free consultation</div>`
  const body = (bodies[slide.type] ?? bodies.statement)(slide, total === 1)
  return `${g}
    <div style="position:absolute;left:${pad}px;right:${pad}px;top:${story ? 200 : pad}px;display:flex;justify-content:space-between;align-items:center">${wordmark(story ? 64 : 52)}${counter}</div>
    <div style="position:absolute;left:${pad}px;right:${pad}px;top:${story ? 300 : 200}px;bottom:${story ? 420 : 190}px;display:flex;flex-direction:column;justify-content:center">${body}</div>
    <div style="position:absolute;left:${pad}px;right:${pad}px;bottom:${story ? 260 : pad}px;display:flex;justify-content:space-between;border-top:1px solid ${LINE};padding-top:28px">
      <div style="${sans(28, MUTED, 400)}">${slide.type === 'cta' ? 'Edappal, Kerala · India and UAE' : host}</div>${story ? `<div style="${sans(28, BRASS, 500)}">Book a free consultation</div>` : swipe}
    </div>`
}

const head = (extra = '') => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:${INK};-webkit-print-color-adjust:exact;print-color-adjust:exact}${extra}</style></head>`

// ---------------------------------------------------------------- render

const browser = findBrowser()
const tmp = mkdtempSync(join(tmpdir(), 'orbelis-social-'))
let n = 0

// Wait for the browser to exit, not for its pipes to close: Chrome's helper
// processes inherit them and can hold them open long after the shot is taken.
const run = (cmd, args) =>
  new Promise((ok, fail) => spawn(cmd, args, { stdio: 'ignore' }).on('error', fail).on('exit', ok))
const jobs = []

function shoot(html, w, h, out, pdf = false) {
  const page = join(tmp, `p${n++}.html`)
  writeFileSync(page, html, 'utf8')
  rmSync(out, { force: true })
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${w},${h}`,
    // Webfonts need a moment to arrive; shooting early exports a fallback face.
    '--virtual-time-budget=4000',
    ...(pdf ? ['--no-pdf-header-footer', `--print-to-pdf=${out}`] : [`--screenshot=${out}`]),
    pathToFileURL(page).href,
  ]
  jobs.push(async () => {
    // Each browser needs its own profile to run side by side with the others.
    await run(browser, [...args, `--user-data-dir=${join(tmp, `u${n++}`)}`])
    if (!existsSync(out)) throw new Error(`Browser exited without writing ${out}`)
    console.log(out.slice(root.length + 1).replace(/\\/g, '/'))
  })
}

/**
 * Run the queued screenshots. More than one at a time was slower on a laptop
 * (every browser fetches the webfonts afresh), so the default is one.
 */
async function drain(width = 1) {
  const queue = jobs.splice(0)
  await Promise.all(Array.from({ length: width }, async () => {
    while (queue.length) await queue.shift()()
  }))
}

function renderPost(post, platform) {
  const dir = join(outDir, platform, post.id)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  const [w, h] = [1080, 1350]
  const total = post.slides.length
  const pages = post.slides.map((s, i) => frame(s, { w, h, page: i + 1, total }))
  pages.forEach((body, i) => {
    const html = `${head()}<body style="position:relative;width:${w}px;height:${h}px;overflow:hidden">${body}</body></html>`
    shoot(html, w, h, join(dir, `slide-${String(i + 1).padStart(2, '0')}.png`))
  })
  if (platform === 'linkedin' && total > 1) {
    const css = `@page{size:${w}px ${h}px;margin:0}.pg{position:relative;width:${w}px;height:${h}px;overflow:hidden;page-break-after:always;background:${INK}}`
    const html = `${head(css)}<body>${pages.map((b) => `<div class="pg">${b}</div>`).join('')}</body></html>`
    shoot(html, w, h, join(dir, `${post.id}.pdf`), true)
  }
}

// `npm run social -- --text` rewrites README.md only, without re-rendering.
const textOnly = process.argv.includes('--text')

try {
  if (!textOnly) {
    for (const p of linkedin) renderPost(p, 'linkedin')
    for (const p of instagram) renderPost(p, 'instagram')
    mkdirSync(join(outDir, 'stories'), { recursive: true })
    for (const s of stories) {
      const [w, h] = [1080, 1920]
      const html = `${head()}<body style="position:relative;width:${w}px;height:${h}px;overflow:hidden">${frame(s.slide, { w, h, page: 1, total: 1 })}</body></html>`
      shoot(html, w, h, join(outDir, 'stories', `${s.id}.png`))
    }
    await drain()
  }
  writeFileSync(join(outDir, 'README.md'), readme(), 'utf8')
  console.log('content/social/README.md')
} catch (err) {
  console.error('Social export failed:', err.message)
  process.exitCode = 1
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

// ---------------------------------------------------------------- README

function readme() {
  const parse = (d) => new Date(`${d.match(/\d+ \w{3}/)[0]} 2026`)
  const rows = [
    ...linkedin.map((p) => ({ ...p, platform: 'LinkedIn', dir: `linkedin/${p.id}` })),
    ...instagram.map((p) => ({ ...p, platform: 'Instagram', dir: `instagram/${p.id}` })),
    ...stories.map((s) => ({ ...s, platform: 'Instagram story', dir: 'stories' })),
  ].sort((a, b) => parse(a.day) - parse(b.day))

  const title = (p) => {
    const s = p.slides?.[0] ?? p.slide
    return [].concat(s.title ?? [], s.muted ?? []).join(' ') || p.id
  }

  const files = (p) => {
    if (p.platform === 'Instagram story') return `[${p.id}.png](stories/${p.id}.png)`
    const pdf = p.platform === 'LinkedIn' && p.slides.length > 1
    return pdf ? `[PDF](${p.dir}/${p.id}.pdf) + ${p.slides.length} PNGs` : `[slide-01.png](${p.dir}/slide-01.png)`
  }

  const section = (p) => `### ${p.day} · ${p.platform} · ${title(p)}

- **Format:** ${p.format}
- **Files:** [\`${p.dir}/\`](${p.dir}/)${p.slides?.length > 1 ? ` (${p.slides.length} slides, post them in order)` : ''}

\`\`\`text
${p.caption}

${p.tags.join(' ')}
\`\`\`
`

  const bio = instagramProfile.bio.join('\n')
  return `# Orbelis social content pack

Generated by \`npm run social\` from [posts.js](posts.js). Edit the words there and re-run; don't edit this file by hand.

Four weeks from ${start}: LinkedIn on Tuesday and Thursday, Instagram on Monday and Friday, plus ${stories.length} stories. Nothing here has been posted; post each one yourself on its day, or move days around freely.

**Posting tips**

- **LinkedIn carousels:** start a post, choose *Add a document*, upload the PDF and give it the post's title. LinkedIn shows it as swipeable slides.
- **Reshare every LinkedIn post from your personal profile** with one line of your own. The company page is new, so most of the reach comes from your connections.
- **Instagram carousels:** select the slides in order (slide-01 first). All images are 1080x1350, Instagram's 4:5 portrait size.
- **Reply to every comment within the day.** Early replies are what push a post to more people on both platforms.

## Calendar

| Day | Platform | Post | Format | Files |
|---|---|---|---|---|
${rows.map((p) => `| ${p.day} | ${p.platform} | ${title(p)} | ${p.format} | ${files(p)} |`).join('\n')}

## Instagram profile

Instagram: [@orbelisstudio](https://www.instagram.com/orbelisstudio/). The website footer and its search data already link to it.

- **Profile picture:** [brand/profile-instagram.png](../../brand/profile-instagram.png)
- **Name:** ${instagramProfile.name}
- **Username:** ${instagramProfile.username}
- **Category:** ${instagramProfile.category}
- **Link:** ${instagramProfile.link}
- **Contact buttons:** ${instagramProfile.contact.join('; ')}
- **Highlight covers to create:** ${instagramProfile.highlights.join(', ')}

Bio (${[...bio].length} of 150 characters):

\`\`\`text
${bio}
\`\`\`

## LinkedIn cover

[brand/banner-linkedin-company-1128x191.png](../../brand/banner-linkedin-company-1128x191.png): upload on the company page under *Edit page → Header → Cover image*. LinkedIn's company cover size is 1128x191; the file is saved at twice that (2256x382) so it stays sharp. Everything sits in the centre because phones crop the sides and the logo covers the lower left. (\`banner-linkedin-1584x396.png\` is the personal-profile size, for Shakir's own profile.)

## Posts

${rows.filter((p) => p.caption).map(section).join('\n')}
## Stories

${stories.map((s) => `- **${s.day}:** [${s.id}.png](stories/${s.id}.png). ${s.note}`).join('\n')}
`
}
