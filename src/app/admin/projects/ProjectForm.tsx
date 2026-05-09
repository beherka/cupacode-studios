'use client';

// =====================================================
// ProjectForm — Formulaire de création / édition de projet
// Gère aussi l'upload de screenshots dans Supabase Storage
// =====================================================

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { Project, ProjectInsert, ProjectCategory, ProjectBrand } from '@/lib/supabase/types';
import { CATEGORY_LABELS, BRAND_LABELS } from '@/lib/supabase/types';

interface ProjectFormProps {
  mode: 'create' | 'edit';
  project?: Project;
}

// Valeurs initiales du formulaire
function defaultValues(project?: Project): ProjectInsert {
  return {
    slug:              project?.slug              ?? '',
    title:             project?.title             ?? '',
    description_short: project?.description_short ?? '',
    description_long:  project?.description_long  ?? '',
    category:          project?.category          ?? 'web_app',
    brand:             project?.brand             ?? 'cupacode-studios',
    tech_stack:        project?.tech_stack        ?? [],
    external_url:      project?.external_url      ?? null,
    screenshots:       project?.screenshots       ?? [],
    featured:          project?.featured          ?? false,
  };
}

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const router   = useRouter();
  const supabase = createClient();

  const [form,        setForm]        = useState<ProjectInsert>(defaultValues(project));
  const [techInput,   setTechInput]   = useState('');
  const [uploading,   setUploading]   = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Handlers champs simples ───────────────────────────────
  const set = <K extends keyof ProjectInsert>(key: K, value: ProjectInsert[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ─── Ajout d'une technologie ───────────────────────────────
  function addTech() {
    const tech = techInput.trim();
    if (tech && !form.tech_stack.includes(tech)) {
      set('tech_stack', [...form.tech_stack, tech]);
    }
    setTechInput('');
  }

  function removeTech(tech: string) {
    set('tech_stack', form.tech_stack.filter((t) => t !== tech));
  }

  // ─── Upload de screenshots vers Supabase Storage ───────────
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    const uploadedPaths: string[] = [];

    for (const file of files) {
      // Nom de fichier unique : slug + timestamp + extension
      const ext      = file.name.split('.').pop() ?? 'jpg';
      const filename = `${form.slug || 'projet'}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const path     = `${form.slug || 'projet'}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from('project-screenshots')
        .upload(path, file, { contentType: file.type, upsert: false });

      if (uploadError) {
        setError(`Erreur upload "${file.name}" : ${uploadError.message}`);
        setUploading(false);
        return;
      }

      uploadedPaths.push(path);
    }

    set('screenshots', [...form.screenshots, ...uploadedPaths]);
    setUploading(false);
    // Reset l'input pour permettre un nouvel upload du même fichier
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // ─── Suppression d'un screenshot ──────────────────────────
  async function removeScreenshot(path: string) {
    // Suppression dans Storage
    await supabase.storage.from('project-screenshots').remove([path]);
    set('screenshots', form.screenshots.filter((s) => s !== path));
  }

  // ─── Soumission du formulaire ──────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    // Nettoyage : URL externe vide → null
    const payload: ProjectInsert = {
      ...form,
      external_url: form.external_url?.trim() || null,
    };

    let dbError: { message: string } | null = null;

    if (mode === 'create') {
      const { error } = await supabase.from('projects').insert(payload);
      dbError = error;
    } else if (project) {
      const { error } = await supabase.from('projects').update(payload).eq('id', project.id);
      dbError = error;
    }

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    // Succès : retour au dashboard
    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ─── Retour ──────────────────────────────────────────── */}
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={14} /> Retour au dashboard
      </Link>

      {/* ─── Slug ────────────────────────────────────────────── */}
      <Field label="Slug (URL)" required hint='Ex : "pulse-crisis" — lettres minuscules, chiffres, tirets uniquement'>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
          required
          pattern="^[a-z0-9-]+$"
          placeholder="mon-projet"
          className={inputClass}
          disabled={mode === 'edit'} // Le slug ne peut pas être modifié après création
        />
      </Field>

      {/* ─── Titre ───────────────────────────────────────────── */}
      <Field label="Titre" required>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
          placeholder="Mon Super Projet"
          className={inputClass}
        />
      </Field>

      {/* ─── Description courte ──────────────────────────────── */}
      <Field label="Description courte" required hint="Affiché sur la carte portfolio (max ~160 caractères)">
        <textarea
          value={form.description_short}
          onChange={(e) => set('description_short', e.target.value)}
          required
          rows={2}
          placeholder="Résumé en une phrase…"
          className={inputClass}
        />
      </Field>

      {/* ─── Description longue ──────────────────────────────── */}
      <Field label="Description longue" hint="Fiche détaillée — Markdown simplifié supporté (**Titre**)">
        <textarea
          value={form.description_long}
          onChange={(e) => set('description_long', e.target.value)}
          rows={10}
          placeholder="Description complète du projet…"
          className={inputClass}
        />
      </Field>

      {/* ─── Catégorie + Marque ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Catégorie" required>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value as ProjectCategory)}
            className={inputClass}
          >
            {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
            ))}
          </select>
        </Field>

        <Field label="Marque" required>
          <select
            value={form.brand}
            onChange={(e) => set('brand', e.target.value as ProjectBrand)}
            className={inputClass}
          >
            {(Object.keys(BRAND_LABELS) as ProjectBrand[]).map((brand) => (
              <option key={brand} value={brand}>{BRAND_LABELS[brand]}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* ─── URL externe ─────────────────────────────────────── */}
      <Field label="URL externe" hint="Laisser vide si le projet est privé">
        <input
          type="url"
          value={form.external_url ?? ''}
          onChange={(e) => set('external_url', e.target.value || null)}
          placeholder="https://monprojet.com"
          className={inputClass}
        />
      </Field>

      {/* ─── Stack technique ─────────────────────────────────── */}
      <Field label="Stack technique">
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
            placeholder="Ex : Next.js"
            className={cn(inputClass, 'flex-1')}
          />
          <button type="button" onClick={addTech} className="btn-outline shrink-0 text-sm px-4">
            Ajouter
          </button>
        </div>
        {/* Tags techno */}
        {form.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {form.tech_stack.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-1 text-xs font-mono bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded-md">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} aria-label={`Supprimer ${tech}`}>
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </Field>

      {/* ─── Screenshots ─────────────────────────────────────── */}
      <Field label="Captures d'écran" hint="Hébergées dans Supabase Storage (bucket project-screenshots)">
        {/* Zone d'upload */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-studios-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
          aria-label="Zone d'upload de captures d'écran"
        >
          <Upload size={24} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            {uploading ? 'Upload en cours…' : 'Cliquer pour ajouter des images'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP — max 5 Mo par fichier</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </div>

        {/* Liste des screenshots existants */}
        {form.screenshots.length > 0 && (
          <ul className="mt-3 space-y-1">
            {form.screenshots.map((path) => (
              <li key={path} className="flex items-center justify-between gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded px-3 py-1.5">
                <span className="font-mono truncate">{path}</span>
                <button
                  type="button"
                  onClick={() => removeScreenshot(path)}
                  className="text-red-400 hover:text-red-600 shrink-0"
                  aria-label={`Supprimer ${path}`}
                >
                  <X size={13} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Field>

      {/* ─── Featured ────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set('featured', e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-studios-600 focus:ring-studios-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Mettre en vedette sur la page d&apos;accueil
        </label>
      </div>

      {/* ─── Erreur ──────────────────────────────────────────── */}
      {error && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* ─── Bouton soumettre ────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className={cn('btn-studios', (saving || uploading) && 'opacity-60 cursor-not-allowed')}
        >
          {saving ? 'Enregistrement…' : mode === 'create' ? 'Créer le projet' : 'Sauvegarder les modifications'}
        </button>
        <Link href="/admin" className="btn-outline text-sm">
          Annuler
        </Link>
      </div>

    </form>
  );
}

// ─── Composant champ générique ────────────────────────────────
function Field({
  label, required, hint, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-studios-500 focus:ring-2 focus:ring-studios-200 outline-none transition';
