export interface Locataire {
  id: number;
  user_id: string;
  bailleur_id: number;
  logement_id: number;
  nom: string;
  prenom: string;
  telephone?: string;
  actif: boolean;
  date_creation: string;
}

export interface AdminBailleur {
  id: number;
  user_id: string;
  bailleur_id: number;
  nom: string;
  prenom: string;
  role: "admin" | "gestionnaire" | "lecteur";
  actif: boolean;
  date_creation: string;
}
