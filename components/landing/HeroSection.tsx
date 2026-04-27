"use client";

import Link from "next/link";
import { ArrowRight, Home, Sparkles, Building2 } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/40 to-slate-900/60" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Badge avec animation */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-white bg-white/95 backdrop-blur-sm text-indigo-700 text-base font-bold mb-8 shadow-2xl animate-fade-in-up">
            <Home size={20} className="shrink-0" />
            Cher Locataire, Bienvenue
          </div>

          {/* Titre principal avec animation */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-fade-in-up animation-delay-100">
            Savoir qui répare quoi<br />
            dans votre logement
          </h1>

          {/* Description avec animation */}
          <p className="text-lg sm:text-xl text-white/95 mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-2xl animate-fade-in-up animation-delay-200">
            Cette plateforme a été conçue pour vous accompagner au quotidien dans l&apos;entretien et les réparations de votre logement.
          </p>

          {/* CTA avec animations */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Button asChild size="lg" className="gap-3 rounded-xl px-8 py-6 text-base font-bold shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all bg-indigo-600 hover:bg-indigo-700">
              <Link href="/client/chat">
                <Sparkles size={20} />
                Commencer maintenant
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-3 rounded-xl px-8 py-6 text-base font-bold shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/maison">
                <Building2 size={20} />
                Visiter mon logement en 3D
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3 rounded-xl px-8 py-6 text-base font-bold bg-white/95 hover:bg-white border-2 border-white shadow-2xl hover:scale-105 transition-all backdrop-blur-sm">
              <Link href="#comment-ca-marche">
                En savoir plus
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
