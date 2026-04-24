'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';

export function BarreOutils() {
  const { afficherFilDefer, toggleFilDefer } = useScene();
  return (
    <div className="flex gap-0.5 p-0.5 bg-white/6 rounded-lg border border-white/8">
      <button onClick={toggleFilDefer}
        title="Afficher le fil de fer"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
          ${afficherFilDefer
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/50'
            : 'text-white/55 hover:text-white hover:bg-white/8'}`}>
        <span>⬡</span>
        <span>Fil de fer</span>
      </button>
    </div>
  );
}
