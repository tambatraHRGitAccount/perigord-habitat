'use client';
import React from 'react';
import { ControleurCamera } from './ui/ControleurCamera';
import { SensibiliteCamera } from './ui/SensibiliteCamera';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece } from '@/types/maison';

const PIECES: { id: IdPiece; label: string; icon: string }[] = [
  { id: 'sejour',      label: 'Séjour',        icon: '🛋️' },
  { id: 'cuisine',     label: 'Cuisine',       icon: '🍳' },
  { id: 'chambre',     label: 'Chambre',       icon: '🛏️' },
  { id: 'salleDeBain', label: 'Salle de bain', icon: '🚿' },
];

export function InterfaceMaison() {
  const { pieceActive, setPieceActive } = useScene();

  const estExterieur = pieceActive === 'exterieur';

  return (
    <div className="absolute inset-0 pointer-events-none select-none">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-auto z-20">
        <div className="bg-gray-950/75 backdrop-blur-md">
          <div className="flex items-center justify-center px-4 h-12 gap-2">
            <ControleurCamera />
            <SensibiliteCamera />
          </div>
        </div>
      </div>



      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto z-20">
        <div className="bg-gray-950/75 backdrop-blur-md">
          <div className="flex items-center justify-center px-4 h-14 gap-2">

            {/* Vue extérieure → Entrer */}
            {estExterieur && (
              <button
                onClick={() => setPieceActive('interieur')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold
                  bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                  text-white shadow-lg shadow-indigo-950/60
                  transition-all duration-150 hover:scale-105 active:scale-95"
              >
                <span>🏠</span>
                <span>Entrer</span>
              </button>
            )}

            {/* Vue intérieure → Sortir + Pièces */}
            {!estExterieur && (
              <>
                <button
                  onClick={() => { setPieceActive('exterieur'); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                    bg-gray-800 hover:bg-gray-700 active:bg-gray-900
                    text-white border border-white/10 hover:border-white/20
                    shadow-lg transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <span>←</span>
                  <span>Sortir</span>
                </button>

                <select
                  value={PIECES.some(p => p.id === pieceActive) ? pieceActive : ''}
                  onChange={e => e.target.value && setPieceActive(e.target.value as IdPiece)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold
                    bg-indigo-600 hover:bg-indigo-500
                    text-white shadow-lg shadow-indigo-950/60 border-0
                    cursor-pointer transition-all duration-150 outline-none"
                >
                  <option value="" disabled className="">🗺️ Pièces</option>
                  {PIECES.map(p => (
                    <option key={p.id} value={p.id} className="text-black">
                      {p.icon} {p.label}
                    </option>
                  ))}
                </select>
              </>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
