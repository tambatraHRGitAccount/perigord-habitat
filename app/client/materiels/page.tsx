"use client";

import { HeaderApp } from "@/components/layout/HeaderApp";
import { MaterielFilters } from "@/components/client/MaterielFilters";
import { MaterielPiece } from "@/components/client/MaterielPiece";
import { useMaterielFilter } from "@/hooks/useMaterielFilter";

export default function MaterielsPage() {
  const { filtre, setFiltre, filtered } = useMaterielFilter();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
      <HeaderApp />

      {/* Filtres */}
      <div className="px-4 sm:px-6 pt-4 pb-2 ">
        <MaterielFilters active={filtre} onChange={setFiltre} />
      </div>

      {/* Plan interactif */}
      <div className="flex-1 px-4 sm:px-6 pb-6">
        <MaterielPiece active={filtre} onChange={setFiltre} />
      </div>
    </div>
  );
}
