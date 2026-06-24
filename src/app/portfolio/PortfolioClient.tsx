'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from '../../components/ProjectCard';
import type { Project, ProjectCategory, ProjectBrand } from '../../lib/supabase/types';
import { CATEGORY_LABELS, BRAND_LABELS } from '../../lib/supabase/types';
import { cn } from '../../lib/utils';

interface PortfolioClientProps { projects: Project[]; }

type CatFilter   = ProjectCategory | 'all';
type BrandFilter = ProjectBrand    | 'all';

function FilterBtn({ active, accent, count, onClick, children }: {
  active: boolean;
  accent?: 'cupadev' | 'studios' | 'default';
  count?: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const activeClass =
    accent === 'cupadev'  ? 'border-cupadev-400 text-cupadev-400 bg-cupadev-400/10' :
    accent === 'studios'  ? 'border-studios-500 text-studios-400 bg-studios-500/10' :
    'border-gray-400 text-gray-100 bg-[#21262d]';

  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border transition-all duration-150',
        active
          ? activeClass
          : 'border-[#30363d] text-gray-500 hover:border-[#3d444d] hover:text-gray-300'
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn(
          'text-[10px] px-1 rounded',
          active ? 'opacity-70' : 'text-gray-700'
        )}>
          {count}
        </span>
      )}
    </button>
  );
}

export function PortfolioClient({ projects }: PortfolioClientProps) {
  const [cat,   setCat]   = useState<CatFilter>('all');
  const [brand, setBrand] = useState<BrandFilter>('all');

  const filtered = useMemo(() =>
    projects.filter(p =>
      (cat   === 'all' || p.category === cat) &&
      (brand === 'all' || p.brand    === brand)
    ), [projects, cat, brand]
  );

  // Compteurs par catégorie et marque (sur la sélection de marque active)
  const countByCat = useMemo(() => {
    const base = brand === 'all' ? projects : projects.filter(p => p.brand === brand);
    return Object.fromEntries(
      (['all', 'web_app', 'website', 'mobile_game', 'ci_cd'] as CatFilter[]).map(c => [
        c,
        c === 'all' ? base.length : base.filter(p => p.category === c).length,
      ])
    );
  }, [projects, brand]);

  const countByBrand = useMemo(() => {
    const base = cat === 'all' ? projects : projects.filter(p => p.category === cat);
    return {
      all:               base.length,
      'cupadev':         base.filter(p => p.brand === 'cupadev').length,
      'cupacode-studios':base.filter(p => p.brand === 'cupacode-studios').length,
    };
  }, [projects, cat]);

  const CATEGORIES: { value: CatFilter; label: string }[] = [
    { value: 'all',         label: 'all' },
    { value: 'web_app',     label: CATEGORY_LABELS.web_app },
    { value: 'website',     label: CATEGORY_LABELS.website },
    { value: 'mobile_game', label: CATEGORY_LABELS.mobile_game },
    { value: 'ci_cd',       label: CATEGORY_LABELS.ci_cd },
  ];

  const BRANDS: { value: BrandFilter; label: string; accent?: 'cupadev' | 'studios' }[] = [
    { value: 'all',               label: 'all brands' },
    { value: 'cupacode-studios',  label: BRAND_LABELS['cupacode-studios'], accent: 'studios' },
    { value: 'cupadev',           label: BRAND_LABELS.cupadev,             accent: 'cupadev' },
  ];

  return (
    <>
      {/* ── Filtres ── */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Catégories */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(({ value, label }) => (
            <FilterBtn
              key={value}
              active={cat === value}
              count={countByCat[value]}
              onClick={() => setCat(value)}
            >
              <span className="text-gray-600 mr-0.5">#</span>{label}
            </FilterBtn>
          ))}
        </div>

        {/* Séparateur + filtres marque */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#21262d]" />
          <div className="flex flex-wrap gap-1.5">
            {BRANDS.map(({ value, label, accent }) => (
              <FilterBtn
                key={value}
                active={brand === value}
                accent={accent ?? 'default'}
                count={countByBrand[value]}
                onClick={() => setBrand(value)}
              >
                {label}
              </FilterBtn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Résultats ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-mono text-gray-600 mb-2">// no results</p>
          <button
            onClick={() => { setCat('all'); setBrand('all'); }}
            className="font-mono text-xs text-gray-600 hover:text-cupadev-400 transition-colors underline underline-offset-2"
          >
            reset filters
          </button>
        </div>
      ) : (
        <>
          <p className="font-mono text-xs text-gray-600 mb-5">
            // <span className="text-gray-400">{filtered.length}</span> project{filtered.length > 1 ? 's' : ''} found
            {(cat !== 'all' || brand !== 'all') && (
              <button
                onClick={() => { setCat('all'); setBrand('all'); }}
                className="ml-3 text-gray-700 hover:text-gray-400 transition-colors"
              >
                × reset
              </button>
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </>
      )}
    </>
  );
}
