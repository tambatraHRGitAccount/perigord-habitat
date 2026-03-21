"use client";

import { Lightbulb, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ExampleSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-4xl mb-4">
            <Lightbulb className="text-amber-600" size={40} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Exemple concret
          </h2>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Un évier bouché ?
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 font-medium">
              <span className="text-2xl">👉</span>
              <span>Le site vous dira :</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <CheckCircle className="text-blue-600 shrink-0 mt-1" size={24} />
              <p className="text-gray-700 text-lg">
                si c'est <strong>à votre charge</strong> (entretien courant)
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
              <p className="text-gray-700 text-lg">
                comment <strong>vérifier</strong>
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <CheckCircle className="text-purple-600 shrink-0 mt-1" size={24} />
              <p className="text-gray-700 text-lg">
                comment <strong>déboucher</strong>
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <CheckCircle className="text-orange-600 shrink-0 mt-1" size={24} />
              <p className="text-gray-700 text-lg">
                et quand <strong>contacter le bailleur</strong>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              Cela correspond exactement aux règles classiques d'entretien du logement, 
              comme le débouchage, l'entretien des joints ou des équipements courants.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="gap-2 rounded-full px-8">
              <Link href="/client/chat">
                Essayer maintenant
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
