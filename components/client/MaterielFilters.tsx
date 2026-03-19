import type { Piece } from "@/types/materiel";
import { PIECES } from "@/data/materiels";

interface MaterielFiltersProps {
  active: Piece;
  onChange: (piece: Piece) => void;
}

export function MaterielFilters({ active, onChange }: MaterielFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PIECES.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            active === p
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
