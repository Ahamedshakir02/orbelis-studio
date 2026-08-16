import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import HeroObject from './HeroObject.jsx'
import { useScroll } from '../../lib/scroll.js'

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
  const wrap = useRef(null)

  /**
   * Fade the canvas out over the closing stretch.
   *
   * Moving the object back is enough on a wide screen, where the contact
   * details sit in their own column. On a phone every section is full width,
   * so there is nowhere for the object to go that is not behind the text —
   * checked on a 390px viewport, where it was washing over the social links
   * and the footer.
   *
   * Written straight to style from a store subscription rather than through
   * React state: this fires on every scroll frame, and re-rendering a WebGL
   * canvas wrapper sixty times a second to change one number would undo the
   * work the scroll store exists to do.
   */
  useEffect(() => {
    const apply = (s) => {
      const el = wrap.current
      if (!el) return
      const t = Math.min(Math.max((s.progress - 0.72) / 0.28, 0), 1)
      const eased = t * t * (3 - 2 * t)
      el.style.opacity = String(1 - eased * 0.8)
    }
    apply(useScroll.getState())
    return useScroll.subscribe(apply)
  }, [])

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
    <div ref={wrap} className="fixed inset-0 -z-10 will-change-[opacity]">
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
