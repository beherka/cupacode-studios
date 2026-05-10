'use client';

// =====================================================
// ScreenshotGallery — Galerie de captures d'écran
// Composant client pour les interactions (lightbox)
// =====================================================

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, getStorageUrl } from '../lib/utils';

interface ScreenshotGalleryProps {
  screenshots: string[];  // chemins Storage (sans l'URL de base)
  projectTitle: string;
}

export function ScreenshotGallery({ screenshots, projectTitle }: ScreenshotGalleryProps) {
  // Index de l'image affichée dans la lightbox (null = fermée)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (screenshots.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Aucune capture d'écran disponible
        </p>
      </div>
    );
  }

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + screenshots.length) % screenshots.length : null));

  const goToNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % screenshots.length : null));

  return (
    <>
      {/* Grille miniatures */}
      <div
        className={cn(
          'grid gap-3',
          screenshots.length === 1 ? 'grid-cols-1' :
          screenshots.length === 2 ? 'grid-cols-2' :
          'grid-cols-2 md:grid-cols-3'
        )}
      >
        {screenshots.map((src, index) => (
          <button
            key={src}
            onClick={() => openLightbox(index)}
            className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
            aria-label={`Agrandir la capture ${index + 1} de ${projectTitle}`}
          >
            <Image
              src={getStorageUrl(src)}
              alt={`${projectTitle} — capture ${index + 1}`}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Overlay hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox modale */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie de ${projectTitle}`}
        >
          {/* Image principale */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={getStorageUrl(screenshots[lightboxIndex])}
                alt={`${projectTitle} — capture ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Compteur */}
            <p className="text-center text-sm text-gray-400 mt-3">
              {lightboxIndex + 1} / {screenshots.length}
            </p>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Fermer la galerie"
          >
            <X size={20} />
          </button>

          {/* Navigation précédent */}
          {screenshots.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Image précédente"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Navigation suivant */}
          {screenshots.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
