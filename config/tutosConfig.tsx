import { 
  Droplet, 
  Zap, 
  Flame, 
  Wind, 
  Sparkles,
  BookOpenCheck,
  Leaf,
  Shield
} from "lucide-react";
import type { NoticeCategorie, NoticeType } from "@/types/notice";

export const CATEGORIE_CONFIG: Record<
  NoticeCategorie,
  { color: string; bg: string; icon: any }
> = {
  Plomberie: { color: "text-blue-600", bg: "bg-blue-50", icon: Droplet },
  Électricité: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Zap },
  Chauffage: { color: "text-red-600", bg: "bg-red-50", icon: Flame },
  Ventilation: { color: "text-cyan-600", bg: "bg-cyan-50", icon: Wind },
  Entretien: { color: "text-green-600", bg: "bg-green-50", icon: Sparkles },
};

export const TYPE_CONFIG: Record<
  NoticeType,
  { label: string; icon: any; color: string }
> = {
  tutoriel: {
    label: "Tutoriel",
    icon: BookOpenCheck,
    color: "text-blue-600 bg-blue-50",
  },
  ecogeste: {
    label: "Écogeste",
    icon: Leaf,
    color: "text-green-600 bg-green-50",
  },
  prevention: {
    label: "Prévention",
    icon: Shield,
    color: "text-orange-600 bg-orange-50",
  },
};

export function getCategorieConfig(categorie: NoticeCategorie) {
  return CATEGORIE_CONFIG[categorie];
}

export function getTypeConfig(type: NoticeType) {
  return TYPE_CONFIG[type];
}
