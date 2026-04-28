'use client';
import React from 'react';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { PriseElectrique } from '../structure/PriseElectrique';
import { RobinetThermostatique } from '../structure/RobinetThermostatique';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

/**
 * CHAMBRE — centre (-2.625, 3.25), 6.5m × 3.25m
 *
 * Limites murs extérieurs :
 *   X : -6.0 (mur gauche ext.) → 0.75 (cloison droite)
 *   Z :  1.5 (cloison avant)   → 5.0 (mur arrière ext.)
 *
 * Limites intérieures (avec épaisseur mur 0.125m de chaque côté) :
 *   X : -5.875 → 0.625 (largeur intérieure: 6.5m)
 *   Z :  1.625 → 4.875 (profondeur intérieure: 3.25m)
 *
 * Disposition mur gauche (miroir + armoire centrés ensemble):
 *   Espace avant: 0.35m
 *   Miroir (z=2.35): 1.975 à 2.725 (largeur 0.75m)
 *   Espace entre: 0.20m
 *   Armoire (z=3.725): 2.925 à 4.525 (largeur 1.60m)
 *   Espace arrière: 0.35m
 *
 * Autres meubles:
 *   Mur arrière (z≈4.75): lit centré, rideaux + radiateur
 *   Coin avant-droit: bureau (x≈0, z≈2.2)
 */

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

// ─── Helpers ──────────────────────────────────────────────────────────────────
type MatProps = { color: string; roughness: number; metalness: number; emissive: string; emissiveIntensity: number };

// ─── Lit ──────────────────────────────────────────────────────────────────────
// Tête contre le mur arrière (z≈4.75), centré en x=-2.625
// Lit 1.50m × 1.90m → centre z = 4.75 - 1.90/2 = 3.80
function Lit({ cadreM, literieM, cadreProps, literieProps }: {
  cadreM: Record<string,unknown>; literieM: Record<string,unknown>;
  cadreProps: Record<string,unknown>; literieProps: Record<string,unknown>;
}) {
  return (
    <group position={[-2.625, 0, 3.80]}>
      {/* Sommier */}
      <mesh {...cadreProps} position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.50, 0.22, 1.90]} />
        <meshStandardMaterial {...cadreM} />
      </mesh>
      {/* Pieds (4) */}
      {[[-0.75,-0.98],[-0.75,0.98],[0.75,-0.98],[0.75,0.98]].map(([x,z],i) => (
        <mesh key={i} position={[x, 0.08, z]} castShadow>
          <boxGeometry args={[0.08, 0.16, 0.08]} />
          <meshStandardMaterial {...cadreM} />
        </mesh>
      ))}
      {/* Groupe literie avec propsInteraction */}
      <group {...literieProps}>
        {/* Matelas */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <boxGeometry args={[1.40, 0.22, 1.80]} />
          <meshStandardMaterial {...literieM} />
        </mesh>
        {/* Drap */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.41, 0.01, 1.81]} />
          <meshStandardMaterial {...literieM} />
        </mesh>
        {/* Couette — vers le bas (z négatif = vers la porte) */}
        <mesh position={[0, 0.56, -0.2]} castShadow>
          <boxGeometry args={[1.37, 0.14, 1.5]} />
          <meshStandardMaterial {...literieM} />
        </mesh>
        {/* Plis couette */}
        {[-0.45, 0, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0.64, -0.2]}>
            <boxGeometry args={[0.43, 0.04, 1.48]} />
            <meshStandardMaterial {...literieM} />
          </mesh>
        ))}
        {/* Oreillers — côté tête (z positif = mur arrière) */}
        {[-0.38, 0.38].map((x, i) => (
          <mesh key={i} position={[x, 0.58, 0.78]} castShadow>
            <boxGeometry args={[0.62, 0.14, 0.44]} />
            <meshStandardMaterial {...literieM} />
          </mesh>
        ))}
      </group>
      {/* Tête de lit — contre le mur arrière (z positif) */}
      <mesh position={[0, 0.82, 0.93]} castShadow>
        <boxGeometry args={[1.50, 0.96, 0.1]} />
        <meshStandardMaterial {...cadreM} />
      </mesh>
      {/* Panneau capitonné */}
      <mesh position={[0, 0.82, 0.87]}>
        <boxGeometry args={[1.40, 0.86, 0.04]} />
        <meshStandardMaterial {...cadreM} />
      </mesh>
      {/* Boutons capitonnage */}
      {[[-0.5,0.3],[-0.5,-0.1],[0,0.3],[0,-0.1],[0.5,0.3],[0.5,-0.1]].map(([x,y],i) => (
        <mesh key={i} position={[x, 0.82+y, 0.97]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial {...cadreM} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Armoire ──────────────────────────────────────────────────────────────────
// Mur gauche extérieur à x=-6.0, face intérieure x≈-5.875
// Corps profondeur 0.62m → centre x = -5.875 + 0.31 = -5.565
// Largeur 1.60m en Z, centrée avec le miroir à z=3.725
// Ensemble miroir+armoire centré sur le mur avec espaces égaux (0.35m) de chaque côté
// S'étend de z=2.925 à z=4.525
function Armoire({ propsInteraction, M, mat }: { propsInteraction: Record<string,unknown>; M: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-5.565, 0, 3.725]}>
      {/* Corps */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 2.2, 1.60]} />
        <meshStandardMaterial {...M} />
      </mesh>
      {/* Portes coulissantes (2) */}
      {[-0.38, 0.38].map((z, i) => (
        <group key={i}>
          {/* Porte */}
          <mesh position={[0.32, 1.1, z]} castShadow>
            <boxGeometry args={[0.04, 2.12, 0.76]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          {/* Miroir intégré sur porte */}
          <mesh position={[0.34, 1.1, z]}>
            <boxGeometry args={[0.01, 1.6, 0.60]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          {/* Poignée */}
          <mesh position={[0.35, 1.1, z + (i === 0 ? 0.28 : -0.28)]}
            rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.12, 8]} />
            <meshStandardMaterial {...mat} />
          </mesh>
        </group>
      ))}
      {/* Plinthe */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.62, 0.12, 1.60]} />
        <meshStandardMaterial {...M} />
      </mesh>
    </group>
  );
}

