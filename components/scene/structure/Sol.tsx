'use client';
import { useMemo } from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Générateur pseudo-aléatoire déterministe (seed fixe → texture stable)
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface Props {
  x: number; z: number; largeur: number; profondeur: number;
  y?: number; couleur?: string; rugosite?: number; filDefer?: boolean;
  propsInteraction?: Record<string, unknown>;
  emissif?: string; intensiteEmissif?: number;
  clearcoat?: number; clearcoatRoughness?: number;
  reflectif?: boolean;
  mirrorForce?: number;
}

export function Sol({
  x, z, largeur, profondeur, y = 0.1,
  couleur = '#c8a97e', rugosite = 0.7, filDefer = false,
  propsInteraction = {}, emissif = '#000', intensiteEmissif = 0,
  clearcoat = 0, clearcoatRoughness = 0.1,
  reflectif = false, mirrorForce = 0.5,
}: Props) {
  const carpetTexture = useMemo(() => {
    const rng = seededRandom(99);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 200, g: 169, b: 126 };
    };

    const baseColor = hexToRgb(couleur);

    for (let py = 0; py < canvas.height; py++) {
      for (let px = 0; px < canvas.width; px++) {
        const noise = (rng() - 0.5) * 15;
        const r = Math.max(0, Math.min(255, baseColor.r + noise));
        const g = Math.max(0, Math.min(255, baseColor.g + noise));
        const b = Math.max(0, Math.min(255, baseColor.b + noise));
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(px, py, 1, 1);
      }
    }

    const numFibers = 3000;
    for (let i = 0; i < numFibers; i++) {
      const fx         = rng() * canvas.width;
      const fy         = rng() * canvas.height;
      const length     = 1 + rng() * 3;
      const angle      = rng() * Math.PI * 2;
      const brightness = -10 + rng() * 20;
      const r = Math.max(0, Math.min(255, baseColor.r + brightness));
      const g = Math.max(0, Math.min(255, baseColor.g + brightness));
      const b = Math.max(0, Math.min(255, baseColor.b + brightness));
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
      ctx.lineWidth   = 0.5;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + Math.cos(angle) * length, fy + Math.sin(angle) * length);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(largeur * 2, profondeur * 2);
    return texture;
  }, [couleur, largeur, profondeur]);

  return (
    <group>
      {/* Fond opaque pour bloquer le gazon */}
      <mesh position={[x, y - 0.01, z]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[largeur, profondeur]} />
        <meshBasicMaterial color={couleur} side={2} />
      </mesh>
      
      {/* Sol principal avec texture de tapis */}
      <mesh {...propsInteraction} position={[x, y, z]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[largeur, profondeur]} />
        {reflectif && !filDefer ? (
          <MeshReflectorMaterial
            color={couleur}
            roughness={rugosite}
            emissive={emissif}
            emissiveIntensity={intensiteEmissif}
            blur={[256, 64]}
            resolution={512}
            mixBlur={1}
            mixStrength={mirrorForce * 40}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            mirror={mirrorForce}
            reflectorOffset={0.1}
          />
        ) : (
          <meshPhysicalMaterial
            map={carpetTexture}
            color={couleur}
            roughness={rugosite}
            clearcoat={clearcoat}
            clearcoatRoughness={clearcoatRoughness}
            emissive={emissif}
            emissiveIntensity={intensiteEmissif}
            wireframe={filDefer}
            side={2}
          />
        )}
      </mesh>
    </group>
  );
}
