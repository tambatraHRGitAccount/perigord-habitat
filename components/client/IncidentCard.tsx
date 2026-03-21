import { Calendar, MapPin } from "lucide-react";
import { STATUT_CONFIG, PRIORITE_CONFIG } from "@/config/incident.config";
import type { Incident } from "@/types/incident";

interface Props {
  incident: Incident;
  onClick?: () => void;
}

export function IncidentCard({ incident, onClick }: Props) {
  const statut = STATUT_CONFIG[incident.statut];
  const priorite = PRIORITE_CONFIG[incident.priorite];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 ${
        onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h2 className="font-semibold text-gray-900">{incident.titre}</h2>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold ${priorite.color}`}>
            ● {priorite.label}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statut.bg} ${statut.color}`}>
            {statut.label}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{incident.description}</p>
      <div className="flex flex-wrap gap-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin size={13} /> {incident.piece}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={13} /> {new Date(incident.date_creation).toLocaleDateString("fr-FR")}
        </span>
      </div>
    </div>
  );
}
