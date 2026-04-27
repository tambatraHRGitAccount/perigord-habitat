'use client';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';

export function Terrain() {
  const pelouse = useElementSelectionnable({ idPiece: 'exterieur', idElement: 'pelouse', libelle: 'Pelouse', defaut: { couleur: '#4a7c59', rugosite: 0.95, metalique: 0 } });
  const terrasse = useElementSelectionnable({ idPiece: 'exterieur', idElement: 'terrasse', libelle: 'Terrasse', defaut: { couleur: '#d4c5b0', rugosite: 0.6, metalique: 0 } });
  const piscine = useElementSelectionnable({ idPiece: 'exterieur', idElement: 'piscine', libelle: 'Piscine', defaut: { couleur: '#4a90e2', rugosite: 0.1, metalique: 0.3 } });
  const allee = useElementSelectionnable({ idPiece: 'exterieur', idElement: 'allee', libelle: 'Allée', defaut: { couleur: '#9e9e9e', rugosite: 0.85, metalique: 0 } });
  const portail = useElementSelectionnable({ idPiece: 'exterieur', idElement: 'portail', libelle: 'Portail', defaut: { couleur: '#2c3e50', rugosite: 0.3, metalique: 0.7 } });
  const haies = useElementSelectionnable({ idPiece: 'exterieur', idElement: 'haies', libelle: 'Haies', defaut: { couleur: '#2d6a4f', rugosite: 0.95, metalique: 0 } });

  const M = (s: typeof pelouse) => ({ 
    color: s.materiau.couleur, 
    roughness: s.materiau.rugosite, 
    metalness: s.materiau.metalique, 
    emissive: s.emissif, 
    emissiveIntensity: s.intensiteEmissif 
  });

  return (
    <group>
      {/* Pelouse principale */}
      <mesh {...pelouse.propsInteraction} rotation={[-Math.PI/2,0,0]} position={[0,-0.01,0]} receiveShadow>
        <planeGeometry args={[70,70]} />
        <meshStandardMaterial {...M(pelouse)} />
      </mesh>

      {/* Grande terrasse moderne en bois composite */}
      <mesh {...terrasse.propsInteraction} rotation={[-Math.PI/2,0,0]} position={[0,0.02,8]} receiveShadow>
        <planeGeometry args={[14,8]} />
        <meshStandardMaterial {...M(terrasse)} />
      </mesh>

      {/* Bordure terrasse */}
      <mesh position={[0,0.1,8]} receiveShadow>
        <boxGeometry args={[14.2,0.2,8.2]} />
        <meshStandardMaterial color="#b8a890" roughness={0.7} />
      </mesh>

      {/* Piscine moderne rectangulaire */}
      <mesh {...piscine.propsInteraction} position={[-3,0.01,12]} receiveShadow>
        <boxGeometry args={[6,0.02,4]} />
        <meshStandardMaterial 
          {...M(piscine)} 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Eau de la piscine (effet de profondeur) */}
      <mesh position={[-3,-0.8,12]}>
        <boxGeometry args={[5.9,1.6,3.9]} />
        <meshStandardMaterial 
          color="#2980b9" 
          roughness={0.1} 
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Margelle piscine (blanc) */}
      <mesh position={[-3,0.15,12]} castShadow receiveShadow>
        <boxGeometry args={[6.4,0.3,4.4]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.4} />
      </mesh>

      {/* Allée d'entrée moderne */}
      <mesh {...allee.propsInteraction} rotation={[-Math.PI/2,0,0]} position={[-1.05,0,-8]} receiveShadow>
        <planeGeometry args={[2,6]} />
        <meshStandardMaterial {...M(allee)} />
      </mesh>

      {/* Parking/Garage extérieur */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[5,0,-10]} receiveShadow>
        <planeGeometry args={[5,10]} />
        <meshStandardMaterial color="#7a7a7a" roughness={0.8} />
      </mesh>

      {/* Dalle béton sous la maison */}
      <mesh position={[0,-0.08,0]} receiveShadow>
        <boxGeometry args={[12.5,0.16,10.5]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.7} />
      </mesh>

      {/* Haies modernes taillées */}
      <mesh {...haies.propsInteraction} position={[-8,0.6,-6]} castShadow receiveShadow>
        <boxGeometry args={[4,1.2,0.6]} />
        <meshStandardMaterial {...M(haies)} />
      </mesh>
      <mesh {...haies.propsInteraction} position={[7,0.6,-6]} castShadow receiveShadow>
        <boxGeometry args={[4,1.2,0.6]} />
        <meshStandardMaterial {...M(haies)} />
      </mesh>

      {/* Haies latérales */}
      <mesh {...haies.propsInteraction} position={[-10,0.6,0]} castShadow receiveShadow>
        <boxGeometry args={[0.6,1.2,20]} />
        <meshStandardMaterial {...M(haies)} />
      </mesh>
      <mesh {...haies.propsInteraction} position={[10,0.6,5]} castShadow receiveShadow>
        <boxGeometry args={[0.6,1.2,10]} />
        <meshStandardMaterial {...M(haies)} />
      </mesh>

      {/* Portail moderne minimaliste */}
      <mesh {...portail.propsInteraction} position={[0,1.2,-7.5]} castShadow>
        <boxGeometry args={[3,2.4,0.05]} />
        <meshStandardMaterial {...M(portail)} />
      </mesh>

      {/* Poteaux portail */}
      <mesh position={[-1.6,1.2,-7.5]} castShadow>
        <boxGeometry args={[0.3,2.8,0.3]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[1.6,1.2,-7.5]} castShadow>
        <boxGeometry args={[0.3,2.8,0.3]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Pergola moderne sur terrasse */}
      <Pergola />

      {/* Arbres et plantes décoratives */}
      <ArbresModernes />
      
      {/* Éclairage extérieur */}
      <EclairageExterieur />
    </group>
  );
}

