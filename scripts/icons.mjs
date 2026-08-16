/**
 * Export the favicon set from public/favicon.svg.
 *
 *   npm run icons
 *
 * An SVG favicon covers modern browsers, but not all of them: Safari wants an
 * apple-touch-icon, Android installs read the manifest icons, and a few tools
 * still ask for a 32px PNG. One source file, five outputs, no design tool.
 *
 * The mark is rendered on the brand background rather than transparent —
 * a transparent icon on a dark OS theme becomes an invisible smudge.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToPng } from './render.mjs'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const source = join(root, 'public', 'favicon.svg')

if (!existsSync(source)) {
  console.error(`Missing ${source}`)
  process.exit(1)
}

const svg = readFileSync(source, 'utf8')

const targets = [
  { size: 32, name: 'favicon-32.png' },
  { size: 16, name: 'favicon-16.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
]

for (const { size, name } of targets) {
  const out = join(root, 'public', name)
  const bytes = renderToPng({
    // Force the SVG to the exact box; the source declares its own 64px size.
    body: svg.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`),
    width: size,
    height: size,
    out,
  })
  console.log(`public/${name.padEnd(22)} ${size}x${size}  ${(bytes / 1024).toFixed(1)} kB`)
}
