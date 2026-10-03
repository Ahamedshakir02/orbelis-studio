import { Marquee } from 'orbelis-studio'

// The ticker under the manifesto: what the studio does and who for.
export const Services = () => (
  <Marquee
    items={[
      'Animated websites',
      'AI assistants',
      'Clinics & healthcare',
      'Institutions',
      'Founders',
      'Malayalam + English',
      'Two week builds',
    ]}
  />
)

// A shorter list at a slower pace.
export const Stack = () => (
  <Marquee items={['React', 'GSAP', 'Three.js / R3F', 'Tailwind', 'RAG pipelines', 'PostgreSQL']} speed={60} />
)
