import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// =====================================================
// Client Supabase — côté serveur (Server Components, Actions, Route Handlers)
// Gère automatiquement les cookies de session
// =====================================================

/**
 * Crée un client Supabase pour les Server Components.
 * Doit être appelé à l'intérieur d'une fonction asynchrone
 * (Server Component, Route Handler, Server Action).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll peut échouer dans les Server Components en lecture seule.
            // Le middleware s'occupe de rafraîchir la session dans ce cas.
          }
        },
      },
    }
  );
}

/**
 * Client Supabase sans cookies — pour generateStaticParams et build time.
 * N'utilise pas next/headers donc fonctionne hors contexte de requête HTTP.
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Client avec la clé service_role (contourne les RLS).
 * Usage : scripts d'admin uniquement, JAMAIS exposé au navigateur.
 */
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // ignoré en lecture seule
          }
        },
      },
    }
  );
}
