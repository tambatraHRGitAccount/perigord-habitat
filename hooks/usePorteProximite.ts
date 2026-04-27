'use client';
import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { IdPiece } from '@/types/maison';

interface Porte {
  position: THREE.Vector3;
  piece: IdPiece;
  nom: string;
}

const PORTES: Porte[] = [
  { position: new THREE.Vector3(-2.625, 0, 1.5), piece: 'chambre', nom: 'Chambre' },
  { position: new THREE.Vector3(1.5, 0, 1.5), piece: 'cuisine', nom: 'Cuisine' },
  { position: new THREE.Vector3(0.75, 0, 3.25), piece: 'couloir', nom: 'Couloir' },
  { position: new THREE.Vector3(2.5, 0, 3.2), piece: 'salleDeBain', nom: 'Salle de bain' },
];

const DISTANCE_INTERACTION = 2.0; // Distance en mètres pour interagir

export function usePorteProximite(pieceActive: IdPiece | 'exterieur' | 'interieur', enabled: boolean) {
  const { camera } = useThree();
  const [porteProche, setPorteProche] = useState<{ piece: IdPiece; nom: string } | null>(null);

  useEffect(() => {
    if (!enabled || pieceActive === 'exterieur') {
      setPorteProche(null);
      return;
    }

    const interval = setInterval(() => {
      const cameraPos = camera.position;
      let portePlusProche: { piece: IdPiece; nom: string; distance: number } | null = null;

      for (const porte of PORTES) {
        // Ne pas afficher la porte de la pièce actuelle
        if (porte.piece === pieceActive) continue;

        const distance = cameraPos.distanceTo(porte.position);
        
        if (distance < DISTANCE_INTERACTION) {
          if (!portePlusProche || distance < portePlusProche.distance) {
            portePlusProche = { piece: porte.piece, nom: porte.nom, distance };
          }
        }
      }

      if (portePlusProche) {
        setPorteProche({ piece: portePlusProche.piece, nom: portePlusProche.nom });
      } else {
        setPorteProche(null);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [camera, pieceActive, enabled]);

  return porteProche;
}
