'use client';
import { useState } from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { EtatLumieres } from '@/types/maison';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  idPiece: keyof EtatLumieres;
  lumiere: boolean;
}

export function Interrupteur3D({ position, rotation = [0, 0, 0], idPiece, lumiere }: Props) {
  const { toggleLumiere } = useScene();
  const [survole, setSurvole] = useState(false);

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => { e.stopPropagation(); toggleLumiere(idPiece); }}
      onPointerOver={(e) => { e.stopPropagation(); setSurvole(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setSurvole(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Boîtier mural */}
      <mesh>
        <boxGeometry args={[0.025, 0.1, 0.08]} />
        <meshPhysicalMaterial
          color={survole ? '#e2e8f0' : '#f8fafc'}
          roughness={0.35} metalness={0}
          clearcoat={0.4} clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Levier — bascule selon état lumière */}
      <mesh position={[0.02, lumiere ? 0.016 : -0.016, 0]}>
        <boxGeometry args={[0.014, 0.042, 0.058]} />
        <meshPhysicalMaterial
          color={survole ? '#cbd5e1' : '#94a3b8'}
          roughness={0.4} metalness={0.1}
        />
      </mesh>
      {/* Voyant LED */}
      <mesh position={[0.02, -0.032, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.007, 0.007, 0.003, 10]} />
        <meshPhysicalMaterial
          color={lumiere ? '#22c55e' : '#374151'}
          emissive={lumiere ? '#22c55e' : '#000000'}
          emissiveIntensity={lumiere ? 2 : 0}
          roughness={0.2} metalness={0}
        />
      </mesh>
    </group>
  );
}
