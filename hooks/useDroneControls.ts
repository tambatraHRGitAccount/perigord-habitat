'use client';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { IdPiece } from '@/types/maison';

interface DroneControlsProps {
  enabled: boolean;
  speed?: number;
  rotationSpeed?: number;
  pieceActive: IdPiece | 'exterieur' | 'interieur';
  onChangePiece?: (piece: IdPiece) => void;
}

// Définition des limites de chaque pièce (murs intérieurs avec marges pour les portes)
const LIMITES_PIECES: Record<string, { minX: number; maxX: number; minZ: number; maxZ: number }> = {
  sejour:      { minX: -5.875, maxX: 0.625,  minZ: -4.875, maxZ: 1.375 },
  cuisine:     { minX: 0.875,  maxX: 5.875,  minZ: -4.875, maxZ: 1.375 },
  chambre:     { minX: -5.875, maxX: 0.625,  minZ: 1.625,  maxZ: 4.875 },
  salleDeBain: { minX: 2.625,  maxX: 5.875,  minZ: 1.625,  maxZ: 4.875 },
  couloir:     { minX: 0.875,  maxX: 2.375,  minZ: 1.625,  maxZ: 4.875 },
};

// Définition des portes (passages entre pièces)
const PORTES: Array<{
  piece1: IdPiece;
  piece2: IdPiece;
  position: { x: number; z: number };
  direction: 'x' | 'z'; // Direction du passage
  largeur: number;
}> = [
  // Porte séjour ↔ chambre (cloison z=1.5)
  { piece1: 'sejour', piece2: 'chambre', position: { x: -2.625, z: 1.5 }, direction: 'z', largeur: 0.85 },
  // Porte cuisine ↔ couloir (cloison z=1.5)
  { piece1: 'cuisine', piece2: 'couloir', position: { x: 1.5, z: 1.5 }, direction: 'z', largeur: 0.85 },
  // Porte chambre ↔ couloir (cloison x=0.75)
  { piece1: 'chambre', piece2: 'couloir', position: { x: 0.75, z: 3.25 }, direction: 'x', largeur: 0.85 },
  // Porte couloir ↔ salle de bain (cloison x=2.5)
  { piece1: 'couloir', piece2: 'salleDeBain', position: { x: 2.5, z: 3.2 }, direction: 'x', largeur: 0.8 },
];

