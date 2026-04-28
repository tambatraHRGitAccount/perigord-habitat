import { CheckCircle, AlertCircle, Wrench, LucideIcon } from "lucide-react";
import type { TypeRemarque } from "@/types/equipment";

export interface TypeConfig {
  label: string;
  color: string;
  badgeColor: string;
  remarkBg: string;
  remarkBorder: string;
  remarkTitle: string;
  remarkText: string;
  icon: LucideIcon;
}

export const typeRemarqueConfig: Record<TypeRemarque, TypeConfig> = {
  locataire: {
    label: "Charge locataire",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    badgeColor: "bg-blue-600 text-white",
    remarkBg: "bg-blue-50",
    remarkBorder: "border-blue-200",
    remarkTitle: "text-blue-900",
    remarkText: "text-blue-700",
    icon: CheckCircle,
  },
  bailleur: {
    label: "Charge bailleur",
    color: "bg-orange-100 text-orange-700 border-orange-300",
    badgeColor: "bg-orange-600 text-white",
    remarkBg: "bg-orange-50",
    remarkBorder: "border-orange-200",
    remarkTitle: "text-orange-900",
    remarkText: "text-orange-700",
    icon: AlertCircle,
  },
  contrat: {
    label: "Contrat maintenance",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    badgeColor: "bg-purple-600 text-white",
    remarkBg: "bg-purple-50",
    remarkBorder: "border-purple-200",
    remarkTitle: "text-purple-900",
    remarkText: "text-purple-700",
    icon: Wrench,
  },
};
