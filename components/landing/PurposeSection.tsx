"use client";

import { Wrench, CheckCircle } from "lucide-react";

export function PurposeSection() {
  return (
    <section className="w-full py-20 sm:py-24 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 mb-6">
            <Wrench className="text-green-600" size={32} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            À quoi sert concrètement ce site ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Au lieu de chercher dans des documents complexes
          </p>
        </div>

        {/* Contenu */}
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-600 mb-4 transition-colors">
                <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-gray-800 font-semibold">Comprendre rapidement votre situation</p>
            </div>
            
            <div className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-600 mb-4 transition-colors">
                <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-gray-800 font-semibold">Identifier la cause d'un problème</p>
            </div>
            
            <div className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-600 mb-4 transition-colors">
                <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-gray-800 font-semibold">Savoir qui est responsable</p>
            </div>
            
            <div className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-600 mb-4 transition-colors">
                <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-gray-800 font-semibold">Éviter des démarches inutiles</p>
            </div>
            
            <div className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 group-hover:bg-green-600 mb-4 transition-colors">
                <CheckCircle className="text-green-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-gray-800 font-semibold">Gagner du temps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
