import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, GitBranch, Shield, Zap, Clock, BarChart3 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/lib/supabase/types';

// =====================================================
// Page CUPADEV — Pôle DevOps / Infrastructure CI/CD
// =====================================================

export const metadata: Metadata = {
  title: 'CUPADEV — Hébergement CI/CD & Infrastructure DevOps',
  description:
    'CUPADEV propose des pipelines CI/CD managés, de l\'hébergement conteneurisé haute disponibilité et une infrastructure as code pour développeurs et startups.',
};

export const revalidate = 3600;

// Fonctionnalités mises en avant
const FEATURES = [
  {
    icon: <GitBranch size={22} />,
    title: 'Pipelines CI/CD automatisés',
    desc: 'Déployez à chaque push. Tests, build, push Docker, déploiement : tout est géré.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Sécurité & conformité',
    desc: 'Scans de vulnérabilités intégrés, secrets management, audit log complet.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Déploiement en < 2 min',
    desc: 'Rollout progressif, rollback en un clic, zero-downtime par défaut.',
  },
  {
    icon: <Clock size={22} />,
    title: 'Monitoring 24/7',
    desc: 'Alertes proactives, dashboards Grafana, logs centralisés, uptime SLA 99,9 %.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Scalabilité automatique',
    desc: 'Autoscaling horizontal selon la charge. Payez ce que vous consommez.',
  },
  {
    icon: <CheckCircle2 size={22} />,
    title: 'Infrastructure as Code',
    desc: 'Toute votre infra versionnée en Terraform / Pulumi. Reproductible et auditée.',
  },
];

// Avantages concis
const ADVANTAGES = [
  'Démarrage en quelques minutes',
  'Support francophone réactif',
  'Pas de vendor lock-in',
  'Environnements preview automatiques',
  'Compatible GitHub, GitLab, Bitbucket',
  'Multi-cloud (AWS, GCP, Scaleway)',
];

export default async function CupadevPage() {
  // Récupère les projets CUPADEV (ci_cd) s'il y en a
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('brand', 'cupadev')
    .order('created_at', { ascending: false });

  const cupadevProjects: Project[] = data ?? [];

  return (
    <>
      {/* ─── HERO CUPADEV (bleu) ─────────────────────────────── */}
      <section className="section bg-gradient-to-br from-cupadev-950 via-cupadev-900 to-cupadev-800 text-white">
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cupadev-300 bg-cupadev-800/50 border border-cupadev-700 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cupadev-400 animate-pulse" />
            cupadev.com
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Votre infra,{' '}
            <span className="text-cupadev-300">sous contrôle</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-cupadev-200 mb-10">
            CUPADEV est le service CI/CD et d&apos;hébergement managé pensé pour les équipes
            de développement qui veulent déployer vite, en toute sécurité.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cupadev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cupadev bg-white text-cupadev-700 hover:bg-cupadev-50"
            >
              Accéder à cupadev.com
              <ArrowRight size={16} />
            </a>
            <a
              href="mailto:contact@cupadev.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cupadev-600 text-cupadev-200 hover:bg-cupadev-800 transition-colors text-sm font-semibold"
            >
              Demander une démo
            </a>
          </div>
        </div>
      </section>

      {/* ─── FONCTIONNALITÉS ──────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
            Tout ce dont votre équipe a besoin
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Un seul service pour vos pipelines, votre hébergement et votre observabilité.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 hover:border-cupadev-300 hover:shadow-sm transition-all"
              >
                <div className="inline-flex p-2.5 rounded-lg bg-cupadev-50 text-cupadev-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AVANTAGES ────────────────────────────────────────── */}
      <section className="section bg-cupadev-50">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
              Pourquoi choisir CUPADEV ?
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {ADVANTAGES.map((adv) => (
                <li key={adv} className="flex items-center gap-3 bg-white rounded-lg p-3.5 border border-cupadev-100">
                  <CheckCircle2 size={18} className="text-cupadev-500 shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── PROJETS CI/CD réalisés ───────────────────────────── */}
      {cupadevProjects.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Projets CUPADEV
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cupadevProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="section bg-gray-950 text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à simplifier votre CI/CD ?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Migration depuis votre infra actuelle accompagnée. Premier déploiement offert.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cupadev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cupadev"
            >
              Démarrer gratuitement
              <ArrowRight size={16} />
            </a>
            <Link href="/portfolio" className="btn-outline border-gray-700 text-gray-300 hover:bg-gray-800">
              Voir le portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
