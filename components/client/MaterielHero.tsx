"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import type { Materiel } from "@/types/materiel";
import { RESPONSABLE_COLORS } from "@/data/materiels";

export function MaterielHero({ materiel }: { materiel: Materiel }) {
  const [scale, setScale] = useState(1);
  const zoomIn  = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 1));

  return (
    <main className="flex-1 w-full px-4 sm:px-6 py-8 flex flex-col gap-6">

      <Link
        href="/client/materiels"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors self-start"
      >
        <ChevronLeft size={16} />
        Retour aux équipements
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Zone image */}
        <div className="relative w-full h-[55vh] bg-gray-100 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
          >
            <Image
              src={materiel.image ?? "/images/products/s10.jpg"}
              alt={materiel.nom}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          <span className={`absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full font-semibold shadow ${RESPONSABLE_COLORS[materiel.responsable]}`}>
            {materiel.responsable}
          </span>

          <span className="absolute bottom-4 right-4 text-4xl drop-shadow-lg select-none">{materiel.emoji}</span>

          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
            <button
              onClick={zoomIn}
              disabled={scale >= 3}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-gray-700 hover:bg-white hover:text-indigo-600 transition-colors disabled:opacity-40"
              aria-label="Zoom avant"
            >
              <ZoomIn size={17} />
            </button>
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-gray-700 hover:bg-white hover:text-indigo-600 transition-colors disabled:opacity-40"
              aria-label="Zoom arrière"
            >
              <ZoomOut size={17} />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">{materiel.nom}</h1>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-indigo-500 font-medium">{materiel.piece}</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{materiel.description}</p>
        </div>
      </div>
    </main>
  );
}
