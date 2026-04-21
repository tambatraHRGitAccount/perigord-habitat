'use client';
import React from 'react';
import { HAUTEUR_MUR, EPAISSEUR_MUR } from '@/lib/three/constantes';

interface Props {
  debut: [number, number];
  fin:   [number, number];
  hauteur?: number;
  couleur?: string;
  filDefer?: boolean;
}

export function Mur({ debut, fin, hauteur = HAUTEUR_MUR, couleur = '#f5f0eb', filDefer = false }: Props) {
  const dx = fin[0] - debut[0], dz = fin[1] - debut[1];
  const longueur = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  return (
    <mesh position={[(debut[0]+fin[0])/2, hauteur/2, (debut[1]+fin[1])/2]} rotation={[0, angle, 0]} castShadow receiveShadow>
      <boxGeometry args={[EPAISSEUR_MUR, hauteur, longueur]} />
      <meshStandardMaterial color={couleur} roughness={0.85} wireframe={filDefer} />
    </mesh>
  );
}
