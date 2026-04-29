"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Package } from "lucide-react";
import { DashboardLayout } from "@/components/tableau_de_bord/DashboardLayout";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { EquipmentModal } from "@/components/equipment/EquipmentModal";
import { EquipmentEditModal } from "@/components/equipment/EquipmentEditModal";
import { useEquipmentData } from "@/hooks/equipment/useEquipmentData";
import type { Equipment } from "@/types/equipment";

export default function EquipmentPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const role = user.user_metadata?.role ?? user.app_metadata?.role;

      if (role !== "bailleur") {
        router.push("/not-authorized");
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [router]);

  const {
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
  } = useEquipmentData();

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredEquipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onDetails={setSelectedEquipment}
              onEdit={setEditingEquipment}
            />
          ))}
        </div>

        {filteredEquipments.length === 0 && (
          <div className="text-center py-16">
            <Package className="mx-auto text-gray-300 mb-4" size={52} />
            <p className="text-gray-500 font-medium">Aucun équipement trouvé</p>
          </div>
        )}

        {/* Modal Détails */}
        {selectedEquipment && (
          <EquipmentModal
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
          />
        )}

        {/* Modal Modifier */}
        {editingEquipment && (
          <EquipmentEditModal
            equipment={editingEquipment}
            pieces={pieces}
            onClose={() => setEditingEquipment(null)}
            onSave={async (updated) => {
              const ok = await updateEquipment(updated);
              if (ok) setEditingEquipment(null);
            }}
            saving={saving}
            saveError={saveError}
          />
        )}

      </div>
    </DashboardLayout>
  );
}
