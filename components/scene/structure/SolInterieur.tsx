'use client';
import { useMemo } from 'react';
import * as THREE from 'three';

export function SolInterieur() {
  // Créer une texture procédurale de gazon
  const grassTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fond vert de base (plusieurs nuances)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#3a6b47');
    gradient.addColorStop(0.5, '#4a7c59');
    gradient.addColorStop(1, '#2d5a3d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ajouter des brins d'herbe (petits traits)
    const numBlades = 8000;
    for (let i = 0; i < numBlades; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const length = 2 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      
      // Variation de couleur pour les brins
      const greenShade = Math.floor(100 + Math.random() * 100);
      const darkGreen = Math.floor(60 + Math.random() * 40);
      ctx.strokeStyle = `rgb(${darkGreen}, ${greenShade}, ${darkGreen})`;
      ctx.lineWidth = 0.5 + Math.random() * 0.5;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      ctx.stroke();
    }

    // Ajouter du bruit pour la texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(12, 10); // Répéter la texture pour couvrir le grand sol
    return texture;
  }, []);

  return (
    <group>
      {/* Dalle béton opaque sous la maison pour bloquer le gazon */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[13, 0.2, 11]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.7} />
      </mesh>
      
      {/* Gazon autour de la maison */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.16, 0]} receiveShadow>
        <planeGeometry args={[40, 35]} />
        <meshStandardMaterial 
          map={grassTexture}
          color="#4a7c59"
          roughness={0.95}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
