"use client";

import { Package, Wrench, Info } from "lucide-react";
import type { Equipment } from "@/types/equipment";
import { typeRemarqueConfig } from "./equipmentTypeConfig";

interface EquipmentCardProps {
  equipment: Equipment;
  onClick: (equipment: Equipment) => void;
}

export function EquipmentCard({ equipment, onClick }: EquipmentCardProps) {
  const config = typeRemarqueConfig[equipment.typeRemarque];
  const Icon = config.icon;

  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(equipment)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Package className="text-indigo-600" size={26} />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${config.color}`}>
          <Icon size={14} />
          {config.label}
        </span>
      </div>

      <h3 className="text-xl font-black text-gray-900 mb-2">{equipment.nom}</h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Pièce</span>
          <span className="font-medium text-gray-900">{equipment.piece}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Responsable</span>
          <span className="font-medium text-gray-900">{equipment.responsable}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Charge locative</span>
          <span className={`font-bold ${equipment.chargeLocative ? "text-blue-600" : "text-orange-600"}`}>
            {equipment.chargeLocative ? "OUI" : "NON"}
          </span>
        </div>
        {equipment.contratMaintenance && (
          <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg mt-2">
            <Wrench size={14} />
            <span className="font-medium">Contrat maintenance</span>
          </div>
        )}
      </div>

      <button className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-colors flex items-center justify-center gap-2">
        <Info size={16} />
        Voir les détails
      </button>
    </div>
  );
}
