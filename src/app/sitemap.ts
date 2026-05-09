import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

// =====================================================
// Sitemap dynamique — /sitemap.xml
// Inclut toutes les pages statiques + fiches projets
// =====================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cupacode-studios.com';

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,             priority: 1.0, changeFrequency: 'weekly'  },
    { url: `${baseUrl}/portfolio`, priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${baseUrl}/cupadev`,   priority: 0.8, changeFrequency: 'monthly' },
  ];

  // Pages dynamiques : une URL par projet
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('slug, updated_at');

  const projectPages: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url:             `${baseUrl}/portfolio/${p.slug}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority:        0.7,
  }));

  return [...staticPages, ...projectPages];
}
