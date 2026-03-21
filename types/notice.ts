export type NoticeCategorie = "Plomberie" | "Électricité" | "Chauffage" | "Ventilation" | "Entretien";

export type NoticeType = "tutoriel" | "ecogeste" | "prevention";

export interface Notice {
  id: number;
  titre: string;
  categorie: NoticeCategorie;
  type: NoticeType;
  description: string;
  fichier?: string;
  date: string;
}
