'use client';
import React from 'react';
import { useScene } from '@/hooks/useSceneStore';
import type { IdPiece } from '@/types/maison';

// Floor plan rooms in SVG coordinate space (scaled from meters)
// House: 12×10m → SVG: 120×100px
const SCALE = 9;
const OX = 60; // origin offset X (center)
const OZ = 50; // origin offset Z (center)

interface RoomRect {
  id: IdPiece;
  label: string;
  x: number; z: number; w: number; d: number;
  color: string;
}

const PLAN_ROOMS: RoomRect[] = [
  { id: 'sejour',      label: 'Living',   x: -6,   z: -5,  w: 6.75, d: 6.5,  color: '#fef3c7' },
  { id: 'cuisine',     label: 'Kitchen',  x: 0.75, z: -5,  w: 5.25, d: 6.5,  color: '#d1fae5' },
  { id: 'chambre',     label: 'Bedroom',  x: -6,   z: 1.5, w: 6.75, d: 3.5,  color: '#dbeafe' },
  { id: 'couloir',     label: 'Hallway',  x: 0.75, z: 1.5, w: 1.75, d: 3.5,  color: '#f3f4f6' },
  { id: 'salleDeBain', label: 'Bath',     x: 2.5,  z: 1.5, w: 3.5,  d: 3.5,  color: '#e0e7ff' },
];

export function FloorPlanMinimap() {
  const { pieceActive, setPieceActive, setModeCamera } = useScene();

  const handleClick = (id: IdPiece) => {
    setPieceActive(id);
    setModeCamera('orbite');
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl p-2 border border-white/10">
      <p className="text-white/50 text-xs uppercase tracking-widest mb-2 px-1">Floor Plan</p>
      <svg width={108} height={90} viewBox="0 0 108 90">
        {/* House outline */}
        <rect x={0} y={0} width={108} height={90} fill="#1f2937" rx={2} />

        {PLAN_ROOMS.map(r => {
          const sx = (r.x + 6) * SCALE;
          const sz = (r.z + 5) * SCALE;
          const sw = r.w * SCALE;
          const sd = r.d * SCALE;
          const isActive = pieceActive === r.id;

          return (
            <g key={r.id} onClick={() => handleClick(r.id)} style={{ cursor: 'pointer' }}>
              <rect
                x={sx} y={sz} width={sw} height={sd}
                fill={r.color}
                fillOpacity={isActive ? 0.9 : 0.5}
                stroke={isActive ? '#f59e0b' : '#6b7280'}
                strokeWidth={isActive ? 1.5 : 0.5}
              />
              <text
                x={sx + sw / 2} y={sz + sd / 2 + 3}
                textAnchor="middle"
                fontSize={6}
                fill={isActive ? '#92400e' : '#374151'}
                fontWeight={isActive ? 'bold' : 'normal'}
              >
                {r.label}
              </text>
            </g>
          );
        })}

        {/* Front door indicator */}
        <rect x={42} y={87} width={12} height={3} fill="#f59e0b" rx={1} />
      </svg>
    </div>
  );
}
