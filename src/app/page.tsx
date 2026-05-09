import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Gamepad2, Server, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/supabase/types';

// =====================================================
// Page d'accueil — présentation des deux pôles
// =====================================================

export const metadata: Metadata = {
  title: 'Cupacode Studios — Studio de développement web & jeux mobiles',
  description:
    'Cupacode Studios conçoit des applications web SaaS haute performance et des jeux mobiles innovants. Découvrez CUPADEV, notre service CI/CD DevOps.',
};

// Rechargement statique toutes les heures (ISR)
export const revalidate = 3600;

export default async function HomePage() {
  // Récupération des projets mis en avant (featured = true)
  const supabase = await createClient();
  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const projects: Project[] = featuredProjects ?? [];

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="section bg-gradient-to-br from-gray-50 via-white to-studios-50/30">
        <div className="container-page text-center">
          {/* Badge d'introduction */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-studios-600 bg-studios-50 border border-studios-200 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-studios-500 animate-pulse" />
            Studio de développement
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Nous construisons des{' '}
            <span className="text-studios-600">apps qui comptent</span>
            <br />
            et des{' '}
            <span className="text-cupadev-600">infras qui tiennent</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10">
            De l&apos;idée au déploiement : applications web SaaS, jeux mobiles engageants,
            et infrastructure CI/CD haute disponibilité.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio" className="btn-studios">
              Voir nos réalisations
              <ArrowRight size={16} />
            </Link>
            <Link href="/cupadev" className="btn-outline">
              Découvrir CUPADEV
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DEUX PÔLES ───────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
            Deux pôles d&apos;expertise, une seule équipe
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Chaque marque répond à un besoin précis, avec une identité et des compétences distinctes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Cupacode Studios */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-studios-200 bg-gradient-to-br from-studios-50 to-white p-8">
              {/* Décoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-studios-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-studios-100 text-studios-700 mb-5">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cupacode Studios</h3>
                <p className="text-studios-700 font-medium text-sm mb-4">cupacode-studios.com</p>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Studio de développement d&apos;applications web SaaS et de jeux mobiles.
                  De la maquette Figma au lancement en production, nous couvrons l&apos;ensemble du cycle.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Applications web & SaaS', 'Sites vitrines & e-commerce', 'Jeux mobiles iOS & Android', 'Intégration IA (Claude, GPT)'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-studios-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/portfolio" className="btn-studios text-sm">
                  Voir le portfolio <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Carte CUPADEV */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-cupadev-200 bg-gradient-to-br from-cupadev-50 to-white p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cupadev-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-cupadev-100 text-cupadev-700 mb-5">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">CUPADEV</h3>
                <p className="text-cupadev-700 font-medium text-sm mb-4">cupadev.com</p>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Service d&apos;hébergement et de CI/CD managé pour développeurs et startups.
                  Déployez en quelques minutes sur une infra fiable et scalable.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Pipelines CI/CD automatisés', 'Hébergement conteneurisé', 'Monitoring & alertes', 'Infrastructure as Code'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-cupadev-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/cupadev" className="btn-cupadev text-sm">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHIFFRES CLÉS ────────────────────────────────────── */}
      <section className="py-14 bg-gray-950 text-white">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8+', label: 'Projets livrés', icon: <Zap size={20} /> },
              { value: '5', label: 'Secteurs couverts', icon: <Code2 size={20} /> },
              { value: '100%', label: 'TypeScript strict', icon: <Server size={20} /> },
              { value: '< 24h', label: 'Temps de réponse', icon: <Gamepad2 size={20} /> },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="text-studios-400">{stat.icon}</div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJETS EN VEDETTE ───────────────────────────────── */}
      {projects.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-page">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Projets en vedette
                </h2>
                <p className="text-gray-500 text-sm">Notre sélection de réalisations récentes</p>
              </div>
              <Link href="/portfolio" className="btn-outline hidden sm:inline-flex text-sm">
                Tout voir
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center mt-10 sm:hidden">
              <Link href="/portfolio" className="btn-outline">
                Voir tout le portfolio
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="section bg-gradient-to-br from-studios-600 to-studios-800 text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-studios-200 mb-8 max-w-lg mx-auto">
            Parlons-en. Nous répondons dans les 24 heures et proposons systématiquement
            un premier échange gratuit.
          </p>
          <a href="mailto:contact@cupacode-studios.com" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold bg-white text-studios-700 hover:bg-studios-50 transition-colors">
            Démarrer la conversation
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
