"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { ArrowLeft, AlertCircle, Droplets, Clock, AlertTriangle, Flame, FileText, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CasParticuliersPage() {
  const degatEauxData = [
    { origine: "Joint de robinet que le locataire n'a pas changé", responsable: "Locataire", color: "blue" },
    { origine: "Canalisation encastrée dans les murs", responsable: "Bailleur", color: "orange" },
    { origine: "Fuite venant du voisin du dessus", responsable: "Voisin (son assurance)", color: "gray" },
    { origine: "Toiture ou façade", responsable: "Bailleur", color: "orange" }
  ];

  const mauvaiseUtilisationExamples = [
    "Plancher abîmé suite au dépôt de charges trop lourdes → locataire",
    "Chauffe-eau endommagé par calcaire non détartré → locataire",
    "Porte claquée et cadre arraché → locataire"
  ];

  const contratsSpecifiques = [
    "Contrat de maintenance chaudière inclus dans les charges",
    "Contrat d'entretien VMC pris en charge par le bailleur",
    "Prestataire désigné pour la serrurerie d'urgence"
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
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Cas particuliers</h1>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed text-base">
              Parfois, les règles habituelles ne s&apos;appliquent pas. Certaines situations changent qui doit payer ou intervenir. 
              Voici les cas les plus fréquents.
            </p>
          </div>

          {/* Cas 1 - Dégât des eaux */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Droplets size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Cas 1 — Le dégât des eaux</h2>
            </div>
            
            <p className="text-gray-700 text-sm mb-4">Qui fait quoi dépend de l&apos;origine :</p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="text-left p-3 text-sm font-semibold border border-blue-600">Origine de la fuite</th>
                    <th className="text-left p-3 text-sm font-semibold border border-blue-600">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {degatEauxData.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <td className="p-3 text-sm text-gray-800 border border-gray-200">{item.origine}</td>
                      <td className={`p-3 text-sm font-semibold border border-gray-200 ${
                        item.color === 'blue' ? 'text-blue-600' : 
                        item.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                      }`}>
                        {item.responsable}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm text-blue-800 leading-relaxed">
                <span className="font-semibold">🔵 À faire dans tous les cas :</span> Coupez l&apos;eau. 
                Prévenez votre bailleur par écrit immédiatement. 
                Déclarez à votre assurance habitation dans les 5 jours ouvrés.
              </p>
            </div>
          </div>

          {/* Cas 2 - Vétusté */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock size={20} className="text-orange-600" />
              <h2 className="text-lg font-bold text-gray-900">Cas 2 — La vétusté (usure normale)</h2>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="text-sm text-gray-700 leading-relaxed">
                Si un équipement est vieux et tombe en panne, même si c&apos;est en partie lié à votre usage, 
                le bailleur doit assumer une partie du coût en fonction de l&apos;âge de l&apos;équipement. 
                (→ voir section <Link href="/client/qui-fait-quoi/vetuste" className="text-orange-600 font-semibold underline">Grille de vétusté</Link>)
              </p>
            </div>
          </div>

          {/* Cas 3 - Mauvaise utilisation */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Cas 3 — La mauvaise utilisation</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Si vous avez mal utilisé un équipement (surcharge, utilisation non conforme), 
                la réparation est à votre charge même si c&apos;est normalement la responsabilité du bailleur.
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-2">Exemples :</p>
              <ul className="space-y-1">
                {mauvaiseUtilisationExamples.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-700">• {example}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cas 4 - Sinistre */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Flame size={20} className="text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Cas 4 — Le sinistre (incendie, inondation)</h2>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                <p className="text-sm text-gray-700 leading-relaxed">
                  • Si le sinistre vient d&apos;un accident indépendant de votre volonté → votre assurance habitation prend en charge
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                <p className="text-sm text-gray-700 leading-relaxed">
                  • Si le sinistre est dû à votre négligence → vous pouvez être tenu responsable des dommages à votre logement ET chez les voisins
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                <p className="text-sm text-gray-700 leading-relaxed">
                  • Le bailleur doit reconstruire les éléments structurels même en cas de sinistre
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 mt-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                <span className="font-semibold">🔵 Obligation légale :</span> Vous devez être assuré au minimum en responsabilité civile locative. 
                Vous devez fournir une attestation d&apos;assurance à votre bailleur chaque année.
              </p>
            </div>
          </div>

          {/* Cas 5 - Contrats spécifiques */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">Cas 5 — Les contrats spécifiques</h2>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Certains bailleurs ont des accords particuliers avec des prestataires. Dans ce cas :
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Votre contrat de location ou ses annexes précisent ces particularités</li>
                <li>• Vous devez utiliser les prestataires indiqués pour certaines interventions</li>
                <li>• En cas de doute, contactez votre bailleur avant de faire intervenir quelqu&apos;un</li>
              </ul>
            </div>

            <p className="text-sm font-semibold text-gray-900 mb-2">Exemples de contrats spécifiques fréquents :</p>
            <ul className="space-y-1">
              {contratsSpecifiques.map((contrat, idx) => (
                <li key={idx} className="text-sm text-gray-700">• {contrat}</li>
              ))}
            </ul>
          </div>

          {/* Cas 6 - Travaux d'urgence */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Wrench size={20} className="text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Cas 6 — Travaux d&apos;urgence</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Si vous ne pouvez pas attendre (fuite importante, panne de chauffage en hiver, serrure cassée) :
              </p>
              <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                <li>Prévenez votre bailleur immédiatement par écrit (SMS, mail avec accusé)</li>
                <li>Si le bailleur ne répond pas dans un délai raisonnable, vous pouvez faire appel à un professionnel</li>
                <li>Gardez toutes les factures — vous pouvez demander remboursement si la réparation incombait au bailleur</li>
              </ol>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <span className="font-semibold">Sans accord préalable du bailleur</span>, vous prenez le risque de ne pas être remboursé. 
                  L&apos;écrit est indispensable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
