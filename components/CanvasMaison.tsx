'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { SceneMaison } from '@/components/scene/SceneMaison';
import * as THREE from 'three';

function Chargement() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  );
}

export function CanvasMaison() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ fov: 60, near: 0.1, far: 150, position: [20, 16, 20] }}
        gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.7 }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={<Chargement />}>
          <SceneMaison />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
