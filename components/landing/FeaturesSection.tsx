"use client";

import { Target, Search, Wrench, FileText, Package, AlertTriangle } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-4xl mb-4">
            <Target className="text-indigo-600" size={40} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce que vous allez trouver sur la plateforme
          </h2>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Feature 1 : Diagnostic */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Search className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Un diagnostic simple et rapide
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Des fiches claires pour chaque type de problème avec :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✔</span>
                <span className="text-gray-700">responsable (code couleur)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✔</span>
                <span className="text-gray-700">explication juridique simplifiée</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✔</span>
                <span className="text-gray-700">checklist de diagnostic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✔</span>
                <span className="text-gray-700">conseils pratiques</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 : Solutions */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Wrench className="text-green-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Des solutions concrètes
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Pour les problèmes simples, vous aurez :
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span className="text-gray-700">des étapes faciles à suivre</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span className="text-gray-700">des conseils d'entretien</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span className="text-gray-700">des astuces pour éviter que cela se reproduise</span>
              </li>
            </ul>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <p className="text-gray-700 flex items-center gap-2">
                <span className="text-xl">👉</span>
                <span>Dans de nombreux cas, vous pouvez <strong>résoudre le problème vous-même</strong>.</span>
              </p>
            </div>
          </div>

          {/* Feature 3 : Signalement */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <FileText className="text-orange-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Une aide pour bien signaler un problème
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Si une intervention est nécessaire, le site vous aide à :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">décrire correctement la panne</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">fournir les bonnes informations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span className="text-gray-700">éviter les erreurs ou oublis</span>
              </li>
            </ul>
          </div>

          {/* Feature 4 : Équipements */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="text-blue-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Les équipements de votre logement
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Vous pouvez aussi :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">retrouver les notices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">identifier vos équipements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">comprendre leur fonctionnement</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Important à savoir */}
        <div className="mt-8 bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Important à savoir
              </h3>
              <p className="text-gray-700 mb-4">
                Certaines situations peuvent modifier les responsabilités :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span className="text-gray-700">vétusté (usure normale)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span className="text-gray-700">mauvaise utilisation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span className="text-gray-700">sinistre (dégât des eaux, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span className="text-gray-700">équipements sous contrat (chaudière, VMC, etc.)</span>
                </li>
              </ul>
              <div className="bg-white p-4 rounded-xl">
                <p className="text-gray-700 flex items-center gap-2">
                  <span className="text-xl">👉</span>
                  <span>Le site vous aide à <strong>identifier ces cas</strong>.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
