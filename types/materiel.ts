export type Piece =
  | "Tous"
  | "Cuisine"
  | "Salle de bain"
  | "Chambre"
  | "Salon"
  | "WC"
  | "Entrée"
  | "Buanderie";

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
