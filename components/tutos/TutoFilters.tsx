import { CATEGORIES } from "@/data/notices";
import type { NoticeCategorie } from "@/types/notice";

interface TutoFiltersProps {
  filtre: NoticeCategorie | "Tous";
  onFilterChange: (filtre: NoticeCategorie | "Tous") => void;
}

export function TutoFilters({ filtre, onFilterChange }: TutoFiltersProps) {
  const categories = ["Tous", ...CATEGORIES] as (NoticeCategorie | "Tous")[];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            filtre === cat
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
