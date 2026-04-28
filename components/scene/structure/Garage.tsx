'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, EPAISSEUR_MUR } from '@/lib/three/constantes';
import { useScene } from '@/hooks/useSceneStore';

// ─────────────────────────────────────────────────────────────────────────────
//  Repère LOCAL du groupe Garage (centré en CX, 0, CZ dans le monde)
//
//  lm = LG/2 = 2.0   (demi-largeur)
//  pm = PG/2 = 2.75  (demi-profondeur)
//
//  Façade avant (face EXTÉRIEURE du mur avant) : z_local = -pm - EP/2 = -2.875
//  C'est là que la porte est visible de l'extérieur.
//
//  PIVOT de la porte basculante :
//    - Ancré sur la face EXTÉRIEURE du mur, en haut : z = Z_PIVOT, y = H_PORTE
//    - Les lames s'étendent vers Y- (vers le bas) depuis ce pivot
//    - Ouverture : rotation.x = -PI/2
//      → les lames (Y-) pivotent vers Z- (extérieur, devant la façade) ✅
//    - Fermeture : rotation.x = 0
//      → les lames retombent verticalement (position fermée) ✅
// ─────────────────────────────────────────────────────────────────────────────

const EP = EPAISSEUR_MUR;   // 0.25
const LG = 4.0;             // largeur intérieure
const PG = 5.5;             // profondeur intérieure
const HG = 2.5;             // hauteur murs

const HL_LINTEAU = 0.36;
const H_PORTE    = HG - HL_LINTEAU;  // 2.14 m
const NB         = 7;
const HL         = H_PORTE / NB;     // ~0.306 m par lame

const TOIT_DEBORD  = 0.6;
const X_TOIT_DROIT = LARGEUR_MAISON / 2 + TOIT_DEBORD;
const JEU          = 0.15;
const X_DEBUT      = X_TOIT_DROIT + JEU;
const CX           = X_DEBUT + EP / 2 + LG / 2;
const CZ           = -(PROFONDEUR_MAISON / 2) - EP / 2 + EP / 2 + PG / 2;

// Z de la face EXTÉRIEURE du mur avant (dans le repère local)
const Z_FACADE_EXT = -PG / 2 - EP / 2;   // -2.875

const C_MUR     = '#f8f8f8';   // blanc
const C_SOUBAS  = '#e0d8d0';   // soubassement blanc légèrement grisé
const C_TOIT_G  = '#c8c8c8';
const C_ACROT   = '#d0d0d0';
const C_SOL_I   = '#a0a0a0';
const C_CADRE   = '#252525';
const C_RAIL    = '#181818';
const C_LAME_A  = '#3a4a5c';
const C_LAME_B  = '#4d5f74';
const C_POIGN   = '#d4d4d4';
const C_BOITIER = '#1c2833';

interface Props { filDefer?: boolean }

