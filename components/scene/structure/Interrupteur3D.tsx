'use client';
import { useState } from 'react';
import { useScene } from '@/hooks/useSceneStore';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import type { EtatLumieres } from '@/types/maison';
import type { IdPiece } from '@/types/maison';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  idPiece: keyof EtatLumieres;
  lumiere: boolean;
  equipementId?: string;
}

export function Interrupteur3D({ position, rotation = [0, 0, 0], idPiece, lumiere, equipementId }: Props) {
  const { toggleLumiere } = useScene();
  const [survole, setSurvole] = useState(false);

  // Élément sélectionnable
  const interrupteur = useElementSelectionnable({
    idPiece: idPiece as IdPiece,
    idElement: 'interrupteur',
    equipementId: equipementId,
    libelle: equipementId ? undefined : 'Prise électrique / interrupteur',
    defaut: { couleur: '#f8fafc', rugosite: 0.35, metalique: 0 }
  });

  const couleur = interrupteur.estSelectionne ? '#00e5ff' : (survole ? '#e2e8f0' : interrupteur.materiau.couleur);

  const handleClick = (e: any) => {
    e.stopPropagation();
    interrupteur.propsInteraction.onClick(e);
    toggleLumiere(idPiece);
  };

  const handleOver = (e: any) => {
    e.stopPropagation();
    interrupteur.propsInteraction.onPointerOver(e);
    setSurvole(true);
    document.body.style.cursor = 'pointer';
  };

  const handleOut = () => {
    interrupteur.propsInteraction.onPointerOut();
    setSurvole(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
    >
      {/* Boîtier mural */}
      <mesh>
        <boxGeometry args={[0.025, 0.1, 0.08]} />
        <meshPhysicalMaterial
          color={couleur}
          roughness={interrupteur.materiau.rugosite}
          metalness={interrupteur.materiau.metalique}
          clearcoat={0.4} clearcoatRoughness={0.1}
          emissive={interrupteur.emissif}
          emissiveIntensity={interrupteur.intensiteEmissif}
        />
      </mesh>
      {/* Levier — bascule selon état lumière */}
      <mesh position={[0.02, lumiere ? 0.016 : -0.016, 0]}>
        <boxGeometry args={[0.014, 0.042, 0.058]} />
        <meshPhysicalMaterial
          color={interrupteur.estSelectionne ? '#00e5ff' : (survole ? '#cbd5e1' : '#94a3b8')}
          roughness={0.4} metalness={0.1}
          emissive={interrupteur.emissif}
          emissiveIntensity={interrupteur.intensiteEmissif * 0.5}
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
