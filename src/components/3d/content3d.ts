export const NAV = {
  logo: '>_cupacodestudios',
  links: [
    { label: '/portfolio', href: '/portfolio' },
    { label: 'cupadev ↗',  href: 'https://cupadev.com', external: true },
    { label: 'contact',    href: 'mailto:contact@cupacode-studios.com', external: true },
  ],
}

export const HERO = {
  headline: 'We build software that ships.',
  tagline:  'Apps web SaaS · Jeux mobiles · CI/CD managé',
  stack:    'TypeScript · Next.js · Supabase · DevOps',
}

export const STATS = [
  { value: '8+',    label: 'projects shipped' },
  { value: '100%',  label: 'TypeScript strict' },
  { value: '< 24h', label: 'response time'    },
  { value: '5+',    label: 'sectors covered'  },
]

export const POLES = [
  {
    name:        'Cupacode Studios',
    description: 'Dev studio spécialisé applications web SaaS et jeux mobiles. De la conception au déploiement en production.',
    services:    ['Applications web & SaaS', 'Sites vitrines', 'Jeux mobiles iOS/Android', 'Intégration IA'],
    color:       '#00e5ff',
  },
  {
    name:        'CUPADEV',
    description: 'Hébergement et CI/CD managé pour développeurs et startups. Déployez vite, sur une infra fiable et scalable.',
    services:    ['Pipelines CI/CD automatisés', 'Hébergement conteneurisé', 'Monitoring & alertes 24/7', 'Infrastructure as Code'],
    color:       '#ff00aa',
  },
]

export const PROJECTS = [
  { id: 'cybersentinelle', name: 'CyberSentinelle', category: 'web-app',     featured: true,  tagline: 'Serious game de cybersécurité',              stack: ['Next.js 14','Supabase Realtime','Claude Sonnet','WebSockets','PostgreSQL','TypeScript','Tailwind CSS'], href: 'https://cybersentinellegame.com', color: '#00e5ff' },
  { id: 'deal-trainer',    name: 'Deal Trainer',    category: 'web-app',     featured: true,  tagline: "Entraînement IA aux conversations de vente",  stack: ['Next.js 14','Claude Sonnet','Anthropic SDK','Redis','PostgreSQL','Tailwind CSS'],                      href: 'https://deal-trainer.com',        color: '#7c3aed' },
  { id: 'owlcub',          name: 'Owlcub',          category: 'website',     featured: true,  tagline: 'Site & SaaS pour startup cybersécurité',       stack: ['Next.js 14','FastAPI','Supabase','Turborepo','Tailwind CSS','Vercel','Cloudflare'],                    href: null,                              color: '#f59e0b' },
  { id: 'pulse-crisis',    name: 'Pulse-Crisis',    category: 'web-app',     featured: true,  tagline: 'Simulation de crises réseaux sociaux par IA',  stack: ['Next.js 14','FastAPI','Supabase','WebSockets','Twilio','PostgreSQL'],                                  href: null,                              color: '#ef4444' },
  { id: 'adom-world',      name: 'Adom World',      category: 'mobile-game', featured: true,  tagline: "Jeu éducatif type Animal Crossing",           stack: ['Unity 2022','C#','Photon','Firebase','iOS','Android','WebGL'],                                         href: null,                              color: '#10b981' },
  { id: 'analyse-conseil', name: 'Analyse-Conseil', category: 'web-app',     featured: false, tagline: 'IA pour consultants — génération de livrables', stack: ['Next.js 14','FastAPI','PostgreSQL','pgvector','Claude Sonnet','MinIO','Celery','Redis','Docker'],    href: null,                              color: '#6366f1' },
  { id: 'ecole-adom',      name: 'École-Adom',      category: 'website',     featured: false, tagline: 'École en ligne — pédagogie française',          stack: ['Next.js 14','Supabase','Stripe','Daily.co','Tailwind CSS','Vercel'],                                  href: 'https://ecole-adom.fr',           color: '#0ea5e9' },
  { id: 'geo-adom',        name: 'Géo-Adom',        category: 'mobile-game', featured: false, tagline: 'Géographie mondiale via drapeaux et quiz',      stack: ['Unity 2022','C#','Firebase','iOS','Android'],                                                         href: null,                              color: '#84cc16' },
  { id: 'dsi-management',  name: 'DSI-Management',  category: 'web-app',     featured: false, tagline: "Pilotage de Direction des Systèmes d'Information", stack: ['Next.js 14','Supabase','PostgreSQL','Recharts','Tailwind CSS','TypeScript'],                     href: null,                              color: '#f97316' },
  { id: 'cibnet',          name: 'Cibnet',          category: 'website',     featured: false, tagline: 'Site corporate — opérateur télécom Nouvelle-Aquitaine', stack: ['Next.js 14','Tailwind CSS','TypeScript','Vercel','Supabase'],                             href: null,                              color: '#a855f7' },
]

export const CONTACT = {
  headline: 'Un projet en tête ?',
  subtext:  'Premier échange gratuit — réponse sous 24h',
  email:    'contact@cupacode-studios.com',
}