export function Garage({ filDefer = false }: Props) {
  const { setTooltip } = useScene();
  const [ouvert, setOuvert]   = useState(false);
  const [enCours, setEnCours] = useState(false);

  const porteRef   = useRef<THREE.Group>(null);
  const cibleAngle = useRef(0);

  const lm = LG / 2;
  const pm = PG / 2;

  const togglePorte = () => {
    if (enCours) return;
    setEnCours(true);
    const next = !ouvert;
    // Pivot ancré en haut (Y+), lames vers Y-
    // rotation.x = +PI/2 → Y- bascule vers Z- (EXTÉRIEUR, devant la façade) ✅
    // rotation.x = -PI/2 → Y- bascule vers Z+ (intérieur) ❌
    cibleAngle.current = next ? Math.PI / 2 : 0;
    setOuvert(next);
    setTimeout(() => setEnCours(false), 900);
  };

  useFrame(() => {
    if (!porteRef.current) return;
    porteRef.current.rotation.x = THREE.MathUtils.lerp(
      porteRef.current.rotation.x,
      cibleAngle.current,
      0.07
    );
  });

  const M = (color: string, roughness: number, metalness = 0) =>
    ({ color, roughness, metalness, wireframe: filDefer });

  return (
    <group position={[CX, 0, CZ]}>

      {/* ══ SOL ══════════════════════════════════════════════════════════ */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[LG, PG]} />
        <meshStandardMaterial {...M(C_SOL_I, 0.9)} />
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.025, -pm]} receiveShadow>
        <planeGeometry args={[LG, 0.08]} />
        <meshStandardMaterial {...M('#b8b8b8', 0.6)} />
      </mesh>

      {/* ══ MURS ═════════════════════════════════════════════════════════ */}

      {/* Mur gauche (côté maison) */}
      <mesh position={[-lm - EP/2, HG/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[EP, HG, PG + EP*2]} />
        <meshStandardMaterial {...M(C_MUR, 0.85)} />
      </mesh>
      <mesh position={[-lm - EP/2, 0.3, 0]}>
        <boxGeometry args={[EP + 0.002, 0.6, PG + EP*2 + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>

      {/* Mur droit */}
      <mesh position={[lm + EP/2, HG/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[EP, HG, PG + EP*2]} />
        <meshStandardMaterial {...M(C_MUR, 0.85)} />
      </mesh>
      <mesh position={[lm + EP/2, 0.3, 0]}>
        <boxGeometry args={[EP + 0.002, 0.6, PG + EP*2 + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>

      {/* Mur arrière */}
      <mesh position={[0, HG/2, pm + EP/2]} castShadow receiveShadow>
        <boxGeometry args={[LG + EP*2, HG, EP]} />
        <meshStandardMaterial {...M(C_MUR, 0.85)} />
      </mesh>
      <mesh position={[0, 0.3, pm + EP/2]}>
        <boxGeometry args={[LG + EP*2 + 0.002, 0.6, EP + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>

      {/* Façade avant — linteau uniquement (au-dessus de la porte) */}
      <mesh position={[0, HG - HL_LINTEAU/2, Z_FACADE_EXT]} castShadow receiveShadow>
        <boxGeometry args={[LG + EP*2, HL_LINTEAU, EP]} />
        <meshStandardMaterial {...M(C_MUR, 0.85)} />
      </mesh>
      {/* Montant gauche (toute la hauteur, largeur EP/2) */}
      <mesh position={[-lm - EP/4, HG/2, Z_FACADE_EXT]} castShadow>
        <boxGeometry args={[EP/2, HG, EP]} />
        <meshStandardMaterial {...M(C_MUR, 0.85)} />
      </mesh>
      {/* Soubassement montant gauche uniquement */}
      <mesh position={[-lm - EP/4, 0.3, Z_FACADE_EXT]}>
        <boxGeometry args={[EP/2 + 0.002, 0.6, EP + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>
      {/* Montant droit (toute la hauteur, largeur EP/2) */}
      <mesh position={[lm + EP/4, HG/2, Z_FACADE_EXT]} castShadow>
        <boxGeometry args={[EP/2, HG, EP]} />
        <meshStandardMaterial {...M(C_MUR, 0.85)} />
      </mesh>
      {/* Soubassement montant droit uniquement */}
      <mesh position={[lm + EP/4, 0.3, Z_FACADE_EXT]}>
        <boxGeometry args={[EP/2 + 0.002, 0.6, EP + 0.002]} />
        <meshStandardMaterial {...M(C_SOUBAS, 0.9)} />
      </mesh>
      {/* PAS de soubassement sur la zone de la porte — la porte touche le sol */}

      {/* ══ TOIT PLAT ════════════════════════════════════════════════════ */}
      <mesh position={[0.15, HG + 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.22, PG + EP*2 + 0.3]} />
        <meshStandardMaterial {...M(C_TOIT_G, 0.75, 0.05)} />
      </mesh>
      <mesh position={[0.15, HG + 0.34, -(PG + EP*2 + 0.3)/2]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.22, 0.12]} />
        <meshStandardMaterial {...M(C_ACROT, 0.65)} />
      </mesh>
      <mesh position={[0.15, HG + 0.34, (PG + EP*2 + 0.3)/2]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.22, 0.12]} />
        <meshStandardMaterial {...M(C_ACROT, 0.65)} />
      </mesh>
      <mesh position={[(LG + EP + 0.3)/2 + 0.15, HG + 0.34, 0]} castShadow>
        <boxGeometry args={[0.12, 0.22, PG + EP*2 + 0.3]} />
        <meshStandardMaterial {...M(C_ACROT, 0.65)} />
      </mesh>
      <mesh position={[0.15, HG + 0.01, -(PG + EP*2 + 0.3)/2 + 0.01]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.06, 0.09]} />
        <meshStandardMaterial {...M('#686868', 0.4, 0.6)} />
      </mesh>
      <mesh position={[(LG + EP + 0.3)/2 + 0.105, HG/2, -(PG + EP*2 + 0.3)/2 + 0.045]} castShadow>
        <boxGeometry args={[0.06, HG, 0.06]} />
        <meshStandardMaterial {...M('#606060', 0.4, 0.6)} />
      </mesh>

      {/* ══ CADRE ALU (fixe, reste en place) ════════════════════════════ */}
      {/* Montant gauche */}
      <mesh position={[-lm + 0.05, H_PORTE/2, Z_FACADE_EXT + 0.03]} castShadow>
        <boxGeometry args={[0.08, H_PORTE, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>
      {/* Montant droit */}
      <mesh position={[lm - 0.05, H_PORTE/2, Z_FACADE_EXT + 0.03]} castShadow>
        <boxGeometry args={[0.08, H_PORTE, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>
      {/* Traverse haute */}
      <mesh position={[0, H_PORTE - 0.04, Z_FACADE_EXT + 0.03]} castShadow>
        <boxGeometry args={[LG - 0.1, 0.08, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>
      {/* Seuil bas */}
      <mesh position={[0, 0.04, Z_FACADE_EXT + 0.03]} castShadow>
        <boxGeometry args={[LG - 0.1, 0.08, 0.07]} />
        <meshStandardMaterial {...M(C_CADRE, 0.35, 0.75)} />
      </mesh>

      {/* ══ RAILS & MOTEUR ═══════════════════════════════════════════════ */}
      <mesh position={[-lm + 0.09, HG/2 - 0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, PG - 0.3]} />
        <meshStandardMaterial {...M(C_RAIL, 0.3, 0.85)} />
      </mesh>
      <mesh position={[lm - 0.09, HG/2 - 0.1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, PG - 0.3]} />
        <meshStandardMaterial {...M(C_RAIL, 0.3, 0.85)} />
      </mesh>
      <mesh position={[0, HG - 0.13, 0]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.45]} />
        <meshStandardMaterial {...M('#1a1a1a', 0.5, 0.6)} />
      </mesh>
      <mesh position={[0, HG - 0.13, -pm/2]} castShadow>
        <boxGeometry args={[0.055, 0.055, pm]} />
        <meshStandardMaterial {...M(C_RAIL, 0.3, 0.85)} />
      </mesh>

      {/* ══ PORTE BASCULANTE ═════════════════════════════════════════════
          Pivot sur la face EXTÉRIEURE du mur, en haut.
          Z_FACADE_EXT - 0.03 = légèrement en avant du mur pour que
          la porte bascule clairement vers l'extérieur (Z-).
          rotation.x = +PI/2 → lames (Y-) vers Z- (extérieur) ✅
      ══════════════════════════════════════════════════════════════════ */}
      <group
        ref={porteRef}
        position={[0, H_PORTE, Z_FACADE_EXT - 0.03]}
      >
        {Array.from({ length: NB }, (_, i) => {
          const yLocal = -(i * HL + HL / 2);
          return (
            <mesh
              key={i}
              position={[0, yLocal, 0]}
              castShadow
              receiveShadow
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
              <boxGeometry args={[LG - 0.18, HL - 0.018, 0.058]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? C_LAME_A : C_LAME_B}
                roughness={0.38}
                metalness={0.55}
                wireframe={filDefer}
              />
            </mesh>
          );
        })}

        {/* Rainures décoratives */}
        {!filDefer && Array.from({ length: NB }, (_, i) => (
          <mesh key={`r${i}`} position={[0, -(i * HL + HL / 2), 0.032]}>
            <boxGeometry args={[LG - 0.22, 0.01, 0.008]} />
            <meshStandardMaterial color="#1a2030" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}

        {/* Poignée sur la lame du bas */}
        <mesh position={[0, -(H_PORTE - HL / 2), 0.04]} castShadow>
          <boxGeometry args={[0.32, 0.05, 0.032]} />
          <meshStandardMaterial {...M(C_POIGN, 0.15, 0.95)} />
        </mesh>
        <mesh position={[-0.13, -(H_PORTE - HL / 2), 0.025]} castShadow>
          <boxGeometry args={[0.022, 0.05, 0.022]} />
          <meshStandardMaterial {...M(C_POIGN, 0.15, 0.95)} />
        </mesh>
        <mesh position={[0.13, -(H_PORTE - HL / 2), 0.025]} castShadow>
          <boxGeometry args={[0.022, 0.05, 0.022]} />
          <meshStandardMaterial {...M(C_POIGN, 0.15, 0.95)} />
        </mesh>
      </group>

      {/* ══ BOUTON MURAL ═════════════════════════════════════════════════ */}
      <mesh position={[lm + EP/2 + 0.08, 1.15, Z_FACADE_EXT - 0.35]} castShadow>
        <boxGeometry args={[0.008, 0.24, 0.14]} />
        <meshStandardMaterial {...M('#111111', 0.6, 0.4)} />
      </mesh>
      <mesh position={[lm + EP/2 + 0.115, 1.15, Z_FACADE_EXT - 0.35]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.1]} />
        <meshStandardMaterial {...M(C_BOITIER, 0.5, 0.5)} />
      </mesh>
      <mesh
        position={[lm + EP/2 + 0.145, 1.15, Z_FACADE_EXT - 0.35]}
        rotation={[0, 0, Math.PI/2]}
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
      {!filDefer && (
        <mesh
          position={[lm + EP/2 + 0.148, 1.15, Z_FACADE_EXT - 0.35]}
          rotation={[0, 0, Math.PI/2]}
        >
          <cylinderGeometry args={[0.052, 0.052, 0.004, 16]} />
          <meshStandardMaterial
            color={ouvert ? '#4ade80' : '#f87171'}
            transparent opacity={0.3}
            emissive={ouvert ? '#22c55e' : '#ef4444'}
            emissiveIntensity={0.35}
          />
        </mesh>
      )}

      {/* ══ DÉTAILS ══════════════════════════════════════════════════════ */}
      <mesh position={[0.15, HG + 0.002, -(PG + EP*2 + 0.3)/2 + 0.06]} castShadow>
        <boxGeometry args={[LG + EP + 0.3, 0.035, 0.035]} />
        <meshStandardMaterial {...M('#888888', 0.3, 0.7)} />
      </mesh>
      {!filDefer && (
        <mesh position={[lm - 0.28, 1.85, Z_FACADE_EXT - 0.012]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.018]} />
          <meshStandardMaterial {...M('#1a1a1a', 0.3, 0.8)} />
        </mesh>
      )}

    </group>
  );
}
