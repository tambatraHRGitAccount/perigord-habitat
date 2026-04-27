'use client';
import React from 'react';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import * as THREE from 'three';

/**
 * SÉJOUR — centre (-2.5, -1.5), 5.5m × 5.0m
 *
 * Limites murs intérieurs :
 *   X : -5.875 (mur gauche ext.)  →  0.625 (cloison séjour/cuisine)
 *   Z : -4.875 (mur arrière ext.) →  1.125 (cloison séjour/couloir)
 *
 * Plan d'aménagement :
 *   Mur arrière (z≈-4.87) : meuble TV (x=-3.5) + TV + tableau au-dessus de la TV + radiateur à droite (x=0.0)
 *   Mur gauche  (x≈-5.69) : bibliothèque (z≈-3.5)
 *   Coin gauche-avant      : fauteuil (x≈-4.2, z≈0.5) face à la TV
 *   Centre                 : canapé (z≈-0.5) + table basse (z≈0.8) + tapis
 *   Coin droit-arrière     : plante (x≈-0.5, z≈-4.2)
 *   Coin gauche-arrière    : lampadaire (x≈-4.8, z≈-3.8)
 *   Mur gauche h=1.5m      : thermostat
 */

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

// ─── Helpers ──────────────────────────────────────────────────────────────────
type MatProps = {
  color: string; roughness: number; metalness: number; emissive: string; emissiveIntensity: number;
  clearcoat?: number; clearcoatRoughness?: number;
  sheen?: number; sheenRoughness?: number; sheenColor?: string;
};

