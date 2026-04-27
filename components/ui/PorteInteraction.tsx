'use client';
import React from 'react';
import type { IdPiece } from '@/types/maison';

interface Props {
  porteProche: { piece: IdPiece; nom: string } | null;
  onOuvrirPorte: () => void;
}

export function PorteInteraction({ porteProche, onOuvrirPorte }: Props) {
  if (!porteProche) return null;

  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-auto">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/15 px-6 py-4 shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span className="text-xl">🚪</span>
            <span className="font-medium">{porteProche.nom}</span>
          </div>
          <button
            onClick={onOuvrirPorte}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-xl
              bg-indigo-600/80 hover:bg-indigo-500/90 text-white border border-indigo-400/40 hover:border-indigo-300/60 hover:scale-105"
          >
            <span>🔓</span>
            <span>Ouvrir</span>
            <span className="text-xs opacity-60">[E]</span>
          </button>
        </div>
      </div>
    </div>
  );
}
