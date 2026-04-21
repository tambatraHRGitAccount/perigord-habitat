'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  largeur?: number;
  hauteur?: number;
  exterieure?: boolean;
}

/**
 * Porte avec cadre et panneau pivotant.
 *
 * Géométrie :
 * - Le cadre (linteau + 2 montants) a une profondeur = épaisseur du mur (0.25m)
 *   pour s'insérer proprement sans déborder.
 * - Le panneau pivote autour de son bord GAUCHE.
 *   À 90° d'ouverture, il se rabat le long du mur → ouverture totalement vide.
 * - Aucun seuil rendu (évite l'artefact visible au sol).
 *
 * Pivot :
 *   groupe pivotant positionné à x = -largeur/2 (bord gauche de l'ouverture)
 *   panneau centré à x = +largeur/2 dans ce groupe → bord gauche à x=0 = axe pivot
 */
export function Porte({
  position,
  rotation = [0, 0, 0],
  largeur = 0.9,
  hauteur = 2.1,
  exterieure = false,
}: Props) {
  const [ouverte, setOuverte] = useState(false);
  const panneauRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!panneauRef.current) return;
    panneauRef.current.rotation.y = THREE.MathUtils.lerp(
      panneauRef.current.rotation.y,
      ouverte ? -Math.PI / 2 : 0,
      0.1
    );
  });

  const couleurCadre   = exterieure ? '#5c3d2e' : '#7a6248';
  const couleurPanneau = exterieure ? '#6b4c2a' : '#8b7355';

  // Profondeur du cadre = épaisseur du mur exacte pour ne pas déborder
  const profCadre = 0.25;
  const epPanneau = 0.05;

  return (
    <group position={position} rotation={rotation}>

      {/* ── Cadre : 3 pièces, profondeur = épaisseur mur ── */}
      {/* Linteau */}
      <mesh position={[0, hauteur + 0.05, 0]} castShadow>
        <boxGeometry args={[largeur + 0.16, 0.1, profCadre]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.5} />
      </mesh>
      {/* Montant gauche */}
      <mesh position={[-(largeur / 2 + 0.04), hauteur / 2, 0]} castShadow>
        <boxGeometry args={[0.08, hauteur, profCadre]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.5} />
      </mesh>
      {/* Montant droit */}
      <mesh position={[largeur / 2 + 0.04, hauteur / 2, 0]} castShadow>
        <boxGeometry args={[0.08, hauteur, profCadre]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.5} />
      </mesh>

      {/* ── Panneau pivotant ── */}
      {/* Pivot à x = -largeur/2 (bord gauche de l'ouverture) */}
      <group ref={panneauRef} position={[-largeur / 2, 0, 0]}>

        {/* Panneau — centré à x=+largeur/2 dans le groupe pivot */}
        <mesh
          position={[largeur / 2, hauteur / 2, 0]}
          onClick={() => setOuverte(o => !o)}
          castShadow
        >
          <boxGeometry args={[largeur, hauteur, epPanneau]} />
          <meshStandardMaterial color={couleurPanneau} roughness={0.5} />
        </mesh>

        {/* Moulures décoratives */}
        {[hauteur * 0.68, hauteur * 0.28].map((y, i) => (
          <group key={i} position={[largeur / 2, y, epPanneau / 2 + 0.004]}>
            <mesh>
              <boxGeometry args={[largeur * 0.78, hauteur * 0.28, 0.01]} />
              <meshStandardMaterial color="#5c3d2e" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.007]}>
              <boxGeometry args={[largeur * 0.72, hauteur * 0.22, 0.007]} />
              <meshStandardMaterial color={couleurPanneau} roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Poignée — côté droit */}
        <group position={[largeur - 0.1, hauteur / 2, epPanneau / 2 + 0.01]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.036, 0.036, 0.012, 14]} />
            <meshStandardMaterial color="#c8a97e" roughness={0.2} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.055, 0.008]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.02, 0.11, 0.02]} />
            <meshStandardMaterial color="#c8a97e" roughness={0.2} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.11, 0.02]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshStandardMaterial color="#c8a97e" roughness={0.2} metalness={0.6} />
          </mesh>
        </group>

        {/* Charnières (3) */}
        {[0.22, hauteur / 2, hauteur - 0.22].map((y, i) => (
          <mesh key={i} position={[0.02, y, 0]}>
            <boxGeometry args={[0.03, 0.08, 0.06]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.2} metalness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
