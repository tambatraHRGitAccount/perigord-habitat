"use client";

import Link from "next/link";

export function ObjectivesSection() {
  const useCases = [
    {
      icon: "🚿",
      title: "Mon robinet fuit",
      description: "Je sais qui appeler en 1 clic",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      hoverBg: "hover:bg-blue-100",
      hoverBorder: "hover:border-blue-500",
      textColor: "text-blue-700",
      shadowColor: "hover:shadow-blue-200",
      href: "/client/chat"
    },
    {
      icon: "🔌",
      title: "Une prise ne marche plus",
      description: "Je sais si c&apos;est à moi de réparer",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-400",
      hoverBg: "hover:bg-orange-100",
      hoverBorder: "hover:border-orange-500",
      textColor: "text-orange-700",
      shadowColor: "hover:shadow-orange-200",
      href: "/client/chat"
    },
    {
      icon: "🏠",
      title: "Je veux visiter mon logement",
      description: "J&apos;explore en 3D",
      color: "indigo",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-400",
      hoverBg: "hover:bg-indigo-100",
      hoverBorder: "hover:border-indigo-500",
      textColor: "text-indigo-700",
      shadowColor: "hover:shadow-indigo-200",
      href: "/maison"
    }
  ];

  return (
    <section id="objectifs" className="w-full py-20 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Titre avec design amélioré */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Cas d&apos;usage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Des situations concrètes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement la solution à votre problème
          </p>
        </div>

        {/* Cas d'usage - Grille 3 colonnes avec design amélioré */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <Link
              key={index}
              href={useCase.href}
              className={`group relative ${useCase.bgColor} ${useCase.borderColor} ${useCase.hoverBg} ${useCase.hoverBorder} ${useCase.shadowColor} border-2 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Effet de fond animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Numéro en arrière-plan */}
              <div className="absolute top-4 right-4 text-6xl font-black text-gray-200 group-hover:text-gray-300 transition-colors">
                {index + 1}
              </div>
              
              {/* Contenu */}
              <div className="relative z-10">
                {/* Icône emoji grande taille */}
                <div className="text-7xl mb-6 text-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {useCase.icon}
                </div>
                
                {/* Titre */}
                <h3 className={`text-2xl font-bold ${useCase.textColor} mb-3 text-center group-hover:scale-105 transition-transform duration-300`}>
                  {useCase.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 text-center font-medium leading-relaxed mb-4">
                  {useCase.description}
                </p>
                
                {/* Flèche indicatrice avec animation */}
                <div className="flex justify-center">
                  <span className={`${useCase.textColor} font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                    Découvrir
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA supplémentaire */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Vous avez un autre problème ?</p>
          <Link 
            href="/client/chat" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Poser ma question
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
