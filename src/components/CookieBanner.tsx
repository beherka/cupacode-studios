'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cupacode-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Afficher uniquement si aucun choix n'a été fait
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#21262d] bg-[#0d1117]/95 backdrop-blur-md"
    >
      <div className="container-page py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-xs font-mono text-gray-400 leading-relaxed max-w-2xl">
          <span className="text-cupadev-400 mr-1">&gt;_</span>
          Ce site utilise uniquement des cookies techniques indispensables à son fonctionnement.
          Aucun cookie publicitaire ni de tracking tiers.{' '}
          <Link href="/politique-confidentialite" className="text-cupadev-400 hover:text-cupadev-300 underline underline-offset-2">
            En savoir plus
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={refuse}
            className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 border border-[#30363d] rounded"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="btn-studios py-1.5 px-3 text-xs"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
