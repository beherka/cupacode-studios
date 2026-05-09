'use client';

// =====================================================
// Client Supabase — côté navigateur (Client Components)
// Utilise @supabase/ssr pour partager la session avec le serveur
// =====================================================

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Crée un client Supabase pour les Client Components.
 * Appelé dans les composants React marqués 'use client'.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
