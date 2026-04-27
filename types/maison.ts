// ─── Types principaux ─────────────────────────────────────────────────────────

export type ModeCamera = 'orbite' | 'visite';

export type IdPiece =
  | 'sejour'
  | 'cuisine'
  | 'chambre'
  | 'salleDeBain'
  | 'couloir';

export interface Materiau {
  couleur: string;
  rugosite: number;
  metalique: number;
}

export interface ObjetSelectionne {
  idPiece: IdPiece | 'exterieur' | 'interieur';
  idElement: string;
  libelle: string;
  materiau: Materiau;
}

export interface EtatLumieres {
  sejour: boolean;
  cuisine: boolean;
  chambre: boolean;
  salleDeBain: boolean;
  couloir: boolean;
}

export interface EtatScene {
  modeCamera: ModeCamera;
  pieceActive: IdPiece | 'exterieur' | 'interieur';
  modeJourNuit: 'jour' | 'nuit';
  afficherFilDefer: boolean;
  lumieres: EtatLumieres;
  objetSelectionne: ObjetSelectionne | null;
  surchargesMateriaux: Record<string, Materiau>;
  sensibiliteCamera: number; // 0.5 à 2.0
}
