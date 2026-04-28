'use client';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, HAUTEUR_MUR } from '@/lib/three/constantes';

interface Props { filDefer?: boolean }

// ─────────────────────────────────────────────────────────────────────────────
//  Toit à deux pans — style maison familiale française
//
//  Repère local (centré sur la maison) :
//    L = LARGEUR_MAISON + 2*debord = 13.2  (axe X)
//    P = PROFONDEUR_MAISON + 2*debord = 11.2  (axe Z)
//    base = HAUTEUR_MUR = 2.8
//    faitage = 2.2 m au-dessus des murs → sommet à Y = 5.0
//
//  Pan avant : incliné vers Z- (façade)
//    Bord bas à Z = -P/2 = -5.6,  Y = base = 2.8
//    Faîtage  à Z = 0,             Y = base + faitage = 5.0
//    Angle = atan2(faitage, P/2) = atan2(2.2, 5.6) ≈ 21.4°
//
//  Pan arrière : symétrique vers Z+
// ─────────────────────────────────────────────────────────────────────────────

export function Toit({ filDefer = false }: Props) {
  const debord  = 0.6;
  const L       = LARGEUR_MAISON + debord * 2;   // 13.2
  const P       = PROFONDEUR_MAISON + debord * 2; // 11.2
  const base    = HAUTEUR_MUR;                    // 2.8
  const faitage = 2.2;
  const ep      = 0.1;                            // épaisseur du pan

  // Longueur du pan (hypoténuse)
  const longueurPan = Math.sqrt((P / 2) ** 2 + faitage ** 2);
  // Angle d'inclinaison
  const angle = Math.atan2(faitage, P / 2);

  // Centre Y du pan (milieu entre bord bas et faîtage)
  const panCY = base + faitage / 2;
  // Centre Z du pan avant (milieu entre -P/2 et 0)
  const panCZ_avant = -P / 4;
  const panCZ_arriere = P / 4;

  const C_TUILE    = '#8b4513';
  const C_TUILE2   = '#7a3b10';
  const C_PIGNON   = '#e8e0d0';
  const C_FAITIERE = '#6b3410';
  const C_GOUT     = '#5a5a5a';

  return (
    <group>

      {/* ── Pan avant (incliné vers Z-) ─────────────────────────────────── */}
      <mesh
        position={[0, panCY, panCZ_avant]}
        rotation={[-angle, 0, 0]}
        castShadow receiveShadow
      >
        <boxGeometry args={[L, ep, longueurPan]} />
        <meshStandardMaterial color={C_TUILE} roughness={0.9} wireframe={filDefer} />
      </mesh>

      {/* ── Pan arrière (incliné vers Z+) ───────────────────────────────── */}
      <mesh
        position={[0, panCY, panCZ_arriere]}
        rotation={[angle, 0, 0]}
        castShadow receiveShadow
      >
        <boxGeometry args={[L, ep, longueurPan]} />
        <meshStandardMaterial color={C_TUILE2} roughness={0.9} wireframe={filDefer} />
      </mesh>

      {/* ── Faîtière ────────────────────────────────────────────────────── */}
      <mesh position={[0, base + faitage + ep / 2, 0]} castShadow>
        <boxGeometry args={[L + 0.1, 0.18, 0.22]} />
        <meshStandardMaterial color={C_FAITIERE} roughness={0.85} wireframe={filDefer} />
      </mesh>

      {/* ── Pignons triangulaires (côtés gauche et droit) ───────────────── */}
      <PignonTriangle
        position={[-L / 2, base, 0]}
        largeur={P} hauteur={faitage}
        couleur={C_PIGNON} filDefer={filDefer}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <PignonTriangle
        position={[L / 2, base, 0]}
        largeur={P} hauteur={faitage}
        couleur={C_PIGNON} filDefer={filDefer}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* ── Gouttières (bord bas des pans) ──────────────────────────────── */}
      {/* Avant */}
      <mesh position={[0, base + 0.05, -P / 2]} castShadow>
        <boxGeometry args={[L + 0.1, 0.1, 0.12]} />
        <meshStandardMaterial color={C_GOUT} roughness={0.4} metalness={0.6} wireframe={filDefer} />
      </mesh>
      {/* Arrière */}
      <mesh position={[0, base + 0.05, P / 2]} castShadow>
        <boxGeometry args={[L + 0.1, 0.1, 0.12]} />
        <meshStandardMaterial color={C_GOUT} roughness={0.4} metalness={0.6} wireframe={filDefer} />
      </mesh>

      {/* ── Descentes de gouttière (4 coins) ────────────────────────────── */}
      {[
        [-L / 2 + 0.3, -P / 2],
        [ L / 2 - 0.3, -P / 2],
        [-L / 2 + 0.3,  P / 2],
        [ L / 2 - 0.3,  P / 2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, base / 2, z]} castShadow>
          <boxGeometry args={[0.08, base, 0.08]} />
          <meshStandardMaterial color={C_GOUT} roughness={0.4} metalness={0.6} wireframe={filDefer} />
        </mesh>
      ))}

      {/* ── Cheminée ────────────────────────────────────────────────────── */}
      <Cheminee base={base} faitage={faitage} filDefer={filDefer} />

      {/* ── Lucarnes sur le pan avant ────────────────────────────────────── */}
      {!filDefer && (
        <>
          {/* Position sur le pan : à mi-hauteur du pan, décalées en X */}
          <Lucarne
            position={[-2.5, base + faitage * 0.45, -P / 4 + 0.1]}
            rotationX={-angle}
            filDefer={filDefer}
          />
          <Lucarne
            position={[ 2.5, base + faitage * 0.45, -P / 4 + 0.1]}
            rotationX={-angle}
            filDefer={filDefer}
          />
        </>
      )}

    </group>
  );
}

