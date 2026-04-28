'use client';
import { useMemo } from 'react';
import * as THREE from 'three';

// Générateur pseudo-aléatoire déterministe (évite Math.random hors useMemo)
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface Props {
  /** Afficher uniquement le gazon extérieur (sans dalle béton) */
  exterieur?: boolean;
}

export function SolInterieur({ exterieur = false }: Props) {
  const grassTexture = useMemo(() => {
    const rng = seededRandom(42); // seed fixe → résultat stable

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fond vert dégradé
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0,   '#3a6b47');
    gradient.addColorStop(0.5, '#4a7c59');
    gradient.addColorStop(1,   '#2d5a3d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Brins d'herbe
    const numBlades = 8000;
    for (let i = 0; i < numBlades; i++) {
      const x      = rng() * canvas.width;
      const y      = rng() * canvas.height;
      const length = 2 + rng() * 4;
      const angle  = rng() * Math.PI * 2;
      const greenShade = Math.floor(100 + rng() * 100);
      const darkGreen  = Math.floor(60  + rng() * 40);
      ctx.strokeStyle = `rgb(${darkGreen}, ${greenShade}, ${darkGreen})`;
      ctx.lineWidth   = 0.5 + rng() * 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      ctx.stroke();
    }

    // Bruit de surface
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (rng() - 0.5) * 20;
      data[i]     = Math.max(0, Math.min(255, data[i]     + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(exterieur ? 20 : 12, exterieur ? 20 : 10);
    return texture;
  }, [exterieur]);

  if (exterieur) {
    // Vue extérieure : grand plan de gazon (70×70)
    return (
      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[70, 70]} />
          <meshStandardMaterial
            map={grassTexture ?? undefined}
            color="#4a7c59"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      </group>
    );
  }

  // Vue intérieure : dalle béton + gazon autour
  return (
    <group>
      {/* Dalle béton opaque sous la maison */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[13, 0.2, 11]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.7} />
      </mesh>

      {/* Gazon autour de la maison */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.16, 0]} receiveShadow>
        <planeGeometry args={[40, 35]} />
        <meshStandardMaterial
          map={grassTexture ?? undefined}
          color="#4a7c59"
          roughness={0.95}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
