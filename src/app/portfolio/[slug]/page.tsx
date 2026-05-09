import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Lock, Calendar } from 'lucide-react';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { BrandBadge } from '@/components/BrandBadge';
import { TechStackList } from '@/components/TechStackList';
import { ScreenshotGallery } from '@/components/ScreenshotGallery';
import { CATEGORY_LABELS } from '@/lib/supabase/types';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/lib/supabase/types';

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase.from('projects').select('slug');
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects').select('title, description_short').eq('slug', params.slug).single();
  if (!project) return { title: 'Projet introuvable' };
  return {
    title: (project as { title: string }).title,
    description: (project as { description_short: string }).description_short,
  };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: Props) {
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from('projects').select('*').eq('slug', params.slug).single();

  if (error || !project) notFound();
  const p = project as Project;

  const descHtml = p.description_long
    .split('\n\n')
    .map((para) =>
      para.startsWith('**') && para.endsWith('**')
        ? `<h3 class="font-mono text-sm font-bold text-cupadev-400 mt-5 mb-2">${para.slice(2, -2)}</h3>`
        : `<p class="text-sm text-gray-400 leading-relaxed mb-3">${para.replace(/\n/g, '<br/>')}</p>`
    ).join('');

  return (
    <div className="section">
      <div className="container-page max-w-4xl">

        <nav className="mb-8">
          <Link href="/portfolio"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-cupadev-400 transition-colors">
            <ArrowLeft size={12} /> ~/portfolio
          </Link>
        </nav>

        {/* En-tête */}
        <header className="mb-10 pb-8 border-b border-[#21262d]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandBadge brand={p.brand} />
            <span className="font-mono text-xs text-gray-600">{CATEGORY_LABELS[p.category]}</span>
            {p.featured && (
              <span className="font-mono text-xs px-2 py-0.5 rounded border border-cupadev-400/30 text-cupadev-400 bg-cupadev-400/10">
                ★ featured
              </span>
            )}
          </div>

          <h1 className="font-mono text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
            {p.title}
          </h1>
          <p className="text-base text-gray-400 leading-relaxed mb-6">{p.description_short}</p>

          {p.external_url ? (
            <a href={p.external_url} target="_blank" rel="noopener noreferrer" className="btn-cupadev">
              <ExternalLink size={14} /> Visiter ↗
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-xs text-gray-600 border border-[#21262d] px-3 py-2 rounded">
              <Lock size={12} /> private — no public URL
            </span>
          )}
        </header>

        {/* Galerie */}
        {p.screenshots.length > 0 && (
          <section className="mb-10">
            <p className="font-mono text-xs text-gray-600 mb-4"># screenshots</p>
            <ScreenshotGallery screenshots={p.screenshots} projectTitle={p.title} />
          </section>
        )}

        {/* Description + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs text-gray-600 mb-4"># description</p>
            <div dangerouslySetInnerHTML={{ __html: descHtml }} />
          </div>
          <aside className="space-y-6">
            <div>
              <p className="font-mono text-xs text-gray-600 mb-3"># stack</p>
              <TechStackList techs={p.tech_stack} />
            </div>
            {p.external_url && (
              <div>
                <p className="font-mono text-xs text-gray-600 mb-2"># url</p>
                <a href={p.external_url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-cupadev-400 hover:text-cupadev-300 flex items-center gap-1 transition-colors">
                  <ExternalLink size={11} /> {new URL(p.external_url).hostname}
                </a>
              </div>
            )}
            <div>
              <p className="font-mono text-xs text-gray-600 mb-2"># brand</p>
              <BrandBadge brand={p.brand} size="sm" />
            </div>
            <div>
              <p className="font-mono text-xs text-gray-600 mb-2"># created</p>
              <p className="font-mono text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={11} /> {formatDate(p.created_at)}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-12 pt-8 border-t border-[#21262d]">
          <Link href="/portfolio" className="btn-outline text-xs py-1.5 px-3">
            <ArrowLeft size={12} /> ./portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
