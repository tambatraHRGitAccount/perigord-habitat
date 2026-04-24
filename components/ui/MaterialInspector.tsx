'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';

// Preset color palettes per material category
const COLOR_PRESETS: Record<string, string[]> = {
  wall:    ['#f5f0eb','#e8ddd0','#d4c5b0','#c8b89a','#b5a48a','#f0f4f8','#e8f0e8','#f4e8e8'],
  floor:   ['#c8a97e','#a0785a','#8b6914','#d4b896','#e8d5b0','#6b4c2a','#4a3728','#f0e8d8'],
  sofa:    ['#6b7280','#374151','#1f2937','#92400e','#78350f','#065f46','#1e3a5f','#7c3aed'],
  bed:     ['#e5e7eb','#f3f4f6','#d1d5db','#fef3c7','#dbeafe','#d1fae5','#fce7f3','#374151'],
  cabinet: ['#f3f4f6','#e5e7eb','#374151','#1f2937','#92400e','#78350f','#f5f0eb','#d4c5b0'],
  tile:    ['#e8e0d5','#f0f0f0','#d1d5db','#fef9c3','#dbeafe','#d1fae5','#f3e8ff','#1f2937'],
  wood:    ['#8b6914','#7a5c10','#5c3d2e','#4a3728','#c8a97e','#d4b896','#a0785a','#6b4c2a'],
  metal:   ['#9ca3af','#6b7280','#374151','#d1d5db','#f3f4f6','#b45309','#92400e','#1e3a5f'],
};

const ROUGHNESS_PRESETS = [
  { label: 'Matte',    value: 0.95 },
  { label: 'Satin',    value: 0.6  },
  { label: 'Semi',     value: 0.35 },
  { label: 'Gloss',    value: 0.1  },
];

function getCategory(objectId: string): string {
  if (objectId.includes('floor'))   return 'floor';
  if (objectId.includes('wall'))    return 'wall';
  if (objectId.includes('sofa'))    return 'sofa';
  if (objectId.includes('bed'))     return 'bed';
  if (objectId.includes('cabinet') || objectId.includes('kitchen') || objectId.includes('counter')) return 'cabinet';
  if (objectId.includes('tile'))    return 'tile';
  if (objectId.includes('wood') || objectId.includes('table') || objectId.includes('desk') || objectId.includes('wardrobe')) return 'wood';
  if (objectId.includes('metal') || objectId.includes('sink') || objectId.includes('faucet')) return 'metal';
  return 'wall';
}

export function MaterialInspector() {
  const { objetSelectionne, modifierMateriau, selectionnerObjet } = useScene();

  if (!objetSelectionne) return null;

  const key = `${objetSelectionne.idPiece}_${objetSelectionne.idElement}`;
  const category = getCategory(objetSelectionne.idElement);
  const colors = COLOR_PRESETS[category] ?? COLOR_PRESETS.wall;

  return (
    <div className="absolute right-4 top-20 w-56 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/10">
        <div>
          <p className="text-white text-xs font-semibold">{objetSelectionne.libelle}</p>
          <p className="text-white/40 text-xs capitalize">{category} material</p>
        </div>
        <button
          onClick={() => selectionnerObjet(null)}
          className="text-white/40 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {/* Color preview + hex input */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg border border-white/20 flex-shrink-0"
            style={{ background: objetSelectionne.materiau.couleur }}
          />
          <input
            type="text"
            value={objetSelectionne.materiau.couleur}
            onChange={e => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                modifierMateriau(key, { couleur: v });
              }
            }}
            className="flex-1 bg-white/10 text-white text-xs px-2 py-1.5 rounded-lg border border-white/10 font-mono focus:outline-none focus:border-blue-500"
          />
          <input
            type="color"
            value={objetSelectionne.materiau.couleur}
            onChange={e => modifierMateriau(key, { couleur: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
          />
        </div>

        {/* Color palette */}
        <div>
          <p className="text-white/40 text-xs mb-1.5">Presets</p>
          <div className="grid grid-cols-8 gap-1">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => modifierMateriau(key, { couleur: c })}
                className={`w-5 h-5 rounded border transition-all ${
                  objetSelectionne.materiau.couleur === c ? 'border-white scale-110' : 'border-white/20 hover:border-white/60'
                }`}
                style={{ background: c }}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Roughness */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white/40 text-xs">Roughness</p>
            <span className="text-white/60 text-xs font-mono">{objetSelectionne.materiau.rugosite.toFixed(2)}</span>
          </div>
          <input
            type="range" min={0} max={1} step={0.01}
            value={objetSelectionne.materiau.rugosite}
            onChange={e => modifierMateriau(key, { rugosite: parseFloat(e.target.value) })}
            className="w-full h-1.5 rounded-full accent-blue-500 cursor-pointer"
          />
          <div className="flex gap-1 mt-1.5">
            {ROUGHNESS_PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => modifierMateriau(key, { rugosite: p.value })}
                className="flex-1 text-xs py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metalness */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white/40 text-xs">Metalness</p>
            <span className="text-white/60 text-xs font-mono">{objetSelectionne.materiau.metalique.toFixed(2)}</span>
          </div>
          <input
            type="range" min={0} max={1} step={0.01}
            value={objetSelectionne.materiau.metalique}
            onChange={e => modifierMateriau(key, { metalique: parseFloat(e.target.value) })}
            className="w-full h-1.5 rounded-full accent-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
