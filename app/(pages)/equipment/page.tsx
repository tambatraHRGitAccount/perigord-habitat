"use client";

import { Package, Plus, Search, AlertCircle, CheckCircle, Wrench, Info } from "lucide-react";
import { DashboardLayout } from "@/components/tableau_de_bord/DashboardLayout";
import { useState } from "react";
import equipementsData from "@/data/equipements.json";

interface Equipment {
  id: string;
  piece: string;
  nom: string;
  chargeLocative: boolean;
  responsable: string;
  contratMaintenance: boolean;
  referenceLegale: string;
  remarque: string;
  typeRemarque: "locataire" | "bailleur" | "contrat";
}

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPiece, setSelectedPiece] = useState<string>("all");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  // Charger les données depuis le JSON
  const equipments = equipementsData.equipements as Equipment[];

  // Extraire les pièces uniques
  const pieces = Array.from(new Set(equipments.map(eq => eq.piece)));

  const typeRemarqueConfig = {
    locataire: {
      label: "Charge locataire",
      color: "bg-blue-100 text-blue-700 border-blue-300",
      icon: CheckCircle
    },
    bailleur: {
      label: "Charge bailleur",
      color: "bg-orange-100 text-orange-700 border-orange-300",
      icon: AlertCircle
    },
    contrat: {
      label: "Contrat maintenance",
      color: "bg-purple-100 text-purple-700 border-purple-300",
      icon: Wrench
    }
  };

  const filteredEquipments = equipments.filter(eq => {
    const matchSearch = 
      eq.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.piece.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.responsable.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchPiece = selectedPiece === "all" || eq.piece === selectedPiece;
    
    return matchSearch && matchPiece;
  });

  return (
    <DashboardLayout title="Équipements" description="Gérer les équipements des logements">
      <div className="max-w-7xl mx-auto">
        
        {/* Actions - Sticky */}
        <div className="sticky top-0 z-30 bg-gray-50 pb-6 -mt-8 pt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="bg-white rounded-2xl p-4 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              {/* Recherche */}
              <div className="relative flex-1 max-w-md w-full">
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
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                <Plus size={20} />
                Ajouter un équipement
              </button>
            </div>

            {/* Filtres par pièce */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPiece("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedPiece === "all"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Toutes les pièces ({equipments.length})
              </button>
              {pieces.map((piece) => (
                <button
                  key={piece}
                  onClick={() => setSelectedPiece(piece)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPiece === piece
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {piece} ({equipments.filter(e => e.piece === piece).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des équipements */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((equipment) => {
            const Icon = typeRemarqueConfig[equipment.typeRemarque].icon;
            
            return (
              <div
                key={equipment.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedEquipment(equipment)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Package className="text-indigo-600" size={26} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${typeRemarqueConfig[equipment.typeRemarque].color}`}>
                    <Icon size={14} />
                    {typeRemarqueConfig[equipment.typeRemarque].label}
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
                    <span className={`font-bold ${equipment.chargeLocative ? 'text-blue-600' : 'text-orange-600'}`}>
                      {equipment.chargeLocative ? 'OUI' : 'NON'}
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
          })}
        </div>

        {/* Message si aucun résultat */}
        {filteredEquipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 font-medium">Aucun équipement trouvé</p>
          </div>
        )}

        {/* Modal détails équipement */}
        {selectedEquipment && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEquipment(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedEquipment.nom}</h2>
                  <p className="text-gray-600">{selectedEquipment.piece}</p>
                </div>
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Informations principales */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Responsable</p>
                    <p className="font-bold text-gray-900">{selectedEquipment.responsable}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Charge locative</p>
                    <p className={`font-bold ${selectedEquipment.chargeLocative ? 'text-blue-600' : 'text-orange-600'}`}>
                      {selectedEquipment.chargeLocative ? 'OUI' : 'NON'}
                    </p>
                  </div>
                </div>

                {/* Badge type */}
                <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${typeRemarqueConfig[selectedEquipment.typeRemarque].color}`}>
                  {(() => {
                    const Icon = typeRemarqueConfig[selectedEquipment.typeRemarque].icon;
                    return <Icon size={24} />;
                  })()}
                  <span className="font-bold">{typeRemarqueConfig[selectedEquipment.typeRemarque].label}</span>
                </div>

                {/* Contrat maintenance */}
                {selectedEquipment.contratMaintenance && (
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="text-purple-600" size={20} />
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
                  <p className="text-sm text-blue-700 leading-relaxed">{selectedEquipment.referenceLegale}</p>
                </div>

                {/* Remarque pratique */}
                <div className={`border-2 rounded-xl p-4 ${
                  selectedEquipment.typeRemarque === 'bailleur' 
                    ? 'bg-orange-50 border-orange-200' 
                    : selectedEquipment.typeRemarque === 'contrat'
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <h3 className={`font-bold mb-2 ${
                    selectedEquipment.typeRemarque === 'bailleur' 
                      ? 'text-orange-900' 
                      : selectedEquipment.typeRemarque === 'contrat'
                      ? 'text-purple-900'
                      : 'text-blue-900'
                  }`}>
                    Remarque pratique
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    selectedEquipment.typeRemarque === 'bailleur' 
                      ? 'text-orange-700' 
                      : selectedEquipment.typeRemarque === 'contrat'
                      ? 'text-purple-700'
                      : 'text-blue-700'
                  }`}>
                    {selectedEquipment.remarque}
                  </p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
