"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { ArrowLeft, Calendar, Info, AlertTriangle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VetustePage() {
  const vetusteData = [
    { element: "Peintures intérieures", duree: "7 ans", franchise: "1ère année" },
    { element: "Papier peint", duree: "10 ans", franchise: "1ère année" },
    { element: "Revêtement de sol souple (lino)", duree: "10 ans", franchise: "1ère année" },
    { element: "Moquette", duree: "7 ans", franchise: "1ère année" },
    { element: "Parquet (vitrification)", duree: "10 ans", franchise: "1ère année" },
    { element: "Faïence murale", duree: "25 ans", franchise: "2 ans" },
    { element: "Robinetterie", duree: "20 ans", franchise: "2 ans" },
    { element: "Chauffe-eau électrique", duree: "15 ans", franchise: "2 ans" },
    { element: "Volets / stores", duree: "20 ans", franchise: "2 ans" },
    { element: "Éléments de cuisine équipée", duree: "15 ans", franchise: "2 ans" },
    { element: "Fenêtres double vitrage", duree: "30 ans", franchise: "3 ans" },
    { element: "Sanitaires (baignoire, WC)", duree: "25 ans", franchise: "3 ans" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/client/qui-fait-quoi" className="gap-2">
            <ArrowLeft size={16} />
            Retour
          </Link>
        </Button>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Grille de vétusté</h1>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              La vétusté, c&apos;est l&apos;usure normale d&apos;un logement avec le temps. 
              Quand vous partez, on compare l&apos;état du logement à votre arrivée et à votre départ. 
              La vétusté peut réduire ce que vous devez payer en cas de dégradation.
            </p>
          </div>

          {/* Comment ça fonctionne */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              Comment ça fonctionne ?
            </h2>
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Chaque élément de votre logement a une durée de vie normale. 
                Plus un équipement est vieux, moins vous en êtes responsable s&apos;il est abîmé.
              </p>
              <div className="bg-white rounded-lg p-4 mt-3">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Exemple simple :</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Une peinture a une durée de vie de 7 ans. Si votre peinture a 5 ans et qu&apos;elle est un peu abîmée, 
                  vous ne payez que 29 % du coût de remise en peinture. Le bailleur paie les 71 % restants.
                </p>
              </div>
            </div>
          </div>

          {/* Tableau de vétusté */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tableau de vétusté de référence (grille CSTB / grille type)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="text-left p-3 text-sm font-semibold border border-orange-600">Élément</th>
                    <th className="text-left p-3 text-sm font-semibold border border-orange-600">Durée de vie</th>
                    <th className="text-left p-3 text-sm font-semibold border border-orange-600">Franchise locataire</th>
                  </tr>
                </thead>
                <tbody>
                  {vetusteData.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-orange-50" : "bg-white"}>
                      <td className="p-3 text-sm text-gray-800 border border-gray-200">{item.element}</td>
                      <td className="p-3 text-sm text-gray-800 border border-gray-200 font-semibold">{item.duree}</td>
                      <td className="p-3 text-sm text-gray-800 border border-gray-200">{item.franchise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                📌 La franchise correspond à la période pendant laquelle le locataire assume l&apos;entière responsabilité 
                (durée de vie non encore entamée).
              </p>
            </div>
          </div>

          {/* Comment calculer */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-green-600" />
              Comment calculer votre part ?
            </h2>
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                La formule est simple :
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="font-mono text-center text-base font-semibold text-gray-900">
                  Votre part (%) = 100 % × (années restantes ÷ durée de vie totale)
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Exemple :</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Votre lino a 6 ans, durée de vie 10 ans.<br />
                  → Il reste 4 ans sur 10 = vous payez 40 % des réparations. Le bailleur prend en charge 60 %.
                </p>
              </div>
            </div>
          </div>

          {/* Avertissement */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Attention</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  La vétusté ne s&apos;applique pas aux dégradations causées volontairement ou par négligence grave. 
                  Elle couvre uniquement l&apos;usure normale liée à une utilisation correcte du logement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
