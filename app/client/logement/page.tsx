"use client";

import { useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { Button } from "@/components/ui/button";

type View = "plan" | "chambre" | "cuisine" | "salle-eau" | "salon";

const VIEWS: Record<View, { label: string; url: string }> = {
  plan: { label: "Plan général", url: "/svghouse/index_mae.html" },
  chambre: { label: "Chambre", url: "/svghouse/chambre.html" },
  cuisine: { label: "Cuisine", url: "/svghouse/cuisine.html" },
  "salle-eau": { label: "Salle d'eau", url: "/svghouse/salle-eau.html" },
  salon: { label: "Salon", url: "/svghouse/salon.html" },
};

export default function LogementPage() {
  const [view, setView] = useState<View>("plan");

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <HeaderApp />

      {/* Navigation */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-white border-b border-gray-100">
        {view !== "plan" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView("plan")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Retour au plan
          </Button>
        )}
        
        <div className="flex items-center gap-2 ml-auto">
          <Home size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{VIEWS[view].label}</span>
        </div>
      </div>

      {/* Iframe du plan SVG */}
      <div className="flex-1 relative bg-white">
        <iframe
          key={view}
          src={VIEWS[view].url}
          className="absolute inset-0 w-full h-full border-0"
          title={VIEWS[view].label}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
