'use client';
import { useState, useEffect } from 'react';

export function AideDroneControls() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          bg-gray-950/80 hover:bg-gray-950/95 text-white/55 hover:text-white/80
          border border-white/8 backdrop-blur-md transition-all duration-150"
      >
        🎮 Aide
      </button>
    );
  }

  return (
    <div className="bg-gray-950/90 backdrop-blur-xl text-white rounded-xl border border-white/10 shadow-xl shadow-black/50 w-52 overflow-hidden">
      {/* En-tête */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/8">
        <span className="text-white/60 text-xs font-medium uppercase tracking-wider">🎮 Contrôles</span>
        <button onClick={() => setVisible(false)}
          className="w-5 h-5 flex items-center justify-center rounded-md
            text-white/35 hover:text-white hover:bg-white/10 transition-all text-sm">
          ×
        </button>
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        {[
          ['↑', 'Avancer'],
          ['↓', 'Reculer'],
          ['←', 'Tourner gauche'],
          ['→', 'Tourner droite'],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center gap-2.5">
            <kbd className="bg-white/8 border border-white/12 px-2 py-0.5 rounded-md
              min-w-[28px] text-center font-mono text-white/65 text-xs">
              {key}
            </kbd>
            <span className="text-white/55 text-xs">{label}</span>
          </div>
        ))}

        <div className="h-px bg-white/8 my-1" />

        {[
          ['Q / D', 'Latéral'],
          ['Espace', 'Monter'],
          ['Shift', 'Descendre'],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center gap-2.5">
            <kbd className="bg-white/8 border border-white/12 px-2 py-0.5 rounded-md
              text-center font-mono text-white/65 text-xs whitespace-nowrap">
              {key}
            </kbd>
            <span className="text-white/55 text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
