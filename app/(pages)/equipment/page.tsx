"use client";

import { Package, Plus, Search } from "lucide-react";
import { DashboardLayout } from "@/components/tableau_de_bord/DashboardLayout";
import { useState } from "react";

interface Equipment {
  id: string;
  name: string;
  category: string;
  room: string;
  status: "good" | "warning" | "error";
  lastMaintenance: string;
}

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Données d'exemple
  const equipments: Equipment[] = [
    {
      id: "1",
      name: "Lave-vaisselle",
      category: "Électroménager",
      room: "Cuisine",
      status: "good",
      lastMaintenance: "15/03/2024"
    },
    {
      id: "2",
      name: "Chaudière",
      category: "Chauffage",
      room: "Buanderie",
      status: "warning",
      lastMaintenance: "10/01/2024"
    },
    {
      id: "3",
      name: "Réfrigérateur",
      category: "Électroménager",
      room: "Cuisine",
      status: "good",
      lastMaintenance: "20/02/2024"
    },
    {
      id: "4",
      name: "Chauffe-eau",
      category: "Plomberie",
      room: "Salle de bain",
      status: "error",
      lastMaintenance: "05/12/2023"
    }
  ];

  const statusConfig = {
    good: {
      label: "Bon état",
      color: "bg-green-100 text-green-700 border-green-300"
    },
    warning: {
      label: "Attention",
      color: "bg-orange-100 text-orange-700 border-orange-300"
    },
    error: {
      label: "Problème",
      color: "bg-red-100 text-red-700 border-red-300"
    }
  };

  const filteredEquipments = equipments.filter(eq =>
    eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    eq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    eq.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Équipements" description="Gérer les équipements de votre logement">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Recherche */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Bouton ajouter */}
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Plus size={20} />
            Ajouter un équipement
          </button>
        </div>

        {/* Liste des équipements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((equipment) => (
            <div
              key={equipment.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Package className="text-indigo-600" size={26} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${statusConfig[equipment.status].color}`}>
                  {statusConfig[equipment.status].label}
                </span>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-2">{equipment.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Catégorie</span>
                  <span className="font-medium text-gray-900">{equipment.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pièce</span>
                  <span className="font-medium text-gray-900">{equipment.room}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Dernier entretien</span>
                  <span className="font-medium text-gray-900">{equipment.lastMaintenance}</span>
                </div>
              </div>

              <button className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-colors">
                Voir les détails
              </button>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredEquipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium">Aucun équipement trouvé</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
