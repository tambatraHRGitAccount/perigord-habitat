"use client";

import { Target, Search, AlertCircle, Users, CheckCircle, UserCheck, Zap, MessageCircle } from "lucide-react";

export function ObjectivesSection() {
  return (
    <section id="objectifs" className="w-full py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 mb-4 mr-4">
              <Target className="text-indigo-600" size={28} />
            </div>
            Nos objectifs
          </h2>
          <p className="text-base text-gray-600">
            Vous accompagner efficacement dans la gestion de votre logement
          </p>
        </div>

        {/* Objectifs - Grille 2 colonnes */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Objectif 1 */}
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-600 mb-6 transition-colors">
              <Search className="text-blue-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Comprendre rapidement votre situation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Identifiez la cause du problème et comprenez votre situation en quelques clics.
            </p>
          </div>

          {/* Objectif 2 */}
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 group-hover:bg-indigo-600 mb-6 transition-colors">
              <Users className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Savoir qui doit intervenir et qui paie
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Identifiez rapidement le responsable (locataire, propriétaire, professionnel) et la prise en charge financière.
            </p>
          </div>

          {/* Objectif 3 */}
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 group-hover:bg-green-600 mb-6 transition-colors">
              <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Résoudre vous-même quand c'est possible
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Accédez à des guides pratiques et tutoriels pour réparer rapidement les problèmes simples.
            </p>
          </div>

          {/* Objectif 4 */}
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-100 group-hover:bg-purple-600 mb-6 transition-colors">
              <UserCheck className="text-purple-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Vous rendre autonome
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Prenez les bonnes décisions sans attendre et gérez vos problèmes de logement efficacement.
            </p>
          </div>

          {/* Objectif 5 */}
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 group-hover:bg-orange-600 mb-6 transition-colors">
              <Zap className="text-orange-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Gagner du temps et éviter les démarches inutiles
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Identifiez le bon interlocuteur dès le départ et accélérez la résolution de vos problèmes.
            </p>
          </div>

          {/* Objectif 6 */}
          <div className="group bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-teal-100 group-hover:bg-teal-600 mb-6 transition-colors">
              <MessageCircle className="text-teal-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Améliorer la communication avec votre bailleur
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Facilitez les échanges grâce à des informations claires, précises et bien documentées.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
