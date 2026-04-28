'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, EPAISSEUR_MUR } from '@/lib/three/constantes';
import { useScene } from '@/hooks/useSceneStore';

// ─────────────────────────────────────────────────────────────────────────────
//  CALCUL DES LIMITES DE LA MAISON (repère monde, origine = centre maison)
//
//  Maison :  X ∈ [-6 , +6]   (LARGEUR_MAISON = 12)
//            Z ∈ [-5 , +5]   (PROFONDEUR_MAISON = 10)
//
//  Mur droit (face extérieure) : X = +6 + EP/2 = +6.125
//  Toit (débord 0.8 m)         : X = +6 + 0.8  = +6.8   ← limite absolue
//
//  Le garage commence APRÈS le débord du toit :
//    X_DEBUT_GARAGE = 6.8 + 0.15 (jeu)  = 6.95
//
//  Façade avant maison : Z = -5 - EP/2 = -5.125
//  Le garage est aligné sur la façade avant de la maison.
//  Sa façade avant (porte) est à Z = -5.125 (même plan que la maison).
//
//  Dimensions garage :
//    Largeur intérieure  : 4.0 m
//    Profondeur intérieure: 5.5 m  (vers Z+)
//    Hauteur murs        : 2.5 m   (< HAUTEUR_MUR 2.8 pour différencier)
// ─────────────────────────────────────────────────────────────────────────────

const EP  = EPAISSEUR_MUR;                          // 0.25
const LG  = 4.0;                                    // largeur intérieure garage
const PG  = 5.5;                                    // profondeur intérieure garage
const HG  = 2.5;                                    // hauteur murs garage
const NB  = 7;                                      // nombre de lames
const HL  = HG / NB;                                // hauteur d'une lame

// Bord du toit de la maison côté droit
const TOIT_DEBORD   = 0.8;
const X_TOIT_DROIT  = LARGEUR_MAISON / 2 + TOIT_DEBORD;   // 6.8
const JEU           = 0.15;                                 // espace entre toit et garage

// Façade avant de la maison (face extérieure du mur avant)
const Z_FACADE_AVANT = -(PROFONDEUR_MAISON / 2) - EP / 2;  // -5.125

// Position du coin avant-gauche intérieur du garage (repère monde)
const X_GARAGE_DEBUT = X_TOIT_DROIT + JEU;                 // 6.95
// Centre X du garage
const CX = X_GARAGE_DEBUT + EP / 2 + LG / 2;               // 6.95 + 0.125 + 2.0 = 9.075
// Centre Z du garage (façade avant alignée avec la maison)
const CZ = Z_FACADE_AVANT + EP / 2 + PG / 2;               // -5.125 + 0.125 + 2.75 = -2.25

// ── Matériaux ────────────────────────────────────────────────────────────────
const C_MUR_EXT  = '#ddd8d0';   // enduit clair (même famille que la maison)
const C_SOUBAS   = '#c4bdb5';   // soubassement plus sombre
const C_TOIT_G   = '#c8c8c8';   // béton toit
const C_ACROT    = '#d0d0d0';   // acrotère
const C_SOL_INT  = '#a0a0a0';   // béton sol intérieur
const C_SOL_EXT  = '#888888';   // béton allée extérieure
const C_CADRE    = '#252525';   // alu anodisé foncé
const C_RAIL     = '#181818';   // rail acier
const C_LAME_A   = '#3a4a5c';   // lame foncée
const C_LAME_B   = '#4d5f74';   // lame claire
const C_POIGNEE  = '#d4d4d4';   // inox
const C_BOITIER  = '#1c2833';   // boîtier commande

interface Props { filDefer?: boolean }

