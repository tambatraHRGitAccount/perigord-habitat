'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';

const PALETTES: Record<string, string[]> = {
  sol:    ['#c8a97e','#a0785a','#8b6914','#d4b896','#e8e0d5','#f0f0f0','#6b4c2a','#4a3728'],
  mur:    ['#f5f0eb','#e8ddd0','#d4c5b0','#c8b89a','#f0f4f8','#e8f0e8','#f4e8e8','#fff9f0'],
  tissu:  ['#6b7280','#374151','#1f2937','#92400e','#78350f','#065f46','#1e3a5f','#7c3aed'],
  bois:   ['#8b6914','#7a5c10','#5c3d2e','#4a3728','#c8a97e','#d4b896','#a0785a','#6b4c2a'],
  metal:  ['#9ca3af','#6b7280','#374151','#d1d5db','#f3f4f6','#b45309','#92400e','#1e3a5f'],
  vegetal:['#2d6a4f','#40916c','#52b788','#1b4332','#74c69d','#95d5b2','#b7e4c7','#d8f3dc'],
  neutre: ['#f9fafb','#f3f4f6','#e5e7eb','#d1d5db','#9ca3af','#6b7280','#374151','#1f2937'],
};

function getPalette(id: string): string[] {
  if (id.includes('sol') || id.includes('tapis') || id.includes('carrelage')) return PALETTES.sol;
  if (id.includes('mur') || id.includes('papier') || id.includes('plafond'))  return PALETTES.mur;
  if (id.includes('canape') || id.includes('fauteuil') || id.includes('literie') || id.includes('rideaux')) return PALETTES.tissu;
  if (id.includes('plante') || id.includes('pelouse') || id.includes('haies')) return PALETTES.vegetal;
  if (id.includes('metal') || id.includes('seche') || id.includes('evier'))   return PALETTES.metal;
  if (id.includes('armoire') || id.includes('bureau') || id.includes('biblio') || id.includes('table') || id.includes('lit')) return PALETTES.bois;
  return PALETTES.neutre;
}

const RUGOSITE_PRESETS = [
  { libelle: 'Mat',      valeur: 0.95 },
  { libelle: 'Satiné',   valeur: 0.6  },
  { libelle: 'Semi',     valeur: 0.35 },
  { libelle: 'Brillant', valeur: 0.08 },
];

export function InspecteurMateriau() {
  const { objetSelectionne, modifierMateriau, selectionnerObjet } = useScene();
  if (!objetSelectionne) return null;

  const { idPiece, idElement, libelle, materiau } = objetSelectionne;
  const cle = `${idPiece}_${idElement}`;
  const palette = getPalette(idElement);

  return (
    <div className="absolute right-3 top-16 w-60 pointer-events-auto z-10"
      style={{ maxHeight: 'calc(100vh - 14rem)', overflowY: 'auto' }}>
      <div className="bg-gray-950/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl shadow-black/50">

        {/* En-tête */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg border border-white/15 flex-shrink-0"
              style={{ background: materiau.couleur }} />
            <div>
              <p className="text-white/90 text-xs font-semibold leading-tight">{libelle}</p>
              <p className="text-white/35 text-xs leading-tight capitalize">{idPiece}</p>
            </div>
          </div>
          <button onClick={() => selectionnerObjet(null)}
            className="w-5 h-5 flex items-center justify-center rounded-md
              text-white/35 hover:text-white hover:bg-white/10 transition-all text-sm">
            ×
          </button>
        </div>

        <div className="p-3 flex flex-col gap-3.5">

          {/* Couleur */}
          <div>
            <p className="text-white/35 text-xs font-medium uppercase tracking-wider mb-2">Couleur</p>
            <div className="flex items-center gap-2">
              <input type="color" value={materiau.couleur}
                onChange={e => modifierMateriau(cle, { couleur: e.target.value })}
                className="w-9 h-9 rounded-lg cursor-pointer border border-white/15 bg-transparent p-0.5 flex-shrink-0" />
              <input type="text" value={materiau.couleur}
                onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) modifierMateriau(cle, { couleur: e.target.value }); }}
                className="flex-1 bg-white/6 text-white/80 text-xs px-2.5 py-2 rounded-lg border border-white/8
                  font-mono focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all" />
            </div>
          </div>

          {/* Palette */}
          <div>
            <p className="text-white/35 text-xs font-medium uppercase tracking-wider mb-2">Palette</p>
            <div className="grid grid-cols-8 gap-1">
              {palette.map(c => (
                <button key={c} onClick={() => modifierMateriau(cle, { couleur: c })} title={c}
                  className={`w-6 h-6 rounded-md border-2 transition-all duration-100 hover:scale-110
                    ${materiau.couleur === c ? 'border-white shadow-md scale-110' : 'border-transparent hover:border-white/30'}`}
                  style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Rugosité */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/35 text-xs font-medium uppercase tracking-wider">Rugosité</p>
              <span className="text-indigo-300 text-xs font-mono font-semibold">
                {materiau.rugosite.toFixed(2)}
              </span>
            </div>
            <input type="range" min={0} max={1} step={0.01} value={materiau.rugosite}
              onChange={e => modifierMateriau(cle, { rugosite: parseFloat(e.target.value) })}
              className="w-full h-1.5 rounded-full accent-indigo-500 cursor-pointer mb-2" />
            <div className="grid grid-cols-4 gap-1">
              {RUGOSITE_PRESETS.map(p => (
                <button key={p.libelle} onClick={() => modifierMateriau(cle, { rugosite: p.valeur })}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-all border
                    ${Math.abs(materiau.rugosite - p.valeur) < 0.05
                      ? 'bg-indigo-600/30 text-indigo-100 border-indigo-500/40'
                      : 'bg-white/5 text-white/45 border-white/8 hover:bg-white/10 hover:text-white/70'}`}>
                  {p.libelle}
                </button>
              ))}
            </div>
          </div>

          {/* Métallique */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/35 text-xs font-medium uppercase tracking-wider">Métallique</p>
              <span className="text-indigo-300 text-xs font-mono font-semibold">
                {materiau.metalique.toFixed(2)}
              </span>
            </div>
            <input type="range" min={0} max={1} step={0.01} value={materiau.metalique}
              onChange={e => modifierMateriau(cle, { metalique: parseFloat(e.target.value) })}
              className="w-full h-1.5 rounded-full accent-indigo-500 cursor-pointer" />
            <div className="flex justify-between mt-1">
              <span className="text-white/25 text-xs">Plastique</span>
              <span className="text-white/25 text-xs">Métal</span>
            </div>
          </div>

          {/* Aperçu */}
          <div className="rounded-lg overflow-hidden border border-white/8">
            <div className="h-8 w-full"
              style={{
                background: `linear-gradient(135deg, ${materiau.couleur}ee, ${materiau.couleur}77)`,
                filter: `brightness(${1 + materiau.metalique * 0.3}) saturate(${1 - materiau.rugosite * 0.3})`,
              }} />
            <div className="px-2.5 py-1 bg-white/4 flex justify-between">
              <span className="text-white/30 text-xs">Aperçu</span>
              <span className="text-white/30 text-xs">
                {materiau.metalique > 0.5 ? '⚙️ Métal' : materiau.rugosite > 0.7 ? '🪵 Mat' : '✨ Brillant'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