// ─── TV réaliste ──────────────────────────────────────────────────────────────
function Television({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  // Posée sur le meuble TV (y=0.44+0.38=0.82), collée au mur arrière
  // Déplacée vers la gauche pour être plus proche du tableau décoratif
  return (
    <group position={[-3.5, 0.82, -4.84]}>
      {/* Dalle + cadre */}
      <mesh {...propsInteraction} castShadow>
        <boxGeometry args={[1.35, 0.76, 0.055]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.38, 0.79, 0.01]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Écran émissif */}
      <mesh position={[0, 0, 0.032]}>
        <boxGeometry args={[1.28, 0.72, 0.002]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Pied */}
      <mesh position={[0, -0.46, 0.02]} castShadow>
        <boxGeometry args={[0.08, 0.16, 0.06]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
    </group>
  );
}

// ─── Meuble TV ────────────────────────────────────────────────────────────────
function MeubleTV({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  // Déplacé vers la gauche pour être plus proche du tableau décoratif
  return (
    <group position={[-3.5, 0.22, -4.66]}>
      <mesh {...propsInteraction} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.44, 0.42]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Pieds */}
      {[[-0.8,-0.18],[-0.8,0.18],[0.8,-0.18],[0.8,0.18]].map(([x,z],i) => (
        <mesh key={i} position={[x, -0.26, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {/* Tiroirs */}
      {[-0.45, 0.45].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0, 0.22]}>
            <boxGeometry args={[0.82, 0.38, 0.02]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
          <mesh position={[x, 0, 0.235]}>
            <boxGeometry args={[0.22, 0.025, 0.025]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Canapé ───────────────────────────────────────────────────────────────────
// TV sur mur arrière (z≈-4.87) → canapé face à la TV = face vers z négatif
// Dos du canapé vers z positif (vers le mur avant / porte)
// rotation PI → le dossier (qui était à z=-0.38) se retrouve à z=+0.38 (dos côté porte)
function Canape({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-2.5, 0, -0.1]} rotation={[0, Math.PI, 0]}>
      {/* Assise */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.18, 0.9]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Coussins d'assise */}
      {[-0.72, 0, 0.72].map((x, i) => (
        <mesh key={i} position={[x, 0.34, 0.05]} castShadow>
          <boxGeometry args={[0.68, 0.14, 0.78]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {/* Dossier */}
      <mesh position={[0, 0.58, -0.38]} castShadow>
        <boxGeometry args={[2.2, 0.52, 0.16]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Coussins dossier */}
      {[-0.72, 0, 0.72].map((x, i) => (
        <mesh key={i} position={[x, 0.58, -0.3]} castShadow>
          <boxGeometry args={[0.68, 0.48, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {/* Accoudoirs */}
      {[-1.1, 1.1].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.38, 0]} castShadow>
            <boxGeometry args={[0.18, 0.52, 0.9]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
          <mesh position={[x, 0.65, 0]}>
            <boxGeometry args={[0.2, 0.06, 0.92]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        </group>
      ))}
      {/* Pieds */}
      {[[-1.0,-0.38],[-1.0,0.38],[1.0,-0.38],[1.0,0.38]].map(([lx,lz],i) => (
        <mesh key={i} position={[lx, 0.06, lz]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Table basse ──────────────────────────────────────────────────────────────
// Devant le canapé, au centre du tapis
function TableBasse({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-2.5, 0, -1.4]}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.04, 0.6]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.95, 0.025, 0.5]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[[-0.48,-0.24],[-0.48,0.24],[0.48,-0.24],[0.48,0.24]].map(([lx,lz],i) => (
        <mesh key={i} position={[lx, 0.19, lz]} castShadow>
          <boxGeometry args={[0.04, 0.38, 0.04]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Fauteuil ─────────────────────────────────────────────────────────────────
// Coin avant-gauche, face à la TV (z négatif)
// rotation PI + légère rotation pour l'orienter vers la TV en diagonale
function Fauteuil({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-4.5, 0, 0.4]} rotation={[0, Math.PI + 0.4, 0]}>
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.2, 0.82]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Coussin */}
      <mesh position={[0, 0.38, 0.04]} castShadow>
        <boxGeometry args={[0.76, 0.14, 0.72]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Dossier */}
      <mesh position={[0, 0.62, -0.34]} castShadow>
        <boxGeometry args={[0.82, 0.56, 0.14]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Accoudoirs */}
      {[-0.41, 0.41].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0]} castShadow>
          <boxGeometry args={[0.1, 0.36, 0.82]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {/* Pieds */}
      {[[-0.35,-0.35],[-0.35,0.35],[0.35,-0.35],[0.35,0.35]].map(([lx,lz],i) => (
        <mesh key={i} position={[lx, 0.07, lz]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.14, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Bibliothèque ─────────────────────────────────────────────────────────────
// Mur gauche (x≈-5.69), milieu de la pièce en Z
function Bibliotheque({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-5.69, 0, -2.8]}>
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 2.2, 1.6]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[0.3, 0.75, 1.2, 1.65].map((y, i) => (
        <mesh key={i} position={[0.01, y, 0]}>
          <boxGeometry args={[0.04, 0.025, 1.52]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[0.42, 0.87, 1.32].map((y, row) =>
        [-0.6,-0.3,0,0.3,0.6].map((z, col) => (
          <mesh key={`${row}-${col}`} position={[0.02, y + 0.12, z]}>
            <boxGeometry args={[0.04, 0.22, 0.13]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        ))
      )}
    </group>
  );
}

// ─── Lampadaire ───────────────────────────────────────────────────────────────
// Coin arrière-gauche, derrière le fauteuil
// propsInteraction sur le group entier → tout le lampadaire réagit au clic
function Lampadaire({ propsInteraction, mat, lumiere }: { propsInteraction: Record<string,unknown>; mat: MatProps; lumiere: boolean }) {
  return (
    <group {...propsInteraction} position={[-4.8, 0, -3.8]}>
      {/* Base */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.12, 12]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Tige */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.7, 8]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Abat-jour */}
      <mesh position={[0, 1.88, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.18, 0.32, 16, 1, true]} />
        <meshStandardMaterial
          color={mat.color} roughness={mat.roughness}
          side={THREE.DoubleSide}
          emissive={mat.emissive !== '#000000' ? mat.emissive : (lumiere ? '#ffd580' : '#000000')}
          emissiveIntensity={mat.emissiveIntensity > 0 ? mat.emissiveIntensity : (lumiere ? 0.6 : 0)}
        />
      </mesh>
      {/* Dessus abat-jour */}
      <mesh position={[0, 2.04, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {lumiere && <pointLight position={[0, 1.75, 0]} intensity={18} distance={5} color="#ffd580" />}
    </group>
  );
}

// ─── Plante ───────────────────────────────────────────────────────────────────
// Coin avant-droit — à côté de la porte d'entrée, à l'opposé de la TV
// propsInteraction sur le group entier → pot + feuilles réagissent ensemble
function Plante({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-0.3, 0, 0.8]}>
      {/* Pot */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.12, 0.44, 12]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Terre */}
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.02, 12]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {/* Feuilles */}
      {([[0,0.72,0],[0.18,0.65,0.1],[-0.18,0.65,-0.1],[0.1,0.78,-0.15],[-0.1,0.78,0.15]] as [number,number,number][]).map(([x,y,z],i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.18 + i*0.02, 8, 6]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Radiateur ────────────────────────────────────────────────────────────────
// Mur arrière, côté droit (sous la fenêtre droite)
function Radiateur({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[0.0, 0.38, -4.87]}>
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.52, 0.08]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {Array.from({length: 6}).map((_, i) => (
        <mesh key={i} position={[-0.38 + i*0.15, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.48, 0.04]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, -0.32, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Tableau décoratif ────────────────────────────────────────────────────────
// Au-dessus de la télévision sur le mur arrière
function TableauDecoratif({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group position={[-3.5, 1.8, -4.87]}>
      <mesh castShadow>
        <boxGeometry args={[0.88, 0.66, 0.04]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh {...propsInteraction} position={[0, 0, 0.025]}>
        <boxGeometry args={[0.78, 0.56, 0.01]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
    </group>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export function Sejour({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol       = useElementSelectionnable({ idPiece: 'sejour', idElement: 'sol',         libelle: 'Sol (parquet)',     defaut: { couleur: '#4b5563', rugosite: 0.7,  metalique: 0 } });
  const tapis     = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tapis',        libelle: 'Tapis de salon',   defaut: { couleur: '#8b7355', rugosite: 0.95, metalique: 0 } });
  const tapisBordure = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tapisBordure', libelle: 'Bordure tapis',  defaut: { couleur: '#6b5a45', rugosite: 0.9, metalique: 0 } });
  const canape    = useElementSelectionnable({ idPiece: 'sejour', idElement: 'canape',       libelle: 'Canapé',           defaut: { couleur: '#6b7280', rugosite: 0.8,  metalique: 0 } });
  const tableBasse= useElementSelectionnable({ idPiece: 'sejour', idElement: 'tableBasse',   libelle: 'Table basse',      defaut: { couleur: '#8b6914', rugosite: 0.4,  metalique: 0 } });
  const television= useElementSelectionnable({ idPiece: 'sejour', idElement: 'television',   libelle: 'Télévision',       defaut: { couleur: '#111827', rugosite: 0.1,  metalique: 0.5 } });
  const meubleTV  = useElementSelectionnable({ idPiece: 'sejour', idElement: 'meubleTV',     libelle: 'Meuble TV',        defaut: { couleur: '#1c1c1c', rugosite: 0.4,  metalique: 0.1 } });
  const lampadaire= useElementSelectionnable({ idPiece: 'sejour', idElement: 'lampadaire',   libelle: 'Lampadaire',       defaut: { couleur: '#f5f0e0', rugosite: 0.7,  metalique: 0 } });
  const fauteuil  = useElementSelectionnable({ idPiece: 'sejour', idElement: 'fauteuil',     libelle: 'Fauteuil',         defaut: { couleur: '#78350f', rugosite: 0.8,  metalique: 0 } });
  const biblio    = useElementSelectionnable({ idPiece: 'sejour', idElement: 'bibliotheque', libelle: 'Bibliothèque',     defaut: { couleur: '#5c3d2e', rugosite: 0.5,  metalique: 0 } });
  const plante    = useElementSelectionnable({ idPiece: 'sejour', idElement: 'planteVerte',  libelle: 'Plante verte',     defaut: { couleur: '#2d6a4f', rugosite: 0.9,  metalique: 0 } });
  const radiateur = useElementSelectionnable({ idPiece: 'sejour', idElement: 'radiateur',    libelle: 'Radiateur',        defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.2 } });
  const tableau   = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tableauDeco',  libelle: 'Tableau décoratif',defaut: { couleur: '#1e3a5f', rugosite: 0.6,  metalique: 0 } });
  const detecteur = useElementSelectionnable({ idPiece: 'sejour', idElement: 'detecteur',    libelle: 'Détecteur fumée',  defaut: { couleur: '#f9fafb', rugosite: 0.3,  metalique: 0 } });
  const thermostat= useElementSelectionnable({ idPiece: 'sejour', idElement: 'thermostat',   libelle: 'Thermostat',       defaut: { couleur: '#e5e7eb', rugosite: 0.3,  metalique: 0 } });

  const mat = (s: ReturnType<typeof useElementSelectionnable>): MatProps => ({
    color: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique,
    emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  // Tissu : sheen doux (canapé, fauteuil, tapis)
  const matTissu = (s: ReturnType<typeof useElementSelectionnable>): MatProps => ({
    ...mat(s),
    sheen: 1,
    sheenRoughness: 0.75,
    sheenColor: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
  });

  // Bois / laque : vernis brillant (tables, meubles, bibliothèque)
  const matBois = (s: ReturnType<typeof useElementSelectionnable>): MatProps => ({
    ...mat(s),
    clearcoat: 0.4,
    clearcoatRoughness: 0.12,
  });

  return (
    <group>
      {/* Sol */}
      <Sol x={-2.5} z={-1.5} largeur={5.5} profondeur={5.0}
        couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
        propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
        filDefer={filDefer} clearcoat={0.3} clearcoatRoughness={0.15}
        reflectif={true} mirrorForce={0.28} />

      {/* Plafond */}
      {!masquerPlafond && (
        <>
          <mesh position={[-2.5, 2.8, -1.5]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[5.5, 5.0]} />
            <meshStandardMaterial color="#6b7280" roughness={0.9} />
          </mesh>
          {/* Moulure */}
          <mesh position={[-2.5, 2.78, -1.5]}>
            <boxGeometry args={[5.5, 0.06, 5.0]} />
            <meshStandardMaterial color="#ede8e0" roughness={0.85} />
          </mesh>
        </>
      )}

      {/* Éclairage */}
      {lumiere && (
        <rectAreaLight
          position={[-2.5, 2.76, -1.5]} rotation={[-Math.PI / 2, 0, 0]}
          width={2.0} height={2.0} intensity={2.5} color="#ffd580"
        />
      )}
      <group position={[-2.5, 2.72, -1.5]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.18, 0.06, 20]} />
          <meshStandardMaterial color={lumiere ? '#fffde7' : '#d0d0d0'} emissive={lumiere ? '#ffd580' : '#000'} emissiveIntensity={lumiere ? 1.8 : 0} />
        </mesh>
      </group>

      {/* Tapis — au centre de la pièce, entre canapé et table basse */}
      {/* Bordure */}
      <mesh {...tapisBordure.propsInteraction} position={[-2.5, 0.004, -0.8]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[3.4, 2.6]} />
        <meshPhysicalMaterial {...matTissu(tapisBordure)} />
      </mesh>
      {/* Tapis principal */}
      <mesh {...tapis.propsInteraction} position={[-2.5, 0.006, -0.8]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 2.4]} />
        <meshPhysicalMaterial {...matTissu(tapis)} />
      </mesh>

      {/* Mobilier */}
      <Canape      propsInteraction={canape.propsInteraction}     mat={matTissu(canape)} />
      <TableBasse  propsInteraction={tableBasse.propsInteraction} mat={matBois(tableBasse)} />
      <MeubleTV    propsInteraction={meubleTV.propsInteraction}   mat={matBois(meubleTV)} />
      <Television  propsInteraction={television.propsInteraction} mat={mat(television)} />
      <Fauteuil    propsInteraction={fauteuil.propsInteraction}   mat={matTissu(fauteuil)} />
      <Bibliotheque propsInteraction={biblio.propsInteraction}    mat={matBois(biblio)} />
      <Plante      propsInteraction={plante.propsInteraction}     mat={mat(plante)} />
      <Lampadaire  propsInteraction={lampadaire.propsInteraction} mat={mat(lampadaire)} lumiere={lumiere} />
      <Radiateur   propsInteraction={radiateur.propsInteraction}  mat={mat(radiateur)} />
      <TableauDecoratif propsInteraction={tableau.propsInteraction} mat={mat(tableau)} />

      {/* Détecteur de fumée — plafond centre */}
      <mesh {...detecteur.propsInteraction} position={[-2.5, 2.77, -1.5]}>
        <cylinderGeometry args={[0.055, 0.055, 0.025, 16]} />
        <meshStandardMaterial {...mat(detecteur)} />
      </mesh>

      {/* Interrupteur — mur avant, à droite de la porte d'entrée */}
      <Interrupteur3D
        position={[-0.3, 1.2, -4.86]}
        rotation={[0, -Math.PI / 2, 0]}
        idPiece="sejour"
        lumiere={lumiere}
      />

      {/* Thermostat — mur gauche, h=1.5m */}
      <group {...thermostat.propsInteraction} position={[-5.86, 1.5, -1.5]}>
        <mesh>
          <boxGeometry args={[0.02, 0.12, 0.1]} />
          <meshStandardMaterial {...mat(thermostat)} />
        </mesh>
        <mesh position={[0.012, 0.02, 0]}>
          <boxGeometry args={[0.005, 0.06, 0.06]} />
          <meshStandardMaterial {...mat(thermostat)} emissive="#22c55e" emissiveIntensity={lumiere ? 0.8 : 0} />
        </mesh>
      </group>
    </group>
  );
}
