"use client";

import { useState } from "react";
import { X, Save, Package } from "lucide-react";
import type { Equipment, TypeRemarque } from "@/types/equipment";

interface EquipmentEditModalProps {
  equipment: Equipment;
  pieces: string[];
  onClose: () => void;
  onSave: (updated: Equipment) => Promise<void>;
  saving?: boolean;
  saveError?: string | null;
}

const TYPE_REMARQUE_OPTIONS: { value: TypeRemarque; label: string }[] = [
  { value: "locataire", label: "Charge locataire" },
  { value: "bailleur",  label: "Charge bailleur"  },
  { value: "contrat",   label: "Contrat maintenance" },
];

export function EquipmentEditModal({ equipment, pieces, onClose, onSave, saving = false, saveError }: EquipmentEditModalProps) {
  const [form, setForm] = useState<Equipment>({ ...equipment });
  const [isDirty, setIsDirty] = useState(false);

  function set<K extends keyof Equipment>(key: K, value: Equipment[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Package className="text-indigo-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">Modifier l'équipement</h2>
              <p className="text-xs text-gray-400">{equipment.piece}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Form ───────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

            {/* Nom */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Nom de l'équipement
              </label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => set("nom", e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 font-medium transition-colors"
              />
            </div>

            {/* Pièce */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Pièce
              </label>
              <select
                value={form.piece}
                onChange={(e) => set("piece", e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 font-medium transition-colors bg-white"
              >
                {pieces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Responsable */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Responsable
              </label>
              <input
                type="text"
                value={form.responsable}
                onChange={(e) => set("responsable", e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 font-medium transition-colors"
              />
            </div>

            {/* Type remarque */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Type de charge
              </label>
              <select
                value={form.typeRemarque}
                onChange={(e) => set("typeRemarque", e.target.value as TypeRemarque)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 font-medium transition-colors bg-white"
              >
                {TYPE_REMARQUE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-indigo-300 transition-colors">
                <span className="text-sm font-semibold text-gray-700">Charge locative</span>
                <button
                  type="button"
                  onClick={() => set("chargeLocative", !form.chargeLocative)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    form.chargeLocative ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    form.chargeLocative ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </label>

              <label className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-indigo-300 transition-colors">
                <span className="text-sm font-semibold text-gray-700">Contrat maintenance</span>
                <button
                  type="button"
                  onClick={() => set("contratMaintenance", !form.contratMaintenance)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    form.contratMaintenance ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    form.contratMaintenance ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </label>
            </div>

            {/* Référence légale */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Référence légale
              </label>
              <textarea
                value={form.referenceLegale}
                onChange={(e) => set("referenceLegale", e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 text-sm transition-colors resize-none"
              />
            </div>

            {/* Remarque pratique */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Remarque pratique
              </label>
              <textarea
                value={form.remarque}
                onChange={(e) => set("remarque", e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 text-sm transition-colors resize-none"
              />
            </div>

          </div>

          {/* ── Footer ─────────────────────────────────────────────────────── */}
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col gap-3 shrink-0">

            {/* Message d'erreur */}
            {saveError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                ⚠️ {saveError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-sm transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!isDirty || saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                  bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-200 disabled:text-gray-400
                  text-white font-semibold text-sm transition-colors"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Enregistrement…
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
