'use client';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import type { IdPiece } from '@/types/maison';

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  idPiece: IdPiece | 'exterieur';
  idElement?: string;
  equipementId?: string;
}

export function PriseElectrique({ position, rotation = [0, 0, 0], idPiece, idElement = 'prise', equipementId }: Props) {
  // Élément sélectionnable
  const prise = useElementSelectionnable({
    idPiece,
    idElement,
    equipementId: equipementId,
    libelle: equipementId ? undefined : 'Prise électrique / interrupteur',
    defaut: { couleur: '#f8fafc', rugosite: 0.35, metalique: 0 }
  });

  const couleur = prise.estSelectionne ? '#00e5ff' : prise.materiau.couleur;

  return (
    <group
      position={position}
      rotation={rotation}
      {...prise.propsInteraction}
    >
      {/* Boîtier mural */}
      <mesh>
        <boxGeometry args={[0.025, 0.08, 0.08]} />
        <meshPhysicalMaterial
          color={couleur}
          roughness={prise.materiau.rugosite}
          metalness={prise.materiau.metalique}
          clearcoat={0.4} clearcoatRoughness={0.1}
          emissive={prise.emissif}
          emissiveIntensity={prise.intensiteEmissif}
        />
      </mesh>
      {/* Alvéoles (2 trous) */}
      <mesh position={[0.015, 0.018, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.01, 12]} />
        <meshPhysicalMaterial
          color="#1f2937"
          roughness={0.8} metalness={0}
        />
      </mesh>
      <mesh position={[0.015, -0.018, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.01, 12]} />
        <meshPhysicalMaterial
          color="#1f2937"
          roughness={0.8} metalness={0}
        />
      </mesh>
      {/* Broche de terre (en haut) */}
      <mesh position={[0.015, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.01, 12]} />
        <meshPhysicalMaterial
          color="#1f2937"
          roughness={0.8} metalness={0}
        />
      </mesh>
    </group>
  );
}
