'use client';

// =====================================================
// PortfolioClient — Filtres interactifs + grille de projets
// Composant client car il maintient l'état des filtres
// =====================================================

import { useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project, ProjectCategory, ProjectBrand } from '@/lib/supabase/types';
import { CATEGORY_LABELS, BRAND_LABELS } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';

interface PortfolioClientProps {
  projects: Project[];
}

// Options de filtres
const CATEGORY_OPTIONS: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all',         label: 'Tout' },
  { value: 'web_app',     label: CATEGORY_LABELS.web_app },
  { value: 'website',     label: CATEGORY_LABELS.website },
  { value: 'mobile_game', label: CATEGORY_LABELS.mobile_game },
  { value: 'ci_cd',       label: CATEGORY_LABELS.ci_cd },
];

const BRAND_OPTIONS: { value: ProjectBrand | 'all'; label: string }[] = [
  { value: 'all',               label: 'Les deux marques' },
  { value: 'cupacode-studios',  label: BRAND_LABELS['cupacode-studios'] },
  { value: 'cupadev',           label: BRAND_LABELS['cupadev'] },
];

export function PortfolioClient({ projects }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [activeBrand, setActiveBrand]       = useState<ProjectBrand | 'all'>('all');

  // Application des filtres
  const filtered = projects.filter((p) => {
    const categoryMatch = activeCategory === 'all' || p.category === activeCategory;
    const brandMatch    = activeBrand    === 'all' || p.brand    === activeBrand;
    return categoryMatch && brandMatch;
  });

  return (
    <>
      {/* ─── Filtres ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Filtre par catégorie */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors',
                activeCategory === value
                  ? 'bg-studios-600 text-white border-studios-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Séparateur */}
        <div className="hidden sm:block w-px bg-gray-200 self-stretch" />

        {/* Filtre par marque */}
        <div className="flex flex-wrap gap-2">
          {BRAND_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveBrand(value)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors',
                activeBrand === value
                  ? value === 'cupadev'
                    ? 'bg-cupadev-600 text-white border-cupadev-600'
                    : 'bg-studios-600 text-white border-studios-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Résultats ─────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">Aucun projet correspondant</p>
          <p className="text-sm mt-1">Essayez d&apos;autres filtres.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 mb-5">
            {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
