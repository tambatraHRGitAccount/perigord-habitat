"use client";

import { Rocket, Target } from "lucide-react";

export function GoalSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-4xl mb-4">
            <Rocket className="text-indigo-600" size={40} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Notre objectif
          </h2>
        </div>

        {/* Contenu */}
        <div className="bg-indigo-600 rounded-2xl p-8 sm:p-10 text-white shadow-lg">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Target className="shrink-0 mt-1" size={24} />
              <p className="text-lg font-medium">vous rendre autonome</p>
            </div>
            <div className="flex items-start gap-3">
              <Target className="shrink-0 mt-1" size={24} />
              <p className="text-lg font-medium">éviter les démarches inutiles</p>
            </div>
            <div className="flex items-start gap-3">
              <Target className="shrink-0 mt-1" size={24} />
              <p className="text-lg font-medium">réduire les délais d'intervention</p>
            </div>
            <div className="flex items-start gap-3">
              <Target className="shrink-0 mt-1" size={24} />
              <p className="text-lg font-medium">améliorer la communication avec votre bailleur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
