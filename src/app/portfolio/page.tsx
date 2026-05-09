import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { PortfolioClient } from './PortfolioClient';
import type { Project, ProjectCategory, ProjectBrand } from '@/lib/supabase/types';

// =====================================================
// Page Portfolio — liste filtrable de tous les projets
// =====================================================

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Découvrez toutes nos réalisations : applications web SaaS, sites vitrines, jeux mobiles et projets d\'infrastructure CI/CD.',
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  // Récupération de tous les projets depuis Supabase
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Portfolio] Erreur Supabase:', error.message);
  }

  const projects: Project[] = data ?? [];

  return (
    <div className="section">
      <div className="container-page">
        {/* En-tête */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Notre Portfolio
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            {projects.length} projet{projects.length > 1 ? 's' : ''} réalisé{projects.length > 1 ? 's' : ''} —
            filtrez par catégorie ou par marque.
          </p>
        </div>

        {/* Composant client pour le filtrage interactif */}
        <PortfolioClient projects={projects} />
      </div>
    </div>
  );
}
