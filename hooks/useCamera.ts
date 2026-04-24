'use client';
import * as THREE from 'three';
import type { ModeCamera, IdPiece } from '@/types/maison';

// Positions de caméra pour chaque pièce (LÉGÈREMENT EN RETRAIT du centre pour meilleure vue, hauteur des yeux 1.65m)
const CAMERA_PIECES: Record<string, { pos: [number, number, number]; cible: [number, number, number] }> = {
  // Séjour (5.5m × 5.0m): centre (-2.5, -1.5), caméra légèrement vers l'avant pour voir toute la pièce
  sejour:      { pos: [-2.5, 1.65, 0.2], cible: [-2.5, 1.65, -2.5] },
  // Cuisine (4.5m × 5.0m): centre (3.5, -1.5), caméra légèrement vers l'avant
  cuisine:     { pos: [3.5, 1.65, 0.2], cible: [3.5, 1.65, -2.5] },
  // Chambre (6.5m × 3.25m): centre (-2.625, 3.25), caméra légèrement vers l'avant
  chambre:     { pos: [-2.625, 1.65, 2.2], cible: [-2.625, 1.65, 3.8] },
  // Salle de bain (3.25m × 3.25m): centre (4.25, 3.25), caméra légèrement vers l'avant
  salleDeBain: { pos: [4.25, 1.65, 2.2], cible: [4.25, 1.65, 3.8] },
  // Couloir (1.5m × 3.25m): centre (1.625, 3.25), caméra légèrement vers l'avant
  couloir:     { pos: [1.625, 1.65, 2.2], cible: [1.625, 1.65, 3.8] },
};

function construirePrereglages() {
  const p: Record<string, { pos: THREE.Vector3; cible: THREE.Vector3 }> = {};
  
  // Ajouter uniquement les positions au centre des pièces spécifiques
  for (const [id, vue] of Object.entries(CAMERA_PIECES)) {
    p[`${id}_piece`] = { 
      pos: new THREE.Vector3(...vue.pos), 
      cible: new THREE.Vector3(...vue.cible) 
    };
  }
  
  return p;
}

export const PREREGLAGES_CAMERA: Record<string, { pos: THREE.Vector3; cible: THREE.Vector3 }> = {
  // Vue orbite par défaut : angle 45° optimal pour voir toute la maison de l'extérieur
  orbite: { pos: new THREE.Vector3(20, 16, 20), cible: new THREE.Vector3(0, 2, 0) },
  // Vue visite intérieur : vue en orbite plus proche pour voir l'intérieur de la maison
  visite: { pos: new THREE.Vector3(12, 10, 12), cible: new THREE.Vector3(0, 1.4, 0.5) },
  ...construirePrereglages(),
};

export const CIBLES_ORBITE: Record<string, [number, number, number]> = {
  sejour:      [-2.5, 1.4, -1.5],      // Centre séjour
  cuisine:     [ 3.5, 1.4, -1.5],      // Centre cuisine
  chambre:     [-2.625, 1.4,  3.25],   // Centre chambre
  salleDeBain: [ 4.25, 1.4,  3.25],    // Centre salle de bain
  couloir:     [ 1.625, 1.4,  3.25],   // Centre couloir
  interieur:   [ 0, 1.4,  0.5],        // Centre de la maison
};

export function getClePrereglage(pieceActive: IdPiece | 'exterieur' | 'interieur', modeCamera: ModeCamera): string {
  // Pour l'extérieur et l'intérieur général, utiliser directement le mode caméra
  if (pieceActive === 'exterieur' || pieceActive === 'interieur') {
    return modeCamera;
  }
  
  // Pour une pièce spécifique, toujours utiliser la position centrée (point B)
  // Peu importe le mode, on commence au centre de la pièce
  return `${pieceActive}_piece`;
}
