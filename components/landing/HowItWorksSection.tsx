"use client";

import { Bot, MessageSquare, Mic, Camera } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="w-full py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 mb-4">
            <Bot className="text-blue-600" size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Comment ça fonctionne ?
          </h2>
          <p className="text-base text-gray-600">
            Un processus simple en deux étapes
          </p>
        </div>

        {/* Contenu */}
        <div className="space-y-12">
          {/* Étape 1 : Description */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg shrink-0">
                1
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Vous décrivez votre problème
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="group bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-600 mx-auto mb-4 transition-colors">
                  <MessageSquare className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <p className="text-gray-900 font-semibold mb-2">Par texte</p>
                <p className="text-sm text-gray-600">ex : "robinet qui fuit"</p>
              </div>
              
              <div className="group bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-600 mx-auto mb-4 transition-colors">
                  <Mic className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <p className="text-gray-900 font-semibold mb-2">À l'oral</p>
                <p className="text-sm text-gray-600">Décrivez vocalement</p>
              </div>
              
              <div className="group bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-600 mx-auto mb-4 transition-colors">
                  <Camera className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <p className="text-gray-900 font-semibold mb-2">Avec une photo/vidéo</p>
                <p className="text-sm text-gray-600">Montrez le problème</p>
              </div>
            </div>
          </div>

          {/* Étape 2 : Analyse */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg shrink-0">
                2
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Le système analyse et vous indique
              </h3>
            </div>

            <div className="space-y-4">
              {[
                "La panne ou le problème probable",
                "Qui doit intervenir (locataire, bailleur, prestataire)",
                "Qui prend en charge les frais",
                "Les vérifications à faire",
                "Les solutions possibles"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg pt-0.5">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
