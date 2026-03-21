"use client";

import { Scale, FileText, CheckCircle } from "lucide-react";

export function RulesSection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 mb-4">
            <Scale className="text-indigo-600" size={28} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Sur quelles règles repose ce site ?
          </h2>
          <p className="text-base text-gray-600">
            Une base légale solide pour des réponses fiables
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Les informations présentées s'appuient sur la réglementation française en vigueur, notamment :
          </p>

          <div className="grid gap-4 mb-8">
            <div className="flex items-start gap-3 bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
              <FileText className="text-indigo-600 shrink-0 mt-1" size={22} />
              <p className="text-gray-700">la <strong>loi du 6 juillet 1989</strong> sur les rapports locatifs</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
              <FileText className="text-indigo-600 shrink-0 mt-1" size={22} />
              <p className="text-gray-700">le <strong>décret de 1987</strong> sur les réparations locatives</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
              <FileText className="text-indigo-600 shrink-0 mt-1" size={22} />
              <p className="text-gray-700">le <strong>décret de 1987</strong> sur les charges récupérables</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-6 font-medium">
            Ces textes définissent clairement :
          </p>

          <div className="grid gap-3 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
              <p className="text-gray-700">ce qui relève de l'<strong>entretien courant</strong> (locataire)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
              <p className="text-gray-700">ce qui relève des <strong>réparations importantes</strong> (bailleur)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
              <p className="text-gray-700">et ce qui peut dépendre d'un <strong>contrat d'entretien</strong></p>
            </div>
          </div>

          <div className="bg-indigo-600 text-white p-6 rounded-xl">
            <p className="text-xl font-semibold mb-3">
              Le principe est simple :
            </p>
            <p className="text-lg leading-relaxed">
              le locataire <strong>entretient</strong>, le bailleur <strong>répare</strong> les éléments importants, sauf cas particuliers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
