export type Piece =
  | "Tous"
  | "Salle de séjour"
  | "Cuisine"
  | "Salle de bain"
  | "Extérieur";

export type Responsable = "Propriétaire" | "Locataire" | "Partagé";

export interface Materiel {
  id: number;
  nom: string;
  piece: Exclude<Piece, "Tous">;
  responsable: Responsable;
  description: string;
  emoji: string;
  image?: string;
}
