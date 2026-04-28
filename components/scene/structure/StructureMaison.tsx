'use client';
import React from 'react';
import { Mur } from './Mur';
import { Fenetre } from './Fenetre';
import { Porte } from './Porte';
import { Toit } from './Toit';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, EPAISSEUR_MUR, HAUTEUR_MUR } from '@/lib/three/constantes';

interface Props {
  filDefer?: boolean;
  masquerToit?: boolean;
  pieceVisible?: 'exterieur' | 'interieur' | 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir';
}

// ── Couleurs façade maison familiale ─────────────────────────────────────────
const EXT        = '#f0ebe0';   // enduit crème chaud
const EXT_PIERRE = '#c8b89a';   // soubassement pierre
const INT        = '#d4cfc8';   // cloisons intérieures
const C_VOLET    = '#5c7a3e';   // volets bois vert forêt

const lm  = LARGEUR_MAISON   / 2;   // 6
const pm  = PROFONDEUR_MAISON / 2;  // 5
const em2 = EPAISSEUR_MUR    / 2;   // 0.125

// ── Ouvertures fenêtres ───────────────────────────────────────────────────────
type Ouverture = { centre: number; largeur: number; yBot: number; yTop: number };
const F_CUISINE_AVANT:   Ouverture = { centre:  3.5, largeur: 1.4, yBot: 0.85, yTop: 1.95 };
const F_SEJOUR_GAUCHE:   Ouverture = { centre: -1.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_CUISINE_DROITE:  Ouverture = { centre: -1.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_CHAMBRE_GAUCHE:  Ouverture = { centre:  3.5, largeur: 1.0, yBot: 0.95, yTop: 1.85 };
const F_CHAMBRE_ARRIERE: Ouverture = { centre: -2.5, largeur: 1.2, yBot: 0.90, yTop: 1.90 };
const F_SDB_DROITE:      Ouverture = { centre:  3.5, largeur: 0.8, yBot: 1.00, yTop: 1.80 };

// ── Mur avec trous pour fenêtres ─────────────────────────────────────────────
function MurPerce({ debut, fin, ouvertures = [], couleur = EXT, filDefer = false }: {
  debut: [number, number]; fin: [number, number];
  ouvertures?: Ouverture[]; couleur?: string; filDefer?: boolean;
}) {
  const dx   = fin[0] - debut[0];
  const dz   = fin[1] - debut[1];
  const isX  = Math.abs(dx) > Math.abs(dz);
  const start = isX ? debut[0] : debut[1];
  const end   = isX ? fin[0]   : fin[1];
  const fixed = isX ? debut[1] : debut[0];
  const D = (a: number): [number, number] => isX ? [a, fixed] : [fixed, a];

  const sorted = [...ouvertures].sort((a, b) => a.centre - b.centre);
  const segs: React.ReactElement[] = [];
  let cur = start, k = 0;

  for (const o of sorted) {
    const L = o.centre - o.largeur / 2;
    const R = o.centre + o.largeur / 2;
    if (cur < L)
      segs.push(<Mur key={k++} debut={D(cur)} fin={D(L)} couleur={couleur} filDefer={filDefer} />);
    if (o.yBot > 0)
      segs.push(<Mur key={k++} debut={D(L)} fin={D(R)} hauteur={o.yBot} couleur={couleur} filDefer={filDefer} />);
    if (o.yTop < HAUTEUR_MUR)
      segs.push(<Mur key={k++} debut={D(L)} fin={D(R)} hauteur={HAUTEUR_MUR - o.yTop} yMin={o.yTop} couleur={couleur} filDefer={filDefer} />);
    cur = R;
  }
  if (cur < end)
    segs.push(<Mur key={k++} debut={D(cur)} fin={D(end)} couleur={couleur} filDefer={filDefer} />);

  return <>{segs}</>;
}

// ── Soubassement pierre ───────────────────────────────────────────────────────
function Soubassement({ debut, fin, filDefer = false }: {
  debut: [number, number]; fin: [number, number]; filDefer?: boolean;
}) {
  const dx = fin[0] - debut[0];
  const dz = fin[1] - debut[1];
  const longueur = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  const cx = (debut[0] + fin[0]) / 2;
  const cz = (debut[1] + fin[1]) / 2;
  return (
    <mesh position={[cx, 0.3, cz]} rotation={[0, angle, 0]} castShadow receiveShadow>
      <boxGeometry args={[EPAISSEUR_MUR + 0.01, 0.6, longueur]} />
      <meshStandardMaterial color={EXT_PIERRE} roughness={0.9} wireframe={filDefer} />
    </mesh>
  );
}

// ── Volets en bois ────────────────────────────────────────────────────────────
function VoletsBois({ position, rotation = [0, 0, 0] as [number,number,number], largeurFenetre = 1.2, hauteurFenetre = 1.0, filDefer = false }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  largeurFenetre?: number;
  hauteurFenetre?: number;
  filDefer?: boolean;
}) {
  const lv = largeurFenetre / 2 + 0.04;
  const ep = 0.04;
  const offset = largeurFenetre / 2 + lv / 2 + 0.02;

  return (
    <group position={position} rotation={rotation}>
      {[-offset, offset].map((x, side) => (
        <group key={side} position={[x, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[lv, hauteurFenetre + 0.08, ep]} />
            <meshStandardMaterial color={C_VOLET} roughness={0.85} wireframe={filDefer} />
          </mesh>
          {Array.from({ length: 5 }, (_, i) => (
            <mesh key={i} position={[0, -hauteurFenetre / 2 + 0.1 + i * (hauteurFenetre / 5), ep / 2 + 0.005]}>
              <boxGeometry args={[lv - 0.04, 0.025, 0.01]} />
              <meshStandardMaterial color="#4a6830" roughness={0.9} wireframe={filDefer} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// ── Corniche ──────────────────────────────────────────────────────────────────
function Corniche({ filDefer = false }: { filDefer?: boolean }) {
  const y = HAUTEUR_MUR + 0.05;
  const ep = 0.12;
  const debord = 0.08;
  return (
    <group>
      <mesh position={[0, y, -pm - debord / 2]} castShadow>
        <boxGeometry args={[LARGEUR_MAISON + debord * 2, ep, EPAISSEUR_MUR + debord]} />
        <meshStandardMaterial color="#e0d8c8" roughness={0.7} wireframe={filDefer} />
      </mesh>
      <mesh position={[0, y, pm + debord / 2]} castShadow>
        <boxGeometry args={[LARGEUR_MAISON + debord * 2, ep, EPAISSEUR_MUR + debord]} />
        <meshStandardMaterial color="#e0d8c8" roughness={0.7} wireframe={filDefer} />
      </mesh>
      <mesh position={[-lm - debord / 2, y, 0]} castShadow>
        <boxGeometry args={[EPAISSEUR_MUR + debord, ep, PROFONDEUR_MAISON + debord * 2]} />
        <meshStandardMaterial color="#e0d8c8" roughness={0.7} wireframe={filDefer} />
      </mesh>
      <mesh position={[lm + debord / 2, y, 0]} castShadow>
        <boxGeometry args={[EPAISSEUR_MUR + debord, ep, PROFONDEUR_MAISON + debord * 2]} />
        <meshStandardMaterial color="#e0d8c8" roughness={0.7} wireframe={filDefer} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function StructureMaison({ filDefer = false, masquerToit = false, pieceVisible = 'exterieur' }: Props) {
  const afficherTout = pieceVisible === 'exterieur' || pieceVisible === 'interieur';

  return (
    <group>
      {/* ═══ VUE COMPLÈTE (extérieur / intérieur) ═══ */}
      {afficherTout && (
        <>
          <Mur debut={[-lm,-pm]} fin={[-1.5,-pm]} couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[-0.6,-pm]} fin={[lm,-pm]}  ouvertures={[F_CUISINE_AVANT]}  couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[-lm,pm]}  fin={[lm,pm]}    ouvertures={[F_CHAMBRE_ARRIERE]} couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[-lm,-pm]} fin={[-lm,pm]}   ouvertures={[F_SEJOUR_GAUCHE, F_CHAMBRE_GAUCHE]} couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[lm,-pm]}  fin={[lm,pm]}    ouvertures={[F_CUISINE_DROITE, F_SDB_DROITE]}    couleur={EXT} filDefer={filDefer} />

          {/* Soubassements pierre */}
          <Soubassement debut={[-lm,-pm]} fin={[lm,-pm]}  filDefer={filDefer} />
          <Soubassement debut={[-lm, pm]} fin={[lm, pm]}  filDefer={filDefer} />
          <Soubassement debut={[-lm,-pm]} fin={[-lm, pm]} filDefer={filDefer} />
          <Soubassement debut={[ lm,-pm]} fin={[ lm, pm]} filDefer={filDefer} />

          {/* Corniche */}
          <Corniche filDefer={filDefer} />

          {/* Cloisons intérieures */}
          <Mur debut={[0.75,-pm]}   fin={[0.75,1.5]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[0.75,2.825]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[-lm,1.5]}    fin={[-3.05,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2,1.5]}   fin={[0.75,1.5]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[1.075,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925,1.5]}  fin={[lm,1.5]}     couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}    fin={[2.5,2.8]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}    fin={[2.5,pm]}     couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ SÉJOUR ═══ */}
      {pieceVisible === 'sejour' && (
        <>
          <Mur      debut={[-lm,-pm]}   fin={[-1.5,-pm]}  couleur={EXT} filDefer={filDefer} />
          <Mur      debut={[-0.6,-pm]}  fin={[0.75,-pm]}  couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[-lm,-pm]}   fin={[-lm,1.5]}   ouvertures={[F_SEJOUR_GAUCHE]} couleur={EXT} filDefer={filDefer} />
          <Mur debut={[0.75,-pm]}  fin={[0.75,1.5]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[-lm,1.5]}   fin={[-3.05,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2,1.5]}  fin={[0.75,1.5]}   couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ CUISINE ═══ */}
      {pieceVisible === 'cuisine' && (
        <>
          <MurPerce debut={[-0.6,-pm]} fin={[lm,-pm]}  ouvertures={[F_CUISINE_AVANT]}  couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[lm,-pm]}   fin={[lm,1.5]}  ouvertures={[F_CUISINE_DROITE]} couleur={EXT} filDefer={filDefer} />
          <Mur debut={[0.75,-pm]}   fin={[0.75,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[1.075,1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925,1.5]}  fin={[lm,1.5]}    couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ CHAMBRE ═══ */}
      {pieceVisible === 'chambre' && (
        <>
          <MurPerce debut={[-lm,1.5]} fin={[-lm,pm]}   ouvertures={[F_CHAMBRE_GAUCHE]}   couleur={EXT} filDefer={filDefer} />
          <MurPerce debut={[-lm,pm]}  fin={[0.75,pm]}  ouvertures={[F_CHAMBRE_ARRIERE]}  couleur={EXT} filDefer={filDefer} />
          <Mur debut={[-lm,1.5]}    fin={[-3.05,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2,1.5]}   fin={[0.75,1.5]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[0.75,2.825]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}    couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ COULOIR ═══ */}
      {pieceVisible === 'couloir' && (
        <>
          <Mur debut={[0.75,pm]}    fin={[2.5,pm]}     couleur={EXT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[0.75,2.825]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]}   fin={[1.075,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925,1.5]}  fin={[2.5,1.5]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}    fin={[2.5,2.8]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}    fin={[2.5,pm]}     couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ SALLE DE BAIN ═══ */}
      {pieceVisible === 'salleDeBain' && (
        <>
          <MurPerce debut={[lm,1.5]} fin={[lm,pm]}  ouvertures={[F_SDB_DROITE]} couleur={EXT} filDefer={filDefer} />
          <Mur debut={[2.5,pm]}   fin={[lm,pm]}     couleur={EXT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}  fin={[2.5,2.8]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}  fin={[2.5,pm]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}  fin={[lm,1.5]}    couleur={INT} filDefer={filDefer} />
        </>
      )}

      {/* ═══ FENÊTRES ═══ */}
      {(afficherTout || pieceVisible === 'sejour') && (
        <Fenetre position={[-lm+em2,1.4,-1.5]} rotation={[0,Math.PI/2,0]} largeur={1.2} hauteur={1.0} idPiece="sejour" idElement="fenetreSejour" />
      )}
      {(afficherTout || pieceVisible === 'cuisine') && (
        <>
          <Fenetre position={[3.5,1.4,-pm+em2]}  largeur={1.4} hauteur={1.1} idPiece="cuisine" idElement="fenetreCuisine1" />
          <Fenetre position={[lm-em2,1.4,-1.5]}  rotation={[0,-Math.PI/2,0]} largeur={1.2} hauteur={1.0} idPiece="cuisine" idElement="fenetreCuisine2" />
        </>
      )}
      {(afficherTout || pieceVisible === 'chambre') && (
        <>
          <Fenetre position={[-lm+em2,1.4,3.5]}  rotation={[0,Math.PI/2,0]}  largeur={1.0} hauteur={0.9} idPiece="chambre" idElement="fenetreChambre1" />
          <Fenetre position={[-2.5,1.4,pm-em2]}  rotation={[0,Math.PI,0]}    largeur={1.2} hauteur={1.0} idPiece="chambre" idElement="fenetreChambre2" />
        </>
      )}
      {(afficherTout || pieceVisible === 'salleDeBain') && (
        <Fenetre position={[lm-em2,1.4,3.5]} rotation={[0,-Math.PI/2,0]} largeur={0.8} hauteur={0.8} idPiece="salleDeBain" idElement="fenetreSDB" />
      )}

      {/* ═══ VOLETS EN BOIS (vue extérieure uniquement) ═══ */}
      {afficherTout && !filDefer && (
        <>
          <VoletsBois position={[-lm+em2+0.01, 1.4, -1.5]} rotation={[0, Math.PI/2, 0]} largeurFenetre={1.2} hauteurFenetre={1.0} />
          <VoletsBois position={[3.5, 1.4, -pm+em2+0.01]} largeurFenetre={1.4} hauteurFenetre={1.1} />
          <VoletsBois position={[lm-em2-0.01, 1.4, -1.5]} rotation={[0, -Math.PI/2, 0]} largeurFenetre={1.2} hauteurFenetre={1.0} />
          <VoletsBois position={[-lm+em2+0.01, 1.4, 3.5]} rotation={[0, Math.PI/2, 0]} largeurFenetre={1.0} hauteurFenetre={0.9} />
          <VoletsBois position={[-2.5, 1.4, pm-em2-0.01]} rotation={[0, Math.PI, 0]} largeurFenetre={1.2} hauteurFenetre={1.0} />
          <VoletsBois position={[lm-em2-0.01, 1.4, 3.5]} rotation={[0, -Math.PI/2, 0]} largeurFenetre={0.8} hauteurFenetre={0.8} />
        </>
      )}

      {/* ═══ PORTES ═══ */}
      {(afficherTout || pieceVisible === 'sejour') && (
        <Porte position={[-1.05,0,-pm+0.02]} />
      )}
      {(afficherTout || pieceVisible === 'sejour' || pieceVisible === 'chambre') && (
        <Porte position={[-2.625,0,1.5]} largeur={0.85} hauteur={2.05} />
      )}
      {(afficherTout || pieceVisible === 'cuisine' || pieceVisible === 'couloir') && (
        <Porte position={[1.5,0,1.5]}   largeur={0.85} hauteur={2.05} />
      )}
      {(afficherTout || pieceVisible === 'chambre' || pieceVisible === 'couloir') && (
        <Porte position={[0.75,0,3.25]}  rotation={[0,Math.PI/2,0]} largeur={0.85} hauteur={2.05} />
      )}
      {(afficherTout || pieceVisible === 'couloir' || pieceVisible === 'salleDeBain') && (
        <Porte position={[2.5,0,3.2]}   rotation={[0,Math.PI/2,0]} largeur={0.8}  hauteur={2.05} />
      )}

      {/* ═══ TOIT ═══ */}
      {!masquerToit && <Toit filDefer={filDefer} />}
    </group>
  );
}
