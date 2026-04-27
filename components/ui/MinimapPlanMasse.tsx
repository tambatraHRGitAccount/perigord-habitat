'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece } from '@/types/maison';

const PIECES_PLAN = [
  { id: 'sejour'      as IdPiece, libelle: 'Séjour',  x: -6,   z: -5,  l: 6.75, p: 6.5 },
  { id: 'cuisine'     as IdPiece, libelle: 'Cuisine', x: 0.75, z: -5,  l: 5.25, p: 6.5 },
  { id: 'chambre'     as IdPiece, libelle: 'Chambre', x: -6,   z: 1.5, l: 6.75, p: 3.5 },
  { id: 'couloir'     as IdPiece, libelle: 'Couloir', x: 0.75, z: 1.5, l: 1.75, p: 3.5 },
  { id: 'salleDeBain' as IdPiece, libelle: 'SDB',     x: 2.5,  z: 1.5, l: 3.5,  p: 3.5 },
];
const E = 9;

export function MinimapPlanMasse() {
  const { pieceActive, setPieceActive } = useScene();

  return (
    <div className="bg-gray-950/80 backdrop-blur-xl rounded-xl border border-white/8 overflow-hidden shadow-xl shadow-black/40">
      {/* En-tête */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/8">
        <p className="text-white/35 text-xs font-medium uppercase tracking-wider">Plan</p>
        <button onClick={() => setPieceActive('exterieur')}
          className={`text-xs px-2 py-0.5 rounded-md transition-all font-medium
            ${pieceActive === 'exterieur'
              ? 'bg-indigo-600/30 text-indigo-200'
              : 'text-white/35 hover:text-white/65 hover:bg-white/8'}`}>
          Ext.
        </button>
      </div>

      {/* SVG plan */}
      <div className="p-2">
        <svg width={108} height={90} viewBox="0 0 108 90">
          {/* Fond */}
          <rect x={0} y={0} width={108} height={90} fill="#030712" rx={3} />

          {PIECES_PLAN.map(p => {
            const actif = pieceActive === p.id;
            const sx = (p.x + 6) * E;
            const sz = (p.z + 5) * E;
            const sw = p.l * E;
            const sd = p.p * E;
            return (
              <g key={p.id} onClick={() => setPieceActive(p.id)} style={{ cursor: 'pointer' }}>
                <rect
                  x={sx} y={sz} width={sw} height={sd}
                  fill={actif ? '#4f46e530' : '#ffffff08'}
                  stroke={actif ? '#6366f1' : '#1e293b'}
                  strokeWidth={actif ? 1.5 : 0.75}
                  rx={1.5}
                />
                <text
                  x={sx + sw / 2} y={sz + sd / 2 + 3}
                  textAnchor="middle" fontSize={5.5}
                  fill={actif ? '#a5b4fc' : '#334155'}
                  fontWeight={actif ? '700' : '400'}>
                  {p.libelle}
                </text>
                {actif && (
                  <circle cx={sx + sw / 2} cy={sz + sd / 2 - 6} r={2.5} fill="#6366f1" />
                )}
              </g>
            );
          })}

          {/* Porte d'entrée */}
          <rect x={42} y={87.5} width={12} height={2} fill="#6366f1" rx={1} />
          {/* Nord */}
          <text x={104} y={8} textAnchor="middle" fontSize={5} fill="#1e293b" fontWeight="700">N</text>
          <line x1={104} y1={10} x2={104} y2={14} stroke="#1e293b" strokeWidth={0.8} />
        </svg>
      </div>
    </div>
  );
}
