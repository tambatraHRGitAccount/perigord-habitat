import equipementsData from '@/data/equipements.json';
import type { Equipement, EquipementsData } from '@/types/equipement';

const data = equipementsData as EquipementsData;

/**
 * Récupère un équipement par son ID
 */
export function getEquipementById(id: string): Equipement | undefined {
  return data.equipements.find(eq => eq.id === id);
}

/**
 * Récupère tous les équipements d'une pièce
 */
export function getEquipementsByPiece(piece: string): Equipement[] {
  return data.equipements.filter(eq => eq.piece === piece);
}

/**
 * Récupère tous les équipements
 */
export function getAllEquipements(): Equipement[] {
  return data.equipements;
}

/**
 * Récupère le nom d'un équipement par son ID
 */
export function getEquipementNom(id: string): string {
  const equipement = getEquipementById(id);
  return equipement?.nom || 'Équipement inconnu';
}
