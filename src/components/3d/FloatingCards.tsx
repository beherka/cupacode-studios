'use client'

import HolographicCard from './HolographicCard'
import { HERO, POLES, PROJECTS, STATS, CONTACT } from './content3d'

// Positions par thème :
// Web-apps  → gauche  (x < -3)
// Websites  → centre  (x -2 à +3)
// Jeux      → droite  (x > 5)
// Indices PROJECTS : 0=CyberSentinelle 1=DealTrainer 2=Owlcub 3=PulseCrisis
//                    4=AdomWorld 5=AnalyseConseil 6=EcoleAdom 7=GeoAdom
//                    8=DSI 9=Cibnet
const PROJECT_POSITIONS: [number, number, number][] = [
  [ -8.0,  2.5, -13.0], // 0 CyberSentinelle  web-app ★
  [ -5.5,  0.0, -13.0], // 1 Deal Trainer       web-app ★
  [  1.0,  2.0, -13.0], // 2 Owlcub             website ★
  [ -8.0, -1.5, -15.0], // 3 Pulse-Crisis       web-app ★
  [  7.0,  2.0, -13.0], // 4 Adom World         game    ★
  [ -6.0, -3.0, -15.5], // 5 Analyse-Conseil    web-app
  [  2.5, -0.5, -15.0], // 6 École-Adom         website
  [  9.0,  0.0, -15.0], // 7 Géo-Adom           game
  [ -4.0,  1.5, -16.0], // 8 DSI-Management     web-app
  [  0.5, -2.0, -16.0], // 9 Cibnet             website
]

export default function FloatingCards() {
  return (
    <group>
      {/* ── HERO ─────────────────────────────────── */}
      <HolographicCard
        position={[0, 4.5, -8]}
        color="#00e5ff"
        size="hero"
        floatOffset={0}
        title={HERO.headline}
        subtitle={HERO.tagline}
        tags={HERO.stack.split(' · ')}
        label="Cupacode Studios"
      />

      {/* ── STATS ────────────────────────────────── */}
      {STATS.map((stat, i) => (
        <HolographicCard
          key={stat.label}
          position={[-3 + i * 2, 2.0, -8]}
          color="#7c3aed"
          size="small"
          floatOffset={1 + i * 0.9}
          title={stat.value}
          subtitle={stat.label}
        />
      ))}

      {/* ── SERVICES (côtés, profondeur intermédiaire) */}
      <HolographicCard
        position={[-9, 1.0, -11]}
        color="#00e5ff"
        size="large"
        floatOffset={2}
        title={POLES[0].name}
        subtitle={POLES[0].description}
        tags={POLES[0].services}
        label="studio"
      />
      <HolographicCard
        position={[9, 1.0, -11]}
        color="#ff00aa"
        size="large"
        floatOffset={3.5}
        title={POLES[1].name}
        subtitle={POLES[1].description}
        tags={POLES[1].services}
        label="infra"
      />

      {/* ── PROJETS (organisés par catégorie) ────── */}
      {PROJECTS.map((project, i) => (
        <HolographicCard
          key={project.id}
          position={PROJECT_POSITIONS[i] ?? [i * 2 - 9, 0, -13]}
          color={project.color}
          size={project.featured ? 'medium' : 'small'}
          floatOffset={5 + i * 0.65}
          title={project.name}
          subtitle={project.tagline}
          tags={project.featured ? project.stack : []}
          label={
            project.category === 'web-app'  ? 'SaaS'     :
            project.category === 'website'  ? 'site web' :
            'jeu mobile'
          }
          href={project.href ?? undefined}
        />
      ))}

      {/* ── CONTACT (tout au fond) ────────────────── */}
      <HolographicCard
        position={[0, 0, -20]}
        color="#ff00aa"
        size="large"
        floatOffset={14}
        title={CONTACT.headline}
        subtitle={`${CONTACT.subtext}\n${CONTACT.email}`}
        label="contact"
      />
    </group>
  )
}
