import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { Notice } from "@/types/notice";
import { getCategorieConfig, getTypeConfig } from "@/config/tutosConfig";

interface TutoCardProps {
  notice: Notice;
}

export function TutoCard({ notice }: TutoCardProps) {
  const categorieConfig = getCategorieConfig(notice.categorie);
  const typeConfig = getTypeConfig(notice.type);
  const TypeIcon = typeConfig.icon;
  const CategorieIcon = categorieConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 p-5 group">
      {/* En-tête avec icônes */}
      <div className="flex items-start justify-between gap-2">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${categorieConfig.bg} group-hover:scale-110 transition-transform`}
        >
          <CategorieIcon className={`w-6 h-6 ${categorieConfig.color}`} />
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${categorieConfig.bg} ${categorieConfig.color}`}
          >
            {notice.categorie}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${typeConfig.color}`}
          >
            <TypeIcon size={12} />
            {typeConfig.label}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
          {notice.titre}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {notice.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={14} />
          {new Date(notice.date).toLocaleDateString("fr-FR")}
        </span>
        <Link
          href={`/client/tutos/${notice.id}`}
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors group-hover:gap-2"
        >
          Détails
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