// ── Triangle de pignon ────────────────────────────────────────────────────────
function PignonTriangle({ position, largeur, hauteur, couleur, filDefer, rotation }: {
  position: [number, number, number];
  largeur: number; hauteur: number; couleur: string; filDefer: boolean;
  rotation: [number, number, number];
}) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-largeur / 2, 0);
    shape.lineTo( largeur / 2, 0);
    shape.lineTo( 0,           hauteur);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.25, bevelEnabled: false });
  }, [largeur, hauteur]);

  return (
    <mesh geometry={geo} position={position} rotation={rotation} castShadow receiveShadow>
      <meshStandardMaterial color={couleur} roughness={0.85} wireframe={filDefer} />
    </mesh>
  );
}

// ── Cheminée ──────────────────────────────────────────────────────────────────
function Cheminee({ base, faitage, filDefer }: { base: number; faitage: number; filDefer: boolean }) {
  // Positionnée sur le pan arrière, côté droit
  const hCorps = faitage * 0.7 + 0.6;
  const yBase  = base + faitage * 0.4;

  return (
    <group position={[3.0, yBase, 1.0]}>
      <mesh position={[0, hCorps / 2, 0]} castShadow>
        <boxGeometry args={[0.5, hCorps, 0.5]} />
        <meshStandardMaterial color="#8b6355" roughness={0.9} wireframe={filDefer} />
      </mesh>
      <mesh position={[0, hCorps + 0.07, 0]} castShadow>
        <boxGeometry args={[0.68, 0.14, 0.68]} />
        <meshStandardMaterial color="#6b4a3a" roughness={0.85} wireframe={filDefer} />
      </mesh>
      <mesh position={[0, hCorps + 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.38, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} wireframe={filDefer} />
      </mesh>
    </group>
  );
}

// ── Lucarne ───────────────────────────────────────────────────────────────────
function Lucarne({ position, rotationX, filDefer }: {
  position: [number, number, number];
  rotationX: number;
  filDefer: boolean;
}) {
  return (
    <group position={position} rotation={[rotationX, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.85, 0.65, 0.45]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.85} wireframe={filDefer} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.95, 0.11, 0.55]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} wireframe={filDefer} />
      </mesh>
      {!filDefer && (
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[0.6, 0.45, 0.04]} />
          <meshStandardMaterial color="#a8d4f0" roughness={0.1} transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}
