# Cupacode Studios — Portfolio

Site portfolio officiel de **Cupacode Studios** et **CUPADEV**, hébergé sur [cupacode-studios.com](https://cupacode-studios.com).

## Présentation

Ce dépôt contient le code source du portfolio présentant les deux pôles d'activité :

| Marque | Domaine | Couleur | Activité |
|---|---|---|---|
| **Cupacode Studios** | cupacode-studios.com | Violet | Applications web SaaS, sites, jeux mobiles |
| **CUPADEV** | cupadev.com | Bleu | Hébergement CI/CD, DevOps, Infrastructure |

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript strict
- **Style** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL + Storage + Auth)
- **Déploiement** : Vercel

---

## Prérequis

- Node.js ≥ 18.17
- npm ≥ 9 (ou pnpm / yarn)
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/beherka/cupacode-studios.git
cd cupacode-studios

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec vos valeurs Supabase

# 4. Lancer en développement
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

---

## Configuration Supabase

### 1. Créer le projet Supabase

1. Aller sur [app.supabase.com](https://app.supabase.com) → **New project**
2. Choisir un nom et une région (ex : `eu-west-1`)
3. Copier l'**URL** et la **anon key** depuis *Settings > API*

### 2. Exécuter le schéma SQL

Dans **SQL Editor** du dashboard Supabase :

```sql
-- Étape 1 : Créer les tables, les enums, les policies RLS et le bucket Storage
-- Copier-coller le contenu de supabase/schema.sql
```

Puis insérer les projets de démonstration :

```sql
-- Étape 2 : Seed des 8 projets
-- Copier-coller le contenu de supabase/seed.sql
```

### 3. Créer l'utilisateur admin

Dans **Authentication > Users** → **Invite user** :

- Email : `admin@cupacode-studios.com`
- Définir un mot de passe fort

Puis, dans **SQL Editor**, attribuer le rôle admin :

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@cupacode-studios.com';
```

### 4. Remplir `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Lancement local

```bash
npm run dev        # Développement avec hot-reload
npm run build      # Build de production
npm run start      # Serveur de production local
npm run type-check # Vérification TypeScript sans build
npm run lint       # ESLint
```

---

## Déploiement sur Vercel

1. Pousser le code sur GitHub (dépôt : `beherka/cupacode-studios`)
2. Sur [vercel.com](https://vercel.com) → **Import Git Repository**
3. Sélectionner le dépôt `cupacode-studios`
4. Dans **Environment Variables**, ajouter :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` → `https://cupacode-studios.com`
5. Cliquer **Deploy** — Vercel détecte automatiquement Next.js

---

## Ajouter un projet en moins de 5 min

### Via l'interface admin (recommandé)

1. Aller sur `/login` → se connecter avec les identifiants admin
2. Cliquer sur **Nouveau projet** dans le dashboard
3. Remplir le formulaire :
   - **Slug** : identifiant URL unique (`mon-projet`)
   - **Titre**, **descriptions**, **catégorie**, **marque**
   - **Stack technique** : ajouter les technos une par une
   - **Screenshots** : uploader les images (stockées automatiquement dans Supabase Storage)
   - **En vedette** : cocher pour l'afficher sur la home
4. Cliquer **Créer le projet** → visible immédiatement sur `/portfolio`

### Via SQL direct

```sql
INSERT INTO public.projects
  (slug, title, description_short, description_long, category, brand, tech_stack, external_url, featured)
VALUES (
  'mon-projet',
  'Mon Projet',
  'Description courte en une phrase.',
  'Description longue détaillée du projet.',
  'web_app',            -- web_app | website | mobile_game | ci_cd
  'cupacode-studios',   -- cupacode-studios | cupadev
  ARRAY['Next.js', 'Supabase'],
  'https://mon-projet.com',  -- NULL si projet privé
  false
);
```

---

## Structure du projet

```
cupacode-studios/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout racine (header + footer)
│   │   ├── page.tsx                # Page d'accueil
│   │   ├── not-found.tsx           # Page 404
│   │   ├── sitemap.ts              # Sitemap dynamique
│   │   ├── robots.ts               # robots.txt
│   │   ├── globals.css             # Styles globaux Tailwind
│   │   ├── portfolio/
│   │   │   ├── page.tsx            # Liste filtrable des projets
│   │   │   ├── PortfolioClient.tsx # Filtres interactifs (client)
│   │   │   └── [slug]/page.tsx     # Fiche détaillée d'un projet
│   │   ├── cupadev/page.tsx        # Page dédiée CUPADEV
│   │   ├── login/page.tsx          # Authentification
│   │   ├── admin/
│   │   │   ├── page.tsx            # Dashboard CRUD
│   │   │   └── projects/
│   │   │       ├── ProjectForm.tsx # Formulaire création/édition
│   │   │       ├── new/page.tsx    # Nouveau projet
│   │   │       └── [id]/page.tsx   # Modifier un projet
│   │   └── api/
│   │       ├── auth/signout/       # Déconnexion
│   │       └── admin/projects/[id]/delete/ # Suppression
│   ├── components/
│   │   ├── ProjectCard.tsx         # Carte projet (portfolio)
│   │   ├── BrandBadge.tsx          # Badge marque (cupadev / studios)
│   │   ├── TechStackList.tsx       # Liste des technologies
│   │   └── ScreenshotGallery.tsx   # Galerie + lightbox
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Client navigateur
│   │   │   ├── server.ts           # Client serveur + admin
│   │   │   └── types.ts            # Types TypeScript + constantes
│   │   └── utils.ts                # Utilitaires (cn, formatDate…)
│   └── middleware.ts               # Protection routes /admin/*
├── supabase/
│   ├── schema.sql                  # Schéma tables + RLS + Storage
│   └── seed.sql                    # 8 projets de démonstration
├── .env.local.example              # Template des variables d'env
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Routes de l'application

| Route | Accès | Description |
|---|---|---|
| `/` | Public | Page d'accueil |
| `/portfolio` | Public | Liste filtrable des projets |
| `/portfolio/[slug]` | Public | Fiche détaillée d'un projet |
| `/cupadev` | Public | Page dédiée CUPADEV |
| `/login` | Public | Connexion admin |
| `/admin` | Admin | Dashboard CRUD |
| `/admin/projects/new` | Admin | Créer un projet |
| `/admin/projects/[id]` | Admin | Modifier un projet |

---

## Licence

Propriétaire — © 2025 Cupacode Studios. Tous droits réservés.
