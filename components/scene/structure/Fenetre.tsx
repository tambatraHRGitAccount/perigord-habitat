'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EPAISSEUR_MUR } from '@/lib/three/constantes';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import type { IdPiece } from '@/types/maison';

const BLANC       = '#ffffff';
const BLANC_HOVER = '#e8e8e8';
const BLANC_LAME  = '#f0f0f0';
const BLANC_CADRE = '#f8f8f8';
const N_LAMES     = 14;
const Z_EXT       = -(EPAISSEUR_MUR + 0.02); // face extérieure du mur = -0.27

interface Props {
  position: [number, number, number];
  rotation?: [number, number, number];
  largeur?: number;
  hauteur?: number;
  idPiece?: IdPiece | 'exterieur';
  idElement?: string;
}

export function Fenetre({ position, rotation = [0, 0, 0], largeur = 1.2, hauteur = 1.0, idPiece = 'exterieur', idElement = 'fenetre' }: Props) {
  const c       = 0.07;   // épaisseur cadre
  const coffreH = 0.14;   // hauteur coffre
  const coffreD = 0.11;   // profondeur coffre (dépasse du mur)

  const [ouvert,  setOuvert]  = useState(false);  // volet fermé par défaut (visible)
  const [survole, setSurvole] = useState(false);
  const [storeOuvert, setStoreOuvert] = useState(true); // store ouvert par défaut (invisible)

  // Élément sélectionnable pour la fenêtre
  const fenetre = useElementSelectionnable({ 
    idPiece, 
    idElement, 
    libelle: 'Fenêtres (double vitrage, PVC/bois)', 
    defaut: { couleur: '#ffffff', rugosite: 0.3, metalique: 0 } 
  });

  // Élément sélectionnable pour le volet
  const volet = useElementSelectionnable({ 
    idPiece, 
    idElement: `${idElement}_volet`, 
    libelle: 'Volets (intérieurs ou extérieurs)', 
    defaut: { couleur: '#ffffff', rugosite: 0.45, metalique: 0 } 
  });

  // Élément sélectionnable pour le store
  const store = useElementSelectionnable({ 
    idPiece, 
    idElement: `${idElement}_store`, 
    libelle: 'Store (intérieur / banne)', 
    defaut: { couleur: '#f5f5dc', rugosite: 0.7, metalique: 0 } 
  });

  const hRef       = useRef(hauteur);                                        // hauteur courante du tablier (hauteur = fermé)
  const tablierRef = useRef<THREE.Mesh>(null);
  const lamesRef   = useRef<(THREE.Mesh | null)[]>(Array(N_LAMES).fill(null));
  const storeRef   = useRef<THREE.Mesh>(null);
  const hStoreRef  = useRef(0);  // hauteur courante du store (0 = ouvert/invisible)

  useFrame(() => {
    const cible = ouvert ? 0 : hauteur;
    hRef.current = THREE.MathUtils.lerp(hRef.current, cible, 0.08);
    const h = hRef.current;

    // Le tablier descend depuis le haut : top fixé à hauteur/2, bottom à hauteur/2 - h
    if (tablierRef.current) {
      tablierRef.current.scale.y     = Math.max(h / hauteur, 0.0001);
      tablierRef.current.position.y  = hauteur / 2 - h / 2;
    }

    // Les lames se répartissent sur la hauteur courante du tablier
    lamesRef.current.forEach((lame, i) => {
      if (lame) lame.position.y = hauteur / 2 - (i + 1) * h / (N_LAMES + 1);
    });

    // Animation du store
    const cibleStore = storeOuvert ? 0 : hauteur;
    hStoreRef.current = THREE.MathUtils.lerp(hStoreRef.current, cibleStore, 0.08);
    const hStore = hStoreRef.current;

    if (storeRef.current) {
      storeRef.current.scale.y = Math.max(hStore / hauteur, 0.0001);
      storeRef.current.position.y = hauteur / 2 - hStore / 2;
    }
  });

  const couleur = survole ? BLANC_HOVER : (volet.estSelectionne ? '#00e5ff' : BLANC);
  const couleurCadre = fenetre.estSelectionne ? '#00e5ff' : BLANC_CADRE;
  const couleurCoffre = volet.estSelectionne ? '#00e5ff' : '#d6d6d6';
  const couleurStore = store.estSelectionne ? '#00e5ff' : store.materiau.couleur;
  
  // Gestion des clics : volet ouvre/ferme, mais aussi sélectionne
  const onClickVolet = (e: { stopPropagation: () => void }) => { 
    e.stopPropagation(); 
    volet.propsInteraction.onClick(e);
    setOuvert(v => !v); 
  };
  const onOverVolet = (e: { stopPropagation: () => void }) => { 
    e.stopPropagation(); 
    volet.propsInteraction.onPointerOver(e);
    setSurvole(true);  
    document.body.style.cursor = 'pointer'; 
  };
  const onOutVolet = () => { 
    volet.propsInteraction.onPointerOut();
    setSurvole(false); 
    document.body.style.cursor = 'auto'; 
  };

  // Gestion du store
  const onClickStore = (e: { stopPropagation: () => void }) => { 
    e.stopPropagation(); 
    store.propsInteraction.onClick(e);
    setStoreOuvert(v => !v); 
  };
  const onOverStore = (e: { stopPropagation: () => void }) => { 
    e.stopPropagation(); 
    store.propsInteraction.onPointerOver(e);
  };
  const onOutStore = () => { 
    store.propsInteraction.onPointerOut();
  };

  return (
    <group position={position} rotation={rotation}>

      {/* ── Vitrage (verre bleuté semi-transparent) ── */}
      <mesh {...fenetre.propsInteraction}>
        <boxGeometry args={[largeur - c * 2, hauteur - c * 2, 0.04]} />
        <meshPhysicalMaterial
          color="#b8d8ea" roughness={0.05} metalness={0}
          transmission={0.85} transparent opacity={0.35}
          emissive={fenetre.emissif}
          emissiveIntensity={fenetre.intensiteEmissif}
        />
      </mesh>

      {/* ── Cadre PVC blanc ── */}
      {/* Haut */}
      <mesh {...fenetre.propsInteraction} position={[0, hauteur / 2 - c / 2, 0]}>
        <boxGeometry args={[largeur, c, 0.08]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.3} emissive={fenetre.emissif} emissiveIntensity={fenetre.intensiteEmissif} />
      </mesh>
      {/* Bas */}
      <mesh {...fenetre.propsInteraction} position={[0, -(hauteur / 2 - c / 2), 0]}>
        <boxGeometry args={[largeur, c, 0.08]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.3} emissive={fenetre.emissif} emissiveIntensity={fenetre.intensiteEmissif} />
      </mesh>
      {/* Gauche */}
      <mesh {...fenetre.propsInteraction} position={[-(largeur / 2 - c / 2), 0, 0]}>
        <boxGeometry args={[c, hauteur, 0.08]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.3} emissive={fenetre.emissif} emissiveIntensity={fenetre.intensiteEmissif} />
      </mesh>
      {/* Droite */}
      <mesh {...fenetre.propsInteraction} position={[largeur / 2 - c / 2, 0, 0]}>
        <boxGeometry args={[c, hauteur, 0.08]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.3} emissive={fenetre.emissif} emissiveIntensity={fenetre.intensiteEmissif} />
      </mesh>
      {/* Montant central */}
      <mesh {...fenetre.propsInteraction} position={[0, 0, 0]}>
        <boxGeometry args={[c, hauteur - c * 2, 0.08]} />
        <meshStandardMaterial color={couleurCadre} roughness={0.3} emissive={fenetre.emissif} emissiveIntensity={fenetre.intensiteEmissif} />
      </mesh>

      {/* ── Appui en pierre ── */}
      <mesh position={[0, -(hauteur / 2) - 0.04, 0.07]}>
        <boxGeometry args={[largeur + 0.12, 0.07, 0.22]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.65} />
      </mesh>

      {/* ── STORE INTÉRIEUR (côté intérieur de la fenêtre) ── */}
      {/* Cassette du store (en haut, côté intérieur) */}
      <mesh
        position={[0, hauteur / 2 + 0.04, 0.08]}
        onClick={onClickStore} onPointerOver={onOverStore} onPointerOut={onOutStore}
        castShadow
      >
        <boxGeometry args={[largeur + 0.04, 0.08, 0.08]} />
        <meshStandardMaterial 
          color={store.estSelectionne ? '#00e5ff' : '#e8e8e8'} 
          roughness={0.4}
          emissive={store.emissif}
          emissiveIntensity={store.intensiteEmissif}
        />
      </mesh>

      {/* Toile du store (descend depuis le haut, côté intérieur) */}
      <mesh
        ref={storeRef}
        position={[0, 0, 0.06]}
        onClick={onClickStore} onPointerOver={onOverStore} onPointerOut={onOutStore}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[largeur - c * 2, hauteur, 0.005]} />
        <meshStandardMaterial 
          color={couleurStore} 
          roughness={store.materiau.rugosite}
          metalness={store.materiau.metalique}
          emissive={store.emissif}
          emissiveIntensity={store.intensiteEmissif}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Barre de lestage du store (en bas de la toile) */}
      <mesh
        position={[0, hauteur / 2 - hStoreRef.current, 0.06]}
        onClick={onClickStore} onPointerOver={onOverStore} onPointerOut={onOutStore}
      >
        <boxGeometry args={[largeur - c * 2, 0.03, 0.02]} />
        <meshStandardMaterial 
          color={store.estSelectionne ? '#00e5ff' : '#c0c0c0'} 
          roughness={0.3}
          emissive={store.emissif}
          emissiveIntensity={store.intensiteEmissif}
        />
      </mesh>

      {/* ── Coffre du volet roulant (au-dessus, côté extérieur) ── */}
      <mesh
        position={[0, hauteur / 2 + coffreH / 2 + 0.008, Z_EXT - coffreD / 2 + 0.025]}
        onClick={onClickVolet} onPointerOver={onOverVolet} onPointerOut={onOutVolet}
        castShadow
      >
        <boxGeometry args={[largeur + 0.06, coffreH, coffreD]} />
        <meshPhysicalMaterial
          color={couleurCoffre} roughness={0.4}
          clearcoat={0.4} clearcoatRoughness={0.2}
          emissive={volet.emissif}
          emissiveIntensity={volet.intensiteEmissif}
        />
      </mesh>

      {/* ── Glissières latérales ── */}
      {([-largeur / 2 - 0.01, largeur / 2 + 0.01] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0, Z_EXT + 0.005]} onClick={onClickVolet} onPointerOver={onOverVolet} onPointerOut={onOutVolet}>
          <boxGeometry args={[0.025, hauteur + 0.04, 0.06]} />
          <meshStandardMaterial 
            color={volet.estSelectionne ? '#00e5ff' : '#d0d0d0'} 
            roughness={0.5}
            emissive={volet.emissif}
            emissiveIntensity={volet.intensiteEmissif}
          />
        </mesh>
      ))}

      {/* ── Tablier (panneau principal animé) ── */}
      <mesh
        ref={tablierRef}
        position={[0, 0, Z_EXT]}
        onClick={onClickVolet} onPointerOver={onOverVolet} onPointerOut={onOutVolet}
        castShadow
      >
        <boxGeometry args={[largeur, hauteur, 0.045]} />
        <meshPhysicalMaterial
          color={couleur} roughness={0.45}
          clearcoat={0.2} clearcoatRoughness={0.35}
          emissive={volet.emissif}
          emissiveIntensity={volet.intensiteEmissif}
        />
      </mesh>

      {/* ── Lames horizontales (profil en relief) ── */}
      {Array.from({ length: N_LAMES }).map((_, i) => (
        <mesh
          key={i}
          ref={el => { lamesRef.current[i] = el; }}
          position={[0, hauteur / 2 - (i + 1) * hauteur / (N_LAMES + 1), Z_EXT + 0.022]}
          onClick={onClickVolet} onPointerOver={onOverVolet} onPointerOut={onOutVolet}
        >
          <boxGeometry args={[largeur - 0.005, 0.009, 0.018]} />
          <meshPhysicalMaterial 
            color={volet.estSelectionne ? '#00e5ff' : BLANC_LAME} 
            roughness={0.55}
            emissive={volet.emissif}
            emissiveIntensity={volet.intensiteEmissif}
          />
        </mesh>
      ))}

    </group>
  );
}
