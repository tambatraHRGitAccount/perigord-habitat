'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece } from '@/types/maison';

const PIECES: { id: IdPiece; libelle: string; icone: string; surface: string }[] = [
  { id: 'sejour',      libelle: 'Séjour',        icone: '🛋️', surface: '27 m²' },
  { id: 'cuisine',     libelle: 'Cuisine',       icone: '🍳', surface: '22 m²' },
  { id: 'chambre',     libelle: 'Chambre',       icone: '🛏️', surface: '22 m²' },
  { id: 'salleDeBain', libelle: 'Salle de bain', icone: '🚿', surface: '8 m²'  },
  { id: 'couloir',     libelle: 'Couloir',       icone: '🚪', surface: '8 m²'  },
];

export function SelecteurPiece() {
  const { pieceActive, setPieceActive } = useScene();

  return (
    <div className="p-1.5 flex flex-col gap-0.5">
      {/* En-tête */}
      <p className="px-2 pt-1 pb-0.5 text-white/35 text-xs font-medium uppercase tracking-wider">
        Pièces
      </p>

      {/* Vue générale */}
      <button onClick={() => setPieceActive('exterieur')}
        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left w-full transition-all duration-150
          ${pieceActive === 'exterieur'
            ? 'bg-indigo-600/30 text-white'
            : 'text-white/60 hover:bg-white/8 hover:text-white/90'}`}>
        <span className="text-sm flex-shrink-0">🏠</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-xs leading-tight">Vue générale</p>
          <p className="text-white/35 text-xs leading-tight mt-0.5">Extérieur · 120 m²</p>
        </div>
        {pieceActive === 'exterieur' && (
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 animate-pulse" />
        )}
      </button>

      <div className="h-px bg-white/8 mx-2 my-1" />

      {PIECES.map(p => (
        <button key={p.id} onClick={() => setPieceActive(p.id)}
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left w-full transition-all duration-150
            ${pieceActive === p.id
              ? 'bg-indigo-600/30 text-white'
              : 'text-white/60 hover:bg-white/8 hover:text-white/90'}`}>
          <span className="text-sm flex-shrink-0">{p.icone}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-xs leading-tight">{p.libelle}</p>
            <p className="text-white/35 text-xs leading-tight mt-0.5">{p.surface}</p>
          </div>
          {pieceActive === p.id && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
}
