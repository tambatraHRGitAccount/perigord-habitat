"use client";

import Link from "next/link";
import { Droplets, Zap, Building2 } from "lucide-react";

export function ObjectivesSection() {
  const useCases = [
    {
      icon: "🚿",
      title: "Mon robinet fuit",
      description: "Je sais qui appeler en 1 clic",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      hoverBg: "hover:bg-blue-100",
      textColor: "text-blue-700",
      href: "/client/chat"
    },
    {
      icon: "🔌",
      title: "Une prise ne marche plus",
      description: "Je sais si c'est à moi de réparer",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      hoverBg: "hover:bg-orange-100",
      textColor: "text-orange-700",
      href: "/client/chat"
    },
    {
      icon: "🏠",
      title: "Je veux visiter mon logement",
      description: "J'explore en 3D",
      color: "indigo",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-300",
      hoverBg: "hover:bg-indigo-100",
      textColor: "text-indigo-700",
      href: "/maison"
    }
  ];

  return (
    <section id="objectifs" className="w-full py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Des situations concrètes
          </h2>
          <p className="text-base text-gray-600">
            Trouvez rapidement la solution à votre problème
          </p>
        </div>

        {/* Cas d'usage - Grille 3 colonnes */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <Link
              key={index}
              href={useCase.href}
              className={`group relative ${useCase.bgColor} ${useCase.borderColor} border-2 rounded-2xl p-8 ${useCase.hoverBg} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            >
              {/* Icône emoji grande taille */}
              <div className="text-7xl mb-6 text-center transform group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              
              {/* Titre */}
              <h3 className={`text-2xl font-bold ${useCase.textColor} mb-3 text-center`}>
                {useCase.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 text-center font-medium leading-relaxed">
                {useCase.description}
              </p>
              
              {/* Flèche indicatrice */}
              <div className={`mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <span className={`${useCase.textColor} font-bold text-sm flex items-center gap-2`}>
                  Découvrir
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
