"use client";

import { Package, Wrench, Info, Pencil } from "lucide-react";
import type { Equipment } from "@/types/equipment";
import { typeRemarqueConfig } from "./equipmentTypeConfig";

interface EquipmentCardProps {
  equipment: Equipment;
  onDetails: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
}

export function EquipmentCard({ equipment, onDetails, onEdit }: EquipmentCardProps) {
  const config = typeRemarqueConfig[equipment.typeRemarque];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6">

        {/* Header card */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <Package className="text-indigo-600" size={26} />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${config.color}`}>
            <Icon size={14} />
            {config.label}
          </span>
        </div>

        {/* Nom */}
        <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{equipment.nom}</h3>

        {/* Infos */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Pièce</span>
            <span className="font-semibold text-gray-900">{equipment.piece}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Responsable</span>
            <span className="font-semibold text-gray-900">{equipment.responsable}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Charge locative</span>
            <span className={`font-bold ${equipment.chargeLocative ? "text-blue-600" : "text-orange-600"}`}>
              {equipment.chargeLocative ? "OUI" : "NON"}
            </span>
          </div>

          {/* Badge contrat maintenance */}
          {equipment.contratMaintenance && (
            <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg mt-1">
              <Wrench size={13} />
              <span className="font-medium">Contrat maintenance</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer boutons ────────────────────────────────────────────────── */}
      <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
        <button
          onClick={() => onDetails(equipment)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-gray-100 hover:bg-gray-200 active:bg-gray-300
            text-gray-800 font-semibold text-sm
            transition-all duration-150 hover:scale-[1.02] active:scale-95"
        >
          <Info size={15} />
          Détails
        </button>
        <button
          onClick={() => onEdit(equipment)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
            text-white font-semibold text-sm
            transition-all duration-150 hover:scale-[1.02] active:scale-95"
        >
          <Pencil size={15} />
          Modifier
        </button>
      </div>

    </div>
  );
}
