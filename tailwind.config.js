/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Art direction: quiet and technical, in two themes.
      // One page colour, one alternate band, one brass accent, neutrals.
      // The values live in src/index.css as RGB channels, one set per theme;
      // these names stay the same in both, so no component needs `dark:`.
      // `surface` and `raised` are the two steps above the page; hierarchy
      // comes from that lift and from hairlines, never from shadow.
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        tile: 'rgb(var(--c-tile) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        // The accent has three jobs, and in light mode they need three values:
        // `action` fills buttons, `link` colours text, `brass` is the small
        // decorative mark (the wordmark's dot, a bullet, a tick).
        brass: 'rgb(var(--c-brass) / <alpha-value>)',
        action: 'rgb(var(--c-action) / <alpha-value>)',
        actionhover: 'rgb(var(--c-action-hover) / <alpha-value>)',
        onaction: 'rgb(var(--c-on-action) / <alpha-value>)',
        link: 'rgb(var(--c-link) / <alpha-value>)',
        ember: 'rgb(var(--c-ember) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
    },
  },
  plugins: [],
}
