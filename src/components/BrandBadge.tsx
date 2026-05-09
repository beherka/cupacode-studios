// =====================================================
// BrandBadge — Badge visuel différenciant les deux marques
// =====================================================

import { cn } from '@/lib/utils';
import type { ProjectBrand } from '@/lib/supabase/types';
import { BRAND_LABELS } from '@/lib/supabase/types';

interface BrandBadgeProps {
  brand: ProjectBrand;
  size?: 'sm' | 'md';
  className?: string;
}

export function BrandBadge({ brand, size = 'md', className }: BrandBadgeProps) {
  // Différenciation visuelle nette entre les deux marques
  const brandStyles: Record<ProjectBrand, string> = {
    'cupadev': [
      'bg-cupadev-100 text-cupadev-800 border border-cupadev-200',
      'dark:bg-cupadev-900 dark:text-cupadev-200 dark:border-cupadev-700',
    ].join(' '),
    'cupacode-studios': [
      'bg-studios-100 text-studios-800 border border-studios-200',
      'dark:bg-studios-900 dark:text-studios-200 dark:border-studios-700',
    ].join(' '),
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md',
    md: 'text-sm px-3 py-1 rounded-lg',
  };

  // Point coloré indicateur de marque
  const dotStyles: Record<ProjectBrand, string> = {
    'cupadev':          'bg-cupadev-500',
    'cupacode-studios': 'bg-studios-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold',
        brandStyles[brand],
        sizeStyles[size],
        className
      )}
    >
      {/* Point coloré caractéristique de la marque */}
      <span className={cn('inline-block w-1.5 h-1.5 rounded-full', dotStyles[brand])} />
      {BRAND_LABELS[brand]}
    </span>
  );
}
