// =====================================================
// Utilitaires globaux
// =====================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusion de classes Tailwind avec résolution des conflits.
 * Exemple : cn('px-2 py-1', condition && 'bg-blue-500')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date ISO en date lisible française.
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

/**
 * Tronque un texte à `maxLength` caractères en ajoutant "…".
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + '…';
}

/**
 * Retourne l'URL publique d'un screenshot Supabase Storage.
 */
export function getStorageUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${baseUrl}/storage/v1/object/public/project-screenshots/${path}`;
}
