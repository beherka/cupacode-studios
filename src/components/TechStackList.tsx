// =====================================================
// TechStackList — Liste des technologies d'un projet
// =====================================================

import { cn } from '@/lib/utils';

interface TechStackListProps {
  techs: string[];
  /** Nombre maximum de tags à afficher (le reste est masqué avec "+N") */
  maxVisible?: number;
  className?: string;
}

export function TechStackList({ techs, maxVisible, className }: TechStackListProps) {
  const visible = maxVisible ? techs.slice(0, maxVisible) : techs;
  const hidden  = maxVisible ? techs.length - maxVisible : 0;

  return (
    <ul
      className={cn('flex flex-wrap gap-1.5', className)}
      aria-label="Technologies utilisées"
    >
      {visible.map((tech) => (
        <li key={tech}>
          <span className="inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
            {tech}
          </span>
        </li>
      ))}

      {/* Badge "+N" si des technologies sont masquées */}
      {hidden > 0 && (
        <li>
          <span className="inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            +{hidden}
          </span>
        </li>
      )}
    </ul>
  );
}
