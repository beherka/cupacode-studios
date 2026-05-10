'use client';

import { useState } from 'react';
import { ProjectCard } from '../../components/ProjectCard';
import type { Project, ProjectCategory, ProjectBrand } from '../../lib/supabase/types';
import { CATEGORY_LABELS, BRAND_LABELS } from '../../lib/supabase/types';
import { cn } from '../../lib/utils';

interface PortfolioClientProps { projects: Project[]; }

const CATEGORY_OPTIONS: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all',         label: 'all' },
  { value: 'web_app',     label: 'web_app' },
  { value: 'website',     label: 'website' },
  { value: 'mobile_game', label: 'mobile_game' },
  { value: 'ci_cd',       label: 'ci_cd' },
];

const BRAND_OPTIONS: { value: ProjectBrand | 'all'; label: string }[] = [
  { value: 'all',               label: 'all brands' },
  { value: 'cupacode-studios',  label: 'cupacode-studios' },
  { value: 'cupadev',           label: 'cupadev' },
];

function FilterBtn({ active, brand, onClick, children }: {
  active: boolean; brand?: ProjectBrand | null; onClick: () => void; children: React.ReactNode;
}) {
  const activeColor = brand === 'cupadev'
    ? 'border-cupadev-400 text-cupadev-400 bg-cupadev-400/10'
    : brand === 'cupacode-studios'
    ? 'border-studios-500 text-studios-400 bg-studios-500/10'
    : 'border-gray-300 text-gray-100 bg-[#21262d]';

  return (
    <button
      onClick={onClick}
      className={cn(
        'font-mono text-xs px-3 py-1.5 rounded border transition-colors',
        active
          ? activeColor
          : 'border-[#30363d] text-gray-500 hover:border-[#3d444d] hover:text-gray-300'
      )}
    >
      {children}
    </button>
  );
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  const [cat,   setCat]   = useState<ProjectCategory | 'all'>('all');
  const [brand, setBrand] = useState<ProjectBrand | 'all'>('all');

  const filtered = projects.filter((p) =>
    (cat   === 'all' || p.category === cat) &&
    (brand === 'all' || p.brand    === brand)
  );

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_OPTIONS.map(({ value, label }) => (
            <FilterBtn key={value} active={cat === value} onClick={() => setCat(value)}>
              <span className="text-gray-600 mr-0.5">#</span>{label}
            </FilterBtn>
          ))}
        </div>
        <div className="hidden sm:block w-px bg-[#21262d] self-stretch" />
        <div className="flex flex-wrap gap-1.5">
          {BRAND_OPTIONS.map(({ value, label }) => (
            <FilterBtn
              key={value}
              active={brand === value}
              brand={value === 'all' ? null : value as ProjectBrand}
              onClick={() => setBrand(value)}
            >
              {label}
            </FilterBtn>
          ))}
        </div>
      </div>

      {/* Résultats */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-mono text-gray-600">// no results — try other filters</p>
        </div>
      ) : (
        <>
          <p className="font-mono text-xs text-gray-600 mb-4">
            // {filtered.length} project{filtered.length > 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </>
      )}
    </>
  );
}
