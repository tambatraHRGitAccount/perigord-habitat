// ─── Constantes architecturales (unités en mètres) ───────────────────────────

export const EPAISSEUR_MUR     = 0.25;
export const HAUTEUR_MUR       = 2.8;
export const LARGEUR_MAISON    = 12;
export const PROFONDEUR_MAISON = 10;

// Couleurs par défaut des matériaux
export const COULEURS = {
  mur:          '#f5f0eb',
  murExterieur: '#f8f8f8', // Blanc moderne pour villa
  parquet:      '#c8a97e',
  carrelage:    '#e8e0d5',
  gazon:        '#4a7c59',
  beton:        '#9e9e9e',
  bois:         '#8b6914',
  metal:        '#9ca3af',
} as const;
