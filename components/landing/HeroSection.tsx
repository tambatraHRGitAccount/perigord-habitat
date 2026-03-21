"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center ">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing_page/hero-section.jpeg')" }}
      >
        {/* Overlay léger pour la lisibilité */}
        <div className="absolute inset-0" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 w-full px-4 sm:px-6">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/95 backdrop-blur-sm text-indigo-700 text-sm font-medium mb-8 shadow-lg">
            <Home size={16} className="shrink-0" />
            Cher Locataire, Bienvenue
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {/* QUI FAIT QUOI */}
          </h1>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/95 mb-8 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Comprendre, diagnostiquer et résoudre<br />
            les problèmes de votre logement
          </h2>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            Cette plateforme a été conçue pour vous accompagner au quotidien dans l'entretien et les réparations de votre logement.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2 rounded-lg px-8 py-6 text-lg shadow-2xl hover:scale-105 transition-transform">
              <Link href="/client/chat">
                Commencer maintenant
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 rounded-lg px-8 py-6 text-lg bg-white/95 backdrop-blur-sm hover:bg-white border-white/50 shadow-2xl hover:scale-105 transition-transform">
              <Link href="#objectifs">
                En savoir plus
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
