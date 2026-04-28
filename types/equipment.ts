export interface Equipment {
  id: string;
  piece: string;
  nom: string;
  chargeLocative: boolean;
  responsable: string;
  contratMaintenance: boolean;
  referenceLegale: string;
  remarque: string;
  typeRemarque: "locataire" | "bailleur" | "contrat";
}

export type TypeRemarque = Equipment["typeRemarque"];
