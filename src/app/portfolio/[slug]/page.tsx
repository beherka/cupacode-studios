import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Lock, Calendar } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { BrandBadge } from '@/components/BrandBadge';
import { TechStackList } from '@/components/TechStackList';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';
import { CATEGORY_LABELS } from '@/lib/supabase/types';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/lib/supabase/types';

// =====================================================
// Page détail d'un projet — route /portfolio/[slug]
// =====================================================

interface Props {
  params: { slug: string };
}

// Génération des slugs statiques au build (SSG)
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data } = await supabase.from('projects').select('slug');
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

// Métadonnées dynamiques par projet
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('title, description_short, brand')
    .eq('slug', params.slug)
    .single();

  if (!project) return { title: 'Projet introuvable' };

  return {
    title: project.title,
    description: project.description_short,
    openGraph: {
      title: `${project.title} | Cupacode Studios`,
      description: project.description_short,
      type: 'article',
    },
  };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: Props) {
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !project) notFound();

  const p = project as Project;

  // Transformation de la description longue (markdown simplifié → HTML)
  // On remplace les retours à la ligne simples et les titres **...**
  const descriptionHtml = p.description_long
    .split('\n\n')
    .map((para) =>
      para.startsWith('**') && para.endsWith('**')
        ? `<h3 class="text-base font-semibold text-gray-900 mt-4 mb-1">${para.slice(2, -2)}</h3>`
        : `<p class="text-gray-600 text-sm leading-relaxed mb-3">${para.replace(/\n/g, '<br/>')}</p>`
    )
    .join('');

  return (
    <div className="section">
      <div className="container-page max-w-4xl">

        {/* ─── Fil d'Ariane ───────────────────────────────────── */}
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour au portfolio
          </Link>
        </nav>

        {/* ─── En-tête projet ─────────────────────────────────── */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <BrandBadge brand={p.brand} />
            <span className="text-sm text-gray-500">{CATEGORY_LABELS[p.category]}</span>
            {p.featured && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                En vedette
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {p.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {p.description_short}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {p.external_url ? (
              <a
                href={p.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-studios"
              >
                <ExternalLink size={15} />
                Visiter le site
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-400 bg-gray-50">
                <Lock size={14} />
                Projet privé — pas d&apos;URL publique
              </span>
            )}
          </div>
        </header>

        {/* ─── Galerie de screenshots ─────────────────────────── */}
        {p.screenshots.length > 0 && (
          <section className="mb-10" aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="text-lg font-semibold text-gray-900 mb-4">
              Captures d&apos;écran
            </h2>
            <ScreenshotGallery screenshots={p.screenshots} projectTitle={p.title} />
          </section>
        )}

        {/* ─── Contenu en deux colonnes (description + sidebar) ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Description longue */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Présentation</h2>
            <div
              className="prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>

          {/* Sidebar informations */}
          <aside className="space-y-6">
            {/* Stack technique */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h3>
              <TechStackList techs={p.tech_stack} />
            </div>

            {/* Date de création */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Ajouté le</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(p.created_at)}
              </p>
            </div>

            {/* Lien externe */}
            {p.external_url && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Lien</h3>
                <a
                  href={p.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-studios-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {new URL(p.external_url).hostname}
                </a>
              </div>
            )}

            {/* Marque */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Marque</h3>
              <BrandBadge brand={p.brand} size="sm" />
            </div>
          </aside>
        </div>

        {/* ─── Navigation entre projets ───────────────────────── */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/portfolio" className="btn-outline">
            <ArrowLeft size={15} />
            Voir tous les projets
          </Link>
        </div>

      </div>
    </div>
  );
}
