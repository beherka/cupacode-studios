import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

// =====================================================
// Métadonnées globales du site (Open Graph, SEO)
// =====================================================
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cupacode-studios.com'),
  title: {
    default: 'Cupacode Studios — Studio de développement web & jeux mobiles',
    template: '%s | Cupacode Studios',
  },
  description:
    'Cupacode Studios conçoit des applications web SaaS, des sites performants et des jeux mobiles innovants. Découvrez nos réalisations.',
  keywords: ['développement web', 'applications SaaS', 'jeux mobiles', 'Next.js', 'React', 'studio'],
  authors: [{ name: 'Cupacode Studios' }],
  creator: 'Cupacode Studios',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cupacode-studios.com',
    siteName: 'Cupacode Studios',
    title: 'Cupacode Studios — Studio de développement web & jeux mobiles',
    description: 'Applications web SaaS, sites performants et jeux mobiles innovants.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cupacode Studios',
    description: 'Studio de développement web & jeux mobiles.',
  },
  robots: { index: true, follow: true },
};

// =====================================================
// Header de navigation principal
// =====================================================
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:bg-gray-950/95 dark:border-gray-800">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo / nom du studio */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Accueil Cupacode Studios">
          {/* Icône stylisée : deux blocs empilés */}
          <div className="flex gap-0.5">
            <div className="w-3 h-5 rounded-sm bg-studios-600 group-hover:bg-studios-700 transition-colors" />
            <div className="w-3 h-5 rounded-sm bg-cupadev-600 group-hover:bg-cupadev-700 transition-colors mt-1" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Cupacode <span className="text-studios-600">Studios</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/portfolio"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/cupadev"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                CUPADEV
              </Link>
            </li>
            <li>
              <a
                href="mailto:contact@cupacode-studios.com"
                className="btn-studios ml-2 hidden sm:inline-flex"
              >
                Nous contacter
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// =====================================================
// Footer global
// =====================================================
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:bg-gray-950 dark:border-gray-800">
      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Colonne 1 : présentation */}
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Cupacode Studios
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Studio de développement d&apos;applications web SaaS et de jeux mobiles innovants.
            </p>
          </div>

          {/* Colonne 2 : liens rapides */}
          <nav aria-label="Liens du pied de page">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Liens</p>
            <ul className="space-y-1">
              {[
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/cupadev', label: 'CUPADEV (CI/CD)' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne 3 : contact */}
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Contact</p>
            <a
              href="mailto:contact@cupacode-studios.com"
              className="text-xs text-studios-600 hover:text-studios-700 dark:text-studios-400 transition-colors"
            >
              contact@cupacode-studios.com
            </a>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-cupadev-100 text-cupadev-700 border border-cupadev-200">
                CUPADEV.COM — DevOps &amp; CI/CD
              </span>
            </div>
          </div>
        </div>

        {/* Ligne de copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {year} Cupacode Studios. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

// =====================================================
// Layout racine
// =====================================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Police Inter via Google Fonts (CDN) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
