-- =====================================================
-- Schéma Supabase — Cupacode Studios Portfolio
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- =====================================================

-- Extension pour les UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUM : catégories de projets
-- =====================================================
CREATE TYPE project_category AS ENUM (
  'web_app',      -- Applications web / SaaS
  'website',      -- Sites web
  'mobile_game',  -- Jeux mobiles
  'ci_cd'         -- Infrastructure / CI-CD (CUPADEV)
);

-- =====================================================
-- ENUM : marques
-- =====================================================
CREATE TYPE project_brand AS ENUM (
  'cupadev',          -- Pôle DevOps / infrastructure
  'cupacode-studios'  -- Pôle studio dev / jeux
);

-- =====================================================
-- TABLE : projects
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id               UUID          DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug             TEXT          NOT NULL UNIQUE,                        -- URL slug unique (ex: "pulse-crisis")
  title            TEXT          NOT NULL,                               -- Titre du projet
  description_short TEXT         NOT NULL,                               -- Résumé court (max ~160 car.)
  description_long  TEXT         NOT NULL DEFAULT '',                    -- Fiche détaillée complète
  category         project_category NOT NULL,                            -- Catégorie
  brand            project_brand   NOT NULL,                             -- Marque associée
  tech_stack       TEXT[]        NOT NULL DEFAULT '{}',                  -- Tableau de technologies
  external_url     TEXT,                                                 -- URL publique (null si projet privé)
  screenshots      TEXT[]        NOT NULL DEFAULT '{}',                  -- Chemins Storage Supabase
  featured         BOOLEAN       NOT NULL DEFAULT false,                 -- Mis en avant sur la home ?
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  -- Validation slug : lettres minuscules, chiffres, tirets uniquement
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$')
);

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index pour les filtres fréquents
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_brand    ON public.projects(brand);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = true;

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Lecture publique : tout le monde peut lire les projets
CREATE POLICY "Lecture publique des projets"
  ON public.projects
  FOR SELECT
  USING (true);

-- Insertion réservée aux admins (service_role ou utilisateurs avec role 'admin')
CREATE POLICY "Insertion réservée aux admins"
  ON public.projects
  FOR INSERT
  WITH CHECK (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- Mise à jour réservée aux admins
CREATE POLICY "Mise à jour réservée aux admins"
  ON public.projects
  FOR UPDATE
  USING (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- Suppression réservée aux admins
CREATE POLICY "Suppression réservée aux admins"
  ON public.projects
  FOR DELETE
  USING (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- =====================================================
-- STORAGE : bucket project-screenshots
-- =====================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-screenshots', 'project-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Lecture publique du bucket
CREATE POLICY "Lecture publique screenshots"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-screenshots');

-- Upload réservé aux admins
CREATE POLICY "Upload admin screenshots"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-screenshots'
    AND (
      auth.role() = 'service_role'
      OR (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
    )
  );

-- Suppression réservée aux admins
CREATE POLICY "Suppression admin screenshots"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'project-screenshots'
    AND (
      auth.role() = 'service_role'
      OR (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
    )
  );
