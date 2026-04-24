'use client';
import React from 'react';
import { Sol } from '../structure/Sol';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

/**
 * Couloir : centre (1.625, 3.25), 1.5m × 3.25m
 *
 * Limites murs extérieurs :
 *   X : 0.75 (gauche, cloison chambre) → 2.5 (droite, cloison SDB)
 *   Z : 1.5 (avant, cloison cuisine) → 5.0 (arrière, mur ext.)
 *
 * Limites intérieures (avec épaisseur mur 0.125m) :
 *   X : 0.875 → 2.375 (largeur intérieure: 1.5m)
 *   Z : 1.625 → 4.875 (profondeur intérieure: 3.25m)
 */
interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

export function Couloir({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol       = useElementSelectionnable({ idPiece: 'couloir', idElement: 'sol',        libelle: 'Sol couloir',  defaut: { couleur: '#4b5563', rugosite: 0.6,  metalique: 0 } });
  const etagere   = useElementSelectionnable({ idPiece: 'couloir', idElement: 'etagere',    libelle: 'Étagère',      defaut: { couleur: '#5c3d2e', rugosite: 0.6,  metalique: 0 } });
  const sonnette  = useElementSelectionnable({ idPiece: 'couloir', idElement: 'sonnette',   libelle: 'Sonnette',     defaut: { couleur: '#374151', rugosite: 0.3,  metalique: 0.3 } });
  const interrupteur = useElementSelectionnable({ idPiece: 'couloir', idElement: 'interrupteur', libelle: 'Interrupteur', defaut: { couleur: '#f3f4f6', rugosite: 0.3, metalique: 0 } });

  const M = (s: typeof sol) => ({
    color: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique,
    emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  return (
    <group>
      {/* Sol */}
      <Sol x={1.625} z={3.25} largeur={1.5} profondeur={3.25}
        couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
        propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
        filDefer={filDefer} />

      {/* Plafond */}
      {!masquerPlafond && (
        <mesh position={[1.625, 2.8, 3.25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.5, 3.25]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {/* Lumière */}
      {lumiere && <pointLight position={[1.625, 2.5, 3.25]} intensity={22} distance={5} color="#fff5e0" />}
      <mesh position={[1.625, 2.72, 3.25]}>
        <cylinderGeometry args={[0.08, 0.1, 0.05, 12]} />
        <meshStandardMaterial color={lumiere ? '#fffde7' : '#d0d0d0'} emissive={lumiere ? '#fff5e0' : '#000'} emissiveIntensity={lumiere ? 1.2 : 0} />
      </mesh>

      {/* ── Patères — mur gauche (x ≈ 0.875), à hauteur 1.6m ── */}
      {/* Planche support */}
      <mesh position={[0.84, 1.62, 3.25]}>
        <boxGeometry args={[0.04, 0.08, 1.2]} />
        <meshStandardMaterial {...M(etagere)} />
      </mesh>
      {/* 3 patères */}
      {[2.65, 3.25, 3.85].map((z, i) => (
        <group key={i} position={[0.88, 1.62, z]}>
          {/* Tige */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 0.1, 8]} />
            <meshStandardMaterial {...M(etagere)} />
          </mesh>
          {/* Boule bout */}
          <mesh position={[0.06, 0, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial {...M(etagere)} />
          </mesh>
        </group>
      ))}

      {/* ── Étagère à chaussures — mur arrière (z ≈ 4.75), bien dans les limites ── */}
      <group {...etagere.propsInteraction} position={[1.625, 0, 4.68]}>
        {/* Corps */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.44, 0.32]} />
          <meshStandardMaterial {...M(etagere)} />
        </mesh>
        {/* Étagère intermédiaire */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.28, 0.02, 0.3]} />
          <meshStandardMaterial {...M(etagere)} />
        </mesh>
        {/* Pieds (4) */}
        {[[-0.58, -0.14], [-0.58, 0.14], [0.58, -0.14], [0.58, 0.14]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.06, z]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 6]} />
            <meshStandardMaterial {...M(etagere)} />
          </mesh>
        ))}
      </group>

      {/* ── Sonnette / interphone — mur gauche, près de la porte d'entrée cuisine ── */}
      <group {...sonnette.propsInteraction} position={[0.86, 1.4, 1.85]}>
        {/* Boîtier */}
        <mesh>
          <boxGeometry args={[0.02, 0.12, 0.08]} />
          <meshStandardMaterial {...M(sonnette)} />
        </mesh>
        {/* Bouton */}
        <mesh position={[0.015, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.022, 0.022, 0.01, 10]} />
          <meshStandardMaterial {...M(sonnette)} />
        </mesh>
        {/* Grille haut-parleur */}
        <mesh position={[0.015, -0.03, 0]}>
          <boxGeometry args={[0.01, 0.04, 0.06]} />
          <meshStandardMaterial {...M(sonnette)} />
        </mesh>
      </group>

      {/* ── Interrupteur — mur droit (x ≈ 2.375), près de la porte SDB ── */}
      <mesh {...interrupteur.propsInteraction} position={[2.36, 1.2, 2.2]}>
        <boxGeometry args={[0.02, 0.1, 0.08]} />
        <meshStandardMaterial {...M(interrupteur)} />
      </mesh>
    </group>
  );
}
