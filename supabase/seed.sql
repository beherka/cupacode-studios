-- =====================================================
-- Seed initial — 8 projets Cupacode Studios / CUPADEV
-- À exécuter après schema.sql
-- =====================================================

INSERT INTO public.projects
  (slug, title, description_short, description_long, category, brand, tech_stack, external_url, screenshots, featured)
VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Pulse-Crisis — Application web SaaS (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'pulse-crisis',
  'Pulse-Crisis',
  'Plateforme SaaS de gestion de crises en temps réel pour les équipes ASTREINTE et DSI.',
  'Pulse-Crisis est une application web SaaS conçue pour centraliser la gestion d''incidents critiques au sein des organisations.

**Fonctionnalités clés :**
- Tableau de bord temps réel avec WebSockets
- Système de tickets d''escalade multi-niveaux
- Alertes SMS / email automatiques (intégration Twilio + Resend)
- Chronologie interactive des incidents
- Export PDF des post-mortems
- Gestion des astreintes (rotations, calendrier)

**Architecture :**
Le frontend est une SPA Next.js connectée à une API FastAPI. Les événements temps réel transitent par Supabase Realtime. Les fichiers sont stockés dans Supabase Storage.

**Contexte :**
Développé pour répondre aux besoins d''une DSI régionale gérant plusieurs établissements de santé. Déployé sur Vercel + Railway.',
  'web_app',
  'cupacode-studios',
  ARRAY['Next.js 14', 'FastAPI', 'Supabase', 'WebSockets', 'Twilio', 'Tailwind CSS', 'PostgreSQL'],
  NULL,
  ARRAY[]::TEXT[],
  true
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Deal Trainer — Application web SaaS (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'deal-trainer',
  'Deal Trainer',
  'Simulateur de négociation commerciale IA pour former les équipes de vente B2B.',
  'Deal Trainer est une plateforme d''entraînement à la vente alimentée par l''IA (Claude Sonnet). Les commerciaux s''exercent face à un acheteur virtuel réaliste avant leurs vraies négociations.

**Fonctionnalités clés :**
- Persona acheteur paramétrable (secteur, budget, objections types)
- Sessions de roleplay conversationnel avec feedback immédiat
- Scoring automatique : écoute active, argumentation, closing
- Bibliothèque de scénarios (SaaS, industrie, immobilier…)
- Tableau de bord manager avec progression par commercial
- Mode live coaching (superviseur observe en temps réel)

**Architecture :**
Next.js frontend, API Anthropic Claude Sonnet pour le dialogue, PostgreSQL pour l''historique des sessions, Redis pour les sessions actives.

**Résultats clients :**
+34 % de taux de closing observé sur 3 mois d''utilisation chez un client pilote.',
  'web_app',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Claude Sonnet', 'Anthropic SDK', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
  NULL,
  ARRAY[]::TEXT[],
  true
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Analyse-Conseil — Application web SaaS (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'analyse-conseil',
  'Analyse-Conseil',
  'Plateforme de production de livrables pour cabinets de conseil IT (PSSI, EBIOS RM, rapports ITIL).',
  'Analyse-Conseil est un outil SaaS destiné aux consultants IT. Il automatise la production de livrables professionnels (notes de cadrage, analyses de risques, rapports d''exploitation) grâce à l''IA.

**Fonctionnalités clés :**
- Génération de livrables par type (avant-vente, build, run)
- Analyse de risques EBIOS RM avec cartographie
- RAG sur référentiels (ISO 27001, ITIL 4, RGPD)
- Export PDF / Word / Excel des livrables
- Gestion multi-missions et multi-clients
- Dashboard KPIs ITIL

**Architecture :**
FastAPI + Next.js 14 + PostgreSQL + pgvector (RAG) + MinIO (stockage fichiers) + Celery (tâches asynchrones). Anthropic Claude Sonnet pour la génération.

**Stack complète :**
Déployé via Docker Compose, scalable sur Kubernetes.',
  'web_app',
  'cupacode-studios',
  ARRAY['Next.js 14', 'FastAPI', 'PostgreSQL', 'pgvector', 'Claude Sonnet', 'MinIO', 'Celery', 'Redis', 'Docker'],
  NULL,
  ARRAY[]::TEXT[],
  false
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. DSI-Management — Application web SaaS (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'dsi-management',
  'DSI-Management',
  'Outil de pilotage stratégique pour Directeurs des Systèmes d''Information (indicateurs, roadmaps, gouvernance).',
  'DSI-Management est une plateforme de pilotage conçue pour les DSI et RSSI. Elle centralise les indicateurs de performance IT, les roadmaps projets et les éléments de gouvernance.

**Fonctionnalités clés :**
- Tableau de bord COBIT / ITIL avec KPIs personnalisables
- Gestionnaire de roadmap avec dépendances Gantt
- Module RGPD : registre des traitements, DCP, incidents
- Gestion du budget IT et des contrats fournisseurs
- Rapports automatisés pour CODIR / COMEX
- Gestion des utilisateurs et des périmètres SI

**Architecture :**
Monorepo Next.js + API Routes. Données en PostgreSQL (Supabase). Graphiques via Recharts. Authentification SSO SAML.

**Public cible :**
DSI de PME/ETI (50–500 salariés), collectivités territoriales, établissements de santé.',
  'web_app',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Supabase', 'PostgreSQL', 'Recharts', 'Tailwind CSS', 'TypeScript'],
  NULL,
  ARRAY[]::TEXT[],
  false
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. Cibnet — Site web (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'cibnet',
  'Cibnet',
  'Site web corporate pour un opérateur télécom et fibre optique en Nouvelle-Aquitaine.',
  'Cibnet est le site vitrine d''un opérateur télécom régional proposant des offres fibre, téléphonie et solutions cloud aux entreprises et collectivités.

**Réalisation :**
- Design responsive mobile-first
- Configurateur d''offres interactif
- Espace client avec espace de téléchargement des factures
- Intégration CRM pour le suivi des leads
- SEO on-page optimisé (Core Web Vitals score 95+)

**Stack :**
Next.js 14 avec génération statique (SSG) pour les pages marketing. Formulaires connectés à un CRM via API REST.

**Résultat :**
+60 % de leads organiques en 6 mois post-lancement.',
  'website',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Vercel', 'Supabase'],
  NULL,
  ARRAY[]::TEXT[],
  false
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Owlcub — Site web (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'owlcub',
  'Owlcub',
  'Site web et plateforme SaaS pour une startup cybersécurité (audit RGPD, PSSI, conformité ISO 27001).',
  'Owlcub est une startup spécialisée en cybersécurité et conformité réglementaire. La plateforme accompagne PME et collectivités dans leurs démarches RGPD, ISO 27001 et NIS2.

**Réalisation complète :**
- Site marketing multi-pages avec blog SEO
- Application SaaS avec espace client sécurisé
- Module d''audit RGPD automatisé (questionnaires + scoring)
- Génération de PSSI personnalisée par l''IA
- Dashboard de conformité avec plan d''action priorisé

**Architecture :**
Monorepo Turborepo : marketing site (Next.js SSG) + app SaaS (Next.js SSR) + API FastAPI. Base de données Supabase.

**Déploiement :**
Vercel (frontend) + Railway (API). CDN Cloudflare.',
  'website',
  'cupacode-studios',
  ARRAY['Next.js 14', 'FastAPI', 'Supabase', 'Turborepo', 'Tailwind CSS', 'Vercel', 'Cloudflare'],
  NULL,
  ARRAY[]::TEXT[],
  true
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. École-Adom — Site web (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'ecole-adom',
  'École-Adom',
  'Plateforme web pour un organisme de soutien scolaire à domicile (inscription, suivi, paiement).',
  'École-Adom est un organisme de soutien scolaire à domicile. La plateforme gère l''ensemble du parcours client : prise de contact, matching élève/professeur, planning, suivi pédagogique et facturation.

**Fonctionnalités :**
- Portail parents : inscription, suivi des séances, messagerie
- Portail enseignants : planning, feuilles d''émargement, ressources
- Back-office admin : gestion des contrats, facturation, statistiques
- Paiement en ligne sécurisé (Stripe)
- Notifications automatiques SMS + email (Twilio + Resend)

**Stack :**
Next.js 14 + Supabase (auth, BDD, storage) + Stripe + Twilio. Déployé sur Vercel.

**Impact :**
Réduit le temps administratif de 70 % par rapport à la gestion Excel précédente.',
  'website',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Supabase', 'Stripe', 'Twilio', 'Resend', 'Tailwind CSS', 'Vercel'],
  NULL,
  ARRAY[]::TEXT[],
  false
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. Gel-Adom — Jeu mobile (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'gel-adom',
  'Gel-Adom',
  'Jeu mobile éducatif pour apprendre les gestes de premiers secours aux enfants (iOS & Android).',
  'Gel-Adom est un jeu mobile éducatif destiné aux enfants de 6 à 12 ans. En incarnant un personnage soignant, le joueur apprend les gestes de premiers secours de manière ludique et progressive.

**Mécaniques de jeu :**
- 30 niveaux répartis en 5 modules thématiques (chute, brûlure, étouffement, malaise, noyade)
- Mini-jeux gestuels (swipe, tap, drag-and-drop) reproduisant les vrais gestes
- Système de badges et progression gamifiée
- Mode multijoueur local (2 joueurs, même appareil)
- Contenus validés par des professionnels de santé

**Stack technique :**
Unity 2022 + C#. Backend Firebase pour les scores et comptes utilisateurs. Déployé sur App Store et Google Play.

**Distinctions :**
Sélectionné par l''Académie de Bordeaux dans le cadre du programme "Numérique éducatif".',
  'mobile_game',
  'cupacode-studios',
  ARRAY['Unity 2022', 'C#', 'Firebase', 'iOS', 'Android', 'App Store', 'Google Play'],
  NULL,
  ARRAY[]::TEXT[],
  true
);
