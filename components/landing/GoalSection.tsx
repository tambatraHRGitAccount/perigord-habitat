"use client";

import { Rocket, Target } from "lucide-react";

export function GoalSection() {
  return (
    <section className="w-full py-20 sm:py-24 bg-gray-50 border-b border-gray-100">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-6">
            <Rocket className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Notre objectif
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quatre engagements pour vous accompagner
          </p>
        </div>

        {/* Contenu */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-600 rounded-2xl p-8 sm:p-10 text-white shadow-lg">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Target className="shrink-0 mt-1" size={24} />
                <p className="text-lg font-medium">Vous rendre autonome</p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="shrink-0 mt-1" size={24} />
                <p className="text-lg font-medium">Éviter les démarches inutiles</p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="shrink-0 mt-1" size={24} />
                <p className="text-lg font-medium">Réduire les délais d'intervention</p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="shrink-0 mt-1" size={24} />
                <p className="text-lg font-medium">Améliorer la communication avec votre bailleur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
