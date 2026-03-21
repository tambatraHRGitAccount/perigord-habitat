import { useState, useMemo } from "react";
import { TutosService } from "@/services/tutosService";
import type { NoticeCategorie } from "@/types/notice";

/**
 * Hook personnalisé pour gérer les tutoriels
 */
export function useTutos() {
  const [filtre, setFiltre] = useState<NoticeCategorie | "Tous">("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  // Récupère les tutoriels filtrés
  const filteredNotices = useMemo(() => {
    let notices = TutosService.filterByCategorie(filtre);
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      notices = notices.filter(
        (notice) =>
          notice.titre.toLowerCase().includes(lowerQuery) ||
          notice.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    return notices;
  }, [filtre, searchQuery]);

  // Récupère les statistiques
  const statistics = useMemo(() => TutosService.getStatistics(), []);

  return {
    filtre,
    setFiltre,
    searchQuery,
    setSearchQuery,
    filteredNotices,
    statistics,
  };
}
