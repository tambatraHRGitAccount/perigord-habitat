'use client';
import React from 'react';

interface Props {
  isLocked: boolean;
  onRequestLock: () => void;
}

export function ControlesVisite({ isLocked, onRequestLock }: Props) {
  if (isLocked) {
    return (
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">↑ ↓ ← →</kbd>
              <span>Se déplacer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">Souris</kbd>
              <span>Regarder</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">E</kbd>
              <span>Interagir</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">ESC</kbd>
              <span>Quitter</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-white/20 px-8 py-6 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-white text-xl font-bold mb-2">Mode Visite</h3>
            <p className="text-white/70 text-sm">Cliquez pour commencer la visite immersive</p>
          </div>
          <button
            onClick={onRequestLock}
            className="flex items-center gap-3 px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 shadow-xl
              bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-500/90 hover:to-blue-600/90 
              text-white border-2 border-blue-400/50 hover:border-blue-300/70 hover:scale-105"
          >
            <span className="text-xl">🚶</span>
            <span>Commencer la visite</span>
          </button>
          <div className="text-white/50 text-xs text-center">
            Utilisez les touches fléchées ↑ ↓ ← → pour vous déplacer<br/>
            et la souris pour regarder autour
          </div>
        </div>
      </div>
    </div>
  );
}