// ─── Bureau ───────────────────────────────────────────────────────────────────
// Coin avant-droit, contre la cloison droite (x≈0.625), face au mur gauche
// Centre à x=0, z=2.2
function Bureau({ propsInteraction, M, mat }: { propsInteraction: Record<string,unknown>; M: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[0, 0, 2.2]}>
      {/* Plateau */}
      <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.04, 0.65]} />
        <meshStandardMaterial {...M} />
      </mesh>
      {/* Caisson gauche */}
      <mesh position={[-0.5, 0.38, 0]} castShadow>
        <boxGeometry args={[0.22, 0.76, 0.62]} />
        <meshStandardMaterial {...M} />
      </mesh>
      {/* Tiroirs */}
      {[0.55, 0.35, 0.15].map((y, i) => (
        <group key={i}>
          <mesh position={[-0.5, y, 0.32]}>
            <boxGeometry args={[0.2, 0.16, 0.02]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          <mesh position={[-0.5, y, 0.335]}>
            <boxGeometry args={[0.1, 0.025, 0.025]} />
            <meshStandardMaterial {...mat} />
          </mesh>
        </group>
      ))}
      {/* Pied droit */}
      <mesh position={[0.55, 0.38, 0]} castShadow>
        <boxGeometry args={[0.06, 0.76, 0.62]} />
        <meshStandardMaterial {...M} />
      </mesh>
      {/* Écran */}
      <group position={[0.1, 0.98, -0.18]}>
        <mesh castShadow>
          <boxGeometry args={[0.52, 0.32, 0.04]} />
          <meshStandardMaterial {...mat} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <boxGeometry args={[0.48, 0.28, 0.005]} />
          <meshStandardMaterial {...mat} emissive="#1a2a4a" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, -0.22, 0.02]}>
          <boxGeometry args={[0.06, 0.12, 0.04]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      </group>
    </group>
  );
}

