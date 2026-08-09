/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Art direction: "Dark cinematic / technical".
      // One dominant near-black, one brass accent, neutrals. Nothing else.
      colors: {
        bg: '#08090c',
        surface: '#0f1116',
        raised: '#161920',
        brass: '#e8a33d',
        ember: '#b4762a',
        mist: '#e8eaf0',
        muted: '#878e9e',
        line: '#22262f',
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
