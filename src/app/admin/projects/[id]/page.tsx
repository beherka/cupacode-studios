import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '../ProjectForm';
import type { Project } from '@/lib/supabase/types';

// =====================================================
// Page admin — Modifier un projet existant
// =====================================================

export const metadata: Metadata = {
  title: 'Admin — Modifier un projet',
  robots: { index: false, follow: false },
};

interface Props {
  params: { id: string };
}

export default async function EditProjectPage({ params }: Props) {
  const supabase = await createClient();

  // Vérification session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Récupération du projet à modifier
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !project) notFound();

  // Cast explicite : TypeScript ne déduit pas que notFound() est un never
  const safeProject = project as Project;

  return (
    <div className="section">
      <div className="container-page max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Modifier le projet</h1>
        <p className="text-sm text-gray-500 mb-8">
          Slug : <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{safeProject.slug}</code>
        </p>
        {/* Formulaire en mode édition avec le projet existant */}
        <ProjectForm mode="edit" project={safeProject} />
      </div>
    </div>
  );
}
