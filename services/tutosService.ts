import { NOTICES } from "@/data/notices";
import type { Notice, NoticeCategorie, NoticeType } from "@/types/notice";

/**
 * Service pour gérer les tutoriels
 */
export class TutosService {
  /**
   * Récupère tous les tutoriels
   */
  static getAllNotices(): Notice[] {
    return NOTICES;
  }

  /**
   * Récupère un tutoriel par son ID
   */
  static getNoticeById(id: number): Notice | undefined {
    return NOTICES.find((notice) => notice.id === id);
  }

  /**
   * Filtre les tutoriels par catégorie
   */
  static filterByCategorie(categorie: NoticeCategorie | "Tous"): Notice[] {
    if (categorie === "Tous") {
      return NOTICES;
    }
    return NOTICES.filter((notice) => notice.categorie === categorie);
  }

  /**
   * Filtre les tutoriels par type
   */
  static filterByType(type: NoticeType): Notice[] {
    return NOTICES.filter((notice) => notice.type === type);
  }

  /**
   * Recherche dans les tutoriels
   */
  static search(query: string): Notice[] {
    const lowerQuery = query.toLowerCase();
    return NOTICES.filter(
      (notice) =>
        notice.titre.toLowerCase().includes(lowerQuery) ||
        notice.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Récupère les statistiques
   */
  static getStatistics() {
    return {
      total: NOTICES.length,
      tutoriels: NOTICES.filter((n) => n.type === "tutoriel").length,
      ecogestes: NOTICES.filter((n) => n.type === "ecogeste").length,
      prevention: NOTICES.filter((n) => n.type === "prevention").length,
    };
  }

  /**
   * Récupère les tutoriels récents
   */
  static getRecentNotices(limit: number = 5): Notice[] {
    return [...NOTICES]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  /**
   * Récupère les tutoriels par catégorie avec comptage
   */
  static getNoticesByCategorie(): Record<NoticeCategorie, number> {
    const result = {} as Record<NoticeCategorie, number>;
    NOTICES.forEach((notice) => {
      result[notice.categorie] = (result[notice.categorie] || 0) + 1;
    });
    return result;
  }
}
