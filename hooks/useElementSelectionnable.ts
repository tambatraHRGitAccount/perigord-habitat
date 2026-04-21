'use client';
import { useCallback, useState } from 'react';
import { useScene } from './useSceneStore';
import type { IdPiece, Materiau } from '@/types/maison';

interface Options {
  idPiece:   IdPiece | 'exterieur';
  idElement: string;
  libelle:   string;
  defaut:    Materiau;
}

export function useElementSelectionnable(opts: Options) {
  const { selectionnerObjet, getMateriau, objetSelectionne } = useScene();
  const [survole, setSurvole] = useState(false);

  const materiau = getMateriau(opts.idPiece, opts.idElement, opts.defaut);
  const estSelectionne =
    objetSelectionne?.idPiece === opts.idPiece &&
    objetSelectionne?.idElement === opts.idElement;

  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    selectionnerObjet({ idPiece: opts.idPiece, idElement: opts.idElement, libelle: opts.libelle, materiau });
  }, [opts.idPiece, opts.idElement, opts.libelle, materiau, selectionnerObjet]);

  const onPointerOver = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation(); setSurvole(true); document.body.style.cursor = 'pointer';
  }, []);

  const onPointerOut = useCallback(() => {
    setSurvole(false); document.body.style.cursor = 'auto';
  }, []);

  return {
    materiau,
    estSelectionne,
    survole,
    propsInteraction: { onClick, onPointerOver, onPointerOut },
    // Couleur de sélection : cyan électrique #00e5ff — unique, jamais utilisée ailleurs
    // Survol : blanc doux pour indiquer l'interactivité
    emissif:          estSelectionne ? '#00e5ff' : survole ? '#aaddff' : '#000000',
    intensiteEmissif: estSelectionne ? 0.55 : survole ? 0.12 : 0,
  };
}
