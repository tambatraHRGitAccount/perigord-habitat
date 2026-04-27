'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EPAISSEUR_MUR } from '@/lib/three/constantes';

const BLANC       = '#ffffff';
const BLANC_HOVER = '#e8e8e8';
const BLANC_LAME  = '#f0f0f0';
const BLANC_CADRE = '#f8f8f8';
const N_LAMES     = 14;
const Z_EXT       = -(EPAISSEUR_MUR + 0.02); // face extérieure du mur = -0.27

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  largeur?: number;
  hauteur?: number;
}

export function Fenetre({ position, rotation = [0, 0, 0], largeur = 1.2, hauteur = 1.0 }: Props) {
  const c       = 0.07;   // épaisseur cadre
  const coffreH = 0.14;   // hauteur coffre
  const coffreD = 0.11;   // profondeur coffre (dépasse du mur)

  const [ouvert,  setOuvert]  = useState(false);  // volet fermé par défaut (visible)
  const [survole, setSurvole] = useState(false);

  const hRef       = useRef(hauteur);                                        // hauteur courante du tablier (hauteur = fermé)
  const tablierRef = useRef<THREE.Mesh>(null);
  const lamesRef   = useRef<(THREE.Mesh | null)[]>(Array(N_LAMES).fill(null));

  useFrame(() => {
    const cible = ouvert ? 0 : hauteur;
    hRef.current = THREE.MathUtils.lerp(hRef.current, cible, 0.08);
    const h = hRef.current;

    // Le tablier descend depuis le haut : top fixé à hauteur/2, bottom à hauteur/2 - h
    if (tablierRef.current) {
      tablierRef.current.scale.y     = Math.max(h / hauteur, 0.0001);
      tablierRef.current.position.y  = hauteur / 2 - h / 2;
    }

    // Les lames se répartissent sur la hauteur courante du tablier
    lamesRef.current.forEach((lame, i) => {
      if (lame) lame.position.y = hauteur / 2 - (i + 1) * h / (N_LAMES + 1);
    });
  });

  const couleur = survole ? BLANC_HOVER : BLANC;
  const onClick       = (e: { stopPropagation: () => void }) => { e.stopPropagation(); setOuvert(v => !v); };
  const onOver        = (e: { stopPropagation: () => void }) => { e.stopPropagation(); setSurvole(true);  document.body.style.cursor = 'pointer'; };
  const onOut         = () => { setSurvole(false); document.body.style.cursor = 'auto'; };

  return (
    <group position={position} rotation={rotation}>

      {/* ── Vitrage (verre bleuté semi-transparent) ── */}
      <mesh>
        <boxGeometry args={[largeur - c * 2, hauteur - c * 2, 0.04]} />
        <meshPhysicalMaterial
          color="#b8d8ea" roughness={0.05} metalness={0}
          transmission={0.85} transparent opacity={0.35}
        />
      </mesh>

      {/* ── Cadre PVC blanc ── */}
      {/* Haut */}
      <mesh position={[0, hauteur / 2 - c / 2, 0]}>
        <boxGeometry args={[largeur, c, 0.08]} />
        <meshStandardMaterial color={BLANC_CADRE} roughness={0.3} />
      </mesh>
      {/* Bas */}
      <mesh position={[0, -(hauteur / 2 - c / 2), 0]}>
        <boxGeometry args={[largeur, c, 0.08]} />
        <meshStandardMaterial color={BLANC_CADRE} roughness={0.3} />
      </mesh>
      {/* Gauche */}
      <mesh position={[-(largeur / 2 - c / 2), 0, 0]}>
        <boxGeometry args={[c, hauteur, 0.08]} />
        <meshStandardMaterial color={BLANC_CADRE} roughness={0.3} />
      </mesh>
      {/* Droite */}
      <mesh position={[largeur / 2 - c / 2, 0, 0]}>
        <boxGeometry args={[c, hauteur, 0.08]} />
        <meshStandardMaterial color={BLANC_CADRE} roughness={0.3} />
      </mesh>
      {/* Montant central */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[c, hauteur - c * 2, 0.08]} />
        <meshStandardMaterial color={BLANC_CADRE} roughness={0.3} />
      </mesh>

      {/* ── Appui en pierre ── */}
      <mesh position={[0, -(hauteur / 2) - 0.04, 0.07]}>
        <boxGeometry args={[largeur + 0.12, 0.07, 0.22]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.65} />
      </mesh>

      {/* ── Coffre du volet roulant (au-dessus, côté extérieur) ── */}
      <mesh
        position={[0, hauteur / 2 + coffreH / 2 + 0.008, Z_EXT - coffreD / 2 + 0.025]}
        onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}
        castShadow
      >
        <boxGeometry args={[largeur + 0.06, coffreH, coffreD]} />
        <meshPhysicalMaterial
          color="#d6d6d6" roughness={0.4}
          clearcoat={0.4} clearcoatRoughness={0.2}
        />
      </mesh>

      {/* ── Glissières latérales ── */}
      {([-largeur / 2 - 0.01, largeur / 2 + 0.01] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0, Z_EXT + 0.005]}>
          <boxGeometry args={[0.025, hauteur + 0.04, 0.06]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.5} />
        </mesh>
      ))}

      {/* ── Tablier (panneau principal animé) ── */}
      <mesh
        ref={tablierRef}
        position={[0, 0, Z_EXT]}
        onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}
        castShadow
      >
        <boxGeometry args={[largeur, hauteur, 0.045]} />
        <meshPhysicalMaterial
          color={couleur} roughness={0.45}
          clearcoat={0.2} clearcoatRoughness={0.35}
        />
      </mesh>

      {/* ── Lames horizontales (profil en relief) ── */}
      {Array.from({ length: N_LAMES }).map((_, i) => (
        <mesh
          key={i}
          ref={el => { lamesRef.current[i] = el; }}
          position={[0, hauteur / 2 - (i + 1) * hauteur / (N_LAMES + 1), Z_EXT + 0.022]}
          onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}
        >
          <boxGeometry args={[largeur - 0.005, 0.009, 0.018]} />
          <meshPhysicalMaterial color={BLANC_LAME} roughness={0.55} />
        </mesh>
      ))}

    </group>
  );
}
