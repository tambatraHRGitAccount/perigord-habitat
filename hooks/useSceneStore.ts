'use client';
import { createContext, useContext } from 'react';
import type { EtatScene, ModeCamera, IdPiece, EtatLumieres, ObjetSelectionne, Materiau } from '@/types/maison';

export interface StoreScene extends EtatScene {
  setModeCamera:     (m: ModeCamera) => void;
  setPieceActive:    (p: IdPiece | 'exterieur' | 'interieur') => void;
  toggleLumiere:     (p: keyof EtatLumieres) => void;
  setModeJourNuit:   (v: 'jour' | 'nuit') => void;
  toggleFilDefer:    () => void;
  selectionnerObjet: (obj: ObjetSelectionne | null) => void;
  modifierMateriau:  (cle: string, patch: Partial<Materiau>) => void;
  getMateriau:       (idPiece: IdPiece | 'exterieur' | 'interieur', idElement: string, defaut: Materiau) => Materiau;
  setSensibiliteCamera: (sensibilite: number) => void;
  setTooltip:        (libelle: string | null) => void;
  tooltip:           string | null;
}

export const ContexteScene = createContext<StoreScene | null>(null);

export function useScene(): StoreScene {
  const ctx = useContext(ContexteScene);
  if (!ctx) throw new Error('useScene doit être utilisé dans un FournisseurScene');
  return ctx;
}
