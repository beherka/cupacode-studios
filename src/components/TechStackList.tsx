import { cn } from '@/lib/utils';

interface TechStackListProps {
  techs: string[];
  maxVisible?: number;
  className?: string;
}

export function TechStackList({ techs, maxVisible, className }: TechStackListProps) {
  const visible = maxVisible ? techs.slice(0, maxVisible) : techs;
  const hidden  = maxVisible ? techs.length - maxVisible : 0;

  return (
    <ul className={cn('flex flex-wrap gap-1', className)}>
      {visible.map((tech) => (
        <li key={tech}>
          <span className="inline-block font-mono text-xs px-1.5 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-gray-500">
            {tech}
          </span>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <span className="inline-block font-mono text-xs px-1.5 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-gray-700">
            +{hidden}
          </span>
        </li>
      )}
    </ul>
  );
}
