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

export function RobinetThermostatique({ position, rotation = [0, 0, 0], idPiece, idElement = 'robinetThermo', equipementId }: Props) {
  // Élément sélectionnable
  const robinet = useElementSelectionnable({
    idPiece,
    idElement,
    equipementId: equipementId,
    libelle: equipementId ? undefined : 'Robinet thermostatique de radiateur',
    defaut: { couleur: '#e5e7eb', rugosite: 0.3, metalique: 0.4 }
  });

  const couleur = robinet.estSelectionne ? '#00e5ff' : robinet.materiau.couleur;

  return (
    <group
      position={position}
      rotation={rotation}
      {...robinet.propsInteraction}
    >
      {/* Corps du robinet (cylindre horizontal) */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.08, 12]} />
        <meshPhysicalMaterial
          color={couleur}
          roughness={robinet.materiau.rugosite}
          metalness={robinet.materiau.metalique}
          emissive={robinet.emissif}
          emissiveIntensity={robinet.intensiteEmissif}
        />
      </mesh>
      
      {/* Tête thermostatique (partie réglable) */}
      <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.025, 0.022, 0.05, 16]} />
        <meshPhysicalMaterial
          color={robinet.estSelectionne ? '#00e5ff' : '#f8fafc'}
          roughness={0.4}
          metalness={0.1}
          emissive={robinet.emissif}
          emissiveIntensity={robinet.intensiteEmissif}
        />
      </mesh>

      {/* Molette de réglage */}
      <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.008, 20]} />
        <meshPhysicalMaterial
          color={robinet.estSelectionne ? '#00e5ff' : '#94a3b8'}
          roughness={0.5}
          metalness={0.2}
          emissive={robinet.emissif}
          emissiveIntensity={robinet.intensiteEmissif}
        />
      </mesh>

      {/* Graduations (petites marques sur la molette) */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[0.094, 0, 0]}
          rotation={[0, (i * Math.PI) / 3, Math.PI / 2]}
        >
          <boxGeometry args={[0.002, 0.008, 0.003]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      ))}

      {/* Raccord au radiateur */}
      <mesh position={[-0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
        <meshPhysicalMaterial
          color={couleur}
          roughness={robinet.materiau.rugosite}
          metalness={robinet.materiau.metalique}
        />
      </mesh>
    </group>
  );
}
