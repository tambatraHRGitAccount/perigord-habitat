'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece } from '@/types/maison';

const rooms: { id: IdPiece; label: string; icon: string }[] = [
  { id: 'sejour',      label: 'Living Room', icon: '🛋️' },
  { id: 'cuisine',     label: 'Kitchen',     icon: '🍳' },
  { id: 'chambre',     label: 'Bedroom',     icon: '🛏️' },
  { id: 'salleDeBain', label: 'Bathroom',    icon: '🚿' },
  { id: 'couloir',     label: 'Hallway',     icon: '🚪' },
];

export function RoomSelector() {
  const { pieceActive, setPieceActive } = useScene();

  return (
    <div className="flex flex-col gap-1">
      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Rooms</p>
      {/* Exterior / overview button */}
      <button
        onClick={() => setPieceActive('exterieur')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all text-left
          ${pieceActive === 'exterieur'
            ? 'bg-amber-500/80 text-white font-semibold'
            : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
      >
        <span>🏠</span>
        <span>Overview</span>
      </button>
      <div className="border-t border-white/10 my-1" />
      {rooms.map(r => (
        <button
          key={r.id}
          onClick={() => setPieceActive(r.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all text-left
            ${pieceActive === r.id
              ? 'bg-amber-500/80 text-white font-semibold'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
        >
          <span>{r.icon}</span>
          <span>{r.label}</span>
        </button>
      ))}
    </div>
  );
}
