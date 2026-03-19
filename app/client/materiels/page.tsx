"use client";

import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ZoomOut, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { MaterielFilters } from "@/components/client/MaterielFilters";
import { RESPONSABLE_COLORS, PIECE_IMAGES } from "@/data/materiels";
import { useMaterielFilter } from "@/hooks/useMaterielFilter";

export default function MaterielsPage() {
  const { filtre, setFiltre, filtered } = useMaterielFilter();
  const [scale, setScale] = useState(1);

  const current = filtered[0] ?? null;

  const zoomIn  = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 1));

  // reset zoom when item changes
  const handleFilterChange = (p: Parameters<typeof setFiltre>[0]) => {
    setScale(1);
    setFiltre(p);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <HeaderApp />

      {/* Filtres */}
      <div className="px-4 sm:px-6 pt-4 pb-2 shrink-0">
        <MaterielFilters active={filtre} onChange={handleFilterChange} />
      </div>

      {/* Hero image — prend tout l'espace restant */}
      <div className="relative flex-1 overflow-hidden">
        {current ? (
          <>
            {/* Image zoomable */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
            >
              <Image
                src={PIECE_IMAGES[current.piece]}
                alt={current.nom}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            {/* Dégradé bas pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Badge responsable */}
            <span className={`absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full font-semibold shadow ${RESPONSABLE_COLORS[current.responsable]}`}>
              {current.responsable}
            </span>

            {/* Contrôles zoom — haut droite */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={zoomIn}
                disabled={scale >= 3}
                className="w-9 h-9 rounded-xl bg-black backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors disabled:opacity-30"
                aria-label="Zoom avant"
              >
                <ZoomIn size={17} />
              </button>
              <button
                onClick={zoomOut}
                disabled={scale <= 1}
                className="w-9 h-9 rounded-xl bg-black backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors disabled:opacity-30"
                aria-label="Zoom arrière"
              >
                <ZoomOut size={17} />
              </button>
            </div>

            {/* Description — bas gauche */}
            <div className="absolute bottom-20 left-4 sm:left-6 flex flex-col gap-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl drop-shadow">{current.emoji}</span>
                <h2 className="text-white font-bold text-lg sm:text-xl drop-shadow">{current.nom}</h2>
              </div>
              <p className="text-white/75 text-sm leading-relaxed drop-shadow">{current.description}</p>
              <Link
                href={`/client/materiels/${current.id}`}
                className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
              >
                En savoir plus <ArrowUpRight size={13} />
              </Link>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50 text-sm">Aucun équipement trouvé.</p>
          </div>
        )}
      </div>

    </div>
  );
}