export function Chambre({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol     = useElementSelectionnable({ idPiece: 'chambre', idElement: 'sol',       equipementId: 'chambre-1', defaut: { couleur: '#4b5563', rugosite: 0.95, metalique: 0 } });
  const peinture = useElementSelectionnable({ idPiece: 'chambre', idElement: 'peinture', equipementId: 'chambre-2', defaut: { couleur: '#e5e7eb', rugosite: 0.9, metalique: 0 } });
  const cadre   = useElementSelectionnable({ idPiece: 'chambre', idElement: 'lit',       libelle: 'Cadre de lit',  defaut: { couleur: '#2c2c2c', rugosite: 0.3,  metalique: 0.1 } });
  const literie = useElementSelectionnable({ idPiece: 'chambre', idElement: 'literie',   libelle: 'Literie',       defaut: { couleur: '#f8f8f8', rugosite: 0.6,  metalique: 0 } });
  const tableChevet = useElementSelectionnable({ idPiece: 'chambre', idElement: 'tableChevet', libelle: 'Tables de chevet', defaut: { couleur: '#2c2c2c', rugosite: 0.3, metalique: 0.1 } });
  const lampeChevet = useElementSelectionnable({ idPiece: 'chambre', idElement: 'lampeChevet', libelle: 'Luminaire / plafonnier', defaut: { couleur: '#f5f0e0', rugosite: 0.7, metalique: 0 } });
  const plafonnier = useElementSelectionnable({ idPiece: 'chambre', idElement: 'plafonnier', libelle: 'Luminaire / plafonnier', defaut: { couleur: '#f9fafb', rugosite: 0.3, metalique: 0 } });
  const armoire = useElementSelectionnable({ idPiece: 'chambre', idElement: 'armoire',   equipementId: 'chambre-11', defaut: { couleur: '#1a1a1a', rugosite: 0.25,  metalique: 0.15 } });
  const bureau  = useElementSelectionnable({ idPiece: 'chambre', idElement: 'bureau',    libelle: 'Bureau',        defaut: { couleur: '#2c2c2c', rugosite: 0.3,  metalique: 0.1 } });
  const miroir  = useElementSelectionnable({ idPiece: 'chambre', idElement: 'miroir',    libelle: 'Miroir',        defaut: { couleur: '#a8d8ea', rugosite: 0.05, metalique: 0.1 } });
  const rideaux = useElementSelectionnable({ idPiece: 'chambre', idElement: 'rideaux',   libelle: 'Rideaux',       defaut: { couleur: '#f5f5f5', rugosite: 0.8,  metalique: 0 } });
  const radiateur = useElementSelectionnable({ idPiece: 'chambre', idElement: 'radiateur', equipementId: 'chambre-6', defaut: { couleur: '#e5e7eb', rugosite: 0.3, metalique: 0.6 } });
  const vmc = useElementSelectionnable({ idPiece: 'chambre', idElement: 'vmc', equipementId: 'chambre-8', defaut: { couleur: '#f3f4f6', rugosite: 0.5, metalique: 0.2 } });

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
      <Sol x={-2.625} z={3.25} largeur={6.5} profondeur={3.25}
        couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
        propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
        filDefer={filDefer} />

      {/* Plafond */}
      {!masquerPlafond && (
        <mesh position={[-2.625, 2.8, 3.25]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[6.5, 3.25]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {/* Lumière */}
      {lumiere && (
        <rectAreaLight
          position={[-2.625, 2.76, 3.25]} rotation={[-Math.PI / 2, 0, 0]}
          width={1.6} height={1.6} intensity={3.5} color="#ffcc80"
        />
      )}
      <group {...plafonnier.propsInteraction} position={[-2.625, 2.72, 3.25]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.12, 0.06, 20]} />
          <meshStandardMaterial 
            color={plafonnier.estSelectionne ? '#00e5ff' : (lumiere ? '#fffde7' : plafonnier.materiau.couleur)} 
            emissive={plafonnier.emissif !== '#000000' ? plafonnier.emissif : (lumiere ? '#ffcc80' : '#000')} 
            emissiveIntensity={plafonnier.intensiteEmissif > 0 ? plafonnier.intensiteEmissif : (lumiere ? 1.5 : 0)}
            roughness={plafonnier.materiau.rugosite}
            metalness={plafonnier.materiau.metalique}
          />
        </mesh>
      </group>

      {/* ── Lit — tête contre mur arrière, centré ── */}
      <Lit
        cadreM={M(cadre)} literieM={M(literie)}
        cadreProps={cadre.propsInteraction} literieProps={literie.propsInteraction}
      />

      {/* ── Tables de chevet — de chaque côté du lit ──
          Lit centré en x=-2.625, largeur 1.50m → bords à x=-3.375 et x=-1.875
          Tables à x=-3.655 et x=-1.595
          Même z que le lit (3.80) */}
      {[-3.655, -1.595].map((x, i) => (
        <group key={i} position={[x, 0, 3.80]}>
          <mesh {...tableChevet.propsInteraction} position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.52, 0.42]} />
            <meshStandardMaterial {...M(tableChevet)} />
          </mesh>
          {/* Tiroir */}
          <mesh position={[0, 0.3, 0.22]}>
            <boxGeometry args={[0.42, 0.2, 0.02]} />
            <meshStandardMaterial {...M(tableChevet)} />
          </mesh>
          <mesh position={[0, 0.3, 0.235]}>
            <boxGeometry args={[0.14, 0.025, 0.025]} />
            <meshStandardMaterial {...M(tableChevet)} />
          </mesh>
          {/* Lampe de chevet */}
          <group {...lampeChevet.propsInteraction} position={[0, 0.58, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.06, 0.08, 0.06, 12]} />
              <meshStandardMaterial {...M(lampeChevet)} />
            </mesh>
            <mesh position={[0, 0.14, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
              <meshStandardMaterial {...M(lampeChevet)} />
            </mesh>
            <mesh position={[0, 0.28, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.08, 0.2, 12, 1, true]} />
              <meshStandardMaterial 
                color={M(lampeChevet).color}
                roughness={M(lampeChevet).roughness}
                metalness={M(lampeChevet).metalness}
                emissive={M(lampeChevet).emissive !== '#000000' ? M(lampeChevet).emissive : (lumiere ? '#ffcc80' : '#000000')}
                emissiveIntensity={M(lampeChevet).emissiveIntensity > 0 ? M(lampeChevet).emissiveIntensity : (lumiere ? 0.5 : 0)}
              />
            </mesh>
          </group>
          {lumiere && <pointLight position={[0, 0.9, 0]} intensity={10} distance={3} color="#ffcc80" />}
        </group>
      ))}

      {/* ── Armoire — mur gauche ── */}
      <Armoire propsInteraction={armoire.propsInteraction} M={M(armoire)} mat={M(armoire)} />

      {/* ── Bureau — coin avant-droit ── */}
      <Bureau propsInteraction={bureau.propsInteraction} M={M(bureau)} mat={M(bureau)} />

      {/* ── Miroir mural — mur gauche, centré avec l'armoire ──
          Collé au mur gauche (face intérieure x≈-5.875)
          Cadre profondeur 0.04m → centre x = -5.875 + 0.02 = -5.855
          Positionné à z=2.35 (avec espace égal de 0.35m du mur avant) */}
      <group {...miroir.propsInteraction} position={[-5.855, 1.5, 2.35]}>
        {/* Cadre */}
        <mesh castShadow>
          <boxGeometry args={[0.04, 1.1, 0.75]} />
          <meshStandardMaterial {...M(miroir)} />
        </mesh>
        {/* Surface miroir */}
        <mesh position={[0.025, 0, 0]}>
          <boxGeometry args={[0.01, 1.0, 0.65]} />
          <meshStandardMaterial {...M(miroir)} />
        </mesh>
      </group>

      {/* ── Rideaux — mur arrière (z≈4.75), de chaque côté de la fenêtre ──
          Fenêtre centrée en x=-2.5, largeur 1.2m → bords à x=-3.1 et x=-1.9
          Rideaux à x=-3.5 et x=-1.75 */}
      {[-3.5, -1.75].map((x, i) => (
        <group key={i} {...rideaux.propsInteraction} position={[x, 1.4, 4.72]}>
          <mesh castShadow>
            <boxGeometry args={[0.52, 2.1, 0.06]} />
            <meshStandardMaterial {...M(rideaux)} />
          </mesh>
          {/* Plis */}
          {[-0.18, -0.06, 0.06, 0.18].map((rx, j) => (
            <mesh key={j} position={[rx, 0, 0.04]}>
              <boxGeometry args={[0.04, 2.08, 0.04]} />
              <meshStandardMaterial {...M(rideaux)} />
            </mesh>
          ))}
          {/* Tringle */}
          <mesh position={[0, 1.1, -0.04]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
            <meshStandardMaterial {...M(rideaux)} />
          </mesh>
        </group>
      ))}

      {/* Interrupteur — cloison avant (z≈1.625), près de la porte séjour */}
      <Interrupteur3D
        position={[-2.0, 1.2, 1.64]}
        rotation={[0, -Math.PI / 2, 0]}
        idPiece="chambre"
        lumiere={lumiere}
        equipementId="chambre-9"
      />

      {/* Prises électriques */}
      {/* Prise 1 — mur gauche, près du lit */}
      <PriseElectrique
        position={[-5.86, 0.3, 3.0]}
        rotation={[0, Math.PI / 2, 0]}
        idPiece="chambre"
        idElement="prise1"
        equipementId="chambre-9"
      />
      {/* Prise 2 — mur arrière, à gauche de la fenêtre */}
      <PriseElectrique
        position={[-3.5, 0.3, 4.86]}
        rotation={[0, Math.PI, 0]}
        idPiece="chambre"
        idElement="prise2"
        equipementId="chambre-9"
      />
      {/* Prise 3 — cloison droite, près de l'armoire */}
      <PriseElectrique
        position={[0.62, 0.3, 3.5]}
        rotation={[0, -Math.PI / 2, 0]}
        idPiece="chambre"
        idElement="prise3"
        equipementId="chambre-9"
      />
      {/* Prise 4 — près de la porte couloir */}
      <PriseElectrique
        position={[-1.0, 0.3, 1.64]}
        rotation={[0, -Math.PI / 2, 0]}
        idPiece="chambre"
        idElement="prise4"
        equipementId="chambre-9"
      />

      {/* Radiateur — mur arrière, à droite de la fenêtre */}
      <group {...radiateur.propsInteraction} position={[-1.5, 0.5, 4.84]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.6, 0.12]} />
          <meshStandardMaterial {...M(radiateur)} />
        </mesh>
        {/* Grille radiateur */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-0.35 + i * 0.1, 0, 0.065]}>
            <boxGeometry args={[0.08, 0.55, 0.01]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.4} metalness={0.5} />
          </mesh>
        ))}
        {/* Robinet thermostatique */}
        <RobinetThermostatique
          position={[0.5, -0.15, 0.1]}
          rotation={[0, 0, 0]}
          idPiece="chambre"
          idElement="robinet-radiateur"
          equipementId="chambre-7"
        />
      </group>

      {/* VMC / Grille ventilation — plafond, coin avant-gauche */}
      <group {...vmc.propsInteraction} position={[-4.5, 2.75, 2.0]}>
        {/* Grille VMC */}
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.04, 0.25]} />
          <meshStandardMaterial {...M(vmc)} />
        </mesh>
        {/* Fentes de ventilation */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, -0.025, -0.1 + i * 0.05]}>
            <boxGeometry args={[0.22, 0.005, 0.03]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
