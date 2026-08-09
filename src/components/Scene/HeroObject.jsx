import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { MathUtils } from 'three'
import { getScroll } from '../../lib/scroll.js'

/**
 * THE HERO OBJECT — "the orb".
 *
 * One confident form, not a scene. A faceted sphere in brushed brass with a
 * wireframe shell around it: the "shining" half of the name, and a shape that
 * reads as both a planet and a machined part.
 *
 * Scroll is read from the store inside useFrame — never through React props,
 * which would re-render the tree every frame and destroy the framerate.
 * Every response is lerped so fast scrolling never snaps.
 */
export default function HeroObject({ reduced = false }) {
  const group = useRef()
  const core = useRef()
  const shell = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    const { progress, velocity } = getScroll()
    const t = state.clock.elapsedTime

    // One full turn across the length of the page.
    const targetRotY = progress * Math.PI * 2
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetRotY, 0.05)
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, progress * 0.5 - 0.15, 0.05)

    // Drift down and back as the page advances, so the DOM gets room to breathe.
    group.current.position.y = MathUtils.lerp(group.current.position.y, -progress * 1.6, 0.05)
    group.current.position.z = MathUtils.lerp(group.current.position.z, -progress * 1.2, 0.05)

    // The wireframe shell counter-rotates and opens up with scroll velocity —
    // the object feels like it reacts to how hard you throw the page.
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12
      const target = 1.18 + Math.min(Math.abs(velocity) * 0.006, 0.22)
      shell.current.scale.setScalar(MathUtils.lerp(shell.current.scale.x, target, 0.08))
    }

    // Idle breathing, independent of scroll, so the page is never fully still.
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.015)
  })

  return (
    <Float
      speed={reduced ? 0 : 1.1}
      rotationIntensity={reduced ? 0 : 0.18}
      floatIntensity={reduced ? 0 : 0.35}
    >
      <group ref={group}>
        {/* Core: low-detail icosahedron reads as machined facets, not a ball. */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial
            color="#e8a33d"
            roughness={0.28}
            metalness={0.92}
            flatShading
          />
        </mesh>

        {/* Shell: a wireframe cage that gives the form depth and a technical edge. */}
        <mesh ref={shell} scale={1.18}>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshBasicMaterial color="#e8a33d" wireframe transparent opacity={0.14} />
        </mesh>
      </group>
    </Float>
  )
}
