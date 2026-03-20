"use client";

import type { Piece } from "@/types/materiel";
import { PlanLogement } from "@/components/client/PlanLogement";

interface MaterielPieceProps {
  active: Piece;
  onChange: (piece: Piece) => void;
}

export function MaterielPiece({ active, onChange }: MaterielPieceProps) {
  return (
    <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg overflow-scroll">
      <PlanLogement active={active} onChange={onChange} />
    </div>
  );
}
