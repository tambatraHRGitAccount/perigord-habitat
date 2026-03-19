import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Materiel } from "@/types/materiel";
import { RESPONSABLE_COLORS } from "@/data/materiels";

interface MaterielCardProps {
  materiel: Materiel;
}

export function MaterielCard({ materiel }: MaterielCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={materiel.image ?? "/images/products/s10.jpg"}
          alt={materiel.nom}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Dégradé bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Badge responsable */}
        <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm ${RESPONSABLE_COLORS[materiel.responsable]}`}>
          {materiel.responsable}
        </span>

        {/* Emoji en bas de l'image */}
        <span className="absolute bottom-3 right-3 text-2xl drop-shadow">{materiel.emoji}</span>
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-3 flex-1">
        <p className="font-semibold text-gray-900 text-sm leading-snug">{materiel.nom}</p>
        <p className="text-xs text-indigo-500 font-medium">{materiel.piece}</p>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-0.5">{materiel.description}</p>
      </div>

      {/* Footer CTA */}
      <Link
        href={`/client/materiels/${materiel.id}`}
        className="mx-4 mb-4 mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors duration-200"
      >
        En savoir plus
        <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}
