import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Edit2, Trash2, ExternalLink, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { BrandBadge } from '@/components/BrandBadge';
import { CATEGORY_LABELS } from '@/lib/supabase/types';
import type { Project } from '@/lib/supabase/types';

// =====================================================
// Dashboard admin — liste CRUD des projets
// =====================================================

export const metadata: Metadata = {
  title: 'Admin — Dashboard',
  robots: { index: false, follow: false }, // Exclure des moteurs de recherche
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Vérification de la session (double sécurité avec le middleware)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Récupération de tous les projets
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const projects: Project[] = data ?? [];

  return (
    <div className="section">
      <div className="container-page">

        {/* ─── En-tête ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Connecté en tant que <strong>{user.email}</strong>
            </p>
          </div>
          <Link href="/admin/projects/new" className="btn-studios">
            <Plus size={16} />
            Nouveau projet
          </Link>
        </div>

        {/* Message d'erreur si la requête a échoué */}
        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            Erreur lors du chargement : {error.message}
          </div>
        )}

        {/* ─── Statistiques rapides ────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total projets',      value: projects.length },
            { label: 'En vedette',         value: projects.filter((p) => p.featured).length },
            { label: 'Applications web',   value: projects.filter((p) => p.category === 'web_app').length },
            { label: 'Jeux mobiles',       value: projects.filter((p) => p.category === 'mobile_game').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Table des projets ───────────────────────────────── */}
        {projects.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Aucun projet</p>
            <p className="text-sm mt-1">
              <Link href="/admin/projects/new" className="text-studios-600 hover:underline">
                Créer le premier projet
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Projet</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Catégorie</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Marque</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Vedette</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      {/* Nom + slug */}
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{project.title}</p>
                        <p className="text-xs text-gray-400 font-mono">{project.slug}</p>
                      </td>

                      {/* Catégorie */}
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                        {CATEGORY_LABELS[project.category]}
                      </td>

                      {/* Marque */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <BrandBadge brand={project.brand} size="sm" />
                      </td>

                      {/* Vedette */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {project.featured ? (
                          <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            Oui
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {/* Lien externe */}
                          {project.external_url && (
                            <a
                              href={project.external_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label={`Ouvrir ${project.title}`}
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}

                          {/* Modifier */}
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="p-1.5 text-gray-400 hover:text-cupadev-600 transition-colors"
                            aria-label={`Modifier ${project.title}`}
                          >
                            <Edit2 size={14} />
                          </Link>

                          {/* Supprimer (formulaire Server Action) */}
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

        {/* ─── Liens rapides ───────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-3">
          <Link href="/portfolio" className="btn-outline text-sm">
            Voir le portfolio public
          </Link>
          <LogoutButton />
        </div>

      </div>
    </div>
  );
}

// ─── Composant bouton de déconnexion ─────────────────────────
function LogoutButton() {
  return (
    <form action="/api/auth/signout" method="POST">
      <button
        type="submit"
        className="text-sm text-gray-400 hover:text-red-500 transition-colors"
      >
        Se déconnecter
      </button>
    </form>
  );
}

// ─── Composant bouton de suppression ─────────────────────────
// (déclenche un Server Action via form)
function DeleteButton({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  return (
    <form
      action={`/api/admin/projects/${projectId}/delete`}
      method="POST"
      onSubmit={(e) => {
        if (!window.confirm(`Supprimer "${projectTitle}" ? Cette action est irréversible.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Supprimer ${projectTitle}`}
      >
        <Trash2 size={14} />
      </button>
    </form>
  );
}
