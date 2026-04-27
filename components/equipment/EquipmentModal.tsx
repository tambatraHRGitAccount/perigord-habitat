"use client";

import { Wrench, X } from "lucide-react";
import type { Equipment } from "@/types/equipment";
import { typeRemarqueConfig } from "./equipmentTypeConfig";

interface EquipmentModalProps {
  equipment: Equipment;
  onClose: () => void;
}

export function EquipmentModal({ equipment, onClose }: EquipmentModalProps) {
  const config = typeRemarqueConfig[equipment.typeRemarque];
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">{equipment.nom}</h2>
            <p className="text-gray-500 text-sm">{equipment.piece}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Infos principales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Responsable</p>
              <p className="font-bold text-gray-900">{equipment.responsable}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Charge locative</p>
              <p className={`font-bold text-lg ${equipment.chargeLocative ? "text-blue-600" : "text-orange-600"}`}>
                {equipment.chargeLocative ? "OUI" : "NON"}
              </p>
            </div>
          </div>

          {/* Badge type */}
          <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${config.color}`}>
            <Icon size={22} />
            <span className="font-bold">{config.label}</span>
          </div>

          {/* Contrat maintenance */}
          {equipment.contratMaintenance && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="text-purple-600" size={18} />
                <h3 className="font-bold text-purple-900">Contrat de maintenance</h3>
              </div>
              <p className="text-sm text-purple-700">
                Cet équipement peut être couvert par un contrat de maintenance collectif.
              </p>
            </div>
          )}

          {/* Référence légale */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-2">Référence légale</h3>
            <p className="text-sm text-blue-700 leading-relaxed">{equipment.referenceLegale}</p>
          </div>

          {/* Remarque pratique */}
          <div className={`border-2 rounded-xl p-4 ${config.remarkBg} ${config.remarkBorder}`}>
            <h3 className={`font-bold mb-2 ${config.remarkTitle}`}>Remarque pratique</h3>
            <p className={`text-sm leading-relaxed ${config.remarkText}`}>{equipment.remarque}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
