import { cn } from '@/lib/utils';
import type { ProjectBrand } from '@/lib/supabase/types';

interface BrandBadgeProps {
  brand: ProjectBrand;
  size?: 'sm' | 'md';
  className?: string;
}

export function BrandBadge({ brand, size = 'md', className }: BrandBadgeProps) {
  const styles: Record<ProjectBrand, string> = {
    'cupadev':          'text-cupadev-400 border-cupadev-400/30 bg-cupadev-400/10',
    'cupacode-studios': 'text-studios-400 border-studios-500/30 bg-studios-500/10',
  };
  const labels: Record<ProjectBrand, string> = {
    'cupadev':          'cupadev',
    'cupacode-studios': 'cupacode-studios',
  };
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={cn(
      'inline-flex items-center gap-1 font-mono font-medium rounded border',
      styles[brand],
      sizeClass,
      className
    )}>
      <span className="opacity-60">#</span>
      {labels[brand]}
    </span>
  );
}
