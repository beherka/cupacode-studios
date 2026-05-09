-- =====================================================
-- Ajout du projet CyberSentinelle
-- Supabase Dashboard > SQL Editor > Exécuter
-- =====================================================

INSERT INTO public.projects
  (slug, title, description_short, description_long, category, brand, tech_stack, external_url, screenshots, featured)
VALUES (
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
