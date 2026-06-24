'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 5000

export default function Background() {
  const pointsRef  = useRef<THREE.Points>(null)
  const points2Ref = useRef<THREE.Points>(null)

  const { positions1, positions2, colors1 } = useMemo(() => {
    const pos1  = new Float32Array(PARTICLE_COUNT * 3)
    const pos2  = new Float32Array((PARTICLE_COUNT / 2) * 3)
    const cols1 = new Float32Array(PARTICLE_COUNT * 3)

    const palette = [
      new THREE.Color('#00e5ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#ff00aa'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#0088aa'),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 25 + Math.random() * 60
      pos1[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos1[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos1[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      cols1[i * 3]     = c.r
      cols1[i * 3 + 1] = c.g
      cols1[i * 3 + 2] = c.b
    }

    for (let i = 0; i < PARTICLE_COUNT / 2; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 15 + Math.random() * 35
      pos2[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos2[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos2[i * 3 + 2] = r * Math.cos(phi)
    }

    return { positions1: pos1, positions2: pos2, colors1: cols1 }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.012
      pointsRef.current.rotation.x = Math.sin(t * 0.007) * 0.08
    }
    if (points2Ref.current) {
      points2Ref.current.rotation.y = -t * 0.007
      points2Ref.current.rotation.z =  t * 0.004
    }
  })

  return (
    <>
      <fog attach="fog" args={['#000000', 10, 50]} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions1, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors1, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={points2Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions2, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#aaddff" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
      </points>
    </>
  )
}
