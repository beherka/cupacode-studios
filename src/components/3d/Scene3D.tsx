'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import MainScene from './MainScene'

export default function Scene3D() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 6, 8], fov: 60, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.toneMapping = 4 // ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <MainScene />
        </Suspense>
      </Canvas>

      {/* Aide contrôles */}
      <div style={{
        position: 'absolute',
        bottom: '3.8rem',
        left: '2rem',
        color: '#ffffff18',
        fontSize: '0.65rem',
        letterSpacing: '0.06em',
        lineHeight: 1.8,
        pointerEvents: 'none',
        fontFamily: 'monospace',
      }}>
        <div>drag — orbiter</div>
        <div>scroll — zoom</div>
        <div>shift+drag — pan</div>
      </div>
    </div>
  )
}
