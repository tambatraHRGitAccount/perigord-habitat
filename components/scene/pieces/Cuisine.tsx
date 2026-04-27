'use client';
import React from 'react';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

// ─── Réfrigérateur ────────────────────────────────────────────────────────────
function Refrigerateur({ propsInteraction, M }: { propsInteraction: Record<string,unknown>; M: Record<string,unknown> }) {
  return (
    <group position={[5.4, 0.95, -3.68]}>
      <mesh {...propsInteraction} castShadow><boxGeometry args={[0.72, 1.9, 0.72]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0.38, 0.37]}><boxGeometry args={[0.7, 0.015, 0.02]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0.3, 0.65, 0.38]}><boxGeometry args={[0.04, 0.22, 0.04]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0.3, -0.3, 0.38]}><boxGeometry args={[0.04, 0.5, 0.04]} /><meshStandardMaterial {...M} /></mesh>
      {[-0.2, 0, 0.2].map((x, i) => (
        <mesh {...propsInteraction} key={i} position={[x, -0.9, 0.37]}><boxGeometry args={[0.12, 0.02, 0.02]} /><meshStandardMaterial {...M} /></mesh>
      ))}
    </group>
  );
}

// ─── Hotte ────────────────────────────────────────────────────────────────────
function Hotte({ propsInteraction, M }: { propsInteraction: Record<string,unknown>; M: Record<string,unknown> }) {
  return (
    <group position={[3.0, 1.62, -3.8]}>
      <mesh {...propsInteraction} castShadow><boxGeometry args={[0.85, 0.22, 0.42]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0.36, -0.06]} castShadow><boxGeometry args={[0.28, 0.5, 0.28]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, -0.12, 0.22]}><boxGeometry args={[0.78, 0.04, 0.02]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, -0.12, 0.2]}><boxGeometry args={[0.3, 0.03, 0.02]} /><meshStandardMaterial {...M} /></mesh>
    </group>
  );
}

// ─── Four ─────────────────────────────────────────────────────────────────────
function Four({ propsInteraction, M }: { propsInteraction: Record<string,unknown>; M: Record<string,unknown> }) {
  return (
    <group position={[3.0, 0.45, -3.66]}>
      <mesh {...propsInteraction} castShadow><boxGeometry args={[0.62, 0.62, 0.58]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0, 0.3]}><boxGeometry args={[0.52, 0.42, 0.02]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, -0.24, 0.32]}><boxGeometry args={[0.38, 0.04, 0.04]} /><meshStandardMaterial {...M} /></mesh>
      {[-0.22, -0.08, 0.08, 0.22].map((x, i) => (
        <mesh {...propsInteraction} key={i} position={[x, 0.26, 0.32]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.025, 0.025, 0.03, 10]} /><meshStandardMaterial {...M} /></mesh>
      ))}
    </group>
  );
}

// ─── Évier ────────────────────────────────────────────────────────────────────
function Evier({ propsInteraction, M }: { propsInteraction: Record<string,unknown>; M: Record<string,unknown> }) {
  return (
    <group position={[4.0, 0.94, -3.66]}>
      <mesh {...propsInteraction} castShadow><boxGeometry args={[0.62, 0.06, 0.52]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, -0.04, 0]}><boxGeometry args={[0.54, 0.04, 0.44]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0.18, -0.18]}><cylinderGeometry args={[0.022, 0.022, 0.22, 8]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0.28, -0.06]} rotation={[Math.PI/4, 0, 0]}><cylinderGeometry args={[0.018, 0.018, 0.18, 8]} /><meshStandardMaterial {...M} /></mesh>
      {[-0.12, 0.12].map((x, i) => (
        <mesh {...propsInteraction} key={i} position={[x, 0.14, -0.2]}><cylinderGeometry args={[0.025, 0.025, 0.06, 8]} /><meshStandardMaterial {...M} /></mesh>
      ))}
    </group>
  );
}

// ─── Chaise ───────────────────────────────────────────────────────────────────
function Chaise({ position, rotation, M, propsInteraction }: {
  position: [number,number,number]; rotation?: [number,number,number];
  M: Record<string,unknown>; propsInteraction: Record<string,unknown>;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh {...propsInteraction} position={[0, 0.46, 0]} castShadow><boxGeometry args={[0.44, 0.04, 0.44]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0.5, 0.02]} castShadow><boxGeometry args={[0.4, 0.06, 0.4]} /><meshStandardMaterial {...M} /></mesh>
      <mesh {...propsInteraction} position={[0, 0.78, -0.2]} castShadow><boxGeometry args={[0.44, 0.52, 0.04]} /><meshStandardMaterial {...M} /></mesh>
      {[-0.14, 0, 0.14].map((x, i) => (
        <mesh {...propsInteraction} key={i} position={[x, 0.78, -0.2]}><boxGeometry args={[0.03, 0.48, 0.03]} /><meshStandardMaterial {...M} /></mesh>
      ))}
      {[[-0.18,-0.18],[-0.18,0.18],[0.18,-0.18],[0.18,0.18]].map(([lx,lz],i) => (
        <mesh {...propsInteraction} key={i} position={[lx, 0.23, lz]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.46, 6]} /><meshStandardMaterial {...M} /></mesh>
      ))}
    </group>
  );
}