export function useDroneControls({ 
  enabled, 
  speed = 0.1, 
  rotationSpeed = 0.02,
  pieceActive,
  onChangePiece
}: DroneControlsProps) {
  const { camera } = useThree();
  const moveState = useRef({ 
    forward: false, 
    backward: false, 
    left: false, 
    right: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false
  });
  const velocity = useRef(new THREE.Vector3());
  const pieceActuelle = useRef<IdPiece | 'exterieur' | 'interieur'>(pieceActive);

  // Mettre à jour la pièce actuelle
  useEffect(() => {
    pieceActuelle.current = pieceActive;
  }, [pieceActive]);

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':    moveState.current.forward = true; break;
        case 'ArrowDown':  moveState.current.backward = true; break;
        case 'ArrowLeft':  moveState.current.rotateLeft = true; break;
        case 'ArrowRight': moveState.current.rotateRight = true; break;
        case 'KeyQ':       moveState.current.left = true; break;
        case 'KeyD':       moveState.current.right = true; break;
        case 'Space':      moveState.current.up = true; break;
        case 'ShiftLeft':  moveState.current.down = true; break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':    moveState.current.forward = false; break;
        case 'ArrowDown':  moveState.current.backward = false; break;
        case 'ArrowLeft':  moveState.current.rotateLeft = false; break;
        case 'ArrowRight': moveState.current.rotateRight = false; break;
        case 'KeyQ':       moveState.current.left = false; break;
        case 'KeyD':       moveState.current.right = false; break;
        case 'Space':      moveState.current.up = false; break;
        case 'ShiftLeft':  moveState.current.down = false; break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;

    const piece = pieceActuelle.current;
    
    // Ne permettre le mouvement que dans une pièce spécifique
    if (piece === 'exterieur' || piece === 'interieur') return;

    const limites = LIMITES_PIECES[piece];
    if (!limites) return;

    const state = moveState.current;
    
    // Rotation (flèches gauche/droite)
    if (state.rotateLeft) {
      camera.rotation.y += rotationSpeed;
    }
    if (state.rotateRight) {
      camera.rotation.y -= rotationSpeed;
    }

    // Calculer la direction avant/arrière basée sur la rotation de la caméra
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Garder le mouvement horizontal
    direction.normalize();

    // Direction latérale (perpendiculaire)
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();

    // Réinitialiser la vélocité
    velocity.current.set(0, 0, 0);

    // Avant/Arrière (flèches haut/bas)
    if (state.forward) {
      velocity.current.add(direction.multiplyScalar(speed));
    }
    if (state.backward) {
      velocity.current.add(direction.multiplyScalar(-speed));
    }

    // Gauche/Droite (Q/D)
    if (state.left) {
      velocity.current.add(right.multiplyScalar(-speed));
    }
    if (state.right) {
      velocity.current.add(right.multiplyScalar(speed));
    }

    // Haut/Bas (Espace/Shift)
    if (state.up) {
      velocity.current.y += speed;
    }
    if (state.down) {
      velocity.current.y -= speed;
    }

    // Calculer la nouvelle position
    const nouvellePosition = camera.position.clone().add(velocity.current);

    // Limites de hauteur
    nouvellePosition.y = Math.max(0.8, Math.min(nouvellePosition.y, 2.5));

    // Vérifier si on est proche d'une porte
    let porteTrouvee = false;
    let pieceDestination: IdPiece | null = null;
    
    for (const porte of PORTES) {
      if (porte.piece1 === piece || porte.piece2 === piece) {
        const distancePorte = Math.sqrt(
          Math.pow(nouvellePosition.x - porte.position.x, 2) +
          Math.pow(nouvellePosition.z - porte.position.z, 2)
        );

        // Si on est dans la zone de la porte (< 1.2m pour une zone plus large)
        if (distancePorte < 1.2) {
          porteTrouvee = true;
          
          // Déterminer la pièce de destination
          const destination = porte.piece1 === piece ? porte.piece2 : porte.piece1;
          const limitesDestination = LIMITES_PIECES[destination];
          
          if (limitesDestination) {
            // Vérifier si la nouvelle position est dans la pièce de destination
            const dansDestination = 
              nouvellePosition.x >= limitesDestination.minX &&
              nouvellePosition.x <= limitesDestination.maxX &&
              nouvellePosition.z >= limitesDestination.minZ &&
              nouvellePosition.z <= limitesDestination.maxZ;

            if (dansDestination) {
              // On traverse la porte vers la destination
              pieceDestination = destination;
              break;
            }
          }
        }
      }
    }

    // Si on change de pièce
    if (pieceDestination && onChangePiece) {
      onChangePiece(pieceDestination);
      pieceActuelle.current = pieceDestination;
      // Appliquer le mouvement sans restriction
      camera.position.copy(nouvellePosition);
      return;
    }

    // Si on n'est pas à une porte, appliquer les limites de la pièce actuelle
    if (!porteTrouvee) {
      const marge = 0.3; // Marge de sécurité pour ne pas coller aux murs
      nouvellePosition.x = Math.max(limites.minX + marge, Math.min(nouvellePosition.x, limites.maxX - marge));
      nouvellePosition.z = Math.max(limites.minZ + marge, Math.min(nouvellePosition.z, limites.maxZ - marge));
    }

    // Appliquer le mouvement
    camera.position.copy(nouvellePosition);
  });

  return {
    moveState: moveState.current,
  };
}
