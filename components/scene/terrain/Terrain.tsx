'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import { SolInterieur } from '../structure/SolInterieur';
import { useScene } from '@/hooks/useSceneStore';

// ─────────────────────────────────────────────────────────────────────────────
//  REPÈRE MONDE
//  Maison   : X ∈ [-6, +6]      Z ∈ [-5, +5]
//  Garage   : X ∈ [6.95, 11.2]  Z ∈ [-5.125, +0.375]
//  Clôture avant  : Z = -12
//  Clôtures côtés : X = ±12
//  Clôture arrière: Z = +10
//  Portail principal : X ∈ [-3.5, +1.5]  (centré sur allée X = -1.05)
//  Portail garage    : X ∈ [7.0, 11.5]   (centré sur garage X = 9.075)
// ─────────────────────────────────────────────────────────────────────────────

const Z_CLOTURE   = -12;
const X_CLOTURE_G = -12;
const X_CLOTURE_D =  12;
const Z_CLOTURE_A =  10;

const PORTAIL_G  = -3.5;
const PORTAIL_D  =  1.5;
const PORTAIL_GG =  7.0;
const PORTAIL_GD = 11.5;

// Haie : hauteur et largeur
const H_HAIE = 1.5;
const L_HAIE = 0.7;
const C_HAIE_C = '#2d5a1e';   // vert foncé centre
const C_HAIE_B = '#3a7a2a';   // vert clair bord

