// =====================================================
// Types générés manuellement depuis le schéma Supabase
// (dans un projet réel : `npx supabase gen types typescript`)
// =====================================================

export type ProjectCategory = 'web_app' | 'website' | 'mobile_game' | 'ci_cd';
export type ProjectBrand = 'cupadev' | 'cupacode-studios';

// Libellés lisibles pour l'affichage
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web_app:      'Application web / SaaS',
  website:      'Site web',
  mobile_game:  'Jeu mobile',
  ci_cd:        'Infrastructure / CI-CD',
};

// Libellés de marques
export const BRAND_LABELS: Record<ProjectBrand, string> = {
  'cupadev':          'CUPADEV',
  'cupacode-studios': 'Cupacode Studios',
};

// Couleurs Tailwind associées à chaque marque
export const BRAND_COLORS: Record<ProjectBrand, { bg: string; text: string; border: string }> = {
  'cupadev': {
    bg:     'bg-cupadev-600',
    text:   'text-cupadev-600',
    border: 'border-cupadev-600',
  },
  'cupacode-studios': {
    bg:     'bg-studios-600',
    text:   'text-studios-600',
    border: 'border-studios-600',
  },
};

// =====================================================
// Type principal : Project
// =====================================================
export interface Project {
  id:                string;
  slug:              string;
  title:             string;
  description_short: string;
  description_long:  string;
  category:          ProjectCategory;
  brand:             ProjectBrand;
  tech_stack:        string[];
  external_url:      string | null;
  screenshots:       string[];
  featured:          boolean;
  created_at:        string;
  updated_at:        string;
}

// Sous-ensemble utilisé pour les formulaires (sans les champs auto)
export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<ProjectInsert>;

// =====================================================
// Type Database (structure Supabase)
// =====================================================
export interface Database {
  public: {
    Tables: {
      projects: {
        Row:    Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
    };
    Enums: {
      project_category: ProjectCategory;
      project_brand:    ProjectBrand;
    };
  };
}
