import type { IncidentStatut, IncidentPriorite } from "@/types/incident";

export const STATUT_CONFIG: Record<IncidentStatut, { label: string; bg: string; color: string }> = {
  nouveau:       { label: "Nouveau",       bg: "bg-blue-50",   color: "text-blue-700" },
  en_diagnostic: { label: "En diagnostic", bg: "bg-purple-50", color: "text-purple-700" },
  en_cours:      { label: "En cours",      bg: "bg-orange-50", color: "text-orange-700" },
  resolu:        { label: "Résolu",        bg: "bg-green-50",  color: "text-green-700" },
  ferme:         { label: "Fermé",         bg: "bg-gray-50",   color: "text-gray-700" },
};

export const PRIORITE_CONFIG: Record<IncidentPriorite, { label: string; color: string }> = {
  basse:    { label: "Basse",    color: "text-gray-500" },
  normale:  { label: "Normale",  color: "text-yellow-600" },
  haute:    { label: "Haute",    color: "text-orange-600" },
  urgente:  { label: "Urgente",  color: "text-red-600" },
};

export const FILTRES_STATUT: { value: IncidentStatut | "tous"; label: string }[] = [
  { value: "tous",          label: "Tous" },
  { value: "nouveau",       label: "Nouveaux" },
  { value: "en_diagnostic", label: "En diagnostic" },
  { value: "en_cours",      label: "En cours" },
  { value: "resolu",        label: "Résolus" },
  { value: "ferme",         label: "Fermés" },
];
