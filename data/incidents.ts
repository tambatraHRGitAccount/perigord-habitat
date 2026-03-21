import type { Incident, IncidentStatut, IncidentPriorite } from "@/types/incident";

export const STATUT_CONFIG: Record<IncidentStatut, { label: string; color: string; bg: string }> = {
  nouveau:       { label: "Nouveau",       color: "text-orange-600", bg: "bg-orange-50"  },
  en_diagnostic: { label: "En diagnostic", color: "text-purple-600", bg: "bg-purple-50"  },
  en_cours:      { label: "En cours",      color: "text-blue-600",   bg: "bg-blue-50"    },
  resolu:        { label: "Résolu",        color: "text-green-600",  bg: "bg-green-50"   },
  ferme:         { label: "Fermé",         color: "text-gray-500",   bg: "bg-gray-100"   },
};

export const PRIORITE_CONFIG: Record<IncidentPriorite, { label: string; color: string }> = {
  basse:    { label: "Basse",    color: "text-gray-500"   },
  normale:  { label: "Normale",  color: "text-yellow-600" },
  haute:    { label: "Haute",    color: "text-orange-600" },
  urgente:  { label: "Urgente",  color: "text-red-600"    },
};

export const INCIDENTS: Partial<Incident>[] = [
  { id: 1, titre: "Fuite d'eau cuisine",          statut: "en_cours", priorite: "haute",   piece: "Cuisine",       description: "Fuite sous l'évier, eau qui s'écoule en permanence.",              date_creation: "2026-03-19" },
  { id: 2, titre: "Volet bloqué",                 statut: "nouveau",  priorite: "normale",  piece: "Chambre",       description: "Le volet roulant de la chambre est bloqué en position mi-ouverte.", date_creation: "2026-03-18" },
  { id: 3, titre: "Chauffage insuffisant",         statut: "en_cours", priorite: "haute",   piece: "Salon",         description: "Le radiateur du salon ne chauffe plus correctement.",               date_creation: "2026-03-17" },
  { id: 4, titre: "Prise électrique HS",          statut: "nouveau",  priorite: "normale",  piece: "Salon",         description: "La prise murale près de la fenêtre ne fonctionne plus.",            date_creation: "2026-03-16" },
  { id: 5, titre: "Robinet qui goutte",            statut: "resolu",   priorite: "basse",   piece: "Salle de bain", description: "Le robinet du lavabo gouttait, joint remplacé.",                    date_creation: "2026-03-10" },
  { id: 6, titre: "Serrure difficile",             statut: "resolu",   priorite: "normale",  piece: "Entrée",        description: "La serrure de la porte d'entrée était difficile à manœuvrer.",     date_creation: "2026-03-05" },
  { id: 7, titre: "Détecteur de fumée défaillant", statut: "ferme",    priorite: "urgente", piece: "Salon",         description: "Détecteur remplacé par le propriétaire.",                          date_creation: "2026-02-28" },
];
