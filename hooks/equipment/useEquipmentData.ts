"use client";

import { useState } from "react";
import type { Equipment } from "@/types/equipment";
import equipementsData from "@/data/equipements.json";

export function useEquipmentData() {
  const [equipments, setEquipments] = useState<Equipment[]>(
    equipementsData.equipements as Equipment[]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPiece, setSelectedPiece] = useState<string>("all");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const pieces = Array.from(new Set(equipments.map((eq) => eq.piece)));

  const filteredEquipments = equipments.filter((eq) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      eq.nom.toLowerCase().includes(q) ||
      eq.piece.toLowerCase().includes(q) ||
      eq.responsable.toLowerCase().includes(q);
    const matchPiece = selectedPiece === "all" || eq.piece === selectedPiece;
    return matchSearch && matchPiece;
  });

  async function updateEquipment(updated: Equipment): Promise<boolean> {
    setSaving(true);
    setSaveError(null);

    // Mise à jour optimiste — l'UI se rafraîchit immédiatement
    setEquipments((prev) =>
      prev.map((eq) => (eq.id === updated.id ? updated : eq))
    );

    try {
      const res = await fetch("/api/equipements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erreur serveur");
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setSaveError(message);

      // Rollback — on remet l'ancienne valeur
      setEquipments((prev) =>
        prev.map((eq) => (eq.id === updated.id ? (equipementsData.equipements as Equipment[]).find((e) => e.id === eq.id) ?? eq : eq))
      );

      return false;
    } finally {
      setSaving(false);
    }
  }

  return {
    equipments,
    pieces,
    filteredEquipments,
    searchQuery,
    setSearchQuery,
    selectedPiece,
    setSelectedPiece,
    updateEquipment,
    saving,
    saveError,
  };
}
