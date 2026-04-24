'use client';
import React from 'react';
import { Mur } from './Mur';
import { Fenetre } from './Fenetre';
import { Porte } from './Porte';
import { Toit } from './Toit';
import { LARGEUR_MAISON, PROFONDEUR_MAISON } from '@/lib/three/constantes';

interface Props { 
  filDefer?: boolean; 
  masquerToit?: boolean;
  pieceVisible?: 'exterieur' | 'interieur' | 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir';
}

const EXT = '#9ca3af', INT = '#6b7280';
const lm = LARGEUR_MAISON / 2, pm = PROFONDEUR_MAISON / 2;

export function StructureMaison({ filDefer = false, masquerToit = false, pieceVisible = 'exterieur' }: Props) {
  // Déterminer quels murs afficher selon la pièce visible
  const afficherTout = pieceVisible === 'exterieur' || pieceVisible === 'interieur';
  const afficherSejour = afficherTout || pieceVisible === 'sejour';
  const afficherCuisine = afficherTout || pieceVisible === 'cuisine';
  const afficherChambre = afficherTout || pieceVisible === 'chambre';
  const afficherSalleDeBain = afficherTout || pieceVisible === 'salleDeBain';
  const afficherCouloir = afficherTout || pieceVisible === 'couloir';

  return (
    <group>
      {/* ═══ MODE TOUT AFFICHER (extérieur/intérieur) ═══ */}
      {afficherTout && (
        <>
          {/* Murs extérieurs complets */}
          <Mur debut={[-lm,-pm]} fin={[-1.5,-pm]} couleur={EXT} filDefer={filDefer} />
          <Mur debut={[-0.6,-pm]} fin={[lm,-pm]}  couleur={EXT} filDefer={filDefer} />
          <Mur debut={[-lm,pm]}  fin={[lm,pm]}    couleur={EXT} filDefer={filDefer} />
          <Mur debut={[-lm,-pm]} fin={[-lm,pm]}   couleur={EXT} filDefer={filDefer} />
          <Mur debut={[lm,-pm]}  fin={[lm,pm]}    couleur={EXT} filDefer={filDefer} />
          
          {/* Toutes les cloisons */}
          <Mur debut={[0.75,-pm]} fin={[0.75,1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,1.5]} fin={[0.75,2.825]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[-lm, 1.5]}  fin={[-3.05, 1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2, 1.5]} fin={[0.75, 1.5]}  couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75, 1.5]}  fin={[1.075, 1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925, 1.5]} fin={[lm, 1.5]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,1.5]}  fin={[2.5,2.8]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}  fin={[2.5,pm]}    couleur={INT} filDefer={filDefer} />
        </>
      )}
      
      {/* ═══ SÉJOUR (x: -6 à 0.75, z: -5 à 1.5) ═══ */}
      {pieceVisible === 'sejour' && (
        <>
          {/* Mur arrière (avec porte d'entrée, fenêtre et radiateur) */}
          <Mur debut={[-lm,-pm]} fin={[-1.5,-pm]} couleur={EXT} filDefer={filDefer} />
          <Mur debut={[-0.6,-pm]} fin={[0.75,-pm]}  couleur={EXT} filDefer={filDefer} />
          
          {/* Mur gauche (seulement partie séjour: z=-5 à z=1.5) */}
          <Mur debut={[-lm,-pm]} fin={[-lm,1.5]}   couleur={EXT} filDefer={filDefer} />
          {/* Cloison droite séjour/cuisine (x=0.75, z=-5 à z=1.5) */}
          <Mur debut={[0.75,-pm]} fin={[0.75,1.5]}  couleur={INT} filDefer={filDefer} />
          {/* Cloison avant séjour/chambre (z=1.5, x=-6 à x=0.75, avec porte) */}
          <Mur debut={[-lm, 1.5]}  fin={[-3.05, 1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2, 1.5]} fin={[0.75, 1.5]}  couleur={INT} filDefer={filDefer} />
        </>
      )}
      
      {/* ═══ CUISINE (x: 0.75 à 6, z: -5 à 1.5) ═══ */}
      {pieceVisible === 'cuisine' && (
        <>
          {/* Mur avant */}
          <Mur debut={[-0.6,-pm]} fin={[lm,-pm]}  couleur={EXT} filDefer={filDefer} />
          
          {/* Mur droit (seulement partie cuisine: z=-5 à z=1.5) */}
          <Mur debut={[lm,-pm]}  fin={[lm,1.5]}    couleur={EXT} filDefer={filDefer} />
          {/* Cloison gauche cuisine/séjour (x=0.75, z=-5 à z=1.5) */}
          <Mur debut={[0.75,-pm]} fin={[0.75,1.5]}  couleur={INT} filDefer={filDefer} />
          {/* Cloison avant cuisine/couloir (z=1.5, x=0.75 à x=6, avec porte) */}
          <Mur debut={[0.75, 1.5]}  fin={[1.075, 1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925, 1.5]} fin={[lm, 1.5]}    couleur={INT} filDefer={filDefer} />
        </>
      )}
      
      {/* ═══ CHAMBRE (x: -6 à 0.75, z: 1.5 à 5) ═══ */}
      {pieceVisible === 'chambre' && (
        <>
          {/* Mur gauche (seulement partie chambre: z=1.5 à z=5) */}
          <Mur debut={[-lm,1.5]} fin={[-lm,pm]}   couleur={EXT} filDefer={filDefer} />
          {/* Mur arrière */}
          <Mur debut={[-lm,pm]}  fin={[0.75,pm]}    couleur={EXT} filDefer={filDefer} />
          
          {/* Cloison arrière chambre/séjour (z=1.5, x=-6 à x=0.75, avec porte) */}
          <Mur debut={[-lm, 1.5]}  fin={[-3.05, 1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[-2.2, 1.5]} fin={[0.75, 1.5]}  couleur={INT} filDefer={filDefer} />
          {/* Cloison droite chambre/couloir (x=0.75, z=1.5 à z=5, avec porte) */}
          <Mur debut={[0.75,1.5]} fin={[0.75,2.825]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}   couleur={INT} filDefer={filDefer} />
        </>
      )}
      
      {/* ═══ COULOIR (x: 0.75 à 2.5, z: 1.5 à 5) ═══ */}
      {pieceVisible === 'couloir' && (
        <>
          {/* Mur arrière */}
          <Mur debut={[0.75,pm]}  fin={[2.5,pm]}    couleur={EXT} filDefer={filDefer} />
          
          {/* Cloison gauche couloir/chambre (x=0.75, z=1.5 à z=5, avec porte) */}
          <Mur debut={[0.75,1.5]} fin={[0.75,2.825]}   couleur={INT} filDefer={filDefer} />
          <Mur debut={[0.75,3.675]} fin={[0.75,pm]}   couleur={INT} filDefer={filDefer} />
          {/* Cloison arrière couloir/cuisine (z=1.5, x=0.75 à x=2.5, avec porte) */}
          <Mur debut={[0.75, 1.5]}  fin={[1.075, 1.5]} couleur={INT} filDefer={filDefer} />
          <Mur debut={[1.925, 1.5]} fin={[2.5, 1.5]}    couleur={INT} filDefer={filDefer} />
          {/* Cloison droite couloir/salle de bain (x=2.5, z=1.5 à z=5, avec porte) */}
          <Mur debut={[2.5,1.5]}  fin={[2.5,2.8]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}  fin={[2.5,pm]}    couleur={INT} filDefer={filDefer} />
        </>
      )}
      
      {/* ═══ SALLE DE BAIN (x: 2.5 à 6, z: 1.5 à 5) ═══ */}
      {pieceVisible === 'salleDeBain' && (
        <>
          {/* Mur droit (seulement partie salle de bain: z=1.5 à z=5) */}
          <Mur debut={[lm,1.5]}  fin={[lm,pm]}    couleur={EXT} filDefer={filDefer} />
          {/* Mur arrière */}
          <Mur debut={[2.5,pm]}  fin={[lm,pm]}    couleur={EXT} filDefer={filDefer} />
          
          {/* Cloison gauche salle de bain/couloir (x=2.5, z=1.5 à z=5, avec porte) */}
          <Mur debut={[2.5,1.5]}  fin={[2.5,2.8]}    couleur={INT} filDefer={filDefer} />
          <Mur debut={[2.5,3.6]}  fin={[2.5,pm]}    couleur={INT} filDefer={filDefer} />
          {/* Cloison avant salle de bain/cuisine (z=1.5, x=2.5 à x=6) */}
          <Mur debut={[2.5, 1.5]} fin={[lm, 1.5]}    couleur={INT} filDefer={filDefer} />
        </>
      )}
      
      {/* ═══ FENÊTRES ═══ */}
      {/* Fenêtres séjour */}
      {(afficherTout || pieceVisible === 'sejour') && (
        <>
          <Fenetre position={[-3.5,1.4,-pm-0.01]} largeur={1.4} hauteur={1.1} />
          <Fenetre position={[-lm-0.01,1.4,-1.5]} rotation={[0,Math.PI/2,0]}  largeur={1.2} hauteur={1.0} />
        </>
      )}
      
      {/* Fenêtres cuisine */}
      {(afficherTout || pieceVisible === 'cuisine') && (
        <>
          <Fenetre position={[3.5,1.4,-pm-0.01]}  largeur={1.4} hauteur={1.1} />
          <Fenetre position={[lm+0.01,1.4,-1.5]}  rotation={[0,-Math.PI/2,0]} largeur={1.2} hauteur={1.0} />
        </>
      )}
      
      {/* Fenêtres chambre */}
      {(afficherTout || pieceVisible === 'chambre') && (
        <>
          <Fenetre position={[-lm-0.01,1.4,3.5]}  rotation={[0,Math.PI/2,0]}  largeur={1.0} hauteur={0.9} />
          <Fenetre position={[-2.5,1.4,pm+0.01]}  rotation={[0,Math.PI,0]}    largeur={1.2} hauteur={1.0} />
        </>
      )}
      
      {/* Fenêtre salle de bain */}
      {(afficherTout || pieceVisible === 'salleDeBain') && (
        <Fenetre position={[lm+0.01,1.4,3.5]}   rotation={[0,-Math.PI/2,0]} largeur={0.8} hauteur={0.8} />
      )}
      
      {/* ═══ PORTES ═══ */}
      {/* Porte d'entrée (séjour) */}
      {(afficherTout || pieceVisible === 'sejour') && (
        <Porte position={[-1.05,0,-pm+0.02]} />
      )}
      
      {/* Porte séjour ↔ chambre */}
      {(afficherTout || pieceVisible === 'sejour' || pieceVisible === 'chambre') && (
        <Porte position={[-2.625, 0, 1.5]} largeur={0.85} hauteur={2.05} />
      )}
      
      {/* Porte cuisine ↔ couloir */}
      {(afficherTout || pieceVisible === 'cuisine' || pieceVisible === 'couloir') && (
        <Porte position={[1.5,0,1.5]}   largeur={0.85} hauteur={2.05} />
      )}
      
      {/* Porte chambre ↔ couloir */}
      {(afficherTout || pieceVisible === 'chambre' || pieceVisible === 'couloir') && (
        <Porte position={[0.75,0,3.25]}  rotation={[0,Math.PI/2,0]} largeur={0.85} hauteur={2.05} />
      )}
      
      {/* Porte couloir ↔ salle de bain */}
      {(afficherTout || pieceVisible === 'couloir' || pieceVisible === 'salleDeBain') && (
        <Porte position={[2.5,0,3.2]}   rotation={[0,Math.PI/2,0]} largeur={0.8} hauteur={2.05} />
      )}
      
      {/* ═══ TOIT ═══ */}
      {!masquerToit && <Toit filDefer={filDefer} />}
    </group>
  );
}
