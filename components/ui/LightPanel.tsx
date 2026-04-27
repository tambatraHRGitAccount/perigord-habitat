'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { EtatLumieres } from '@/types/maison';

const lightRooms: { id: keyof EtatLumieres; label: string }[] = [
  { id: 'sejour',      label: 'Living Room' },
  { id: 'cuisine',     label: 'Kitchen'     },
  { id: 'chambre',     label: 'Bedroom'     },
  { id: 'salleDeBain', label: 'Bathroom'    },
  { id: 'couloir',     label: 'Hallway'     },
];

export function LightPanel() {
  const { lumieres, toggleLumiere, modeJourNuit, setModeJourNuit } = useScene();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Lighting</p>

      {/* Day / Night toggle */}
      <button
        onClick={() => setModeJourNuit(modeJourNuit === 'jour' ? 'nuit' : 'jour')}
        className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
      >
        <span>{modeJourNuit === 'jour' ? '☀️ Day' : '🌙 Night'}</span>
        <span className="text-white/40 text-xs">toggle</span>
      </button>

      {/* Per-room lights */}
      {lightRooms.map(r => (
        <button
          key={r.id}
          onClick={() => toggleLumiere(r.id)}
          className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all
            ${lumieres[r.id]
              ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30'
              : 'bg-white/5 text-white/40 border border-white/10'
            }`}
        >
          <span>{r.label}</span>
          <span className={`w-2 h-2 rounded-full ${lumieres[r.id] ? 'bg-yellow-400' : 'bg-white/20'}`} />
        </button>
      ))}
    </div>
  );
}
