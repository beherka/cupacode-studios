-- =====================================================
-- Mise à jour des URLs publiques des projets
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- =====================================================

UPDATE public.projects SET external_url = 'https://pulse-crisis.ai'   WHERE slug = 'pulse-crisis';
UPDATE public.projects SET external_url = 'https://dealtrainer.ai'     WHERE slug = 'deal-trainer';
UPDATE public.projects SET external_url = 'https://cibnet.fr'          WHERE slug = 'cibnet';
