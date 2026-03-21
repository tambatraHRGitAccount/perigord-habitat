"use client";

import { Bot, MessageSquare, Mic, Camera, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-4xl mb-4">
            <Bot className="text-indigo-600" size={40} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comment ça fonctionne ?
          </h2>
        </div>

        {/* Contenu */}
        <div className="space-y-10">
          {/* Étape 1 : Description */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Vous décrivez votre problème :
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center hover:border-indigo-300 transition-colors">
                <MessageSquare className="text-indigo-600 mx-auto mb-3" size={32} />
                <p className="text-gray-700 font-medium">par texte</p>
                <p className="text-sm text-gray-500 mt-1">(ex : "robinet qui fuit")</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center hover:border-indigo-300 transition-colors">
                <Mic className="text-indigo-600 mx-auto mb-3" size={32} />
                <p className="text-gray-700 font-medium">à l'oral</p>
                <p className="text-sm text-gray-500 mt-1">Décrivez vocalement</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center hover:border-indigo-300 transition-colors">
                <Camera className="text-indigo-600 mx-auto mb-3" size={32} />
                <p className="text-gray-700 font-medium">avec une photo/vidéo</p>
                <p className="text-sm text-gray-500 mt-1">Montrez le problème</p>
              </div>
            </div>
          </div>

          {/* Étape 2 : Analyse */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👉</span>
              <h3 className="text-2xl font-bold text-gray-900">
                Le système analyse votre situation et vous indique :
              </h3>
            </div>

            <div className="space-y-3">
              {[
                "la panne ou le problème probable",
                "qui doit intervenir (locataire, bailleur, prestataire)",
                "qui prend en charge les frais",
                "les vérifications à faire",
                "les solutions possibles"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
