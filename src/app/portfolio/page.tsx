import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { PortfolioClient } from './PortfolioClient';
import type { Project } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Applications web SaaS, sites vitrines, jeux mobiles et projets CI/CD.',
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <div className="section">
      <div className="container-page">
        <div className="mb-10">
          <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-2">
            ~/portfolio
          </p>
          <h1 className="font-mono text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
            <span className="text-cupadev-400">&gt;_</span> Projects
          </h1>
          <p className="font-mono text-sm text-gray-500">
            // {projects.length} projet{projects.length > 1 ? 's' : ''} — filter by category or brand
          </p>
        </div>
        <PortfolioClient projects={projects} />
      </div>
    </div>
  );
}
