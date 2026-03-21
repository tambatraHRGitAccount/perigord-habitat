"use client";

import { useState, useEffect } from "react";
import { Home, ArrowLeft, List } from "lucide-react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { Button } from "@/components/ui/button";
import { PanneDetailModal } from "@/components/client/PanneDetailModal";
import { PANNES_PAR_ZONE, PANNES } from "@/data/pannes";
import { EQUIPEMENT_TO_PANNE } from "@/data/equipement-panne-mapping";
import type { Panne } from "@/types/panne";
import { INTERVENANT_CONFIG } from "@/types/panne";

type View = "plan" | "chambre" | "cuisine" | "salle-eau" | "salon" | "pannes";
type ZoneKey = "cuisine" | "sejour" | "salle_de_bain" | "exterieur" | "chambre";

const VIEWS: Record<View, { label: string; url?: string; zone?: ZoneKey }> = {
  plan: { label: "Plan général", url: "/svghouse/index_mae.html" },
  chambre: { label: "Chambre", url: "/svghouse/chambre.html", zone: "chambre" },
  cuisine: { label: "Cuisine", url: "/svghouse/cuisine.html", zone: "cuisine" },
  "salle-eau": { label: "Salle d'eau", url: "/svghouse/salle-eau.html", zone: "salle_de_bain" },
  salon: { label: "Salon", url: "/svghouse/salon.html", zone: "sejour" },
  pannes: { label: "Liste des pannes" },
};

export default function LogementPage() {
  const [view, setView] = useState<View>("plan");
  const [selectedPanne, setSelectedPanne] = useState<Panne | null>(null);

  const currentZone = VIEWS[view].zone;
  const pannesZone = currentZone ? PANNES_PAR_ZONE[currentZone] : [];

  // Debug: afficher la vue actuelle
  useEffect(() => {
    console.log("Vue actuelle:", view);
    console.log("Bouton Home devrait s'afficher:", view !== "plan");
  }, [view]);

  // Écouter les clics sur les équipements depuis l'iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Message reçu:", event.data);
      
      // Clic sur une pièce dans le plan
      if (event.data?.type === "room-click") {
        const room = event.data.room as View;
        console.log("Pièce cliquée:", room);
        setView(room);
        return;
      }
      
      // Clic sur un équipement
      if (event.data?.type === "equipement-click") {
        const equipementLabel = event.data.label;
        console.log("Équipement cliqué:", equipementLabel);
        
        const panneId = EQUIPEMENT_TO_PANNE[equipementLabel];
        console.log("Panne ID trouvé:", panneId);
        
        if (panneId) {
          const panne = PANNES.find(p => p.id === panneId);
          console.log("Panne trouvée:", panne);
          
          if (panne) {
            setSelectedPanne(panne);
          }
        } else {
          console.warn("Aucune panne trouvée pour:", equipementLabel);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <HeaderApp />

      {/* Contenu */}
      {view === "pannes" && currentZone ? (
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pannes courantes - {VIEWS[view].label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pannesZone.map((panne) => {
                const config = INTERVENANT_CONFIG[panne.intervenant];
                return (
                  <button
                    key={panne.id}
                    onClick={() => setSelectedPanne(panne)}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{config.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{panne.nom}</h3>
                        <p className={`text-xs mt-1 font-medium ${config.color}`}>
                          {config.label}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 relative bg-white">
          <iframe
            key={view}
            src={VIEWS[view].url}
            className="absolute inset-0 w-full h-full border-0"
            title={VIEWS[view].label}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
          
          {/* Bouton flottant pour revenir au plan principal */}
          {(() => {
            const shouldShow = view !== "plan";
            console.log("Condition bouton Home - view:", view, "shouldShow:", shouldShow);
            
            if (shouldShow) {
              console.log("✅ Bouton Home AFFICHÉ");
              return (
                <button
                  onClick={() => {
                    console.log("Clic sur bouton home, view actuelle:", view);
                    setView("plan");
                  }}
                  className="absolute bottom-4 right-4 h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 flex items-center justify-center pointer-events-auto border border-gray-200"
                  style={{ zIndex: 10000 }}
                >
                  <Home size={20} />
                </button>
              );
            } else {
              console.log("❌ Bouton Home MASQUÉ");
              return null;
            }
          })()}
        </div>
      )}

      {/* Modal détail panne */}
      <PanneDetailModal
        panne={selectedPanne}
        open={!!selectedPanne}
        onClose={() => setSelectedPanne(null)}
      />
    </div>
  );
}
