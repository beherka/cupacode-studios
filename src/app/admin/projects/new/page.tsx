import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '../ProjectForm';

// =====================================================
// Page admin — Créer un nouveau projet
// =====================================================

export const metadata: Metadata = {
  title: 'Admin — Nouveau projet',
  robots: { index: false, follow: false },
};

export default async function NewProjectPage() {
  const supabase = await createClient();

  // Vérification session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="section">
      <div className="container-page max-w-2xl">
        <p className="font-mono text-xs text-gray-500 mb-1">&gt;_ admin</p>
        <h1 className="text-xl font-bold text-gray-100 mb-8">Nouveau projet</h1>
        {/* Formulaire en mode création (pas de projet initial) */}
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}
