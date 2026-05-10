import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { CookieBanner } from '../components/CookieBanner';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cupacode-studios.com'),
  title: {
    default: 'Cupacode Studios — Studio de développement web & mobile en France',
    template: '%s | Cupacode Studios',
  },
  description:
    'Studio de développement web basé en France. Applications SaaS, sites vitrines, jeux mobiles iOS/Android et CI/CD managé. TypeScript, Next.js, React Native.',
  keywords: [
    'studio développement web France',
    'agence web SaaS France',
    'développement application web',
    'développement application mobile France',
    'jeux mobiles iOS Android',
    'Next.js TypeScript France',
    'agence développement logiciel',
    'développeur web France',
  ],
  authors:   [{ name: 'Cupacode Studios', url: 'https://cupacode-studios.com' }],
  creator:   'Cupacode Studios',
  publisher: 'Cupacode Studios',
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    siteName:    'Cupacode Studios',
    url:         'https://cupacode-studios.com',
    title:       'Cupacode Studios — Studio de développement web & mobile en France',
    description: 'Applications SaaS, jeux mobiles et CI/CD managé. Studio dev français.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Cupacode Studios — Studio dev France',
    description: 'Applications SaaS, jeux mobiles et CI/CD managé. Studio dev français.',
  },
  robots:     { index: true, follow: true },
  alternates: { canonical: 'https://cupacode-studios.com' },
};

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#21262d] bg-[#080b10]/90 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Accueil">
          <span className="font-mono text-sm font-bold text-cupadev-400 group-hover:text-cupadev-300 transition-colors">
            &gt;_
          </span>
          <span className="font-mono text-sm font-bold text-gray-100">cupacode</span>
          <span className="text-xs font-mono text-gray-600 border border-[#30363d] px-1.5 py-0.5 rounded hidden sm:inline">
            studios
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-0.5">
            <li>
              <Link href="/portfolio"
                className="px-3 py-1.5 text-sm font-mono text-gray-400 hover:text-cupadev-400 transition-colors rounded hover:bg-[#0d1117]">
                /portfolio
              </Link>
            </li>
            <li>
              <a href="https://cupadev.com" target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm font-mono text-gray-400 hover:text-cupadev-400 transition-colors rounded hover:bg-[#0d1117]">
                /cupadev ↗
              </a>
            </li>
            <li className="ml-3">
              <a href="mailto:contact@cupacode-studios.com" className="btn-studios py-1.5 px-3 text-xs">
                contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#21262d] bg-[#0d1117]">
      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          <div>
            <p className="font-mono text-sm text-cupadev-400 mb-2">&gt;_ cupacode studios</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dev studio — applications web SaaS, jeux mobiles, CI/CD.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-gray-600 mb-3 uppercase tracking-widest">Links</p>
            <ul className="space-y-1.5">
              <li><Link href="/portfolio" className="text-xs font-mono text-gray-500 hover:text-cupadev-400 transition-colors">~/portfolio</Link></li>
              <li>
                <a href="https://cupadev.com" target="_blank" rel="noopener noreferrer"
                  className="text-xs font-mono text-gray-500 hover:text-cupadev-400 transition-colors">
                  ~/cupadev.com ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs text-gray-600 mb-3 uppercase tracking-widest">Contact</p>
            <a href="mailto:contact@cupacode-studios.com"
              className="text-xs font-mono text-studios-400 hover:text-studios-300 transition-colors">
              contact@cupacode-studios.com
            </a>
          </div>
        </div>
        <div className="border-t border-[#21262d] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-wrap">
          <p className="text-xs font-mono text-gray-600">© {year} Cupacode Studios</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/mentions-legales" className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors">
              Confidentialité
            </Link>
            <span className="text-xs font-mono text-gray-700">·</span>
            <a href="https://cupadev.com" target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-cupadev-400 hover:text-cupadev-300 transition-colors">
              powered by cupadev.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" style={{ backgroundColor: '#080b10', color: '#f3f4f6' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#080b10', color: '#f3f4f6' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
