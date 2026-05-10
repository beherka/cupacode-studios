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
  const brandAccentClass: Record<string, string> = {
    'cupadev':          'border-t-cupadev-400',
    'cupacode-studios': 'border-t-studios-500',
  };

  return (
    <article className={cn(
      'group flex flex-col rounded-lg border border-[#21262d] bg-[#0d1117]',
      'hover:border-[#30363d] transition-colors duration-200',
      'border-t-2',
      brandAccentClass[project.brand] ?? 'border-t-[#30363d]',
      className
    )}>
      {/* Vignette */}
      <div className="relative h-40 overflow-hidden rounded-t-md bg-[#161b22]">
        {project.screenshots.length > 0 ? (
          <Image
            src={getStorageUrl(project.screenshots[0])}
            alt={`Capture de ${project.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <>
            {/* Miniature statique : déposer /public/projects/[slug].jpg */}
            <img
              src={`/projects/${project.slug}.jpg`}
              alt={`Capture de ${project.title}`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="flex h-full items-center justify-center absolute inset-0 -z-10">
              <span className="font-mono text-4xl font-bold text-[#30363d] select-none">
                {project.title.charAt(0).toUpperCase()}
              </span>
            </div>
          </>
        )}
        {project.featured && (
          <div className="absolute top-2 right-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-cupadev-400">
              ★ featured
            </span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <BrandBadge brand={project.brand} size="sm" />
          <span className="font-mono text-xs text-gray-600">{CATEGORY_LABELS[project.category]}</span>
        </div>

        <h3 className="font-mono text-base font-bold text-gray-100">{project.title}</h3>

        <p className="text-xs text-gray-500 line-clamp-3 flex-1 leading-relaxed">
          {project.description_short}
        </p>

        <TechStackList techs={project.tech_stack} maxVisible={4} />

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-[#21262d]">
          <Link href={`/portfolio/${project.slug}`}
            className="font-mono text-xs text-gray-500 hover:text-cupadev-400 transition-colors">
            ./voir-fiche →
          </Link>
          {project.external_url ? (
            <a href={project.external_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-gray-600 hover:text-studios-400 transition-colors">
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
