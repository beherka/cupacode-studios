import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Terminal, Cpu, Gamepad2, GitBranch } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Cupacode Studios — Studio de développement web & mobile en France',
  description:
    'Studio de développement web en France. Nous créons des applications SaaS, sites vitrines, jeux mobiles iOS/Android et gérons votre CI/CD. Devis gratuit.',
  alternates: { canonical: 'https://cupacode-studios.com' },
};

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();
  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const projects = (featuredProjects ?? []) as Project[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cupacode Studios',
    url: 'https://cupacode-studios.com',
    logo: 'https://cupacode-studios.com/logo.png',
    description: 'Studio de développement web et mobile basé en France. Applications SaaS, jeux mobiles et CI/CD managé.',
    email: 'contact@cupacode-studios.com',
    areaServed: 'FR',
    knowsLanguage: 'fr',
    sameAs: ['https://cupadev.com'],
    offers: {
      '@type': 'Offer',
      description: 'Développement web SaaS, jeux mobiles iOS/Android, CI/CD managé',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative section overflow-hidden">
        {/* Grille de fond */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Glow radial */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cupadev-400/5 rounded-full blur-3xl" />

        <div className="container-page relative text-center">
          {/* Prompt terminal */}
          <div className="terminal-badge mb-8 mx-auto w-fit">
            <span className="text-studios-400">$</span>
            <span className="text-gray-300">whoami</span>
            <span className="inline-block w-2 h-3.5 bg-cupadev-400 ml-0.5 animate-[blink_1s_step-end_infinite]" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-mono font-bold text-gray-100 leading-[1.1] mb-6">
            <span className="text-cupadev-400">&gt;_</span> We build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cupadev-400 to-studios-400">
              software that ships.
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base text-gray-400 font-mono mb-10 leading-relaxed">
            <span className="text-gray-600">//</span> Apps web SaaS · Jeux mobiles · CI/CD managé<br />
            <span className="text-gray-600">//</span> TypeScript · Next.js · Supabase · DevOps
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio" className="btn-cupadev">
              ./portfolio <ArrowRight size={14} />
            </Link>
            <a href="https://cupadev.com" target="_blank" rel="noopener noreferrer"
              className="btn-outline">
              cupadev.com ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── DEUX PÔLES ───────────────────────────────────────── */}
      <section className="section border-t border-[#21262d]">
        <div className="container-page">
          <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-10 text-center">
            # deux pôles, une équipe
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cupacode Studios */}
            <div className="relative p-6 rounded-lg border border-[#21262d] bg-[#0d1117] hover:border-studios-500/40 transition-colors group overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-studios-500/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <Terminal size={18} className="text-studios-400" />
                  <span className="font-mono text-xs text-gray-500">~/cupacode-studios</span>
                </div>
                <h2 className="font-mono text-xl font-bold text-gray-100 mb-2">Cupacode Studios</h2>
                <p className="font-mono text-xs text-studios-400 mb-4">cupacode-studios.com</p>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                  Dev studio spécialisé applications web SaaS et jeux mobiles.
                  De la conception au déploiement en production.
                </p>
                <ul className="space-y-1.5 mb-6">
                  {['Applications web & SaaS', 'Sites vitrines', 'Jeux mobiles iOS/Android', 'Intégration IA'].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-xs text-gray-400">
                      <span className="text-studios-400">+</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/portfolio" className="btn-studios text-xs py-1.5 px-3">
                  ./voir-les-projets <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* CUPADEV */}
            <div className="relative p-6 rounded-lg border border-[#21262d] bg-[#0d1117] hover:border-cupadev-400/40 transition-colors group overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cupadev-400/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <GitBranch size={18} className="text-cupadev-400" />
                  <span className="font-mono text-xs text-gray-500">~/cupadev</span>
                </div>
                <h2 className="font-mono text-xl font-bold text-gray-100 mb-2">CUPADEV</h2>
                <p className="font-mono text-xs text-cupadev-400 mb-4">cupadev.com</p>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                  Hébergement et CI/CD managé pour développeurs et startups.
                  Déployez vite, sur une infra fiable et scalable.
                </p>
                <ul className="space-y-1.5 mb-6">
                  {['Pipelines CI/CD automatisés', 'Hébergement conteneurisé', 'Monitoring & alertes 24/7', 'Infrastructure as Code'].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-xs text-gray-400">
                      <span className="text-cupadev-400">+</span> {item}
                    </li>
                  ))}
                </ul>
                <a href="https://cupadev.com" target="_blank" rel="noopener noreferrer"
                  className="btn-cupadev text-xs py-1.5 px-3">
                  ./cupadev.com ↗ <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="py-12 border-t border-[#21262d] bg-[#0d1117]">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '8+',    label: 'projects shipped',  icon: <Cpu size={16} className="text-cupadev-400" /> },
              { value: '100%',  label: 'TypeScript strict', icon: <Terminal size={16} className="text-studios-400" /> },
              { value: '< 24h', label: 'response time',     icon: <GitBranch size={16} className="text-cupadev-400" /> },
              { value: '5+',    label: 'sectors covered',   icon: <Gamepad2 size={16} className="text-studios-400" /> },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                {s.icon}
                <p className="font-mono text-2xl font-bold text-gray-100">{s.value}</p>
                <p className="font-mono text-xs text-gray-600"># {s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS EN VEDETTE ───────────────────────────────── */}
      {projects.length > 0 && (
        <section className="section border-t border-[#21262d]">
          <div className="container-page">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-1"># featured</p>
                <h2 className="font-mono text-2xl font-bold text-gray-100">Projets récents</h2>
              </div>
              <Link href="/portfolio" className="btn-outline text-xs py-1.5 px-3 hidden sm:inline-flex">
                ./all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section border-t border-[#21262d] bg-[#0d1117]">
        <div className="container-page text-center">
          <div className="terminal-badge mb-6 mx-auto w-fit">
            <span className="text-studios-400">$</span>
            <span className="text-gray-300">git commit -m "start new project"</span>
          </div>
          <h2 className="font-mono text-3xl font-bold text-gray-100 mb-4">
            Un projet en tête ?
          </h2>
          <p className="font-mono text-sm text-gray-500 mb-8">
            // Premier échange gratuit · Réponse sous 24h
          </p>
          <a href="mailto:contact@cupacode-studios.com"
            className="btn-studios">
            ./contact <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
