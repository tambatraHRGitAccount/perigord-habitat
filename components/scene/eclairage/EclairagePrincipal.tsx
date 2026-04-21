'use client';
import React from 'react';

interface Props { modeJourNuit: 'jour' | 'nuit' }

export function EclairagePrincipal({ modeJourNuit }: Props) {
  const j = modeJourNuit === 'jour';
  return (
    <>
      <ambientLight intensity={j ? 0.6 : 0.08} color={j ? '#e8f4fd' : '#1a237e'} />
      <directionalLight
        position={j ? [15,20,10] : [-10,15,-8]} intensity={j ? 2.5 : 0.3}
        color={j ? '#fff5e0' : '#b0c4de'} castShadow
        shadow-mapSize={[1024,1024]} shadow-camera-near={0.5} shadow-camera-far={60}
        shadow-camera-left={-18} shadow-camera-right={18}
        shadow-camera-top={18} shadow-camera-bottom={-18} shadow-bias={-0.001}
      />
      <directionalLight position={j ? [-8,12,-6] : [5,8,5]} intensity={j ? 0.4 : 0.05} color={j ? '#cce5ff' : '#0d1b2a'} />
      <hemisphereLight args={[j ? '#87ceeb' : '#0d1b2a', j ? '#4a7c59' : '#0a0a0a', j ? 0.3 : 0.05]} />
    </>
  );
}
