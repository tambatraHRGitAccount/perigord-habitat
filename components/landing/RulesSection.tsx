"use client";

import { Scale, FileText, CheckCircle, Shield, Users, BookOpen, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

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
      bgColor: "bg-blue-600",
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
      bgColor: "bg-orange-600",
      items: [
        "Réparations importantes",
        "Remplacement des équipements vétustes",
        "Travaux de mise aux normes",
        "Gros entretien"
      ]
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Titre - même style que HowItWorksSection */}
        <ScrollReveal animation="fade-up">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold mb-6 shadow-lg">
              <Sparkles size={18} />
              Base légale
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Sur quelles règles repose ce site ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Une base légale solide pour des réponses fiables et conformes à la réglementation française
            </p>
          </div>
        </ScrollReveal>

        {/* Textes de loi - 3 cartes */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lois.map((loi, index) => {
                const Icon = loi.icon;
                return (
                  <div key={index} className="group h-full">
                    <div className="bg-white rounded-2xl p-6 h-full hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                          <Icon className="text-white" size={26} />
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-indigo-50 border-2 border-indigo-200">
                          <span className="text-xs font-bold text-indigo-700">LOI</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-black text-gray-900 mb-2">{loi.titre}</h4>
                      <p className="text-indigo-600 font-semibold text-sm mb-3">{loi.description}</p>
                      <div className="h-1 w-12 bg-indigo-600 rounded-full mb-3"></div>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">{loi.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Responsabilités - 2 cartes */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {responsabilites.map((resp, index) => {
                const Icon = resp.icon;
                
                return (
                  <div key={index} className="group h-full">
                    <div className="bg-white rounded-2xl p-6 h-full hover:bg-gray-50 transition-all duration-300 hover:shadow-xl flex flex-col shadow-lg">
                      {/* En-tête avec icône */}
                      <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
                        <div className={`w-16 h-16 rounded-2xl ${resp.bgColor} flex items-center justify-center shadow-lg`}>
                          <Icon className="text-white" size={28} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-gray-900">{resp.titre}</h4>
                          <div className={`h-1 w-16 ${resp.bgColor} rounded-full mt-1`}></div>
                        </div>
                      </div>
                      
                      {/* Liste des items */}
                      <div className="space-y-3 flex-1">
                        {resp.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-md ${resp.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
                              <CheckCircle className="text-white" size={14} />
                            </div>
                            <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Principe clé */}
        <ScrollReveal animation="fade-up" delay={600}>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                <Scale className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Le principe est simple</h3>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Le <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">locataire</span> entretient, 
                  le <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">bailleur</span> répare les éléments importants, 
                  sauf cas particuliers définis par la loi.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
