import Link from 'next/link';

// =====================================================
// Page 404 — Not Found
// =====================================================

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center text-center min-h-[60vh]">
      <p className="text-6xl font-bold text-studios-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page introuvable</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-studios">Retour à l'accueil</Link>
        <Link href="/portfolio" className="btn-outline">Voir le portfolio</Link>
      </div>
    </div>
  );
}