export function Cuisine({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol        = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'sol',           libelle: 'Sol (carrelage)',   defaut: { couleur: '#4b5563', rugosite: 0.35, metalique: 0 } });
  const planTravail= useElementSelectionnable({ idPiece: 'cuisine', idElement: 'planDeTravail', libelle: 'Plan de travail',  defaut: { couleur: '#9ca3af', rugosite: 0.2,  metalique: 0.3 } });
  const meubles    = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'meublesHauts',  libelle: 'Meubles',          defaut: { couleur: '#f3f4f6', rugosite: 0.5,  metalique: 0 } });
  const refrigo    = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'refrigerateur', libelle: 'Réfrigérateur',    defaut: { couleur: '#f0f0f0', rugosite: 0.25, metalique: 0.15 } });
  const evier      = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'evier',         libelle: 'Évier',            defaut: { couleur: '#d1d5db', rugosite: 0.15, metalique: 0.6 } });
  const plaque     = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'plaqueCuisson', libelle: 'Plaque de cuisson',defaut: { couleur: '#1f2937', rugosite: 0.2,  metalique: 0.6 } });
  const four       = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'four',          libelle: 'Four',             defaut: { couleur: '#2d2d2d', rugosite: 0.3,  metalique: 0.4 } });
  const hotte      = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'hotteAspirante',libelle: 'Hotte aspirante',  defaut: { couleur: '#9ca3af', rugosite: 0.2,  metalique: 0.6 } });
  const table      = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'tableCuisine',  libelle: 'Table de cuisine', defaut: { couleur: '#8b6914', rugosite: 0.4,  metalique: 0 } });
  const chaises    = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'chaises',       libelle: 'Chaises',          defaut: { couleur: '#374151', rugosite: 0.5,  metalique: 0 } });
  const lavVaisselle=useElementSelectionnable({ idPiece: 'cuisine', idElement: 'lavVaisselle',  libelle: 'Lave-vaisselle',   defaut: { couleur: '#e5e7eb', rugosite: 0.3,  metalique: 0.15 } });
  const microOndes = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'microOndes',    libelle: 'Micro-ondes',      defaut: { couleur: '#1f2937', rugosite: 0.3,  metalique: 0.3 } });
  const radiateur  = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'radiateur',     libelle: 'Radiateur',        defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.2 } });
  const poubelle   = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'poubelleTri',   libelle: 'Poubelle de tri',  defaut: { couleur: '#22c55e', rugosite: 0.6,  metalique: 0.1 } });
  const serrure    = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'serrurePorte',  libelle: 'Serrure de porte', defaut: { couleur: '#d4af37', rugosite: 0.2,  metalique: 0.8 } });
  const interphone = useElementSelectionnable({ idPiece: 'cuisine', idElement: 'interphone',    libelle: 'Interphone',       defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.2 } });

  const M = (s: typeof sol) => ({
    color: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique,
    emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif
  });

  return (
    <group>
      <Sol x={3.5} z={-1.5} largeur={4.5} profondeur={5.0}
        couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
        propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
        filDefer={filDefer} clearcoat={0.45} clearcoatRoughness={0.08} />

      {!masquerPlafond && (
        <mesh position={[3.5, 2.8, -1.5]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[4.5, 5.0]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {lumiere && (
        <rectAreaLight
          position={[3.5, 2.76, -1.5]} rotation={[-Math.PI / 2, 0, 0]}
          width={1.8} height={1.8} intensity={5} color="#fff5e0"
        />
      )}
      <group position={[3.5, 2.72, -1.5]}>
        <mesh><cylinderGeometry args={[0.18, 0.14, 0.06, 20]} /><meshStandardMaterial color={lumiere ? '#fffde7' : '#d0d0d0'} emissive={lumiere ? '#fff5e0' : '#000'} emissiveIntensity={lumiere ? 1.8 : 0} /></mesh>
      </group>

      {/* Meubles bas */}
      <mesh {...meubles.propsInteraction} position={[3.65, 0.45, -3.68]} castShadow receiveShadow>
        <boxGeometry args={[3.7, 0.9, 0.62]} />
        <meshStandardMaterial {...M(meubles)} />
      </mesh>
      {[2.0, 2.7, 3.4, 4.1, 4.8, 5.3].map((x, i) => (
        <group key={i}>
          <mesh {...meubles.propsInteraction} position={[x, 0.45, -3.35]}>
            <boxGeometry args={[0.58, 0.84, 0.02]} />
            <meshStandardMaterial {...M(meubles)} />
          </mesh>
          <mesh {...meubles.propsInteraction} position={[x, 0.45, -3.33]}>
            <boxGeometry args={[0.16, 0.025, 0.025]} />
            <meshStandardMaterial {...M(meubles)} />
          </mesh>
        </group>
      ))}

      {/* Plan de travail */}
      <mesh {...planTravail.propsInteraction} position={[3.65, 0.92, -3.65]} castShadow>
        <boxGeometry args={[3.7, 0.045, 0.66]} />
        <meshPhysicalMaterial {...M(planTravail)} clearcoat={0.7} clearcoatRoughness={0.08} />
      </mesh>

      {/* Meubles hauts */}
      <mesh {...meubles.propsInteraction} position={[3.65, 1.85, -3.82]} castShadow>
        <boxGeometry args={[3.7, 0.72, 0.38]} />
        <meshStandardMaterial {...M(meubles)} />
      </mesh>
      {[2.0, 2.7, 3.4, 4.1, 4.8, 5.3].map((x, i) => (
        <group key={i}>
          <mesh {...meubles.propsInteraction} position={[x, 1.85, -3.62]}>
            <boxGeometry args={[0.58, 0.66, 0.02]} />
            <meshStandardMaterial {...M(meubles)} />
          </mesh>
          <mesh {...meubles.propsInteraction} position={[x, 1.85, -3.60]}>
            <boxGeometry args={[0.16, 0.025, 0.025]} />
            <meshStandardMaterial {...M(meubles)} />
          </mesh>
        </group>
      ))}

      {/* Four */}
      <Four propsInteraction={four.propsInteraction} M={M(four)} />

      {/* Plaque de cuisson */}
      <mesh {...plaque.propsInteraction} position={[3.0, 0.945, -3.65]}>
        <boxGeometry args={[0.72, 0.022, 0.52]} />
        <meshStandardMaterial {...M(plaque)} />
      </mesh>
      {[[-0.22,-0.12],[0.22,-0.12],[-0.22,0.12],[0.22,0.12]].map(([x,z],i) => (
        <mesh {...plaque.propsInteraction} key={i} position={[3.0+x, 0.958, -3.65+z]}>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 16]} />
          <meshStandardMaterial {...M(plaque)} />
        </mesh>
      ))}

      {/* Hotte */}
      <Hotte propsInteraction={hotte.propsInteraction} M={M(hotte)} />

      {/* Évier */}
      <Evier propsInteraction={evier.propsInteraction} M={M(evier)} />

      {/* Lave-vaisselle */}
      <group position={[4.7, 0.45, -3.66]}>
        <mesh {...lavVaisselle.propsInteraction} castShadow><boxGeometry args={[0.62, 0.9, 0.62]} /><meshStandardMaterial {...M(lavVaisselle)} /></mesh>
        <mesh {...lavVaisselle.propsInteraction} position={[0, 0, 0.32]}><boxGeometry args={[0.56, 0.84, 0.02]} /><meshStandardMaterial {...M(lavVaisselle)} /></mesh>
        <mesh {...lavVaisselle.propsInteraction} position={[0, -0.3, 0.335]}><boxGeometry args={[0.3, 0.04, 0.04]} /><meshStandardMaterial {...M(lavVaisselle)} /></mesh>
      </group>

      {/* Réfrigérateur */}
      <Refrigerateur propsInteraction={refrigo.propsInteraction} M={M(refrigo)} />

      {/* Micro-ondes */}
      <group position={[1.8, 1.85, -3.8]}>
        <mesh {...microOndes.propsInteraction} castShadow><boxGeometry args={[0.52, 0.32, 0.38]} /><meshStandardMaterial {...M(microOndes)} /></mesh>
        <mesh {...microOndes.propsInteraction} position={[0.1, 0, 0.2]}><boxGeometry args={[0.28, 0.26, 0.02]} /><meshStandardMaterial {...M(microOndes)} /></mesh>
        <mesh {...microOndes.propsInteraction} position={[-0.2, 0, 0.2]}><boxGeometry args={[0.06, 0.22, 0.02]} /><meshStandardMaterial {...M(microOndes)} /></mesh>
      </group>

      {/* Table */}
      <mesh {...table.propsInteraction} position={[2.8, 0.76, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.05, 0.9]} />
        <meshStandardMaterial {...M(table)} />
      </mesh>
      {[[-0.55,-0.35],[0.55,-0.35],[-0.55,0.35],[0.55,0.35]].map(([lx,lz],i) => (
        <mesh {...table.propsInteraction} key={i} position={[2.8+lx, 0.38, -0.8+lz]} castShadow>
          <boxGeometry args={[0.06, 0.76, 0.06]} />
          <meshStandardMaterial {...M(table)} />
        </mesh>
      ))}

      {/* Chaises */}
      {([[-0.55,-1.05,0,0],[0.55,-1.05,0,0],[-0.55,0.15,0,Math.PI],[0.55,0.15,0,Math.PI]] as [number,number,number,number][]).map(([lx,lz,,ry],i) => (
        <Chaise key={i}
          position={[2.8+lx, 0, -0.8+lz]}
          rotation={[0, ry, 0]}
          M={M(chaises)}
          propsInteraction={chaises.propsInteraction}
        />
      ))}

      {/* Radiateur */}
      <group position={[5.7, 0.38, -1.5]}>
        <mesh {...radiateur.propsInteraction} castShadow><boxGeometry args={[0.08, 0.52, 1.0]} /><meshStandardMaterial {...M(radiateur)} /></mesh>
        {Array.from({length: 6}).map((_, i) => (
          <mesh {...radiateur.propsInteraction} key={i} position={[0.02, 0, -0.42 + i*0.17]}>
            <boxGeometry args={[0.04, 0.48, 0.06]} />
            <meshStandardMaterial {...M(radiateur)} />
          </mesh>
        ))}
      </group>

      {/* Poubelle de tri */}
      <group position={[1.5, 0, 0.5]}>
        <mesh {...poubelle.propsInteraction} position={[-0.15, 0.25, 0]} castShadow>
          <boxGeometry args={[0.25, 0.5, 0.35]} />
          <meshStandardMaterial color={poubelle.estSelectionne ? '#00e5ff' : '#22c55e'} roughness={0.6} metalness={0.1} emissive={poubelle.emissif} emissiveIntensity={poubelle.intensiteEmissif} />
        </mesh>
        <mesh {...poubelle.propsInteraction} position={[0.15, 0.25, 0]} castShadow>
          <boxGeometry args={[0.25, 0.5, 0.35]} />
          <meshStandardMaterial color={poubelle.estSelectionne ? '#00e5ff' : '#eab308'} roughness={0.6} metalness={0.1} emissive={poubelle.emissif} emissiveIntensity={poubelle.intensiteEmissif} />
        </mesh>
        <mesh {...poubelle.propsInteraction} position={[-0.15, 0.52, 0]}>
          <boxGeometry args={[0.26, 0.04, 0.36]} />
          <meshStandardMaterial color={poubelle.estSelectionne ? '#00e5ff' : '#16a34a'} roughness={0.5} metalness={0.1} emissive={poubelle.emissif} emissiveIntensity={poubelle.intensiteEmissif} />
        </mesh>
        <mesh {...poubelle.propsInteraction} position={[0.15, 0.52, 0]}>
          <boxGeometry args={[0.26, 0.04, 0.36]} />
          <meshStandardMaterial color={poubelle.estSelectionne ? '#00e5ff' : '#ca8a04'} roughness={0.5} metalness={0.1} emissive={poubelle.emissif} emissiveIntensity={poubelle.intensiteEmissif} />
        </mesh>
      </group>

      {/* Serrure de porte */}
      <group position={[1.9, 1.0, 1.52]}>
        <mesh {...serrure.propsInteraction}>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
          <meshStandardMaterial {...M(serrure)} />
        </mesh>
        <mesh {...serrure.propsInteraction} position={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
          <meshStandardMaterial {...M(serrure)} />
        </mesh>
      </group>

      {/* Interrupteur — cloison gauche (x≈0.875), près de l'entrée couloir */}
      <Interrupteur3D
        position={[0.89, 1.2, 0.5]}
        rotation={[0, 0, 0]}
        idPiece="cuisine"
        lumiere={lumiere}
      />

      {/* Interphone */}
      <group position={[1.2, 1.5, 1.52]}>
        <mesh {...interphone.propsInteraction} castShadow>
          <boxGeometry args={[0.12, 0.18, 0.04]} />
          <meshStandardMaterial {...M(interphone)} />
        </mesh>
        <mesh {...interphone.propsInteraction} position={[0, 0.05, 0.025]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshStandardMaterial {...M(interphone)} />
        </mesh>
        <mesh {...interphone.propsInteraction} position={[0, -0.05, 0.025]}>
          <cylinderGeometry args={[0.015, 0.015, 0.01, 12]} />
          <meshStandardMaterial {...M(interphone)} />
        </mesh>
      </group>
    </group>
  );
}
