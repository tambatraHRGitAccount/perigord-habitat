"use client";

import { Wrench, CheckCircle } from "lucide-react";

export function PurposeSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-4xl mb-4">
            <Wrench className="text-indigo-600" size={40} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            À quoi sert concrètement ce site ?
          </h2>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Au lieu de chercher dans des documents complexes, ici vous pouvez :
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
              <p className="text-gray-800 font-medium">comprendre rapidement votre situation</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
              <p className="text-gray-800 font-medium">identifier la cause d'un problème</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
              <p className="text-gray-800 font-medium">savoir qui est responsable</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
              <p className="text-gray-800 font-medium">éviter des démarches inutiles</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100 sm:col-span-2">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
              <p className="text-gray-800 font-medium">gagner du temps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
