"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { DashboardLayout } from "@/components/tableau_de_bord/DashboardLayout";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { EquipmentModal } from "@/components/equipment/EquipmentModal";
import { useEquipmentData } from "@/hooks/equipment/useEquipmentData";
import type { Equipment } from "@/types/equipment";

export default function EquipmentPage() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const {
    equipments,
    pieces,
    filteredEquipments,
    searchQuery,
    setSearchQuery,
    selectedPiece,
    setSelectedPiece,
  } = useEquipmentData();

  return (
    <DashboardLayout title="Équipements" description="Gérer les équipements des logements">
      <div className="w-full">

        <EquipmentFilters
          equipments={equipments}
          pieces={pieces}
          searchQuery={searchQuery}
          selectedPiece={selectedPiece}
          filteredCount={filteredEquipments.length}
          onSearchChange={setSearchQuery}
          onPieceChange={setSelectedPiece}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onClick={setSelectedEquipment}
            />
          ))}
        </div>

        {filteredEquipments.length === 0 && (
          <div className="text-center py-16">
            <Package className="mx-auto text-gray-300 mb-4" size={52} />
            <p className="text-gray-500 font-medium">Aucun équipement trouvé</p>
          </div>
        )}

        {selectedEquipment && (
          <EquipmentModal
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
          />
        )}

      </div>
    </DashboardLayout>
  );
}
