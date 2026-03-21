"use client";

import { Target, CheckCircle } from "lucide-react";

export function ObjectivesSection() {
  return (
    <section id="objectifs" className="w-full py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 mb-4">
            <Target className="text-indigo-600" size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Son objectif est simple
          </h2>
          <p className="text-base text-gray-600">
            Trois piliers pour vous accompagner efficacement
          </p>
        </div>

        {/* Objectifs */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 group-hover:bg-indigo-600 mb-6 transition-colors">
              <CheckCircle className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Savoir qui doit intervenir
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Identifiez rapidement si c'est au locataire, au propriétaire ou à un professionnel d'agir.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 group-hover:bg-green-600 mb-6 transition-colors">
              <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Comprendre qui paie
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Clarifiez la prise en charge financière selon la réglementation et votre bail.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-600 mb-6 transition-colors">
              <CheckCircle className="text-blue-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Résoudre vous-même
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Accédez à des guides pratiques pour réparer rapidement quand c'est possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
