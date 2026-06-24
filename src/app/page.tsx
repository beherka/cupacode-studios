import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Cupacode Studios — Studio de développement web & mobile en France',
  description:
    'Studio de développement web en France. Applications SaaS, sites vitrines, jeux mobiles iOS/Android et CI/CD managé. TypeScript, Next.js, Supabase.',
  alternates: { canonical: 'https://cupacode-studios.com' },
}

// Chargement côté client uniquement — Three.js ne supporte pas le SSR
const Scene3D = dynamic(() => import('../components/3d/Scene3D'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#00e5ff',
        fontFamily: 'monospace',
        gap: '1rem',
      }}
    >
      <div style={{ fontSize: '1.4rem', letterSpacing: '0.25em' }}>&gt;_cupacodestudios</div>
      <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.5 }}>
        INITIALISATION...
      </div>
    </div>
  ),
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cupacode Studios',
  url: 'https://cupacode-studios.com',
  description: 'Studio de développement web et mobile basé en France. Applications SaaS, jeux mobiles et CI/CD managé.',
  email: 'contact@cupacode-studios.com',
  areaServed: 'FR',
  knowsLanguage: 'fr',
  sameAs: ['https://cupadev.com'],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Corps de page = scène 3D pleine hauteur entre header (56px) et footer */}
      <div style={{ width: '100%', height: '65vh', minHeight: '400px' }}>
        <Scene3D />
      </div>
    </>
  )
}
