'use client';
import React from 'react';

interface Props {
  x: number; z: number; largeur: number; profondeur: number;
  y?: number; couleur?: string; rugosite?: number; filDefer?: boolean;
  propsInteraction?: Record<string, unknown>;
  emissif?: string; intensiteEmissif?: number;
}

export function Sol({
  x, z, largeur, profondeur, y = 0,
  couleur = '#c8a97e', rugosite = 0.7, filDefer = false,
  propsInteraction = {}, emissif = '#000', intensiteEmissif = 0,
}: Props) {
  return (
    <mesh {...propsInteraction} position={[x, y, z]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[largeur, profondeur]} />
      <meshStandardMaterial color={couleur} roughness={rugosite} emissive={emissif} emissiveIntensity={intensiteEmissif} wireframe={filDefer} />
    </mesh>
  );
}
