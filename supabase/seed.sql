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
  'Réseau social fermé propulsé par l''IA pour simuler et gérer les crises sur les réseaux sociaux.',
  'Pulse-Crisis est un réseau social "fermé" alimenté par l''IA, conçu pour entraîner les équipes de communication, de crise et de gestion des risques à réagir face à une tempête médiatique sur les réseaux sociaux.

**Concept :**
L''IA génère un flux réaliste de posts, commentaires, partages et réactions simulant Twitter/X, LinkedIn ou Facebook en situation de crise (bad buzz, incident industriel, fuite de données, conflit RH…). L''équipe entraînée doit répondre, modérer et piloter la communication en temps réel dans un environnement 100 % fictif et sécurisé.

**Fonctionnalités clés :**
- Simulation de flux réseaux sociaux en temps réel par l''IA (Claude Sonnet)
- Création de scénarios de crise paramétrables (secteur, ampleur, durée)
- Personnages fictifs générés automatiquement avec des comportements distincts (journaliste, troll, client, élu…)
- Tableau de bord d''analyse : sentiment, viralité, mentions clés
- Debriefing automatique post-exercice avec scoring et recommandations
- Modes solo (communication manager) et multi-joueurs (cellule de crise)

**Cas d''usage :**
Entraînement des cellules de crise, formations en école de communication, audits de résilience pour entreprises du CAC 40.

**Architecture :**
Next.js 14 + WebSockets (Supabase Realtime) + Anthropic Claude Sonnet (génération des profils et flux) + PostgreSQL.',
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
  'Outil IA pour s''entraîner aux conversations de vente, accueil client et négociation commerciale.',
  'Deal Trainer est une plateforme d''entraînement aux conversations professionnelles alimentée par l''IA. Commerciaux, chargés d''accueil, managers et équipes relation client s''exercent en conditions réelles face à un interlocuteur virtuel qui réagit, objecte et s''adapte.

**Cas d''entraînement :**
- Négociation commerciale et closing B2B / B2C
- Accueil client et gestion des situations difficiles
- Traitement des objections et réclamations
- Entretiens de vente à distance (téléphone, visio)
- Prise de rendez-vous à froid (cold call)

**Fonctionnalités clés :**
- Persona interlocuteur entièrement paramétrable (profil, ton, niveau d''exigence, objections types)
- Dialogue en langage naturel piloté par Claude Sonnet
- Scoring automatique en fin de session : écoute active, structure, closing, empathie
- Bibliothèque de scénarios sectoriels (retail, B2B tech, banque, santé, hôtellerie…)
- Historique des sessions et progression dans le temps
- Mode manager : suivi de l''équipe et configuration des exercices