function Pergola() {
  return (
    <group position={[0, 0, 10]}>
      {/* Poteaux pergola */}
      <mesh position={[-5, 1.5, 0]} castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>
      <mesh position={[5, 1.5, 0]} castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>
      <mesh position={[-5, 1.5, 3]} castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>
      <mesh position={[5, 1.5, 3]} castShadow>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>

      {/* Poutres horizontales */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[10.3, 0.12, 0.2]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3, 3]} castShadow>
        <boxGeometry args={[10.3, 0.12, 0.2]} />
        <meshStandardMaterial color="#8b7355" roughness={0.7} />
      </mesh>

      {/* Lattes transversales */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={i} position={[x, 3.05, 1.5]} castShadow>
          <boxGeometry args={[0.15, 0.08, 3.2]} />
          <meshStandardMaterial color="#8b7355" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function ArbresModernes() {
  // Palmiers/arbres méditerranéens pour style villa
  const positions: [number, number, number][] = [
    [-12, 0, -4],
    [12, 0, 2],
    [-12, 0, 8],
    [12, 0, 12],
  ];
  
  const refT = useRef<THREE.InstancedMesh>(null);
  const refF = useRef<THREE.InstancedMesh>(null);
  
  const { mt, mf } = useMemo(() => {
    const d = new THREE.Object3D();
    const mt: THREE.Matrix4[] = [];
    const mf: THREE.Matrix4[] = [];
    
    positions.forEach(([x, , z]) => {
      // Tronc
      d.position.set(x, 2, z);
      d.scale.set(1, 1, 1);
      d.rotation.set(0, 0, 0);
      d.updateMatrix();
      mt.push(d.matrix.clone());
      
      // Feuillage
      d.position.set(x, 4.5, z);
      d.updateMatrix();
      mf.push(d.matrix.clone());
    });
    
    return { mt, mf };
  }, []); // eslint-disable-line
  
  React.useEffect(() => {
    if (refT.current) {
      mt.forEach((m, i) => refT.current!.setMatrixAt(i, m));
      refT.current.instanceMatrix.needsUpdate = true;
    }
    if (refF.current) {
      mf.forEach((m, i) => refF.current!.setMatrixAt(i, m));
      refF.current.instanceMatrix.needsUpdate = true;
    }
  }, [mt, mf]);
  
  return (
    <>
      {/* Troncs */}
      <instancedMesh ref={refT} args={[undefined, undefined, positions.length]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 4, 8]} />
        <meshStandardMaterial color="#6b5d4f" roughness={0.9} />
      </instancedMesh>
      
      {/* Feuillage sphérique moderne */}
      <instancedMesh ref={refF} args={[undefined, undefined, positions.length]} castShadow>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
      </instancedMesh>
    </>
  );
}

function EclairageExterieur() {
  // Lampadaires modernes
  return (
    <>
      {/* Lampadaire entrée gauche */}
      <group position={[-3, 0, -6]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Lampadaire entrée droite */}
      <group position={[3, 0, -6]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Spots terrasse */}
      <mesh position={[-6, 0.3, 8]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[6, 0.3, 8]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
      </mesh>
    </>
  );
}
