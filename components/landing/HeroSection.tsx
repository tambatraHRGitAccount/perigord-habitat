"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Colonne gauche - Contenu */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
              <Home size={16} className="shrink-0" />
              Cher Locataire, Bienvenue
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-indigo-600">QUI FAIT QUOI</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 leading-tight">
              Comprendre, diagnostiquer et résoudre<br />
              les problèmes de votre logement
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Cette plateforme a été conçue pour vous accompagner au quotidien dans l'entretien et les réparations de votre logement.
            </p>

            <p className="text-lg text-gray-700 mb-6 font-medium">
              Son objectif est simple :
            </p>

            {/* Objectifs */}
            <div className="flex flex-col gap-3 mb-8 text-left">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xl shrink-0">👉</span>
                <p className="text-base text-gray-700">vous aider à <strong>savoir qui doit intervenir</strong>,</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xl shrink-0">👉</span>
                <p className="text-base text-gray-700">comprendre <strong>qui paie</strong>,</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xl shrink-0">👉</span>
                <p className="text-base text-gray-700">et vous permettre, lorsque c'est possible, de <strong>résoudre vous-même</strong> un problème rapidement.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 rounded-lg px-8 text-base">
                <Link href="/client/chat">
                  Commencer maintenant
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-lg px-8 text-base">
                <Link href="#comment-ca-marche">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>

          {/* Colonne droite - Image */}
          <div className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <Image
              src="/landing_page/hero-section.jpeg"
              alt="Illustration de la plateforme Qui Fait Quoi"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
