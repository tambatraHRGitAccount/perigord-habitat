export type IncidentStatut = "nouveau" | "en_diagnostic" | "en_cours" | "resolu" | "ferme";
export type IncidentPriorite = "basse" | "normale" | "haute" | "urgente";
export type IncidentTypeSinistre = "sinistre" | "vandalisme" | "vetuste";
export type IncidentResponsable = "locataire" | "bailleur" | "contrat" | "a_verifier";

export interface Incident {
  id: number;
  bailleur_id: number;
  locataire_id: number;
  logement_id: number;
  panne_id?: number;
  titre: string;
  description: string;
  statut: IncidentStatut;
  priorite: IncidentPriorite;
  type_sinistre?: IncidentTypeSinistre;
  piece: string;
  responsable_identifie?: IncidentResponsable;
  diagnostic_ia?: any;
  preuves?: string[];
  date_creation: string;
  date_modification: string;
  date_resolution?: string;
}

export interface CreateIncidentDTO {
  titre: string;
  description: string;
  priorite: IncidentPriorite;
  type_sinistre?: IncidentTypeSinistre;
  piece: string;
  preuves?: string[];
}
