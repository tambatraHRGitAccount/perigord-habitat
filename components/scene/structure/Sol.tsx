'use client';
import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

interface Props {
  x: number; z: number; largeur: number; profondeur: number;
  y?: number; couleur?: string; rugosite?: number; filDefer?: boolean;
  propsInteraction?: Record<string, unknown>;
  emissif?: string; intensiteEmissif?: number;
  clearcoat?: number; clearcoatRoughness?: number;
  reflectif?: boolean;
  mirrorForce?: number;
}

export function Sol({
  x, z, largeur, profondeur, y = 0,
  couleur = '#c8a97e', rugosite = 0.7, filDefer = false,
  propsInteraction = {}, emissif = '#000', intensiteEmissif = 0,
  clearcoat = 0, clearcoatRoughness = 0.1,
  reflectif = false, mirrorForce = 0.5,
}: Props) {
  return (
    <mesh {...propsInteraction} position={[x, y, z]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
      <planeGeometry args={[largeur, profondeur]} />
      {reflectif && !filDefer ? (
        <MeshReflectorMaterial
          color={couleur}
          roughness={rugosite}
          emissive={emissif}
          emissiveIntensity={intensiteEmissif}
          blur={[256, 64]}
          resolution={512}
          mixBlur={1}
          mixStrength={mirrorForce * 40}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          mirror={mirrorForce}
          reflectorOffset={0.1}
        />
      ) : (
        <meshPhysicalMaterial
          color={couleur} roughness={rugosite}
          clearcoat={clearcoat} clearcoatRoughness={clearcoatRoughness}
          emissive={emissif} emissiveIntensity={intensiteEmissif}
          wireframe={filDefer}
        />
      )}
    </mesh>
  );
}
