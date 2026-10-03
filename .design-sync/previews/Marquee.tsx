import { Marquee } from 'orbelis-studio'

// Orbelis is dark-only: every example sits on the page colour, because the
// type is light and disappears on a white card.

// The ticker under the manifesto: what the studio does and who for.
export const Services = () => (
  <div className="bg-bg py-10 text-mist">
    <Marquee
      items={[
        'Animated websites',
        'AI assistants',
        'Business automation',
        'Clinics & healthcare',
        'Institutions',
        'Founders',
        'Brands',
      ]}
    />
  </div>
)

// A shorter list at a slower pace.
export const Stack = () => (
  <div className="bg-bg py-10 text-mist">
    <Marquee items={['React', 'GSAP', 'Three.js / R3F', 'Tailwind', 'RAG pipelines', 'PostgreSQL']} speed={60} />
  </div>
)