export function Terrain() {
  const allee = useElementSelectionnable({
    idPiece: 'exterieur', idElement: 'allee', libelle: 'Allée',
    defaut: { couleur: '#b8a888', rugosite: 0.85, metalique: 0 },
  });

  type Sel = ReturnType<typeof useElementSelectionnable>;
  const M = (s: Sel) => ({
    color: s.materiau.couleur, roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique, emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  return (
    <group>

      {/* ── Pelouse — même texture gazon que SolInterieur ──────────────── */}
      <SolInterieur exterieur={true} />

      {/* ── Dalle maison ───────────────────────────────────────────────── */}
      <mesh position={[0,-0.06,0]} receiveShadow>
        <boxGeometry args={[13,0.12,10.5]} />
        <meshStandardMaterial color="#c8c0b0" roughness={0.8} />
      </mesh>

      {/* ── Dalle garage ───────────────────────────────────────────────── */}
      <mesh position={[9.075,-0.06,-2.375]} receiveShadow>
        <boxGeometry args={[4.5,0.12,5.75]} />
        <meshStandardMaterial color="#b8b0a0" roughness={0.85} />
      </mesh>

      {/* ── Allée principale ───────────────────────────────────────────── */}
      <mesh {...allee.propsInteraction} rotation={[-Math.PI/2,0,0]} position={[-1.05,0.01,-8.5]} receiveShadow>
        <planeGeometry args={[2.4,7]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

      {/* ── Allée garage ───────────────────────────────────────────────── */}
      <mesh {...allee.propsInteraction} rotation={[-Math.PI/2,0,0]} position={[9.075,0.01,-8.5]} receiveShadow>
        <planeGeometry args={[4.5,7]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

      {/* ── Bande de liaison entre allées ──────────────────────────────── */}
      <mesh {...allee.propsInteraction} rotation={[-Math.PI/2,0,0]} position={[4.0,0.01,Z_CLOTURE+0.5]} receiveShadow>
        <planeGeometry args={[12,1.2]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

      {/* ── Chemin de dalles ───────────────────────────────────────────── */}
      <CheminDalles />

      {/* ── Clôtures ───────────────────────────────────────────────────── */}
      <Cloture />

      {/* ── Haies (remplissent tous les côtés sauf façade avec portails) ── */}
      <Haies />

      {/* ── Arbres réalistes ───────────────────────────────────────────── */}
      <Arbres />

      {/* ── Massifs de fleurs ──────────────────────────────────────────── */}
      <Massifs />

    </group>
  );
}

// ── Chemin de dalles ──────────────────────────────────────────────────────────
function CheminDalles() {
  const positions = [-5.8,-6.6,-7.4,-8.2,-9.0,-9.8,-10.6,-11.4];
  return (
    <group>
      <mesh rotation={[-Math.PI/2,0,0]} position={[-1.05,0.005,-8.6]} receiveShadow>
        <planeGeometry args={[1.0,7.2]} />
        <meshStandardMaterial color="#d4c8a8" roughness={0.95} />
      </mesh>
      {positions.map((z,i) => (
        <mesh key={i}
          rotation={[-Math.PI/2,(i%2===0?0.03:-0.02),0]}
          position={[-1.05+(i%3===0?0.05:i%3===1?-0.04:0),0.02,z]}
          receiveShadow
        >
          <boxGeometry args={[0.52,0.52,0.06]} />
          <meshStandardMaterial color="#c8b898" roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}

// ── Clôture ───────────────────────────────────────────────────────────────────
function Cloture() {
  const C_BOIS   = '#8b6340';
  const C_POTEAU = '#6b4a28';
  const HT = 1.1;

  return (
    <group>
      {/* Avant gauche */}
      <SegCloture x1={X_CLOTURE_G} x2={PORTAIL_G}  z={Z_CLOTURE} axe="X" ht={HT} cb={C_BOIS} cp={C_POTEAU} />
      {/* Avant milieu (entre portails) */}
      <SegCloture x1={PORTAIL_D}   x2={PORTAIL_GG} z={Z_CLOTURE} axe="X" ht={HT} cb={C_BOIS} cp={C_POTEAU} />
      {/* Avant droit */}
      <SegCloture x1={PORTAIL_GD}  x2={X_CLOTURE_D} z={Z_CLOTURE} axe="X" ht={HT} cb={C_BOIS} cp={C_POTEAU} />
      {/* Gauche */}
      <SegCloture z1={Z_CLOTURE} z2={Z_CLOTURE_A} x={X_CLOTURE_G} axe="Z" ht={HT} cb={C_BOIS} cp={C_POTEAU} />
      {/* Droite */}
      <SegCloture z1={Z_CLOTURE} z2={Z_CLOTURE_A} x={X_CLOTURE_D} axe="Z" ht={HT} cb={C_BOIS} cp={C_POTEAU} />
      {/* Arrière */}
      <SegCloture x1={X_CLOTURE_G} x2={X_CLOTURE_D} z={Z_CLOTURE_A} axe="X" ht={HT} cb={C_BOIS} cp={C_POTEAU} />

      {/* Portail principal */}
      <Portail xG={PORTAIL_G} xD={PORTAIL_D} z={Z_CLOTURE} ht={HT} cb={C_BOIS} cp={C_POTEAU} />
      {/* Portail garage */}
      <Portail xG={PORTAIL_GG} xD={PORTAIL_GD} z={Z_CLOTURE} ht={HT} cb={C_BOIS} cp={C_POTEAU} />
    </group>
  );
}

function SegCloture({ x1,x2,z,z1,z2,x,axe,ht,cb,cp }: {
  x1?:number;x2?:number;z?:number;z1?:number;z2?:number;x?:number;
  axe:'X'|'Z';ht:number;cb:string;cp:string;
}) {
  const pas = 2.0;
  if (axe==='X' && x1!==undefined && x2!==undefined && z!==undefined) {
    const len = x2-x1; const cx = (x1+x2)/2;
    const nb = Math.max(2, Math.round(len/pas)+1);
    return (
      <group>
        <mesh position={[cx,ht*0.32,z]} castShadow><boxGeometry args={[len,0.06,0.06]}/><meshStandardMaterial color={cb} roughness={0.85}/></mesh>
        <mesh position={[cx,ht*0.72,z]} castShadow><boxGeometry args={[len,0.06,0.06]}/><meshStandardMaterial color={cb} roughness={0.85}/></mesh>
        {Array.from({length:nb},(_,i)=>(
          <mesh key={i} position={[x1+i*(len/(nb-1)),ht/2,z]} castShadow>
            <boxGeometry args={[0.1,ht,0.1]}/><meshStandardMaterial color={cp} roughness={0.9}/>
          </mesh>
        ))}
      </group>
    );
  }
  if (axe==='Z' && z1!==undefined && z2!==undefined && x!==undefined) {
    const len = z2-z1; const cz = (z1+z2)/2;
    const nb = Math.max(2, Math.round(len/pas)+1);
    return (
      <group>
        <mesh position={[x,ht*0.32,cz]} castShadow><boxGeometry args={[0.06,0.06,len]}/><meshStandardMaterial color={cb} roughness={0.85}/></mesh>
        <mesh position={[x,ht*0.72,cz]} castShadow><boxGeometry args={[0.06,0.06,len]}/><meshStandardMaterial color={cb} roughness={0.85}/></mesh>
        {Array.from({length:nb},(_,i)=>(
          <mesh key={i} position={[x,ht/2,z1+i*(len/(nb-1))]} castShadow>
            <boxGeometry args={[0.1,ht,0.1]}/><meshStandardMaterial color={cp} roughness={0.9}/>
          </mesh>
        ))}
      </group>
    );
  }
  return null;
}

// ── Portail animé (deux battants qui s'ouvrent en rotation) ──────────────────
function Portail({ xG, xD, z, ht, cb, cp }: {
  xG: number; xD: number; z: number; ht: number; cb: string; cp: string;
}) {
  const { setTooltip } = useScene();
  const [ouvert, setOuvert] = useState(false);
  const [enCours, setEnCours] = useState(false);

  // Refs pour les deux battants
  const battantGRef = useRef<THREE.Group>(null);
  const battantDRef = useRef<THREE.Group>(null);

  // Cibles d'angle (rotation Y autour du poteau)
  const cibleG = useRef(0);   // battant gauche : s'ouvre vers Z+
  const cibleD = useRef(0);   // battant droit  : s'ouvre vers Z-

  const w = xD - xG;
  const cx = (xG + xD) / 2;
  const largeurBattant = w / 2 - 0.12;

  const toggle = () => {
    if (enCours) return;
    setEnCours(true);
    const next = !ouvert;
    // Ouverture : battants pivotent de ±85° (presque à plat le long de la clôture)
    cibleG.current = next ?  Math.PI * 0.47 : 0;
    cibleD.current = next ? -Math.PI * 0.47 : 0;
    setOuvert(next);
    setTimeout(() => setEnCours(false), 900);
  };

  useFrame(() => {
    if (battantGRef.current) {
      battantGRef.current.rotation.y = THREE.MathUtils.lerp(
        battantGRef.current.rotation.y, cibleG.current, 0.07
      );
    }
    if (battantDRef.current) {
      battantDRef.current.rotation.y = THREE.MathUtils.lerp(
        battantDRef.current.rotation.y, cibleD.current, 0.07
      );
    }
  });

  const label = ouvert ? '🔒 Fermer le portail' : '🔓 Ouvrir le portail';

  return (
    <group>
      {/* ── Poteaux fixes ─────────────────────────────────────────────── */}
      <mesh position={[xG, (ht + 0.2) / 2, z]} castShadow>
        <boxGeometry args={[0.16, ht + 0.2, 0.16]} />
        <meshStandardMaterial color={cp} roughness={0.85} />
      </mesh>
      <mesh position={[xD, (ht + 0.2) / 2, z]} castShadow>
        <boxGeometry args={[0.16, ht + 0.2, 0.16]} />
        <meshStandardMaterial color={cp} roughness={0.85} />
      </mesh>

      {/* ── Battant gauche (pivote autour du poteau gauche xG) ────────── */}
      {/* Le pivot est à X = xG, le battant s'étend vers X+ */}
      <group ref={battantGRef} position={[xG, 0, z]}>
        {/* Corps du battant */}
        <mesh
          position={[largeurBattant / 2 + 0.08, ht / 2, 0]}
          castShadow
          onClick={e => { e.stopPropagation(); toggle(); }}
          onPointerEnter={e => {
            e.stopPropagation();
            setTooltip(label);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={e => {
            e.stopPropagation();
            setTooltip(null);
            document.body.style.cursor = 'default';
          }}
        >
          <boxGeometry args={[largeurBattant, ht, 0.06]} />
          <meshStandardMaterial color={cb} roughness={0.8} />
        </mesh>
        {/* Barreaux verticaux */}
        {Array.from({ length: 4 }, (_, i) => (
          <mesh key={i} position={[0.18 + i * (largeurBattant / 3.5), ht / 2, 0]} castShadow>
            <boxGeometry args={[0.04, ht - 0.1, 0.04]} />
            <meshStandardMaterial color={cp} roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* ── Battant droit (pivote autour du poteau droit xD) ──────────── */}
      {/* Le pivot est à X = xD, le battant s'étend vers X- */}
      <group ref={battantDRef} position={[xD, 0, z]}>
        {/* Corps du battant */}
        <mesh
          position={[-(largeurBattant / 2 + 0.08), ht / 2, 0]}
          castShadow
          onClick={e => { e.stopPropagation(); toggle(); }}
          onPointerEnter={e => {
            e.stopPropagation();
            setTooltip(label);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={e => {
            e.stopPropagation();
            setTooltip(null);
            document.body.style.cursor = 'default';
          }}
        >
          <boxGeometry args={[largeurBattant, ht, 0.06]} />
          <meshStandardMaterial color={cb} roughness={0.8} />
        </mesh>
        {/* Barreaux verticaux */}
        {Array.from({ length: 4 }, (_, i) => (
          <mesh key={i} position={[-(0.18 + i * (largeurBattant / 3.5)), ht / 2, 0]} castShadow>
            <boxGeometry args={[0.04, ht - 0.1, 0.04]} />
            <meshStandardMaterial color={cp} roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* ── Indicateur lumineux (vert = ouvert, rouge = fermé) ────────── */}
      <mesh position={[cx, ht + 0.18, z]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color={ouvert ? '#22c55e' : '#ef4444'}
          emissive={ouvert ? '#16a34a' : '#b91c1c'}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

// ── Haies — remplissent tous les côtés sauf la façade avant (avec portails) ───
// La façade avant a des portails → haies uniquement entre les portails et les coins
// Les 3 autres côtés sont entièrement couverts de haies
function Haies() {
  return (
    <group>

      {/* ── CÔTÉ GAUCHE : haie pleine de Z=-12 à Z=+10 ─────────────────── */}
      <HaiePleine
        position={[X_CLOTURE_G + L_HAIE/2 + 0.05, H_HAIE/2, (Z_CLOTURE+Z_CLOTURE_A)/2]}
        args={[L_HAIE, H_HAIE, Z_CLOTURE_A - Z_CLOTURE]}
      />

      {/* ── CÔTÉ DROIT : haie pleine de Z=-12 à Z=+10 ──────────────────── */}
      <HaiePleine
        position={[X_CLOTURE_D - L_HAIE/2 - 0.05, H_HAIE/2, (Z_CLOTURE+Z_CLOTURE_A)/2]}
        args={[L_HAIE, H_HAIE, Z_CLOTURE_A - Z_CLOTURE]}
      />

      {/* ── CÔTÉ ARRIÈRE : haie pleine de X=-12 à X=+12 ────────────────── */}
      <HaiePleine
        position={[(X_CLOTURE_G+X_CLOTURE_D)/2, H_HAIE/2, Z_CLOTURE_A - L_HAIE/2 - 0.05]}
        args={[X_CLOTURE_D - X_CLOTURE_G, H_HAIE, L_HAIE]}
      />

      {/* ── FAÇADE AVANT — segments entre coins et portails ─────────────── */}
      {/* Segment gauche : de X=-12 à X=PORTAIL_G */}
      <HaiePleine
        position={[(X_CLOTURE_G+PORTAIL_G)/2, H_HAIE/2, Z_CLOTURE + L_HAIE/2 + 0.05]}
        args={[PORTAIL_G - X_CLOTURE_G, H_HAIE, L_HAIE]}
      />
      {/* Segment milieu : de PORTAIL_D à PORTAIL_GG */}
      <HaiePleine
        position={[(PORTAIL_D+PORTAIL_GG)/2, H_HAIE/2, Z_CLOTURE + L_HAIE/2 + 0.05]}
        args={[PORTAIL_GG - PORTAIL_D, H_HAIE, L_HAIE]}
      />
      {/* Segment droit : de PORTAIL_GD à X=+12 */}
      <HaiePleine
        position={[(PORTAIL_GD+X_CLOTURE_D)/2, H_HAIE/2, Z_CLOTURE + L_HAIE/2 + 0.05]}
        args={[X_CLOTURE_D - PORTAIL_GD, H_HAIE, L_HAIE]}
      />

    </group>
  );
}

// Haie avec volume et texture réaliste (deux couches de vert)
function HaiePleine({ position, args }: {
  position: [number,number,number];
  args: [number,number,number];
}) {
  const [lx, ly, lz] = args;
  return (
    <group position={position}>
      {/* Corps principal */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[lx, ly, lz]} />
        <meshStandardMaterial color={C_HAIE_C} roughness={0.95} />
      </mesh>
      {/* Couche extérieure (légèrement plus claire, dépasse un peu) */}
      <mesh castShadow>
        <boxGeometry args={[lx + 0.05, ly + 0.08, lz + 0.05]} />
        <meshStandardMaterial color={C_HAIE_B} roughness={0.98} transparent opacity={0.6} />
      </mesh>
      {/* Irrégularités du dessus (petits blocs) */}
      {Array.from({length: Math.max(2, Math.round(Math.max(lx,lz)/2))}, (_,i) => {
        const t = i / Math.max(1, Math.round(Math.max(lx,lz)/2) - 1);
        const ox = lx > lz ? (t - 0.5) * lx * 0.85 : (t % 2 === 0 ? 0.15 : -0.12) * lx;
        const oz = lz > lx ? (t - 0.5) * lz * 0.85 : (t % 2 === 0 ? -0.1 : 0.13) * lz;
        return (
          <mesh key={i} position={[ox, ly/2 + 0.1, oz]} castShadow>
            <boxGeometry args={[0.3, 0.2, 0.3]} />
            <meshStandardMaterial color={C_HAIE_C} roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Arbres réalistes ──────────────────────────────────────────────────────────
function Arbres() {
  const arbres = [
    // Jardin gauche (entre clôture gauche et maison)
    { pos: [-9.5, 0,  1.5] as [number,number,number], type: 'feuillu',  h: 4.5, r: 2.4, c1: '#2d6a2f', c2: '#3d8a3f', c3: '#1e4a20' },
    { pos: [-9.5, 0, -2.5] as [number,number,number], type: 'feuillu',  h: 3.8, r: 2.0, c1: '#3a7a3c', c2: '#4a9a4e', c3: '#2a5a2c' },
    { pos: [-8.0, 0,  6.5] as [number,number,number], type: 'feuillu',  h: 5.0, r: 2.8, c1: '#256025', c2: '#358035', c3: '#154015' },
    // Jardin arrière
    { pos: [ 3.0, 0,  7.5] as [number,number,number], type: 'feuillu',  h: 5.5, r: 3.0, c1: '#2d6a2f', c2: '#3d8a3f', c3: '#1e4a20' },
    { pos: [-3.5, 0,  7.5] as [number,number,number], type: 'feuillu',  h: 4.2, r: 2.2, c1: '#3a7a3c', c2: '#4a9a4e', c3: '#2a5a2c' },
    // Jardin droit (derrière le garage)
    { pos: [ 9.5, 0,  4.0] as [number,number,number], type: 'conifere', h: 5.0, r: 1.2, c1: '#1a4a1a', c2: '#2a6a2a', c3: '#0e300e' },
  ];

  return (
    <group>
      {arbres.map((a, i) =>
        a.type === 'conifere'
          ? <Conifere key={i} position={a.pos} hauteur={a.h} rayon={a.r} c1={a.c1} c2={a.c2} c3={a.c3} />
          : <Feuillu  key={i} position={a.pos} hauteur={a.h} rayon={a.r} c1={a.c1} c2={a.c2} c3={a.c3} />
      )}
    </group>
  );
}

// Arbre feuillu réaliste (tronc + branches + 3 couches de feuillage)
function Feuillu({ position, hauteur, rayon, c1, c2, c3 }: {
  position: [number,number,number];
  hauteur: number; rayon: number;
  c1: string; c2: string; c3: string;
}) {
  const hTronc = hauteur * 0.38;
  const rTronc = 0.18 + rayon * 0.04;

  return (
    <group position={position}>
      {/* Tronc avec légère conicité */}
      <mesh position={[0, hTronc/2, 0]} castShadow>
        <cylinderGeometry args={[rTronc*0.7, rTronc, hTronc, 8]} />
        <meshStandardMaterial color="#5a3a1a" roughness={0.95} />
      </mesh>

      {/* Grosses branches (4 directions) */}
      {[0, Math.PI/2, Math.PI, Math.PI*3/2].map((angle, i) => (
        <group key={i} position={[0, hTronc*0.85, 0]} rotation={[0, angle, 0]}>
          <mesh position={[rayon*0.25, rayon*0.18, 0]} rotation={[0, 0, -Math.PI/5]} castShadow>
            <cylinderGeometry args={[rTronc*0.25, rTronc*0.4, rayon*0.6, 6]} />
            <meshStandardMaterial color="#4a3010" roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Feuillage couche basse (large, aplatie) */}
      <mesh position={[0, hTronc + rayon*0.35, 0]} castShadow>
        <sphereGeometry args={[rayon, 9, 7]} />
        <meshStandardMaterial color={c3} roughness={0.95} />
      </mesh>

      {/* Feuillage couche principale */}
      <mesh position={[0, hTronc + rayon*0.65, 0]} castShadow>
        <sphereGeometry args={[rayon*0.88, 9, 8]} />
        <meshStandardMaterial color={c1} roughness={0.95} />
      </mesh>

      {/* Feuillage couche haute (plus petite, plus claire) */}
      <mesh position={[0, hTronc + rayon*1.05, 0]} castShadow>
        <sphereGeometry args={[rayon*0.55, 8, 7]} />
        <meshStandardMaterial color={c2} roughness={0.95} />
      </mesh>

      {/* Volumes latéraux (asymétrie naturelle) */}
      <mesh position={[rayon*0.4, hTronc + rayon*0.5, rayon*0.2]} castShadow>
        <sphereGeometry args={[rayon*0.55, 7, 6]} />
        <meshStandardMaterial color={c1} roughness={0.95} />
      </mesh>
      <mesh position={[-rayon*0.35, hTronc + rayon*0.45, -rayon*0.25]} castShadow>
        <sphereGeometry args={[rayon*0.5, 7, 6]} />
        <meshStandardMaterial color={c3} roughness={0.95} />
      </mesh>

      {/* Ombre portée au sol */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]} receiveShadow>
        <circleGeometry args={[rayon*0.7, 12]} />
        <meshStandardMaterial color="#2a4a1a" roughness={1} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Arbre conifère (sapin) réaliste
function Conifere({ position, hauteur, rayon, c1, c2, c3 }: {
  position: [number,number,number];
  hauteur: number; rayon: number;
  c1: string; c2: string; c3: string;
}) {
  const hTronc = hauteur * 0.2;
  const niveaux = 5;

  return (
    <group position={position}>
      {/* Tronc */}
      <mesh position={[0, hTronc/2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.18, hTronc, 7]} />
        <meshStandardMaterial color="#4a2e10" roughness={0.95} />
      </mesh>

      {/* Niveaux de branches (cônes empilés) */}
      {Array.from({length: niveaux}, (_, i) => {
        const t = i / (niveaux - 1);
        const y = hTronc + (hauteur - hTronc) * (i / niveaux) * 0.85;
        const r = rayon * (1 - t * 0.65);
        const couleur = i % 2 === 0 ? c1 : c2;
        return (
          <mesh key={i} position={[0, y + (hauteur-hTronc)*0.12, 0]} castShadow>
            <coneGeometry args={[r, (hauteur-hTronc)*0.35, 8]} />
            <meshStandardMaterial color={couleur} roughness={0.95} />
          </mesh>
        );
      })}

      {/* Pointe */}
      <mesh position={[0, hauteur*0.92, 0]} castShadow>
        <coneGeometry args={[rayon*0.15, hauteur*0.18, 6]} />
        <meshStandardMaterial color={c3} roughness={0.95} />
      </mesh>
    </group>
  );
}

// ── Massifs de fleurs ─────────────────────────────────────────────────────────
function Massifs() {
  return (
    <group>
      {/* Massif gauche */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[-4.2,0.02,-5.8]} receiveShadow>
        <planeGeometry args={[3.2,0.7]} />
        <meshStandardMaterial color="#4a7c35" roughness={0.9} />
      </mesh>
      {[
        {x:-5.6,z:-5.80,c:'#e74c3c'},{x:-4.8,z:-5.75,c:'#f39c12'},
        {x:-4.0,z:-5.82,c:'#e74c3c'},{x:-3.2,z:-5.78,c:'#9b59b6'},
        {x:-2.6,z:-5.80,c:'#f39c12'},
      ].map((f,i)=>(
        <mesh key={i} position={[f.x,0.22,f.z]} castShadow>
          <sphereGeometry args={[0.16,6,6]}/>
          <meshStandardMaterial color={f.c} roughness={0.8}/>
        </mesh>
      ))}

      {/* Massif droit */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[1.5,0.02,-5.8]} receiveShadow>
        <planeGeometry args={[2.0,0.7]} />
        <meshStandardMaterial color="#4a7c35" roughness={0.9} />
      </mesh>
      {[
        {x:0.6,z:-5.80,c:'#3498db'},{x:1.3,z:-5.75,c:'#e74c3c'},
        {x:2.0,z:-5.82,c:'#f39c12'},{x:2.5,z:-5.78,c:'#3498db'},
      ].map((f,i)=>(
        <mesh key={i} position={[f.x,0.22,f.z]} castShadow>
          <sphereGeometry args={[0.14,6,6]}/>
          <meshStandardMaterial color={f.c} roughness={0.8}/>
        </mesh>
      ))}
    </group>
  );
}
