'use client';
import React, { useEffect } from 'react';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

interface Props { modeJourNuit: 'jour' | 'nuit' }

export function EclairagePrincipal({ modeJourNuit }: Props) {
  useEffect(() => { RectAreaLightUniformsLib.init(); }, []);

  const j = modeJourNuit === 'jour';
  return (
    <>
      <ambientLight intensity={j ? 0.04 : 0.03} color={j ? '#e8f4fd' : '#1a237e'} />
      <directionalLight
        position={j ? [15,20,10] : [-10,15,-8]} intensity={j ? 0.8 : 0.15}
        color={j ? '#fff5e0' : '#b0c4de'} castShadow
        shadow-mapSize={[1024,1024]} shadow-camera-near={0.5} shadow-camera-far={60}
        shadow-camera-left={-18} shadow-camera-right={18}
        shadow-camera-top={18} shadow-camera-bottom={-18} shadow-bias={-0.001}
      />
      <directionalLight position={j ? [-8,12,-6] : [5,8,5]} intensity={j ? 0.08 : 0.02} color={j ? '#cce5ff' : '#0d1b2a'} />
      <hemisphereLight args={[j ? '#87ceeb' : '#0d1b2a', j ? '#4a7c59' : '#0a0a0a', j ? 0.06 : 0.03]} />
    </>
  );
}
