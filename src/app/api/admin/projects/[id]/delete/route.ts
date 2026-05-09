import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// =====================================================
// Route Handler — Suppression d'un projet
// POST /api/admin/projects/[id]/delete
// =====================================================

interface Params {
  params: { id: string };
}

export async function POST(_req: Request, { params }: Params) {
  const supabase = await createClient();

  // Vérification de la session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  // Récupération des screenshots pour nettoyage Storage
  const { data: project } = await supabase
    .from('projects')
    .select('screenshots')
    .eq('id', params.id)
    .single();

  // Suppression des screenshots dans Storage si présents
  if (project?.screenshots?.length) {
    await supabase.storage.from('project-screenshots').remove(project.screenshots);
  }

  // Suppression du projet en base
  const { error } = await supabase.from('projects').delete().eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Redirection vers le dashboard admin après suppression
  return NextResponse.redirect(
    new URL('/admin', process.env.NEXT_PUBLIC_SITE_URL!),
    { status: 302 }
  );
}
