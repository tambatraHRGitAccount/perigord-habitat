"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Sparkles } from "lucide-react";

export function ObjectivesSection() {
  const useCases = [
    {
      icon: "🚿",
      title: "Mon robinet fuit",
      description: "Je sais qui appeler en 1 clic",
      href: "/client/chat"
    },
    {
      icon: "🔌",
      title: "Une prise ne marche plus",
      description: "Je sais si c'est à moi de réparer",
      href: "/client/chat"
    },
    {
      icon: "🏠",
      title: "Je veux visiter mon logement",
      description: "J'explore en 3D",
      href: "/maison"
    }
  ];

  return (
    <section id="objectifs" className="w-full py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        {/* Titre - même style que HowItWorksSection */}
        <ScrollReveal animation="fade-up">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold mb-6 shadow-lg">
              <Sparkles size={18} />
              Cas d&apos;usage
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Des situations concrètes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trouvez rapidement la solution à votre problème
            </p>
          </div>
        </ScrollReveal>

        {/* Cas d'usage - Grille 3 colonnes responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <ScrollReveal 
              key={index}
              animation="fade-up" 
              delay={index * 150}
            >
              <Link
                href={useCase.href}
                className="group h-full"
              >
                <div className="bg-white rounded-2xl p-8 h-full hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col shadow-lg">
                  {/* Icône emoji grande taille */}
                  <div className="text-7xl mb-6 text-center transform group-hover:scale-110 transition-all duration-300">
                    {useCase.icon}
                  </div>
                  
                  {/* Titre */}
                  <h3 className="text-2xl font-black text-gray-900 mb-3 text-center">
                    {useCase.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center leading-relaxed mb-4 flex-1">
                    {useCase.description}
                  </p>
                  
                  {/* Flèche indicatrice avec animation */}
                  <div className="flex justify-center mt-auto">
                    <span className="text-indigo-600 font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Découvrir
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA supplémentaire */}
        <ScrollReveal animation="fade-up" delay={600}>
          <div className="text-center">
            <p className="text-gray-600 mb-4 text-lg">Vous avez un autre problème ?</p>
            <Link 
              href="/client/chat" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Poser ma question
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
