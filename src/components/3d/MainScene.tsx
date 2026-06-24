'use client'

import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import Background    from './Background'
import FloatingCards from './FloatingCards'

export default function MainScene() {
  return (
    <>
      <ambientLight intensity={0.08} color="#001122" />
      <pointLight position={[-8, 4, 2]}  color="#00e5ff" intensity={3}   distance={30} decay={1.5} />
      <pointLight position={[8, -3, 1]}  color="#7c3aed" intensity={2}   distance={25} decay={1.5} />
      <pointLight position={[0, 0, 8]}   color="#ff00aa" intensity={0.8} distance={15} decay={2}   />
      <pointLight position={[0, 6, -12]} color="#aaddff" intensity={1.5} distance={20} decay={1.5} />

      <Background />
      <FloatingCards />

      <OrbitControls
        makeDefault
        target={[0, 1, -9]}
        enablePan={true}
        enableZoom={true}
        minDistance={4}
        maxDistance={30}
        dampingFactor={0.06}
        enableDamping
        panSpeed={0.8}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.8}
          blendFunction={BlendFunction.SCREEN}
          mipmapBlur
          radius={0.7}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette
          eskil={false}
          offset={0.35}
          darkness={0.75}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  )
}
