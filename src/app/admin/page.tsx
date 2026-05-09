import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { BrandBadge } from '@/components/BrandBadge';
import { CATEGORY_LABELS } from '@/lib/supabase/types';
import type { Project } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Admin — Dashboard',
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const projects: Project[] = data ?? [];

  return (
    <div className="section">
      <div className="container-page">

        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-gray-500 mb-1">&gt;_ admin dashboard</p>
            <h1 className="text-xl font-bold text-gray-100">Projets</h1>
            <p className="text-xs font-mono text-gray-500 mt-0.5">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portfolio" className="btn-outline text-xs py-1.5 px-3">
              /portfolio ↗
            </Link>
            <Link href="/admin/projects/new" className="btn-studios py-1.5 px-3 text-xs">
              <Plus size={14} /> Nouveau projet
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 text-sm font-mono text-red-400 border border-red-900 bg-red-950 rounded px-4 py-3">
            Erreur : {error.message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total',        value: projects.length },
            { label: 'En vedette',   value: projects.filter((p) => p.featured).length },
            { label: 'Web apps',     value: projects.filter((p) => p.category === 'web_app').length },
            { label: 'Jeux mobiles', value: projects.filter((p) => p.category === 'mobile_game').length },
          ].map((s) => (
            <div key={s.label} className="rounded border border-[#21262d] bg-[#0d1117] p-4 text-center">
              <p className="text-2xl font-bold font-mono text-cupadev-400">{s.value}</p>
              <p className="text-xs font-mono text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#21262d] rounded-lg">
            <p className="font-mono text-gray-500">Aucun projet</p>
            <Link href="/admin/projects/new" className="text-xs font-mono text-cupadev-400 hover:text-cupadev-300 mt-2 inline-block">
              + Créer le premier projet
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-[#21262d] bg-[#0d1117] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#21262d]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-mono text-gray-500 uppercase tracking-widest">Projet</th>
                    <th className="text-left px-4 py-3 text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:table-cell">Catégorie</th>
                    <th className="text-left px-4 py-3 text-xs font-mono text-gray-500 uppercase tracking-widest hidden md:table-cell">Marque</th>
                    <th className="text-left px-4 py-3 text-xs font-mono text-gray-500 uppercase tracking-widest hidden lg:table-cell">Vedette</th>
                    <th className="text-right px-4 py-3 text-xs font-mono text-gray-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262d]">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-[#161b22] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-100">{project.title}</p>
                        <p className="text-xs font-mono text-gray-500">{project.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                        {CATEGORY_LABELS[project.category]}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <BrandBadge brand={project.brand} size="sm" />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {project.featured ? (
                          <span className="text-xs font-mono text-studios-400">● vedette</span>
                        ) : (
                          <span className="text-xs text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {project.external_url && (
                            <a href={project.external_url} target="_blank" rel="noopener noreferrer"
                              className="p-1.5 text-gray-500 hover:text-cupadev-400 transition-colors"
                              aria-label={`Ouvrir ${project.title}`}>
                              <ExternalLink size={14} />
                            </a>
                          )}
                          <Link href={`/admin/projects/${project.id}`}
                            className="p-1.5 text-gray-500 hover:text-cupadev-400 transition-colors"
                            aria-label={`Modifier ${project.title}`}>
                            <Edit2 size={14} />
                          </Link>
                          <DeleteButton projectId={project.id} projectTitle={project.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Déconnexion */}
        <div className="mt-6">
          <LogoutButton />
        </div>

      </div>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/auth/signout" method="POST">
      <button type="submit" className="text-xs font-mono text-gray-600 hover:text-red-400 transition-colors">
        → se déconnecter
      </button>
    </form>
  );
}

function DeleteButton({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  return (
    <form
      action={`/api/admin/projects/${projectId}/delete`}
      method="POST"
      onSubmit={(e) => {
        if (!window.confirm(`Supprimer "${projectTitle}" ?`)) e.preventDefault();
      }}
    >
      <button type="submit"
        className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
        aria-label={`Supprimer ${projectTitle}`}>
        <Trash2 size={14} />
      </button>
    </form>
  );
}
