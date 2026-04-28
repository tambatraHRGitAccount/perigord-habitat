export interface Equipement {
  id: string;
  piece: string;
  nom: string;
  chargeLocative: boolean;
  responsable: string;
  contratMaintenance: boolean;
  referenceLegale: string;
  remarque: string;
  typeRemarque: 'bailleur' | 'locataire' | 'contrat';
}

export interface EquipementsData {
  equipements: Equipement[];
}
