import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

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

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
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
 * Client avec la clé service_role (contourne les RLS).
 * Usage : scripts d'admin uniquement, JAMAIS exposé au navigateur.
 */
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
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
