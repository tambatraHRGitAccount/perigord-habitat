"use client";

import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing_page/hero-section.jpeg')" }}
      >
        {/* Overlay pour la lisibilité */}
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-white bg-white backdrop-blur-sm text-indigo-700 text-base font-bold mb-8 shadow-2xl">
            <Home size={20} className="shrink-0" />
            Cher Locataire, Bienvenue
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] hidden">
            Qui fait quoi ?
          </h1>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Savoir qui répare quoi<br />
            dans votre logement
          </h2>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-white mb-12 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-3xl">
            Cette plateforme a été conçue pour vous accompagner au quotidien dans l'entretien et les réparations de votre logement.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-3 rounded-xl px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all bg-indigo-600 hover:bg-indigo-700">
              <Link href="/client/chat">
                <Sparkles size={22} />
                Commencer maintenant
                <ArrowRight size={22} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3 rounded-xl px-10 py-7 text-lg font-bold bg-white hover:bg-slate-50 border-2 border-white shadow-2xl hover:scale-105 transition-all">
              <Link href="#objectifs">
                En savoir plus
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-3 rounded-xl px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/maison">
                🏠 Visiter mon logement en 3D
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
