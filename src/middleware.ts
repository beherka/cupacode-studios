import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =====================================================
// Middleware Next.js — Protection des routes /admin/*
// Exécuté côté Edge avant chaque requête
// =====================================================

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Création du client Supabase dans le contexte Edge
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Propagation des cookies dans la requête et la réponse
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Rafraîchissement de la session (nécessaire pour les tokens expirés)
  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // ─── Protection des routes /admin/* ───────────────────────
  if (pathname.startsWith('/admin')) {
    if (!user) {
      // Redirection vers /login avec l'URL de retour
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ─── Redirection si déjà connecté et tente d'accéder au login ─
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

// Patterns de routes couverts par le middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
  ],
};
