'use client';

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
  const accentBorder: Record<string, string> = {
    'cupadev':          'group-hover:border-cupadev-400/50',
    'cupacode-studios': 'group-hover:border-studios-500/50',
  };
  const accentGlow: Record<string, string> = {
    'cupadev':          'bg-cupadev-400/5',
    'cupacode-studios': 'bg-studios-500/5',
  };
  const topBorder: Record<string, string> = {
    'cupadev':          'border-t-cupadev-400',
    'cupacode-studios': 'border-t-studios-500',
  };

  return (
    <article className={cn(
      'group relative flex flex-col rounded-lg border border-[#21262d] bg-[#0d1117]',
      'transition-all duration-200 border-t-2 overflow-hidden',
      topBorder[project.brand] ?? 'border-t-[#30363d]',
      accentBorder[project.brand],
      className
    )}>
      {/* Glow de hover */}
      <div className={cn(
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
        accentGlow[project.brand]
      )} />

      {/* Vignette */}
      <div className="relative h-44 overflow-hidden bg-[#161b22] shrink-0">
        {project.screenshots.length > 0 ? (
          <Image
            src={getStorageUrl(project.screenshots[0])}
            alt={`Capture de ${project.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <>
            <img
              src={`/projects/${project.slug}.jpg`}
              alt={`Capture de ${project.title}`}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-95 transition-opacity duration-300"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <span className="font-mono text-5xl font-bold text-[#21262d] select-none">
                {project.title.charAt(0).toUpperCase()}
              </span>
            </div>
          </>
        )}

        {project.featured && (
          <div className="absolute top-2 right-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 border border-[#30363d] text-cupadev-400 backdrop-blur-sm">
              ★ featured
            </span>
          </div>
        )}

        {/* Catégorie en overlay bas gauche */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-gradient-to-t from-[#0d1117] to-transparent">
          <span className="font-mono text-[10px] text-gray-600">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="relative flex flex-1 flex-col gap-2.5 p-4">
        <BrandBadge brand={project.brand} size="sm" />

        <h3 className="font-mono text-base font-bold text-gray-100 leading-snug">
          {project.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-3 flex-1 leading-relaxed">
          {project.description_short}
        </p>

        <TechStackList techs={project.tech_stack} maxVisible={4} />

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-[#21262d]">
          <Link
            href={`/portfolio/${project.slug}`}
            className="font-mono text-xs text-gray-500 hover:text-cupadev-400 transition-colors"
          >
            ./voir-fiche →
          </Link>
          {project.external_url ? (
            <a
              href={project.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-gray-600 hover:text-studios-400 transition-colors"
            >
              <ExternalLink size={11} /> live ↗
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-gray-700">
              <Lock size={11} /> private
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
