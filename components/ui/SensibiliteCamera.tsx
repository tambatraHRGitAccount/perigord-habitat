'use client';
import React, { useState } from 'react';
import { useScene } from '@/hooks/useSceneStore';

export function SensibiliteCamera() {
  const { sensibiliteCamera, setSensibiliteCamera } = useScene();
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOuvert(!ouvert)}
        title="Sensibilité de la caméra"
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 border
          ${ouvert
            ? 'bg-indigo-600 text-white border-indigo-400/30 shadow-md shadow-indigo-900/60 ring-1 ring-indigo-400/30'
            : 'bg-white/5 text-white/45 border-white/8 hover:text-white/80 hover:bg-white/8'}`}
      >
        <span className="text-sm leading-none">◎</span>
        <span>{sensibiliteCamera.toFixed(1)}x</span>
      </button>

      {ouvert && (
        <div className="absolute top-full right-0 mt-2 bg-gray-950/95 backdrop-blur-xl rounded-xl
          border border-white/10 p-4 shadow-2xl shadow-black/60 w-52 z-50">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Sensibilité</span>
              <button
                onClick={() => setOuvert(false)}
                className="w-5 h-5 flex items-center justify-center rounded-md
                  text-white/35 hover:text-white hover:bg-white/10 transition-all text-sm">
                ×
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                type="range" min="0.5" max="3.0" step="0.1"
                value={sensibiliteCamera}
                onChange={e => setSensibiliteCamera(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Lent</span>
                <span className="text-indigo-300 font-bold">{sensibiliteCamera.toFixed(1)}x</span>
                <span className="text-white/30">Rapide</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/8">
              {[
                { label: 'Lent', value: 0.8 },
                { label: 'Normal', value: 1.5 },
                { label: 'Rapide', value: 2.5 },
              ].map(preset => (
                <button key={preset.label}
                  onClick={() => setSensibiliteCamera(preset.value)}
                  className={`py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border
                    ${Math.abs(sensibiliteCamera - preset.value) < 0.2
                      ? 'bg-indigo-600 text-white border-indigo-400/30 shadow-sm shadow-indigo-900/50'
                      : 'bg-white/5 text-white/40 border-white/8 hover:bg-white/10 hover:text-white/75'}`}>
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
