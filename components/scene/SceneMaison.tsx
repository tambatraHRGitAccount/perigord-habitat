'use client';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { StructureMaison } from './structure/StructureMaison';
import { Garage } from './structure/Garage';
import { SolInterieur } from './structure/SolInterieur';
import { Sejour } from './pieces/Sejour';
import { Cuisine } from './pieces/Cuisine';
import { Chambre } from './pieces/Chambre';
import { SalleDeBain } from './pieces/SalleDeBain';
import { Couloir } from './pieces/Couloir';
import { Terrain } from './terrain/Terrain';
import { EclairagePrincipal } from './eclairage/EclairagePrincipal';
import { useScene } from '@/hooks/useSceneStore';
import { PREREGLAGES_CAMERA, getClePrereglage } from '@/hooks/useCamera';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useDroneControls } from '@/hooks/useDroneControls';
import { PostEffets } from './PostEffets';

export function SceneMaison() {
  const { modeCamera, pieceActive, modeJourNuit, lumieres, afficherFilDefer, sensibiliteCamera, setPieceActive } = useScene();
  const { camera, gl, controls } = useThree();

  // Activer les contrôles drone uniquement en mode visite ET dans une pièce spécifique
  const estModeVisite = modeCamera === 'visite';
  const pieceSpecifique = pieceActive !== 'exterieur' && pieceActive !== 'interieur';
  const droneActif = estModeVisite && pieceSpecifique;
  
  useDroneControls({ 
    enabled: droneActif, 
    speed: 0.08,
    rotationSpeed: 0.015 * sensibiliteCamera,
    pieceActive,
    onChangePiece: setPieceActive
  });

  // Exposition jour/nuit
  useEffect(() => {
    gl.toneMappingExposure = modeJourNuit === 'jour' ? 1.0 : 0.4;
  }, [gl, modeJourNuit]);

  // Transition caméra fluide avec rotation - synchronisée avec OrbitControls
  useEffect(() => {
    const cle = getClePrereglage(pieceActive, modeCamera);
    const prereglage = PREREGLAGES_CAMERA[cle];
    
    if (!prereglage) {
      console.warn(`Préréglage caméra non trouvé: ${cle}`);
      return;
    }
    
    const posDepart = camera.position.clone();
    const posFin = prereglage.pos.clone();
    const cibleFin = prereglage.cible.clone();
    
    // Si on est déjà à la bonne position (changement de mode dans la même pièce), ne pas animer
    const distance = posDepart.distanceTo(posFin);
    if (distance < 0.1) {
      // Même si on ne bouge pas, s'assurer que la cible est correcte
      const orbitControls = controls as OrbitControlsImpl | null;
      if (orbitControls) {
        orbitControls.target.copy(cibleFin);
        orbitControls.update();
      }
      return;
    }
    
    // Désactiver OrbitControls pendant l'animation pour éviter les conflits
    const orbitControls = controls as OrbitControlsImpl | null;
    if (orbitControls) {
      orbitControls.enabled = false;
    }
    
    // Calculer la rotation de départ et de fin
    const directionDepart = new THREE.Vector3();
    camera.getWorldDirection(directionDepart);
    
    const directionFin = new THREE.Vector3().subVectors(cibleFin, posFin).normalize();
    
    let t = 0;
    let raf: number;
    let timeoutId: NodeJS.Timeout;
    
    const animer = () => {
      t = Math.min(t + 0.04, 1); // Animation fluide
      const ease = 1 - Math.pow(1 - t, 3); // Easing out cubic
      
      // Animer la position
      camera.position.lerpVectors(posDepart, posFin, ease);
      
      // Animer la direction du regard
      const directionActuelle = new THREE.Vector3().lerpVectors(directionDepart, directionFin, ease);
      const cibleActuelle = new THREE.Vector3().addVectors(camera.position, directionActuelle);
      camera.lookAt(cibleActuelle);
      
      // Synchroniser la cible d'OrbitControls pendant l'animation
      if (orbitControls) {
        orbitControls.target.copy(cibleActuelle);
        orbitControls.update();
      }
      
      if (t < 1) {
        raf = requestAnimationFrame(animer);
      } else {
        // À la fin de l'animation, forcer la position et rotation finales EXACTES
        camera.position.copy(posFin);
        camera.lookAt(cibleFin);
        camera.updateMatrixWorld();
        
        // Réactiver OrbitControls avec un petit délai pour laisser la caméra se stabiliser
        if (orbitControls) {
          orbitControls.target.copy(cibleFin);
          orbitControls.update();
          
          // Petit délai avant de réactiver pour que la position finale soit bien fixée
          timeoutId = setTimeout(() => {
            orbitControls.enabled = true;
          }, 50);
        }
      }
    };
    
    raf = requestAnimationFrame(animer);
    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
      // S'assurer que OrbitControls est réactivé en cas de nettoyage
      if (orbitControls) {
        orbitControls.enabled = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieceActive, camera, controls]); // modeCamera intentionnellement exclu

  const pieceOuverte = pieceActive !== 'exterieur';
  const filDefer     = afficherFilDefer;
  
  // Cible pour OrbitControls - utiliser la cible correspondant au préréglage
  const cle = getClePrereglage(pieceActive, modeCamera);
  const prereglage = PREREGLAGES_CAMERA[cle];
  const cibleOrbite: [number, number, number] = prereglage 
    ? [prereglage.cible.x, prereglage.cible.y, prereglage.cible.z]
    : [0, 2, 0];

  return (
    <>
      <PostEffets />
      <EclairagePrincipal modeJourNuit={modeJourNuit} />
      {modeJourNuit === 'jour'
        ? <Sky sunPosition={[100, 80, 50]} turbidity={4} rayleigh={0.5} />
        : <Stars radius={80} depth={50} count={3000} factor={4} />
      }
      <Environment preset={modeJourNuit === 'nuit' ? 'night' : 'apartment'} />

      {/* OrbitControls désactivé en mode visite dans une pièce (contrôles drone actifs) */}
      {!droneActif && (
        <OrbitControls
          key={`${pieceActive}-${modeCamera}`}
          target={cibleOrbite}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={pieceSpecifique ? 1.5 : 5}
          maxDistance={pieceSpecifique ? 4.5 : 50}
          minPolarAngle={pieceSpecifique ? Math.PI * 0.25 : 0}
          maxPolarAngle={pieceSpecifique ? Math.PI * 0.75 : Math.PI * 0.49}
          rotateSpeed={sensibiliteCamera}
          zoomSpeed={1.0}
          makeDefault
        />
      )}

      {!pieceOuverte && <Terrain />}
      {pieceOuverte && <SolInterieur />}
      <StructureMaison filDefer={filDefer} masquerToit={pieceOuverte} pieceVisible={pieceActive} />

      {/* ── Garage accolé à droite de la maison (visible uniquement en vue extérieure) ── */}
      {!pieceOuverte && (
        <Garage filDefer={filDefer} />
      )}
      
      {/* En mode visite, afficher toutes les pièces pour permettre le passage entre elles */}
      {/* Sinon, afficher toutes les pièces en mode intérieur/extérieur, ou seulement la pièce sélectionnée */}
      {(pieceActive === 'exterieur' || pieceActive === 'interieur' || droneActif || pieceActive === 'sejour') && (
        <Sejour lumiere={lumieres.sejour} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'exterieur' || pieceActive === 'interieur' || droneActif || pieceActive === 'cuisine') && (
        <Cuisine lumiere={lumieres.cuisine} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'exterieur' || pieceActive === 'interieur' || droneActif || pieceActive === 'chambre') && (
        <Chambre lumiere={lumieres.chambre} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'exterieur' || pieceActive === 'interieur' || droneActif || pieceActive === 'salleDeBain') && (
        <SalleDeBain lumiere={lumieres.salleDeBain} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'exterieur' || pieceActive === 'interieur' || droneActif || pieceActive === 'couloir') && (
        <Couloir lumiere={lumieres.couloir} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
    </>
  );
}