export function Garage({ filDefer = false }: Props) {
  const { setTooltip } = useScene();
  const [ouvert, setOuvert]   = useState(false);
  const [enCours, setEnCours] = useState(false);

  // Refs pour animer les lames (dans le repère LOCAL du groupe)
  const lameRefs  = useRef<(THREE.Mesh | null)[]>([]);
  const tgtY      = useRef<number[]>(Array(NB).fill(0));
  const tgtZ      = useRef<number[]>(Array(NB).fill(0));
  const tgtRX     = useRef<number[]>(Array(NB).fill(0));

  // Demi-dimensions (repère local)
  const lm = LG / 2;   // 2.0
  const pm = PG / 2;   // 2.75

  // Positions fermées des lames (repère local du groupe)
  // La façade avant du groupe est à z = -pm - EP/2 = -2.875
  const Z_LAME_FERME = -pm - EP / 2 + 0.04;   // légèrement en avant du mur
  const lamesInit = Array.from({ length: NB }, (_, i) => ({
    y: HL * i + HL / 2,
    z: Z_LAME_FERME,
  }));

  React.useEffect(() => {
    lamesInit.forEach((init, i) => {
      tgtY.current[i] = init.y;
      tgtZ.current[i] = init.z;
      tgtRX.current[i] = 0;
    });
    lameRefs.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = lamesInit[i].y;
      m.position.z = lamesInit[i].z;
      m.rotation.x = 0;
    });
  }, []); // eslint-disable-line

  const togglePorte = () => {
    if (enCours) return;
    setEnCours(true);
    const next = !ouvert;
    if (next) {
      // Ouverture : lames montent et se couchent sous le plafond
      lamesInit.forEach((_, i) => {
        const rang = NB - 1 - i;
        tgtY.current[i]  = HG - EP / 2 - rang * (HL + 0.012);
        tgtZ.current[i]  = Z_LAME_FERME + rang * (HL + 0.012);
        tgtRX.current[i] = -Math.PI / 2;
      });
    } else {
      lamesInit.forEach((init, i) => {
        tgtY.current[i]  = init.y;
        tgtZ.current[i]  = init.z;
        tgtRX.current[i] = 0;
      });
    }
    setOuvert(next);
    setTimeout(() => setEnCours(false), 1000);
  };

  useFrame(() => {
    lameRefs.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = THREE.MathUtils.lerp(m.position.y, tgtY.current[i],  0.08);
      m.position.z = THREE.MathUtils.lerp(m.position.z, tgtZ.current[i],  0.08);
      m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, tgtRX.current[i], 0.08);
    });
  });

  const M = (color: string, roughness: number, metalness = 0) =>
    ({ color, roughness, metalness, wireframe: filDefer });

  return (
    // Le groupe est centré en (CX, 0, CZ) dans le repère monde
    <group position={[CX, 0, CZ]}>

      {/* ══════════════════════════════════════════════════════════════════
          SOL
      ══════════════════════════════════════════════════════════════════ */}

      {/* Dalle intérieure béton */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[LG, PG]} />
        <meshStandardMaterial {...M(C_SOL_INT, 0.9)} />
      </mesh>

      {/* Allée extérieure devant la porte (5 m de long vers Z-) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -pm - 2.5]} receiveShadow>
        <planeGeometry args={[LG + EP * 2, 5]} />
        <meshStandardMaterial {...M(C_SOL_EXT, 0.95)} />
      </mesh>

      {/* Seuil de porte (bande béton lisse) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -pm]} receiveShadow>
        <planeGeometry args={[LG, 0.1]} />
        <meshStandardMaterial {...M('#b8b8b8', 0.6)} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════
          MURS
          Repère local : lm = LG/2 = 2.0,  pm = PG/2 = 2.75
          Mur gauche (X = -lm) : côté maison — on ne le dessine PAS
          car il est accolé au mur de la maison (pas de chevauchement)
      ══════════════════════════════════════════════════════════════════ */}

      {/* Mur droit */}
      <mesh position={[lm + EP / 2, HG / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[EP, HG, PG + EP * 2]} />
        <meshStandardMaterial {...M(C_MUR_EXT, 0.85)} />
      </mesh>
      {/* Soubassement mur droit */}
      <mesh position={[lm + EP / 2, 0.3, 0]}>
        <boxGeometry args={[EP + 0.002, 0.6, PG + EP * 2 + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>

      {/* Mur arrière */}
      <mesh position={[0, HG / 2, pm + EP / 2]} castShadow receiveShadow>
        <boxGeometry args={[LG + EP, HG, EP]} />
        <meshStandardMaterial {...M(C_MUR_EXT, 0.85)} />
      </mesh>
      {/* Soubassement mur arrière */}
      <mesh position={[0, 0.3, pm + EP / 2]}>
        <boxGeometry args={[LG + EP + 0.002, 0.6, EP + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>

      {/* Façade avant — bande haute au-dessus de la porte (1 lame de hauteur) */}
      <mesh position={[0, HG - HL / 2, -pm - EP / 2]} castShadow receiveShadow>
        <boxGeometry args={[LG + EP, HL, EP]} />
        <meshStandardMaterial {...M(C_MUR_EXT, 0.85)} />
      </mesh>
      {/* Montant gauche façade avant */}
      <mesh position={[-lm - EP / 4, HG / 2, -pm - EP / 2]} castShadow>
        <boxGeometry args={[EP / 2, HG, EP]} />
        <meshStandardMaterial {...M(C_MUR_EXT, 0.85)} />
      </mesh>
      {/* Montant droit façade avant */}
      <mesh position={[lm + EP / 4, HG / 2, -pm - EP / 2]} castShadow>
        <boxGeometry args={[EP / 2, HG, EP]} />
        <meshStandardMaterial {...M(C_MUR_EXT, 0.85)} />
      </mesh>
      {/* Soubassement façade avant */}
      <mesh position={[0, 0.3, -pm - EP / 2]}>
        <boxGeometry args={[LG + EP + 0.002, 0.6, EP + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════
          TOIT PLAT (débord 0.3 m sur 3 côtés, pas côté maison)
      ══════════════════════════════════════════════════════════════════ */}
      {/* Dalle toit */}
      <mesh position={[0.15, HG + 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.22, PG + EP * 2 + 0.3]} />
        <meshStandardMaterial {...M(C_TOIT_G, 0.75, 0.05)} />
      </mesh>

      {/* Acrotère avant */}
      <mesh position={[0.15, HG + 0.34, -(PG + EP * 2 + 0.3) / 2]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.22, 0.12]} />
        <meshStandardMaterial {...M(C_ACROT, 0.65)} />
      </mesh>
      {/* Acrotère arrière */}
      <mesh position={[0.15, HG + 0.34, (PG + EP * 2 + 0.3) / 2]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.22, 0.12]} />
        <meshStandardMaterial {...M(C_ACROT, 0.65)} />
      </mesh>
      {/* Acrotère droit */}
      <mesh position={[(LG + EP + 0.3) / 2 + 0.15, HG + 0.34, 0]} castShadow>
        <boxGeometry args={[0.12, 0.22, PG + EP * 2 + 0.3]} />
        <meshStandardMaterial {...M(C_ACROT, 0.65)} />
      </mesh>
      {/* Pas d'acrotère côté gauche (collé à la maison) */}

      {/* Gouttière avant (profil U) */}
      <mesh position={[0.15, HG + 0.01, -(PG + EP * 2 + 0.3) / 2 + 0.01]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.06, 0.09]} />
        <meshStandardMaterial {...M('#686868', 0.4, 0.6)} />
      </mesh>
      {/* Descente de gouttière côté droit */}
      <mesh position={[(LG + EP + 0.3) / 2 + 0.15 - 0.045, HG / 2, -(PG + EP * 2 + 0.3) / 2 + 0.045]} castShadow>
        <boxGeometry args={[0.06, HG, 0.06]} />
        <meshStandardMaterial {...M('#606060', 0.4, 0.6)} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════
          PORTE SECTIONNELLE
      ══════════════════════════════════════════════════════════════════ */}

      {/* Cadre alu — montant gauche */}
      <mesh position={[-lm + 0.05, (HG - HL) / 2, -pm - EP / 2 + 0.025]} castShadow>
        <boxGeometry args={[0.08, HG - HL, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>
      {/* Cadre alu — montant droit */}
      <mesh position={[lm - 0.05, (HG - HL) / 2, -pm - EP / 2 + 0.025]} castShadow>
        <boxGeometry args={[0.08, HG - HL, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>
      {/* Cadre alu — traverse haute */}
      <mesh position={[0, HG - HL - 0.04, -pm - EP / 2 + 0.025]} castShadow>
        <boxGeometry args={[LG - 0.1, 0.08, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>
      {/* Cadre alu — seuil bas */}
      <mesh position={[0, 0.04, -pm - EP / 2 + 0.025]} castShadow>
        <boxGeometry args={[LG - 0.1, 0.08, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>

      {/* Rails latéraux intérieurs */}
      <mesh position={[-lm + 0.09, HG / 2 - 0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, PG - 0.3]} />
        <meshStandardMaterial {...M(C_RAIL, 0.3, 0.85)} />
      </mesh>
      <mesh position={[lm - 0.09, HG / 2 - 0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, PG - 0.3]} />
        <meshStandardMaterial {...M(C_RAIL, 0.3, 0.85)} />
      </mesh>

      {/* Moteur au plafond */}
      <mesh position={[0, HG - 0.13, 0]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.45]} />
        <meshStandardMaterial {...M('#1a1a1a', 0.5, 0.6)} />
      </mesh>
      {/* Rail moteur */}
      <mesh position={[0, HG - 0.13, -pm / 2]} castShadow>
        <boxGeometry args={[0.055, 0.055, pm]} />
        <meshStandardMaterial {...M(C_RAIL, 0.3, 0.85)} />
      </mesh>

      {/* ── Lames de la porte sectionnelle ──────────────────────────────── */}
      {Array.from({ length: NB }, (_, i) => (
        <mesh
          key={i}
          ref={el => { lameRefs.current[i] = el; }}
          position={[0, lamesInit[i].y, lamesInit[i].z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[LG - 0.18, HL - 0.022, 0.058]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? C_LAME_A : C_LAME_B}
            roughness={0.38}
            metalness={0.55}
            wireframe={filDefer}
          />
        </mesh>
      ))}

      {/* Rainures sur les lames (fixes, décoratives) */}
      {!filDefer && Array.from({ length: NB }, (_, i) => (
        <mesh key={`r${i}`} position={[0, lamesInit[i].y, lamesInit[i].z + 0.032]}>
          <boxGeometry args={[LG - 0.22, 0.01, 0.008]} />
          <meshStandardMaterial color="#1a2030" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Poignée centrale (lame du bas) */}
      <mesh position={[0, HL * 0.5, -pm - EP / 2 + 0.075]} castShadow>
        <boxGeometry args={[0.32, 0.05, 0.032]} />
        <meshStandardMaterial {...M(C_POIGNEE, 0.15, 0.95)} />
      </mesh>
      <mesh position={[-0.13, HL * 0.5, -pm - EP / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.022, 0.05, 0.022]} />
        <meshStandardMaterial {...M(C_POIGNEE, 0.15, 0.95)} />
      </mesh>
      <mesh position={[0.13, HL * 0.5, -pm - EP / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.022, 0.05, 0.022]} />
        <meshStandardMaterial {...M(C_POIGNEE, 0.15, 0.95)} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════
          BOUTON DE COMMANDE (mural extérieur, côté droit)
      ══════════════════════════════════════════════════════════════════ */}

      {/* Plaque de fixation */}
      <mesh position={[lm + EP / 2 + 0.08, 1.15, -pm - 0.35]} castShadow>
        <boxGeometry args={[0.008, 0.24, 0.14]} />
        <meshStandardMaterial {...M('#111111', 0.6, 0.4)} />
      </mesh>
      {/* Boîtier */}
      <mesh position={[lm + EP / 2 + 0.115, 1.15, -pm - 0.35]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.1]} />
        <meshStandardMaterial {...M(C_BOITIER, 0.5, 0.5)} />
      </mesh>
      {/* Bouton cylindrique cliquable */}
      <mesh
        position={[lm + EP / 2 + 0.145, 1.15, -pm - 0.35]}
        rotation={[0, 0, Math.PI / 2]}
        onClick={e => { e.stopPropagation(); togglePorte(); }}
        onPointerEnter={e => {
          e.stopPropagation();
          setTooltip(ouvert ? '🔒 Fermer le garage' : '🔓 Ouvrir le garage');
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={e => {
          e.stopPropagation();
          setTooltip(null);
          document.body.style.cursor = 'default';
        }}
      >
        <cylinderGeometry args={[0.038, 0.038, 0.028, 16]} />
        <meshStandardMaterial
          color={ouvert ? '#22c55e' : '#ef4444'}
          roughness={0.2}
          metalness={0.3}
          emissive={ouvert ? '#16a34a' : '#b91c1c'}
          emissiveIntensity={0.65}
          wireframe={filDefer}
        />
      </mesh>
      {/* Halo lumineux */}
      {!filDefer && (
        <mesh
          position={[lm + EP / 2 + 0.148, 1.15, -pm - 0.35]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.052, 0.052, 0.004, 16]} />
          <meshStandardMaterial
            color={ouvert ? '#4ade80' : '#f87171'}
            transparent
            opacity={0.3}
            emissive={ouvert ? '#22c55e' : '#ef4444'}
            emissiveIntensity={0.35}
          />
        </mesh>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          DÉTAILS ARCHITECTURAUX
      ══════════════════════════════════════════════════════════════════ */}

      {/* Corniche de jonction toit/mur */}
      <mesh position={[0.15, HG + 0.002, -(PG + EP * 2 + 0.3) / 2 + 0.06]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.035, 0.035]} />
        <meshStandardMaterial {...M('#888888', 0.3, 0.7)} />
      </mesh>

      {/* Plaque numéro (façade avant, côté droit) */}
      {!filDefer && (
        <mesh position={[lm - 0.28, 1.85, -pm - EP / 2 - 0.012]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.018]} />
          <meshStandardMaterial {...M('#1a1a1a', 0.3, 0.8)} />
        </mesh>
      )}

    </group>
  );
}
