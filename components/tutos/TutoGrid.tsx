import type { Notice } from "@/types/notice";
import { TutoCard } from "./TutoCard";
import { FileQuestion } from "lucide-react";

interface TutoGridProps {
  notices: Notice[];
}

export function TutoGrid({ notices }: TutoGridProps) {
  if (notices.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
        <FileQuestion size={64} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">Aucun tutoriel trouvé</p>
        <p className="text-sm">Essayez de modifier vos filtres</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notices.map((notice) => (
        <TutoCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
