'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { ModeCamera } from '@/types/maison';

const MODES: { id: ModeCamera; libelle: string; icone: string; desc: string }[] = [
  { id: 'orbite', libelle: 'Orbite', icone: '⊙', desc: 'Vue libre 3D' },
  { id: 'visite', libelle: 'Visite', icone: '◈', desc: 'Mode première personne' },
];

export function ControleurCamera() {
  const { modeCamera, setModeCamera } = useScene();
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8 backdrop-blur-sm">
      {MODES.map(m => (
        <button
          key={m.id}
          onClick={() => setModeCamera(m.id)}
          title={m.desc}
          className={`relative flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200
            ${modeCamera === m.id
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/60 ring-1 ring-indigo-400/30'
              : 'text-white/45 hover:text-white/80 hover:bg-white/6'
            }`}
        >
          <span className="text-sm leading-none">{m.icone}</span>
          <span>{m.libelle}</span>
        </button>
      ))}
    </div>
  );
}
