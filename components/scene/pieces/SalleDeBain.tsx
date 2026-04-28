'use client';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

/**
 * SALLE DE BAIN — centre (4.25, 3.25), 3.25m × 3.25m
 *
 * Murs :
 *   Gauche (cloison): x=2.5, Droite (ext): x=6.0
 *   Avant (cloison): z=1.5, Arrière (ext): z=5.0
 *
 * Intérieur : X: 2.625→5.875, Z: 1.625→4.875
 * PORTE : x=2.5, z=3.2 (cloison gauche, centrée)
 *
 * DISPOSITION :
 *   Mur AVANT (z≈1.75): Meuble vasque + miroir (x=4.25)
 *   Mur GAUCHE (x≈2.75): Cumulus haut (z=2.0), Machine (z=4.2)
 *   Mur ARRIÈRE (z≈4.75): Douche gauche (x=3.3), WC droit (x=5.2)
 *   Mur DROIT (x≈5.75): Colonne (z=2.3), Sèche-serviettes (z=3.8)
 */

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

export function SalleDeBain({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol    = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'sol', equipementId: 'sdb-10', defaut: { couleur: '#4b5563', rugosite: 0.25, metalique: 0 } });
  const douche = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'douche', equipementId: 'sdb-2', defaut: { couleur: '#e0f2fe', rugosite: 0.2,  metalique: 0 } });
  const vasque = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'meubleVasque', equipementId: 'sdb-6', defaut: { couleur: '#78350f', rugosite: 0.4,  metalique: 0 } });
  const miroir = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'miroir', equipementId: 'sdb-11', defaut: { couleur: '#3b82f6', rugosite: 0.05, metalique: 0.8 } });
  const wc     = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'wc', equipementId: 'wc-1', defaut: { couleur: '#f1f5f9', rugosite: 0.2,  metalique: 0 } });
  const machine= useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'machineALaver',    libelle: 'Machine à laver',  defaut: { couleur: '#e5e7eb', rugosite: 0.3,  metalique: 0.2 } });
  const colonne= useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'colonneRangement', libelle: 'Colonne rangement',defaut: { couleur: '#fef3c7', rugosite: 0.4,  metalique: 0 } });
  const seche  = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'secheServiettes', equipementId: 'sdb-13', defaut: { couleur: '#a8a29e', rugosite: 0.3,  metalique: 0.7 } });
  const tapis  = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'tapisBain',        libelle: 'Tapis de bain',    defaut: { couleur: '#7dd3fc', rugosite: 0.9,  metalique: 0 } });
  const cumulus= useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'cumulus', equipementId: 'sdb-5', defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.3 } });
  const panier = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'panierLinge',      libelle: 'Panier à linge',   defaut: { couleur: '#d97706', rugosite: 0.8,  metalique: 0 } });
  const robinet= useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'robinet', equipementId: 'sdb-7', defaut: { couleur: '#9ca3af', rugosite: 0.2,  metalique: 0.8 } });
  const joints = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'joints', equipementId: 'sdb-16', defaut: { couleur: '#6b7280', rugosite: 0.6,  metalique: 0 } });
  const plafonnier = useElementSelectionnable({ idPiece: 'salleDeBain', idElement: 'plafonnier', equipementId: 'sdb-14', defaut: { couleur: '#f9fafb', rugosite: 0.3, metalique: 0 } });

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
      <Sol x={4.25} z={3.25} largeur={3.25} profondeur={3.25}
        couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
        propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
        filDefer={filDefer} clearcoat={0.65} clearcoatRoughness={0.04}
        reflectif={true} mirrorForce={0.65} />

      {/* Plafond */}
      {!masquerPlafond && (
        <mesh position={[4.25, 2.8, 3.25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.25, 3.25]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {/* Lumière */}
      {lumiere && (
        <rectAreaLight
          position={[4.25, 2.76, 3.25]} rotation={[-Math.PI / 2, 0, 0]}
          width={1.2} height={1.2} intensity={4} color="#e8f4fd"
        />
      )}
      <mesh {...plafonnier.propsInteraction} position={[4.25, 2.72, 3.25]}>
        <cylinderGeometry args={[0.1, 0.12, 0.05, 12]} />
        <meshStandardMaterial 
          color={plafonnier.estSelectionne ? '#00e5ff' : (lumiere ? '#e8f4fd' : plafonnier.materiau.couleur)} 
          emissive={plafonnier.emissif !== '#000000' ? plafonnier.emissif : (lumiere ? '#e8f4fd' : '#000')} 
          emissiveIntensity={plafonnier.intensiteEmissif > 0 ? plafonnier.intensiteEmissif : (lumiere ? 1.5 : 0)}
          roughness={plafonnier.materiau.rugosite}
          metalness={plafonnier.materiau.metalique}
        />
      </mesh>

      {/* ═══ MUR AVANT (z≈1.75) ═══ */}
      
      {/* Meuble vasque — centré */}
      <group position={[4.25, 0, 1.74]}>
        {/* Corps du meuble */}
        <mesh {...vasque.propsInteraction} position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.84, 0.44]} />
          <meshStandardMaterial {...M(vasque)} />
        </mesh>
        {/* Porte */}
        <mesh {...vasque.propsInteraction} position={[0, 0.42, 0.23]}>
          <boxGeometry args={[0.66, 0.78, 0.02]} />
          <meshStandardMaterial {...M(vasque)} />
        </mesh>
        {/* Poignée */}
        <mesh {...vasque.propsInteraction} position={[0, 0.42, 0.25]}>
          <boxGeometry args={[0.16, 0.025, 0.025]} />
          <meshStandardMaterial {...M(vasque)} />
        </mesh>
        {/* Plan de travail */}
        <mesh {...vasque.propsInteraction} position={[0, 0.87, 0]} castShadow>
          <boxGeometry args={[0.7, 0.045, 0.44]} />
          <meshStandardMaterial {...M(vasque)} />
        </mesh>
        {/* Vasque */}
        <mesh {...vasque.propsInteraction} position={[0, 0.9, 0]}>
          <boxGeometry args={[0.45, 0.06, 0.28]} />
          <meshStandardMaterial {...M(vasque)} />
        </mesh>
      </group>
      
      {/* Robinet vasque — élément séparé sélectionnable */}
      <group position={[4.25, 0, 1.74]}>
        {/* Robinet — colonne */}
        <mesh {...robinet.propsInteraction} position={[0, 1.02, -0.16]}>
          <cylinderGeometry args={[0.018, 0.018, 0.2, 8]} />
          <meshStandardMaterial {...M(robinet)} />
        </mesh>
        {/* Robinet — bec verseur */}
        <mesh {...robinet.propsInteraction} position={[0, 1.1, -0.1]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.14, 8]} />
          <meshStandardMaterial {...M(robinet)} />
        </mesh>
        {/* Robinet — poignées (chaud/froid) */}
        <mesh {...robinet.propsInteraction} position={[-0.08, 1.12, -0.16]}>
          <cylinderGeometry args={[0.022, 0.022, 0.015, 12]} />
          <meshStandardMaterial {...M(robinet)} />
        </mesh>
        <mesh {...robinet.propsInteraction} position={[0.08, 1.12, -0.16]}>
          <cylinderGeometry args={[0.022, 0.022, 0.015, 12]} />
          <meshStandardMaterial {...M(robinet)} />
        </mesh>
      </group>

      {/* Miroir — au-dessus vasque */}
      <group position={[4.25, 1.55, 1.64]}>
        {/* Cadre */}
        <mesh {...miroir.propsInteraction} castShadow>
          <boxGeometry args={[0.64, 0.72, 0.04]} />
          <meshPhysicalMaterial {...M(miroir)} clearcoat={0.6} clearcoatRoughness={0.08} />
        </mesh>
        {/* Surface réfléchissante */}
        <mesh {...miroir.propsInteraction} position={[0, 0, 0.03]}>
          <boxGeometry args={[0.58, 0.66, 0.01]} />
          <meshPhysicalMaterial
            color={miroir.estSelectionne ? '#00e5ff' : '#c8dff5'}
            roughness={0.03} metalness={0.92}
            clearcoat={1} clearcoatRoughness={0.01}
            emissive={miroir.emissif} emissiveIntensity={miroir.intensiteEmissif}
          />
        </mesh>
      </group>

      {/* Tapis — devant vasque */}
      <mesh {...tapis.propsInteraction} position={[4.25, 0.006, 2.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.7, 1.0]} />
        <meshPhysicalMaterial {...M(tapis)} sheen={1} sheenRoughness={0.8} sheenColor={tapis.materiau.couleur} />
      </mesh>

      {/* ═══ MUR GAUCHE (x≈2.75) ═══ */}
      
      {/* Cumulus — en hauteur, loin de la porte, éloigné du mur */}
      <group position={[2.9, 1.55, 2.0]}>
        <mesh {...cumulus.propsInteraction} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.85, 14]} />
          <meshStandardMaterial {...M(cumulus)} />
        </mesh>
        {[-0.1, 0.1].map((x, i) => (
          <mesh {...cumulus.propsInteraction} key={i} position={[x, -0.48, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.14, 8]} />
            <meshStandardMaterial {...M(cumulus)} />
          </mesh>
        ))}
        <mesh {...cumulus.propsInteraction} position={[-0.22, 0, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.08]} />
          <meshStandardMaterial {...M(cumulus)} />
        </mesh>
      </group>

      {/* Machine à laver — mur droit, entre colonne et sèche-serviettes */}
      <group position={[5.55, 0.45, 3.0]}>
        {/* Corps */}
        <mesh {...machine.propsInteraction} castShadow>
          <boxGeometry args={[0.6, 0.9, 0.6]} />
          <meshStandardMaterial {...M(machine)} />
        </mesh>
        {/* Hublot cadre */}
        <mesh {...machine.propsInteraction} position={[0, 0, 0.31]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 20]} />
          <meshStandardMaterial {...M(machine)} />
        </mesh>
        {/* Hublot vitre */}
        <mesh {...machine.propsInteraction} position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.01, 20]} />
          <meshStandardMaterial {...M(machine)} />
        </mesh>
        {/* Panneau de contrôle */}
        <mesh {...machine.propsInteraction} position={[0, 0.38, 0.31]}>
          <boxGeometry args={[0.5, 0.08, 0.02]} />
          <meshStandardMaterial {...M(machine)} />
        </mesh>
      </group>

      {/* ═══ MUR ARRIÈRE (z≈4.75) ═══ */}
      
      {/* Douche italienne — coin gauche, éloignée du mur arrière */}
      <group position={[3.3, 0, 4.2]}>
        {/* Receveur de douche */}
        <mesh {...douche.propsInteraction} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.0, 1.0]} />
          <meshStandardMaterial {...M(douche)} />
        </mesh>
        {/* Paroi vitrée droite */}
        <mesh {...douche.propsInteraction} position={[0.52, 1.1, 0]}>
          <boxGeometry args={[0.02, 2.2, 1.0]} />
          <meshPhysicalMaterial color="#d4eaf7" roughness={0.04} metalness={0} transmission={0.75} ior={1.52} thickness={0.02}
            emissive={douche.emissif} emissiveIntensity={douche.intensiteEmissif} />
        </mesh>
        {/* Paroi vitrée arrière */}
        <mesh {...douche.propsInteraction} position={[0, 1.1, -0.52]}>
          <boxGeometry args={[1.0, 2.2, 0.02]} />
          <meshPhysicalMaterial color="#d4eaf7" roughness={0.04} metalness={0} transmission={0.75} ior={1.52} thickness={0.02}
            emissive={douche.emissif} emissiveIntensity={douche.intensiteEmissif} />
        </mesh>
        {/* Pommeau de douche */}
        <mesh {...douche.propsInteraction} position={[0, 2.15, 0.42]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 12]} />
          <meshStandardMaterial {...M(douche)} />
        </mesh>
        {/* Barre de douche */}
        <mesh {...douche.propsInteraction} position={[0, 1.6, 0.42]}>
          <cylinderGeometry args={[0.018, 0.018, 1.1, 8]} />
          <meshStandardMaterial {...M(douche)} />
        </mesh>
        {/* Robinet mitigeur */}
        <mesh {...douche.propsInteraction} position={[0.1, 1.1, 0.42]}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
          <meshStandardMaterial {...M(douche)} />
        </mesh>
        <mesh {...douche.propsInteraction} position={[0.1, 1.18, 0.42]}>
          <cylinderGeometry args={[0.025, 0.025, 0.06, 12]} />
          <meshStandardMaterial {...M(douche)} />
        </mesh>
      </group>
      
      {/* Joints d'étanchéité — élément séparé sélectionnable */}
      <group position={[3.3, 0, 4.2]}>
        <mesh {...joints.propsInteraction} position={[0.5, 0.025, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 1.0, 8]} />
          <meshStandardMaterial {...M(joints)} />
        </mesh>
        <mesh {...joints.propsInteraction} position={[-0.5, 0.025, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 1.0, 8]} />
          <meshStandardMaterial {...M(joints)} />
        </mesh>
        <mesh {...joints.propsInteraction} position={[0, 0.025, 0.5]}>
          <cylinderGeometry args={[0.008, 0.008, 1.0, 8]} />
          <meshStandardMaterial {...M(joints)} />
        </mesh>
        <mesh {...joints.propsInteraction} position={[0, 0.025, -0.5]}>
          <cylinderGeometry args={[0.008, 0.008, 1.0, 8]} />
          <meshStandardMaterial {...M(joints)} />
        </mesh>
      </group>

      {/* WC — coin droit, éloigné du mur arrière */}
      <group position={[5.2, 0, 4.2]}>
        {/* Cuvette */}
        <mesh {...wc.propsInteraction} position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.38, 0.44, 0.52]} />
          <meshStandardMaterial {...M(wc)} />
        </mesh>
        {/* Siège */}
        <mesh {...wc.propsInteraction} position={[0, 0.46, 0.04]}>
          <boxGeometry args={[0.36, 0.03, 0.46]} />
          <meshStandardMaterial {...M(wc)} />
        </mesh>
        {/* Réservoir */}
        <mesh {...wc.propsInteraction} position={[0, 0.68, -0.2]} castShadow>
          <boxGeometry args={[0.36, 0.32, 0.18]} />
          <meshStandardMaterial {...M(wc)} />
        </mesh>
        {/* Couvercle réservoir */}
        <mesh {...wc.propsInteraction} position={[0, 0.85, -0.2]}>
          <boxGeometry args={[0.38, 0.03, 0.2]} />
          <meshStandardMaterial {...M(wc)} />
        </mesh>
        {/* Chasse d'eau — bouton sur réservoir */}
        <mesh {...wc.propsInteraction} position={[0, 0.87, -0.15]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
          <meshStandardMaterial {...M(wc)} />
        </mesh>
        {/* Robinet d'arrêt */}
        <mesh {...wc.propsInteraction} position={[-0.15, 0.15, -0.22]}>
          <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
          <meshStandardMaterial {...M(wc)} />
        </mesh>
      </group>

      {/* ═══ MUR DROIT (x≈5.75) ═══ */}
      
      {/* Colonne rangement — éloignée du mur droit */}
      <group position={[5.55, 0, 2.3]}>
        <mesh {...colonne.propsInteraction} position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.36, 2.2, 0.5]} />
          <meshStandardMaterial {...M(colonne)} />
        </mesh>
        {[0.55, 1.65].map((y, i) => (
          <group key={i}>
            <mesh {...colonne.propsInteraction} position={[0.01, y, 0]}>
              <boxGeometry args={[0.34, 1.0, 0.02]} />
              <meshStandardMaterial {...M(colonne)} />
            </mesh>
            <mesh {...colonne.propsInteraction} position={[0.02, y, 0]}>
              <boxGeometry args={[0.14, 0.025, 0.025]} />
              <meshStandardMaterial {...M(colonne)} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Sèche-serviettes — éloigné du mur droit */}
      <group position={[5.6, 1.2, 3.8]}>
        {[-0.18, 0, 0.18].map((z, i) => (
          <mesh {...seche.propsInteraction} key={i} position={[0, 0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />
            <meshStandardMaterial {...M(seche)} />
          </mesh>
        ))}
        {[-0.25, 0.25].map((x, i) => (
          <mesh {...seche.propsInteraction} key={i} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.42, 8]} />
            <meshStandardMaterial {...M(seche)} />
          </mesh>
        ))}
        {[-0.25, 0.25].map((x, i) => (
          <mesh {...seche.propsInteraction} key={i} position={[x, 0.22, -0.02]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial {...M(seche)} />
          </mesh>
        ))}
      </group>

      {/* Interrupteur — cloison gauche (x≈2.625), près de la porte */}
      <Interrupteur3D
        position={[2.64, 1.2, 2.8]}
        rotation={[0, 0, 0]}
        idPiece="salleDeBain"
        lumiere={lumiere}
        equipementId="sdb-15"
      />

      {/* Panier à linge — entre machine et WC, bien espacé */}
      <group position={[4.2, 0, 4.0]}>
        {/* Corps du panier (osier/rotin) */}
        <mesh {...panier.propsInteraction} position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.16, 0.56, 12]} />
          <meshStandardMaterial {...M(panier)} />
        </mesh>
        {/* Anses */}
        {[-0.16, 0.16].map((x, i) => (
          <mesh {...panier.propsInteraction} key={i} position={[x, 0.58, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.05, 0.012, 8, 12, Math.PI]} />
            <meshStandardMaterial {...M(panier)} />
          </mesh>
        ))}
        {/* Linge visible (serviette) */}
        <mesh {...panier.propsInteraction} position={[0, 0.52, 0.02]}>
          <boxGeometry args={[0.28, 0.08, 0.22]} />
          <meshStandardMaterial {...M(panier)} />
        </mesh>
      </group>
    </group>
  );
}
