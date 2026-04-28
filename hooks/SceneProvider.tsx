'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { ContexteScene, StoreScene } from './useSceneStore';
import type { ModeCamera, IdPiece, EtatLumieres, ObjetSelectionne, Materiau } from '@/types/maison';

export function FournisseurScene({ children }: { children: React.ReactNode }) {
  const [modeCamera,          setModeCameraEtat]   = useState<ModeCamera>('orbite');
  const [pieceActive,         setPieceActiveEtat]  = useState<IdPiece | 'exterieur' | 'interieur'>('exterieur');
  const [modeJourNuit,        setModeJourNuitEtat] = useState<'jour' | 'nuit'>('jour');
  const [afficherFilDefer,    setAfficherFil]      = useState(false);
  const [sensibiliteCamera,   setSensibiliteCameraEtat] = useState(1.5); // Sensibilité par défaut augmentée
  const [tooltip,             setTooltip]          = useState<string | null>(null);
  const [equipementModalId,   setEquipementModalId] = useState<string | null>(null);
  const [lumieres,            setLumieres]         = useState<EtatLumieres>({
    sejour: true, cuisine: true, chambre: true, salleDeBain: true, couloir: true,
  });
  const [objetSelectionne,    setObjetSelectionne]    = useState<ObjetSelectionne | null>(null);
  const [surchargesMateriaux, setSurchargesMateriaux] = useState<Record<string, Materiau>>({});

  const setModeCamera    = useCallback((m: ModeCamera) => setModeCameraEtat(m), []);
  const setPieceActive = useCallback((p: IdPiece | 'exterieur' | 'interieur') => {
    setPieceActiveEtat(p);
    // Ne plus changer automatiquement le mode caméra
    // L'utilisateur garde le contrôle du mode (orbite ou visite)
  }, []);
  const setModeJourNuit  = useCallback((v: 'jour' | 'nuit') => setModeJourNuitEtat(v), []);
  const toggleFilDefer   = useCallback(() => setAfficherFil(p => !p), []);
  const setSensibiliteCamera = useCallback((sensibilite: number) => setSensibiliteCameraEtat(sensibilite), []);
  const toggleLumiere    = useCallback((p: keyof EtatLumieres) => {
    setLumieres(prev => ({ ...prev, [p]: !prev[p] }));
  }, []);

  const selectionnerObjet = useCallback((obj: ObjetSelectionne | null) => {
    setObjetSelectionne(obj);
  }, []);

  const modifierMateriau = useCallback((cle: string, patch: Partial<Materiau>) => {
    setSurchargesMateriaux(prev => ({
      ...prev,
      [cle]: { ...(prev[cle] ?? { couleur: '#ffffff', rugosite: 0.7, metalique: 0 }), ...patch },
    }));
    setObjetSelectionne(prev => {
      if (!prev) return prev;
      if (`${prev.idPiece}_${prev.idElement}` !== cle) return prev;
      return { ...prev, materiau: { ...prev.materiau, ...patch } };
    });
  }, []);

  const getMateriau = useCallback((
    idPiece: IdPiece | 'exterieur' | 'interieur', idElement: string, defaut: Materiau
  ): Materiau => {
    const surcharge = surchargesMateriaux[`${idPiece}_${idElement}`];
    return surcharge ? { ...defaut, ...surcharge } : defaut;
  }, [surchargesMateriaux]);

  const store = useMemo<StoreScene>(() => ({
    modeCamera, pieceActive, modeJourNuit, afficherFilDefer, sensibiliteCamera,
    lumieres, objetSelectionne, surchargesMateriaux, tooltip, equipementModalId,
    setModeCamera, setPieceActive, setModeJourNuit, toggleFilDefer, setSensibiliteCamera,
    toggleLumiere, selectionnerObjet, modifierMateriau, getMateriau, setTooltip, setEquipementModalId,
  }), [
    modeCamera, pieceActive, modeJourNuit, afficherFilDefer, sensibiliteCamera,
    lumieres, objetSelectionne, surchargesMateriaux, tooltip, equipementModalId,
    setModeCamera, setPieceActive, setModeJourNuit, toggleFilDefer, setSensibiliteCamera,
    toggleLumiere, selectionnerObjet, modifierMateriau, getMateriau,
  ]);

  return <ContexteScene.Provider value={store}>{children}</ContexteScene.Provider>;
}
