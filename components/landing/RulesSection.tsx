"use client";

import { Scale, FileText, CheckCircle, Shield, Users, BookOpen, AlertCircle } from "lucide-react";

export function RulesSection() {
  const lois = [
    {
      icon: FileText,
      titre: "Loi du 6 juillet 1989",
      description: "Cadre juridique des rapports locatifs",
      details: "Définit les droits et obligations du locataire et du bailleur"
    },
    {
      icon: BookOpen,
      titre: "Décret de 1987",
      description: "Liste des réparations locatives",
      details: "Précise ce qui relève de l'entretien courant du locataire"
    },
    {
      icon: Scale,
      titre: "Décret de 1987",
      description: "Charges récupérables",
      details: "Détermine les charges que le bailleur peut récupérer"
    }
  ];

  const responsabilites = [
    {
      icon: Users,
      titre: "Locataire",
      color: "blue",
      items: [
        "Entretien courant du logement",
        "Petites réparations",
        "Remplacement des consommables",
        "Nettoyage régulier"
      ]
    },
    {
      icon: Shield,
      titre: "Bailleur",
      color: "orange",
      items: [
        "Réparations importantes",
        "Remplacement des équipements vétustes",
        "Travaux de mise aux normes",
        "Gros entretien"
      ]
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Titre */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Scale size={16} />
            Base légale
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Sur quelles règles repose ce site ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une base légale solide pour des réponses fiables et conformes à la réglementation française
          </p>
        </div>

        {/* Textes de loi - Design en cartes diagonales avec numérotation */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <BookOpen className="text-indigo-600" size={22} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Textes de référence</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {lois.map((loi, index) => {
              const Icon = loi.icon;
              return (
                <div key={index} className="relative group">
                  {/* Numéro en arrière-plan */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center z-0 group-hover:scale-110 transition-transform">
                    <span className="text-4xl font-black text-indigo-300">{index + 1}</span>
                  </div>
                  
                  {/* Carte principale */}
                  <div className="relative bg-white rounded-2xl p-6 border-l-4 border-indigo-500 shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-500 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                        <Icon className="text-white" size={24} />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200">
                        <span className="text-xs font-bold text-indigo-700">LOI</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{loi.titre}</h4>
                    <p className="text-indigo-600 font-semibold text-sm mb-2">{loi.description}</p>
                    <div className="h-1 w-12 bg-indigo-500 rounded-full mb-3"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">{loi.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsabilités - Design en cartes avec onglets latéraux */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <AlertCircle className="text-purple-600" size={22} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Qui fait quoi ?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {responsabilites.map((resp, index) => {
              const Icon = resp.icon;
              const mainColor = resp.color === "blue" ? "blue" : "orange";
              const bgPattern = resp.color === "blue" ? "bg-blue-500" : "bg-orange-500";
              const borderPattern = resp.color === "blue" ? "border-blue-500" : "border-orange-500";
              const dotColor = resp.color === "blue" ? "bg-blue-400" : "bg-orange-400";
              
              return (
                <div key={index} className="relative group">
                  {/* Onglet latéral vertical */}
                  <div className={`absolute -left-3 top-8 bottom-8 w-6 ${bgPattern} rounded-l-xl flex flex-col items-center justify-center gap-2 shadow-lg z-10`}>
                    <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-white opacity-75"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  
                  {/* Carte principale avec motif */}
                  <div className={`relative bg-white rounded-2xl p-6 border-2 ${borderPattern} shadow-lg hover:shadow-2xl transition-all overflow-hidden`}>
                    {/* Motif décoratif en arrière-plan */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <div className={`absolute inset-0 ${bgPattern} rounded-full transform translate-x-12 -translate-y-12`}></div>
                    </div>
                    
                    {/* En-tête avec icône */}
                    <div className="relative flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
                      <div className={`w-16 h-16 rounded-2xl ${bgPattern} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-gray-900">{resp.titre}</h4>
                        <div className={`h-1 w-16 ${bgPattern} rounded-full mt-1`}></div>
                      </div>
                    </div>
                    
                    {/* Liste des items avec puces personnalisées */}
                    <div className="relative space-y-3">
                      {resp.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/item">
                          <div className="relative flex items-center justify-center shrink-0 mt-1">
                            <div className={`w-6 h-6 rounded-md ${bgPattern} flex items-center justify-center transform group-hover/item:rotate-12 transition-transform`}>
                              <CheckCircle className="text-white" size={14} />
                            </div>
                          </div>
                          <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Indicateur de position */}
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                      <div className={`w-2 h-2 rounded-full ${dotColor} opacity-50`}></div>
                      <div className={`w-2 h-2 rounded-full ${dotColor} opacity-25`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Principe clé - Design amélioré avec code couleur */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-orange-50 rounded-2xl p-8 sm:p-10 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
              <Scale className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Le principe est simple</h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Le <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-lg">locataire</span> entretient, 
                le <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-lg">bailleur</span> répare les éléments importants, 
                sauf cas particuliers définis par la loi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
