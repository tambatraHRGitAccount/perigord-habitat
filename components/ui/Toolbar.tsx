'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';

export function Toolbar() {
  const { afficherFilDefer, toggleFilDefer } = useScene();

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleFilDefer}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
          ${afficherFilDefer ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
      >
        ⬡ Wireframe
      </button>
    </div>
  );
}
