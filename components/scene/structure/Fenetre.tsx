'use client';
import React from 'react';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  largeur?: number; hauteur?: number;
}

export function Fenetre({ position, rotation = [0,0,0], largeur = 1.2, hauteur = 1.0 }: Props) {
  const c = 0.07;
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[largeur - c*2, hauteur - c*2, 0.04]} />
        <meshPhysicalMaterial color="#a8d8ea" roughness={0.05} transmission={0.85} transparent opacity={0.4} />
      </mesh>
      {/* Cadres */}
      {[
        { pos: [0, hauteur/2-c/2, 0] as [number,number,number], args: [largeur, c, 0.08] as [number,number,number] },
        { pos: [0, -(hauteur/2-c/2), 0] as [number,number,number], args: [largeur, c, 0.08] as [number,number,number] },
        { pos: [-(largeur/2-c/2), 0, 0] as [number,number,number], args: [c, hauteur, 0.08] as [number,number,number] },
        { pos: [largeur/2-c/2, 0, 0] as [number,number,number], args: [c, hauteur, 0.08] as [number,number,number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos}>
          <boxGeometry args={f.args} />
          <meshStandardMaterial color="#6b4c2a" roughness={0.5} />
        </mesh>
      ))}
      {/* Appui */}
      <mesh position={[0, -(hauteur/2)-0.04, 0.06]}>
        <boxGeometry args={[largeur+0.1, 0.06, 0.18]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.6} />
      </mesh>
    </group>
  );
}
