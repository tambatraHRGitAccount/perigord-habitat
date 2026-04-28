"use client";

import { Lightbulb, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ExampleSection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-100 mb-4">
              <Lightbulb className="text-amber-600" size={28} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Exemple concret
            </h2>
            <p className="text-base text-gray-600">
              Voyez comment la plateforme vous aide au quotidien
            </p>
          </div>
        </ScrollReveal>

        {/* Contenu */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-gray-200 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Un évier bouché ?
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                <CheckCircle className="text-blue-600 shrink-0 mt-1" size={24} />
                <p className="text-gray-700 text-lg">
                  Si c&apos;est <strong>à votre charge</strong> (entretien courant)
                </p>
              </div>
              <div className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                <p className="text-gray-700 text-lg">
                  Comment <strong>vérifier</strong>
                </p>
              </div>
              <div className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all">
                <CheckCircle className="text-purple-600 shrink-0 mt-1" size={24} />
                <p className="text-gray-700 text-lg">
                  Comment <strong>déboucher</strong>
                </p>
              </div>
              <div className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all">
                <CheckCircle className="text-orange-600 shrink-0 mt-1" size={24} />
                <p className="text-gray-700 text-lg">
                  Quand <strong>contacter le bailleur</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                Cela correspond exactement aux règles classiques d&apos;entretien du logement, 
                comme le débouchage, l&apos;entretien des joints ou des équipements courants.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="gap-2 rounded-lg px-8 py-6 text-lg shadow-xl hover:scale-105 transition-transform">
                <Link href="/client/chat">
                  Essayer maintenant
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