**Architecture :**
Next.js 14 + Anthropic Claude Sonnet (dialogue IA) + PostgreSQL (historique) + Redis (sessions actives).',
  'web_app',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Claude Sonnet', 'Anthropic SDK', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
  'https://deal-trainer.com',
  ARRAY[]::TEXT[],
  true
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Analyse-Conseil — Application web SaaS (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'analyse-conseil',
  'Analyse-Conseil',
  'Outil IA pour aider les consultants à rédiger leurs livrables professionnels plus vite et mieux.',
  'Analyse-Conseil est un assistant IA destiné aux consultants en stratégie, management et IT. Il accélère la production des livrables tout en maintenant un niveau de qualité élevé, aligné sur les référentiels métier.

**Concept :**
Le consultant décrit sa mission, ses observations et ses enjeux. L''IA génère les livrables structurés (note de cadrage, audit, rapport, plan d''action, présentation COMEX) en s''appuyant sur une base de connaissances enrichie (RAG) et les bonnes pratiques du secteur.

**Livrables supportés :**
- Avant-vente : note de cadrage, analyse de risques, proposition commerciale, chiffrage
- Build : plan de projet (RACI inclus), compte-rendu, rapport d''avancement, registre des risques
- Run : rapport d''exploitation, bilan de mission, plan d''amélioration continue

**Fonctionnalités clés :**
- Génération structurée par type de livrable avec validation IA
- RAG sur référentiels (ISO 27001, ITIL 4, RGPD, COBIT) via pgvector
- Export PDF, Word et Excel des documents générés
- Gestion multi-missions et multi-clients
- Historique et versioning des livrables

**Architecture :**
FastAPI + Next.js 14 + PostgreSQL + pgvector + Anthropic Claude Sonnet + MinIO (fichiers) + Celery.',
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
  'Outil de management complet pour piloter une Direction des Systèmes d''Information au quotidien.',
  'DSI-Management est une plateforme pensée pour les DSI, RSSI et responsables informatiques qui veulent centraliser le pilotage de leur SI dans un seul outil structuré.

**Concept :**
Plutôt qu''un simple tableau de bord, DSI-Management couvre l''ensemble du management IT : de la stratégie à l''opérationnel, en passant par la gouvernance, les ressources humaines, les contrats et la sécurité.

**Fonctionnalités clés :**
- Pilotage des projets IT : roadmap, jalons, RACI, suivi d''avancement
- Gestion des ressources : équipes, compétences, prestataires, contrats
- Suivi budgétaire IT : CAPEX / OPEX, engagements, réalisé vs prévisionnel
- Tableau de bord sécurité : incidents, vulnérabilités, conformité RGPD / NIS2
- Reporting automatisé pour CODIR, COMEX et conseil d''administration
- Base de connaissance interne : procédures, SLA, catalogue de services
- Gestion des actifs informatiques (matériels, licences, fin de vie)

**Public cible :**
DSI de PME/ETI (50–500 salariés), responsables informatiques de collectivités territoriales et d''établissements de santé.

**Architecture :**
Next.js 14 monorepo + Supabase (auth, BDD, storage) + Recharts (graphiques) + PDF export.',
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

-- (écoles-Adom : version correcte en entrée 9 ci-dessous)

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
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. Ecole-Adom — Site web (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'ecole-adom',
  'École-Adom',
  'École en ligne pour enfants déscolarisés et expatriés, avec une pédagogie 100 % à la française.',
  'École-Adom est une école en ligne conçue pour les enfants déscolarisés, en situation de handicap ou vivant à l''étranger, qui souhaitent conserver une approche pédagogique française conforme aux programmes de l''Éducation Nationale.

**Concept :**
Les élèves suivent leurs cours à distance via une plateforme dédiée, encadrés par des enseignants diplômés. L''ensemble du cursus du CP à la Terminale est couvert, avec un suivi individualisé de chaque élève.

**Fonctionnalités :**
- Espace élève : cours en ligne, devoirs, messagerie avec les enseignants
- Espace parents : suivi des progressions, bulletins, facturation
- Espace enseignants : préparation de cours, agenda, cahier de texte numérique
- Visioconférences intégrées pour les cours en direct
- Bibliothèque de ressources pédagogiques alignées sur les programmes français
- Paiement en ligne sécurisé (Stripe)

**Public cible :**
Enfants déscolarisés pour raisons médicales, familles françaises expatriées, enfants en Instruction En Famille (IEF).

**Stack :**
Next.js 14 + Supabase + Stripe + Daily.co (visio). Déployé sur Vercel.',
  'website',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Supabase', 'Stripe', 'Daily.co', 'Tailwind CSS', 'Vercel'],
  'https://ecole-adom.fr',
  ARRAY[]::TEXT[],
  false
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. Geo-Adom — Jeu mobile (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'geo-adom',
  'Géo-Adom',
  'Jeu mobile éducatif pour apprendre la géographie mondiale à travers les drapeaux des pays.',
  'Géo-Adom est un jeu mobile éducatif qui transforme l''apprentissage de la géographie en défi ludique. Le joueur reconnaît et associe les drapeaux à leurs pays, progressant à travers des niveaux de difficulté croissante.

**Mécaniques de jeu :**
- Mode quiz : associer un drapeau à son pays parmi 4 propositions
- Mode carte : localiser les pays sur une carte interactive
- Classement mondial et entre amis
- Plus de 195 pays couverts avec leurs drapeaux officiels
- Progression débloquée par continent

**Stack technique :**
Unity 2022 + C#. Backend Firebase pour les scores et profils utilisateurs. Disponible sur App Store et Google Play.

**Public cible :**
Enfants et adolescents de 8 à 16 ans, utilisé en complément des cours de géographie.',
  'mobile_game',
  'cupacode-studios',
  ARRAY['Unity 2022', 'C#', 'Firebase', 'iOS', 'Android'],
  NULL,
  ARRAY[]::TEXT[],
  false
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 11. Adom-World — Jeu éducatif (Animal Crossing-like) pour École-Adom
-- ─────────────────────────────────────────────────────────────────────────────
(
  'adom-world',
  'Adom World',
  'Jeu éducatif type Animal Crossing où les élèves évoluent dans un monde virtuel sécurisé tout en apprenant.',
  'Adom World est un jeu éducatif développé pour École-Adom. Inspiré du concept Animal Crossing, les élèves incarnent leur propre avatar personnalisé et évoluent dans un monde virtuel bienveillant où chaque activité enseigne quelque chose : sécurité numérique, bonnes pratiques en ligne, collaboration et autonomie.

**Concept :**
Le monde Adom repose sur une carte ouverte avec des zones thématiques : la bibliothèque (culture générale), la salle de jeux (maths/logique), la nature (sciences), la place du village (sécurité numérique). Chaque zone propose des mini-jeux adaptés au niveau scolaire.

**Fonctionnalités :**
- Avatars personnalisables avec progression visible
- Système de récompenses et de décorations pour la maison de l''avatar
- Mode solo et mini-défis en groupe (classe entière)
- Tableau de bord enseignant : suivi des progrès par élève
- Contenu adapté du CP à la 3ème

**Différenciation :**
Contrairement aux jeux éducatifs classiques, Adom World mise sur l''immersion et la personnalisation de l''espace de l''élève pour créer un sentiment d''appartenance et de motivation durable.

**Stack technique :**
Unity 2022 LTS + C# + Photon (multijoueur temps réel) + Firebase (profils, progression). Application multiplateforme : iOS, Android, Web (WebGL).',
  'mobile_game',
  'cupacode-studios',
  ARRAY['Unity 2022', 'C#', 'Photon', 'Firebase', 'iOS', 'Android', 'WebGL'],
  NULL,
  ARRAY[]::TEXT[],
  true
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 12. CyberSentinelle — Serious game cyber (Cupacode Studios)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'cybersentinelle',
  'CyberSentinelle',
  'Serious game de cybersécurité : incarnez le RSSI de Safenet Solutions et gérez une crise cyber en temps réel.',
  'CyberSentinelle est un serious game de cybersécurité immersif dans lequel le joueur incarne le RSSI (Responsable de la Sécurité des Systèmes d''Information) de Safenet Solutions — une PME fictive — à quelques heures du déclenchement d''une crise cyber majeure.

**Concept :**
Grâce à une narration en temps réel, le joueur doit analyser des alertes, prendre des décisions stratégiques et techniques, communiquer avec les équipes internes et les partenaires, et activer le bon plan de réponse à incident. Chaque choix a des conséquences sur l''entreprise : financières, réputationnelles, réglementaires.

**Scénarios disponibles :**
- Ransomware sur le SI de production (blocage des opérations)
- Phishing ciblé sur un dirigeant (fraude au président)
- Fuite de données clients (notification CNIL obligatoire)
- Attaque sur la chaîne d''approvisionnement (supply chain)
- Intrusion via un accès VPN compromis

**Fonctionnalités clés :**
- Salle de crise virtuelle avec flux d''alertes en temps réel (SIEM simulé)
- Rôles multiples : RSSI, DSI, DPO, communication de crise, équipe SOC
- Mode solo et mode multi-joueurs (cellule de crise complète)
- Scoring basé sur le respect de la procédure, la rapidité et l''impact métier
- Debriefing pédagogique post-exercice avec analyse des décisions
- Conforme aux référentiels ANSSI (EBIOS RM, guide de gestion de crise cyber)

**Public cible :**
RSSI, équipes SOC, DSI, formations cybersécurité (BTS, licences, Masters), exercices de crise en entreprise.

**Architecture :**
Next.js 14 + Supabase Realtime (flux d''alertes simulées) + Anthropic Claude Sonnet (génération de scénarios adaptatifs) + PostgreSQL + WebSockets.',
  'web_app',
  'cupacode-studios',
  ARRAY['Next.js 14', 'Supabase Realtime', 'Claude Sonnet', 'WebSockets', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
  'https://cybersentinellegame.com',
  ARRAY[]::TEXT[],
  true
);
