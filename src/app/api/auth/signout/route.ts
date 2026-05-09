import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// =====================================================
// Route Handler — Déconnexion Supabase
// POST /api/auth/signout
// =====================================================

export async function POST() {
  const supabase = await createClient();

  // Déconnexion de la session courante
  await supabase.auth.signOut();

  // Redirection vers l'accueil après déconnexion
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL!), {
    status: 302,
  });
}
