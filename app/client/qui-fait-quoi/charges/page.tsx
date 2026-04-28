"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { ArrowLeft, Receipt, CheckCircle, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChargesPage() {
  const chargesRecuperables = [
    {
      category: "Entretien des parties communes",
      items: [
        "Nettoyage des couloirs, escaliers, halls d'entrée",
        "Entretien des espaces verts communs (tonte, taille)",
        "Nettoyage des caves et sous-sols communs",
        "Entretien des parkings communs"
      ]
    },
    {
      category: "Ascenseur",
      items: [
        "Électricité de l'ascenseur",
        "Contrat d'entretien courant de l'ascenseur",
        "Petites réparations de l'ascenseur (hors remplacement complet)"
      ]
    },
    {
      category: "Eau et chauffage collectif",
      items: [
        "Eau froide et eau chaude des parties communes",
        "Consommation d'eau chaude sanitaire collective",
        "Frais de chauffage collectif (fuel, gaz, entretien chaudière)",
        "Robinets de réglage et purge des radiateurs"
      ]
    },
    {
      category: "Éclairage",
      items: [
        "Électricité des parties communes (couloirs, parkings, caves)",
        "Remplacement des ampoules des parties communes"
      ]
    },
    {
      category: "Gardiennage et personnel d'immeuble",
      items: [
        "Une partie du salaire du gardien ou concierge (75 % si assure le nettoyage et la sortie des poubelles, 40 % sinon)"
      ]
    },
    {
      category: "Taxes locales",
      items: [
        "Taxe d'enlèvement des ordures ménagères (TEOM)",
        "Taxe de balayage"
      ]
    }
  ];

  const chargesNonRecuperables = [
    "Les grosses réparations (ravalement, toiture, remplacement ascenseur)",
    "Les frais de gestion administrative du bailleur",
    "Les honoraires de syndic",
    "Les travaux de mise aux normes imposés par la loi"
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
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Receipt size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Charges récupérables</h1>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed text-base">
              Les charges locatives, c&apos;est de l&apos;argent que vous payez en plus de votre loyer. 
              Ces charges servent à payer des services ou des travaux dans votre immeuble. 
              Voici ce que votre bailleur a le droit de vous demander de payer.
            </p>
          </div>

          {/* Section Charges récupérables */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-green-500">
              <h2 className="text-xl font-bold text-green-600">
                Ce que le bailleur peut récupérer auprès du locataire
              </h2>
            </div>

            <div className="space-y-6">
              {chargesRecuperables.map((section, idx) => (
                <div key={idx} className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-900 mb-3 text-base">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section Charges NON récupérables */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-red-500">
              <h2 className="text-xl font-bold text-red-600">
                Ce que le bailleur NE peut PAS récupérer
              </h2>
            </div>

            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
              <ul className="space-y-2">
                {chargesNonRecuperables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <X size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Info importante */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  <span className="font-semibold">Chaque année</span>, votre bailleur vous envoie un décompte détaillé des charges. 
                  Vous avez le droit de demander à consulter les justificatifs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
