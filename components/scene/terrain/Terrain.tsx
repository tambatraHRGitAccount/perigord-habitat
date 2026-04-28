'use client';
import React from 'react';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, EPAISSEUR_MUR } from '@/lib/three/constantes';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

// ─────────────────────────────────────────────────────────────────────────────
//  Repère monde : origine = centre maison au sol
//  Maison : X ∈ [-6, +6],  Z ∈ [-5, +5]
//  Toit (débord 0.8) : X ∈ [-6.8, +6.8],  Z ∈ [-5.8, +5.8]
//  Garage : commence à X = 6.8 + 0.15 = 6.95
//           centre X = 6.95 + 0.125 + 2.0 = 9.075
//           façade avant alignée sur Z = -5.125
// ─────────────────────────────────────────────────────────────────────────────

const EP = EPAISSEUR_MUR;                                    // 0.25
const LM = LARGEUR_MAISON;                                   // 12
const PM = PROFONDEUR_MAISON;                                // 10

// Garage : centre X = 9.075, largeur totale = 4.0 + 0.25*2 = 4.5
// Allée garage : de Z = -5.125 vers Z = -10 (5 m devant la porte)
const GARAGE_CX = 9.075;
const GARAGE_LG = 4.0;
const GARAGE_Z_FACADE = -(PM / 2) - EP / 2;                 // -5.125

export function Terrain() {
  const pelouse = useElementSelectionnable({
    idPiece: 'exterieur',
    idElement: 'pelouse',
    libelle: 'Pelouse',
    defaut: { couleur: '#4a7c59', rugosite: 0.95, metalique: 0 },
  });
  const allee = useElementSelectionnable({
    idPiece: 'exterieur',
    idElement: 'allee',
    libelle: 'Allée',
    defaut: { couleur: '#9e9e9e', rugosite: 0.85, metalique: 0 },
  });

  const M = (s: typeof pelouse) => ({
    color: s.materiau.couleur,
    roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique,
    emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  return (
    <group>

      {/* ── Pelouse principale (70×70, sous tout) ──────────────────────── */}
      <mesh
        {...pelouse.propsInteraction}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial {...M(pelouse)} />
      </mesh>

      {/* ── Dalle béton sous la maison ─────────────────────────────────── */}
      {/* Largeur : de X = -6.25 à X = +6.25 (s'arrête avant le garage) */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[LM + 0.5, 0.12, PM + 0.5]} />
        <meshStandardMaterial color="#c2c2c2" roughness={0.75} />
      </mesh>

      {/* ── Allée principale (devant la porte d'entrée) ────────────────── */}
      {/* Porte à X = -1.05, Z = -5 → allée de Z = -5 à Z = -11 */}
      <mesh
        {...allee.propsInteraction}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-1.05, 0, -8]}
        receiveShadow
      >
        <planeGeometry args={[2.4, 6]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

      {/* ── Allée du garage ────────────────────────────────────────────── */}
      {/* Alignée sur le centre X du garage, de la façade avant vers la rue */}
      <mesh
        {...allee.propsInteraction}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[GARAGE_CX, 0, GARAGE_Z_FACADE - 2.5]}
        receiveShadow
      >
        <planeGeometry args={[GARAGE_LG + EP * 2, 5]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

      {/* ── Bande de liaison entre les deux allées ─────────────────────── */}
      {/* Relie l'allée principale et l'allée garage au niveau de la rue */}
      <mesh
        {...allee.propsInteraction}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[4, 0, -10.5]}
        receiveShadow
      >
        <planeGeometry args={[12, 1.2]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

    </group>
  );
}
