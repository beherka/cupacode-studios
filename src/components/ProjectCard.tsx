// =====================================================
// ProjectCard — Carte projet pour la page portfolio
// =====================================================

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrandBadge } from './BrandBadge';
import { TechStackList } from './TechStackList';
import type { Project } from '@/lib/supabase/types';
import { CATEGORY_LABELS } from '@/lib/supabase/types';
import { getStorageUrl } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  // Bordure colorée selon la marque (différenciation visuelle)
  const brandAccent: Record<string, string> = {
    'cupadev':          'border-t-cupadev-500',
    'cupacode-studios': 'border-t-studios-500',
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm',
        'hover:shadow-md transition-shadow duration-200',
        'border-t-4',
        brandAccent[project.brand] ?? 'border-t-gray-300',
        'dark:bg-gray-900 dark:border-gray-700',
        className
      )}
    >
      {/* Vignette screenshot ou placeholder */}
      <div className="relative h-44 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
        {project.screenshots.length > 0 ? (
          <Image
            src={getStorageUrl(project.screenshots[0])}
            alt={`Capture d'écran de ${project.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Placeholder avec initiales du projet
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl font-bold text-gray-300 dark:text-gray-600 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Badge "Featured" */}
        {project.featured && (
          <div className="absolute top-2 right-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              En vedette
            </span>
          </div>
        )}
      </div>

      {/* Contenu textuel */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* En-tête : marque + catégorie */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <BrandBadge brand={project.brand} size="sm" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
          {project.title}
        </h3>

        {/* Description courte */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
          {project.description_short}
        </p>

        {/* Stack technique */}
        <TechStackList techs={project.tech_stack} maxVisible={4} />

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          {/* Lien vers la fiche détaillée */}
          <Link
            href={`/portfolio/${project.slug}`}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Voir la fiche →
          </Link>

          {/* Lien externe si disponible */}
          {project.external_url ? (
            <a
              href={project.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label={`Ouvrir ${project.title} (nouvel onglet)`}
            >
              <ExternalLink size={13} />
              Site live
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600">
              <Lock size={13} />
              Projet privé
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
