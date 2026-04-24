'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { EtatLumieres } from '@/types/maison';

const LUMIERES: { id: keyof EtatLumieres; libelle: string; icone: string }[] = [
  { id: 'sejour',      libelle: 'Séjour',        icone: '🛋️' },
  { id: 'cuisine',     libelle: 'Cuisine',       icone: '🍳' },
  { id: 'chambre',     libelle: 'Chambre',       icone: '🛏️' },
  { id: 'salleDeBain', libelle: 'Salle de bain', icone: '🚿' },
  { id: 'couloir',     libelle: 'Couloir',       icone: '🚪' },
];

export function PanneauLumieres() {
  const { lumieres, toggleLumiere, modeJourNuit, setModeJourNuit } = useScene();
  const toutesAllumees = Object.values(lumieres).every(Boolean);

  return (
    <div className="p-1.5 flex flex-col gap-0.5">
      {/* En-tête */}
      <p className="px-2 pt-1 pb-0.5 text-white/35 text-xs font-medium uppercase tracking-wider">
        Éclairage
      </p>

      {/* Bascule jour/nuit */}
      <button onClick={() => setModeJourNuit(modeJourNuit === 'jour' ? 'nuit' : 'jour')}
        className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150
          ${modeJourNuit === 'jour'
            ? 'bg-white/8 text-white/75 hover:bg-white/12'
            : 'bg-indigo-950/50 text-indigo-200 hover:bg-indigo-950/70'}`}>
        <div className="flex items-center gap-2">
          <span>{modeJourNuit === 'jour' ? '☀️' : '🌙'}</span>
          <span>{modeJourNuit === 'jour' ? 'Mode jour' : 'Mode nuit'}</span>
        </div>
        {/* Toggle pill */}
        <div className={`w-8 h-4 rounded-full relative flex-shrink-0 transition-colors
          ${modeJourNuit === 'nuit' ? 'bg-indigo-500' : 'bg-white/20'}`}>
          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform
            ${modeJourNuit === 'nuit' ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </div>
      </button>

      <div className="h-px bg-white/8 mx-2 my-1" />

      {/* Tout allumer/éteindre */}
      <button
        onClick={() => LUMIERES.forEach(l => { if (lumieres[l.id] !== !toutesAllumees) toggleLumiere(l.id); })}
        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs
          text-white/45 hover:text-white/75 hover:bg-white/6 transition-all duration-150">
        <span>{toutesAllumees ? 'Tout éteindre' : 'Tout allumer'}</span>
        <span>{toutesAllumees ? '🌑' : '✨'}</span>
      </button>

      {/* Lumières par pièce */}
      {LUMIERES.map(l => (
        <button key={l.id} onClick={() => toggleLumiere(l.id)}
          className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all duration-150
            ${lumieres[l.id]
              ? 'bg-indigo-600/20 text-white/85 hover:bg-indigo-600/30'
              : 'text-white/45 hover:bg-white/6 hover:text-white/70'}`}>
          <div className="flex items-center gap-2">
            <span>{l.icone}</span>
            <span className="font-medium">{l.libelle}</span>
          </div>
          {/* Toggle pill */}
          <div className={`w-7 h-3.5 rounded-full relative flex-shrink-0 transition-colors
            ${lumieres[l.id] ? 'bg-indigo-400' : 'bg-white/15'}`}>
            <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-transform
              ${lumieres[l.id] ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
          </div>
        </button>
      ))}
    </div>
  );
}
