"use client";

import { Bot, MessageSquare, Mic, Camera, ArrowRight, Search, Wrench, FileText, Package, AlertTriangle } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="w-full py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 mb-4 mr-4">
              <Bot className="text-blue-600" size={28} />
            </div>
            Comment ça fonctionne ?
          </h2>
          <p className="text-base text-gray-600">
            Un processus simple et des outils complets
          </p>
        </div>

        {/* Contenu avec design en zigzag */}
        <div className="space-y-8">
          {/* Étape 1 : Description */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl z-20 transform -rotate-6">
              <span className="text-3xl font-black text-white">1</span>
            </div>
            
            <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-blue-200 shadow-lg ml-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Vous décrivez votre problème
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="group relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl transform rotate-3 opacity-10"></div>
                  <div className="relative bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 mx-auto mb-4">
                      <MessageSquare className="text-white" size={28} />
                    </div>
                    <p className="text-gray-900 font-bold mb-2 text-center">Par texte</p>
                    <p className="text-sm text-gray-600 text-center">ex : "robinet qui fuit"</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl transform -rotate-2 opacity-10"></div>
                  <div className="relative bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 mx-auto mb-4">
                      <Mic className="text-white" size={28} />
                    </div>
                    <p className="text-gray-900 font-bold mb-2 text-center">À l'oral</p>
                    <p className="text-sm text-gray-600 text-center">Décrivez vocalement</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl transform rotate-2 opacity-10"></div>
                  <div className="relative bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 mx-auto mb-4">
                      <Camera className="text-white" size={28} />
                    </div>
                    <p className="text-gray-900 font-bold mb-2 text-center">Avec une photo/vidéo</p>
                    <p className="text-sm text-gray-600 text-center">Montrez le problème</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flèche de connexion */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-1 h-12 bg-blue-300 rounded-full"></div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <ArrowRight className="text-white transform rotate-90" size={20} />
              </div>
              <div className="w-1 h-12 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          {/* Étape 2 : Accompagnement - Design en escalier décalé */}
          <div className="relative">
            <div className="absolute -right-4 top-0 w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl z-20 transform rotate-6">
              <span className="text-3xl font-black text-white">2</span>
            </div>
            
            <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-indigo-200 shadow-lg mr-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Le système vous accompagne
                </h3>
              </div>

              {/* Cartes en disposition décalée (escalier) */}
              <div className="relative space-y-6 md:space-y-0">
                {/* Ligne de connexion horizontale (desktop) */}
                <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-indigo-200 rounded-full"></div>
                
                {/* Carte 1 - Diagnostic (en haut à gauche) */}
                <div className="relative md:w-1/2 md:pr-4">
                  <div className="bg-indigo-50 rounded-2xl p-6 border-l-4 border-indigo-600 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center">
                          <Search className="text-white" size={28} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-indigo-600">1</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Diagnostic complet</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                            <span className="text-sm text-gray-700">Identification du problème</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                            <span className="text-sm text-gray-700">Responsable (code couleur)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                            <span className="text-sm text-gray-700">Prise en charge des frais</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carte 2 - Solutions (en haut à droite) */}
                <div className="relative md:w-1/2 md:ml-auto md:pl-4 md:-mt-6">
                  <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-600 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center">
                          <Wrench className="text-white" size={28} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600">2</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Solutions pratiques</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                            <span className="text-sm text-gray-700">Étapes de réparation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                            <span className="text-sm text-gray-700">Conseils d'entretien</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                            <span className="text-sm text-gray-700">Tutoriels vidéo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carte 3 - Signalement (en bas à gauche) */}
                <div className="relative md:w-1/2 md:pr-4 md:-mt-6">
                  <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-600 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center">
                          <FileText className="text-white" size={28} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-orange-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-600">3</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Aide au signalement</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                            <span className="text-sm text-gray-700">Description guidée</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                            <span className="text-sm text-gray-700">Informations nécessaires</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                            <span className="text-sm text-gray-700">Suivi de l'incident</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carte 4 - Équipements (en bas à droite) */}
                <div className="relative md:w-1/2 md:ml-auto md:pl-4 md:-mt-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
                          <Package className="text-white" size={28} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">4</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Gestion équipements</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            <span className="text-sm text-gray-700">Notices d'utilisation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            <span className="text-sm text-gray-700">Identification matériel</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            <span className="text-sm text-gray-700">Mode d'emploi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important à savoir */}
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      Cas particuliers identifiés
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Le système détecte les situations qui peuvent modifier les responsabilités :
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-yellow-300">
                        <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                        <span className="text-sm text-gray-700">Vétusté</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-yellow-300">
                        <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                        <span className="text-sm text-gray-700">Mauvaise utilisation</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-yellow-300">
                        <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                        <span className="text-sm text-gray-700">Sinistre</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-yellow-300">
                        <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                        <span className="text-sm text-gray-700">Contrats spécifiques</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
