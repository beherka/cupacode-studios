import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="terminal-badge mb-6">
        <span className="text-red-400">$</span>
        <span className="text-gray-300">cd /page-not-found</span>
      </div>
      <p className="font-mono text-6xl font-bold text-[#21262d] mb-4">404</p>
      <h1 className="font-mono text-xl font-bold text-gray-300 mb-2">Page introuvable</h1>
      <p className="font-mono text-sm text-gray-600 mb-8">
        // Cette route n&apos;existe pas
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-cupadev text-xs py-1.5 px-3">./home</Link>
        <Link href="/portfolio" className="btn-outline text-xs py-1.5 px-3">./portfolio</Link>
      </div>
    </div>
  );
}
