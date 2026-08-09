import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useMemo, useState } from 'react'
import HeroObject from './HeroObject.jsx'

/**
 * The Canvas sits fixed behind the DOM. The page scrolls over it; the object
 * reacts. Keeping content in the DOM rather than inside the canvas is what
 * makes the site accessible, selectable and indexable.
 *
 * Performance guards:
 *  - dpr capped (full retina murders fill rate for little visible gain)
 *  - PerformanceMonitor drops dpr when the GPU struggles
 *  - the whole canvas is skipped for reduced-motion users
 */
export default function Scene() {
  const [dpr, setDpr] = useState(1.25)

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // Reduced motion: render a still gradient instead of a live scene.
  if (reduced) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(232,163,61,0.18) 0%, rgba(8,9,12,0) 70%)',
        }}
        aria-hidden
      />
    )
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 0, 5], fov: 35 }}
      >
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={2.4} />
        <directionalLight position={[-5, -2, -3]} intensity={0.8} color="#b4762a" />
        <pointLight position={[0, 3, 2]} intensity={12} color="#e8a33d" distance={12} />

        <Suspense fallback={null}>
          <HeroObject />
          <Environment preset="night" />
        </Suspense>

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}
