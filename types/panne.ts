export type IntervenantType = "locataire" | "bailleur" | "contrat" | "a_verifier";
export type PayeurType = "locataire" | "bailleur" | "bailleur_recuperable";
export type ZoneType = "cuisine" | "sejour" | "salle_de_bain" | "exterieur" | "chambre";

export interface Panne {
  id: string;
  nom: string;
  zone: ZoneType;
  intervenant: IntervenantType;
  payeur: PayeurType;
  raison: string;
  diagnostic: string[];
}

export const INTERVENANT_CONFIG: Record<IntervenantType, { label: string; emoji: string; color: string; bg: string }> = {
  locataire: { label: "Locataire", emoji: "🟠", color: "text-orange-700", bg: "bg-orange-50" },
  bailleur: { label: "Bailleur", emoji: "🔴", color: "text-red-700", bg: "bg-red-50" },
  contrat: { label: "Contrat d'entretien", emoji: "🔵", color: "text-blue-700", bg: "bg-blue-50" },
  a_verifier: { label: "À vérifier", emoji: "⚪", color: "text-gray-700", bg: "bg-gray-50" },
};

export const PAYEUR_CONFIG: Record<PayeurType, { label: string }> = {
  locataire: { label: "Locataire" },
  bailleur: { label: "Bailleur" },
  bailleur_recuperable: { label: "Bailleur (récupérable via charges)" },
};
