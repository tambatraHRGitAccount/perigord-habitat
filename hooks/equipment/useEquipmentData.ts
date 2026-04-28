"use client";

import { useState } from "react";
import type { Equipment } from "@/types/equipment";
import equipementsData from "@/data/equipements.json";

export function useEquipmentData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPiece, setSelectedPiece] = useState<string>("all");

  const equipments = equipementsData.equipements as Equipment[];
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

  return {
    equipments,
    pieces,
    filteredEquipments,
    searchQuery,
    setSearchQuery,
    selectedPiece,
    setSelectedPiece,
  };
}
