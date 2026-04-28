'use client';
import { useCallback, useState } from 'react';
import { useScene } from './useSceneStore';
import { getEquipementNom } from '@/lib/equipements';
import type { IdPiece, Materiau } from '@/types/maison';

interface Options {
  idPiece:   IdPiece | 'exterieur';
  idElement: string;
  equipementId?: string; // ID de l'équipement dans le JSON
  libelle?:   string;    // Libellé manuel (optionnel si equipementId fourni)
  defaut:    Materiau;
}

export function useElementSelectionnable(opts: Options) {
  const { selectionnerObjet, getMateriau, objetSelectionne, setTooltip, setEquipementModalId } = useScene();
  const [survole, setSurvole] = useState(false);

  // Si pas d'equipementId, l'élément n'est pas sélectionnable
  const estSelectionnable = !!opts.equipementId;

  // Utiliser le nom du JSON si equipementId est fourni, sinon utiliser le libellé manuel
  const libelle = opts.equipementId ? getEquipementNom(opts.equipementId) : (opts.libelle || 'Élément');

  const materiau = getMateriau(opts.idPiece, opts.idElement, opts.defaut);
  const estSelectionne =
    objetSelectionne?.idPiece === opts.idPiece &&
    objetSelectionne?.idElement === opts.idElement;

  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    if (!estSelectionnable) return;
    e.stopPropagation();
    selectionnerObjet({ idPiece: opts.idPiece, idElement: opts.idElement, libelle, materiau });
    // Ouvrir la modale si un equipementId est fourni
    if (opts.equipementId) {
      setEquipementModalId(opts.equipementId);
    }
  }, [estSelectionnable, opts.idPiece, opts.idElement, opts.equipementId, libelle, materiau, selectionnerObjet, setEquipementModalId]);

  const onPointerOver = useCallback((e: { stopPropagation: () => void }) => {
    if (!estSelectionnable) return;
    e.stopPropagation(); 
    setSurvole(true); 
    setTooltip(libelle);
    document.body.style.cursor = 'pointer';
  }, [estSelectionnable, libelle, setTooltip]);

  const onPointerOut = useCallback(() => {
    if (!estSelectionnable) return;
    setSurvole(false); 
    setTooltip(null);
    document.body.style.cursor = 'auto';
  }, [estSelectionnable, setTooltip]);

  return {
    materiau,
    estSelectionne: estSelectionnable && estSelectionne,
    survole: estSelectionnable && survole,
    propsInteraction: estSelectionnable ? { onClick, onPointerOver, onPointerOut } : {},
    // Couleur de sélection : cyan électrique #00e5ff — unique, jamais utilisée ailleurs
    // Survol : blanc doux pour indiquer l'interactivité
    emissif:          (estSelectionnable && estSelectionne) ? '#00e5ff' : (estSelectionnable && survole) ? '#aaddff' : '#000000',
    intensiteEmissif: (estSelectionnable && estSelectionne) ? 0.55 : (estSelectionnable && survole) ? 0.12 : 0,
  };
}
