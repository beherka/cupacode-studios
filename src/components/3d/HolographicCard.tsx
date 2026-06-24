'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import useAppStore from './useAppStore'

const SIZES: Record<string, [number, number, number]> = {
  hero:   [5.2, 2.8, 0.05],
  large:  [3.2, 1.9, 0.05],
  medium: [2.8, 1.6, 0.05],
  small:  [1.6, 0.9, 0.04],
}

interface HolographicCardProps {
  position?:    [number, number, number]
  color?:       string
  size?:        'hero' | 'large' | 'medium' | 'small'
  floatOffset?: number
  title?:       string
  subtitle?:    string
  tags?:        string[]
  label?:       string
  href?:        string
}

export default function HolographicCard({
  position    = [0, 0, 0],
  color       = '#00e5ff',
  size        = 'medium',
  floatOffset = 0,
  title       = '',
  subtitle    = '',
  tags        = [],
  label       = '',
  href,
}: HolographicCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glassRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  const { camera, gl, controls } = useThree()
  const controlsRef = useRef<any>(null)
  controlsRef.current = controls
  const setIsDragging = useAppStore(s => s.setIsDragging)

  const dragging    = useRef(false)
  const hoveredRef  = useRef(false)
  const dragPlane   = useRef(new THREE.Plane())
  const dragOffset  = useRef(new THREE.Vector3())
  const restPos     = useRef(new THREE.Vector3(...position))
  const originPos   = useRef(new THREE.Vector3(...position))
  const smoothVel   = useRef(new THREE.Vector3())
  const _hit        = useRef(new THREE.Vector3())
  const _newPos     = useRef(new THREE.Vector3())
  const _frameDelta = useRef(new THREE.Vector3())

  const stX = useMemo(() => Math.sin(floatOffset * 1.7)  * 0.055, [floatOffset])
  const stZ = useMemo(() => Math.cos(floatOffset * 2.3)  * 0.04,  [floatOffset])
  const stY = useMemo(() => Math.sin(floatOffset * 0.85) * 0.07,  [floatOffset])

  const mouseNDC  = useRef(new THREE.Vector2())
  const raycaster = useMemo(() => new THREE.Raycaster(), [])

  useEffect(() => {
    const canvas = gl.domElement
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseNDC.current.set(
        ((e.clientX - r.left) / r.width)  * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1
      )
    }
    const onUp = () => { if (dragging.current) stopDrag() }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup',     onUp)
    canvas.addEventListener('pointercancel', onUp)
    return () => {
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup',     onUp)
      canvas.removeEventListener('pointercancel', onUp)
    }
  }, [gl]) // eslint-disable-line react-hooks/exhaustive-deps

  const dims  = SIZES[size] ?? SIZES.medium
  const cardW = dims[0]
  const cardH = dims[1]
  const subtitleColor = useMemo(() =>
    `#${new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.5).getHexString()}`,
    [color]
  )

  function stopDrag() {
    dragging.current = false
    setIsDragging(false)
    if (controlsRef.current) controlsRef.current.enabled = true
    document.body.style.cursor = hoveredRef.current ? 'grab' : 'default'
  }

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    hoveredRef.current = true
    if (!dragging.current) document.body.style.cursor = 'grab'
  }
  const handlePointerOut = () => {
    hoveredRef.current = false
    if (!dragging.current) document.body.style.cursor = 'default'
  }
  const handlePointerDown = (e: any) => {
    e.stopPropagation()
    const normal = new THREE.Vector3()
    camera.getWorldDirection(normal)
    dragPlane.current.setFromNormalAndCoplanarPoint(normal, e.point)
    dragOffset.current.subVectors(groupRef.current!.position, e.point)
    dragging.current = true
    smoothVel.current.set(0, 0, 0)
    setIsDragging(true)
    if (controlsRef.current) controlsRef.current.enabled = false
    document.body.style.cursor = 'grabbing'
  }
  const handleClick = () => {
    if (smoothVel.current.length() > 0.3) return
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
  }
  const handleDoubleClick = (e: any) => {
    e.stopPropagation()
    restPos.current.copy(originPos.current)
    smoothVel.current.set(0, 0, 0)
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t  = state.clock.elapsedTime
    const dt = Math.min(delta, 0.1)

    if (dragging.current) {
      raycaster.setFromCamera(mouseNDC.current, camera)
      if (raycaster.ray.intersectPlane(dragPlane.current, _hit.current)) {
        _newPos.current.addVectors(_hit.current, dragOffset.current)
        _frameDelta.current.subVectors(_newPos.current, restPos.current).divideScalar(dt)
        smoothVel.current.lerp(_frameDelta.current, 0.3)
        smoothVel.current.clampLength(0, 20)
        restPos.current.copy(_newPos.current)
        groupRef.current.position.copy(_newPos.current)
      }
      const tx = smoothVel.current.y * 0.006
      const tz = -smoothVel.current.x * 0.005
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.22
      groupRef.current.rotation.z += (tz - groupRef.current.rotation.z) * 0.22
      groupRef.current.rotation.y += (0  - groupRef.current.rotation.y) * 0.1
    } else {
      if (smoothVel.current.length() > 0.06) {
        restPos.current.addScaledVector(smoothVel.current, dt)
        smoothVel.current.multiplyScalar(Math.max(0, 1 - dt * 1.8))
      }
      groupRef.current.position.x = restPos.current.x
      groupRef.current.position.y = restPos.current.y + Math.sin(t * 0.45 + floatOffset) * 0.12
      groupRef.current.position.z = restPos.current.z
      const txT = stX + Math.sin(t * 0.35 + floatOffset) * 0.012
      const tzT = stZ + Math.sin(t * 0.28 + floatOffset * 0.7) * 0.01
      groupRef.current.rotation.x += (txT - groupRef.current.rotation.x) * 0.04
      groupRef.current.rotation.y += (stY - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.z += (tzT - groupRef.current.rotation.z) * 0.04
    }

    if (glassRef.current?.material) {
      const active = hoveredRef.current || dragging.current
      const mat = glassRef.current.material as THREE.MeshStandardMaterial
      mat.opacity           += ((active ? 0.26 : 0.10) - mat.opacity)           * 0.14
      mat.emissiveIntensity += ((active ? 0.22 : 0.06) - mat.emissiveIntensity) * 0.14
    }
    if (lightRef.current) {
      const base = (hoveredRef.current || dragging.current) ? 0.9 : 0.25
      lightRef.current.intensity +=
        (base + Math.sin(t * 1.8 + floatOffset) * 0.08 - lightRef.current.intensity) * 0.1
    }
  })

  const fontSize = {
    hero:   { title: 0.22, subtitle: 0.095, tag: 0.075, label: 0.065 },
    large:  { title: 0.17, subtitle: 0.082, tag: 0.068, label: 0.060 },
    medium: { title: 0.15, subtitle: 0.075, tag: 0.062, label: 0.055 },
    small:  { title: 0.12, subtitle: 0.065, tag: 0.055, label: 0.050 },
  }[size] ?? { title: 0.15, subtitle: 0.075, tag: 0.062, label: 0.055 }

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Lumière interne */}
      <pointLight ref={lightRef} color={color} intensity={0.25} distance={3} decay={2} />

      {/* Bordure holographique */}
      <RoundedBox args={[cardW + 0.04, cardH + 0.04, dims[2]]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.15} />
      </RoundedBox>

      {/* Corps en verre */}
      <RoundedBox ref={glassRef as any} args={[cardW, cardH, dims[2]]} radius={0.055} smoothness={4}>
        <meshStandardMaterial
          color="#050a14"
          emissive={color}
          emissiveIntensity={0.06}
          transparent
          opacity={0.10}
          roughness={0.1}
          metalness={0.3}
        />
      </RoundedBox>

      {/* Titre */}
      {title ? (
        <Text
          position={[0, cardH * 0.28, dims[2] + 0.01]}
          fontSize={fontSize.title}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={cardW * 0.88}

        >
          {title}
        </Text>
      ) : null}

      {/* Sous-titre */}
      {subtitle ? (
        <Text
          position={[0, 0, dims[2] + 0.01]}
          fontSize={fontSize.subtitle}
          color={subtitleColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={cardW * 0.85}
          lineHeight={1.4}

        >
          {subtitle}
        </Text>
      ) : null}

      {/* Tags */}
      {tags.slice(0, 4).map((tag, i) => (
        <Text
          key={tag}
          position={[-cardW * 0.38 + i * (cardW * 0.26), -cardH * 0.32, dims[2] + 0.01]}
          fontSize={fontSize.tag}
          color={`#${new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.3).getHexString()}`}
          anchorX="center"
          anchorY="middle"

        >
          {tag}
        </Text>
      ))}

      {/* Label coin */}
      {label ? (
        <Text
          position={[cardW * 0.4, cardH * 0.42, dims[2] + 0.01]}
          fontSize={fontSize.label}
          color={`${color}88`}
          anchorX="right"
          anchorY="top"

        >
          {label}
        </Text>
      ) : null}
    </group>
  )
}
