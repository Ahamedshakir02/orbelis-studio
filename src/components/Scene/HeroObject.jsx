import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { MathUtils, Vector3 } from 'three'
import { getScroll } from '../../lib/scroll.js'

const SHARD_COUNT = 34

/**
 * THE HERO OBJECT — "the orb", built as fragments that assemble on scroll.
 *
 * At the top of the page the shards are scattered outward like a constellation.
 * As you scroll they converge and lock into a single faceted sphere, then the
 * whole form drifts back to give the DOM room. One object, one idea.
 *
 * Every shard's scattered and assembled position is computed once and cached;
 * useFrame only lerps between them. Scroll is read from the store rather than
 * React props, so none of this triggers a re-render.
 */
export default function HeroObject() {
  const group = useRef()
  const shell = useRef()
  const shards = useRef([])

  // Fibonacci sphere: evenly distributed points, no clustering at the poles.
  const layout = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: SHARD_COUNT }, (_, i) => {
      const y = 1 - (i / (SHARD_COUNT - 1)) * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i

      const assembled = new Vector3(
        Math.cos(theta) * radius,
        y,
        Math.sin(theta) * radius,
      ).multiplyScalar(1.15)

      // Scattered position: same direction, thrown outward by a varying amount.
      const scattered = assembled
        .clone()
        .multiplyScalar(2.1 + ((i * 37) % 100) / 100 * 2.4)

      return {
        assembled,
        scattered,
        scale: 0.17 + ((i * 53) % 100) / 100 * 0.13,
        spin: ((i * 29) % 100) / 100 - 0.5,
        phase: ((i * 17) % 100) / 100 * Math.PI * 2,
      }
    })
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const { progress, velocity } = getScroll()
    const t = state.clock.elapsedTime

    // Assembly completes in the first third of the page.
    const assembly = MathUtils.clamp(progress * 3, 0, 1)
    const eased = assembly * assembly * (3 - 2 * assembly) // smoothstep

    layout.forEach((cfg, i) => {
      const mesh = shards.current[i]
      if (!mesh) return

      // Position: scattered → assembled.
      mesh.position.lerpVectors(cfg.scattered, cfg.assembled, eased)

      // Drifting shards tumble; locked shards settle to a fixed orientation.
      const tumble = (1 - eased) * (t * cfg.spin * 0.6 + cfg.phase)
      mesh.rotation.set(tumble, tumble * 1.3, tumble * 0.7)

      // Shards grow slightly as they lock in, so assembly reads as "solidifying".
      mesh.scale.setScalar(cfg.scale * (0.7 + eased * 0.3))
    })

    // The whole group turns through the page and drifts back.
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      progress * Math.PI * 2,
      0.05,
    )
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      progress * 0.5 - 0.15,
      0.05,
    )
    group.current.position.y = MathUtils.lerp(group.current.position.y, -progress * 1.6, 0.05)
    group.current.position.z = MathUtils.lerp(group.current.position.z, -progress * 1.4, 0.05)

    // The shell fades in as the shards lock, and opens with scroll velocity.
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12
      const target = 1.3 + Math.min(Math.abs(velocity) * 0.006, 0.22)
      shell.current.scale.setScalar(MathUtils.lerp(shell.current.scale.x, target, 0.08))
      shell.current.material.opacity = 0.16 * eased
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.32}>
      <group ref={group}>
        {layout.map((cfg, i) => (
          <mesh key={i} ref={(el) => (shards.current[i] = el)}>
            {/* Tetrahedra read as chipped facets rather than pebbles. */}
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#e8a33d"
              roughness={0.26}
              metalness={0.94}
              flatShading
            />
          </mesh>
        ))}

        {/* Wireframe cage — only visible once the form has assembled. */}
        <mesh ref={shell} scale={1.3}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshBasicMaterial color="#e8a33d" wireframe transparent opacity={0} />
        </mesh>
      </group>
    </Float>
  )
}
