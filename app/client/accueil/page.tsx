"use client";

import Link from "next/link";
import { Bot, Building2, BookOpen, HelpCircle, Phone, AlertTriangle } from "lucide-react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const STEPS = [
  {
    number: "1",
    title: "Signalez votre problème",
    description: "Décrivez le problème rencontré dans votre logement en quelques clics.",
  },
  {
    number: "2",
    title: "On identifie le responsable",
    description: "Notre outil vous indique si c'est au bailleur ou au locataire d'intervenir.",
  },
  {
    number: "3",
    title: "Suivez la résolution",
    description: "Recevez des notifications et suivez l'avancement de votre demande en temps réel.",
  },
];

const QUICK_ACCESS = [
  { href: "/client/chat",           icon: Bot,         label: "Diagnostiquer un problème", color: "bg-red-50 text-red-600" },
  { href: "/client/logement",       icon: Building2,   label: "Mon logement",              color: "bg-blue-50 text-blue-600" },
  { href: "/client/tutos",          icon: BookOpen,    label: "Tutos & conseils",           color: "bg-green-50 text-green-600" },
  { href: "/client/qui-fait-quoi",  icon: HelpCircle,  label: "Qui fait quoi ?",            color: "bg-purple-50 text-purple-600" },
  { href: "/client/contacts",       icon: Phone,       label: "Contacts utiles",            color: "bg-orange-50 text-orange-600" },
];

export default function AccueilPage() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderApp />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-10">

        {/* Présentation */}
        <section className="text-center flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {firstName ? `Bonjour ${firstName} 👋` : "Bienvenue sur votre espace locataire"}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Gérez votre logement, signalez vos problèmes et suivez vos demandes d'intervention — tout en un seul endroit.
          </p>
        </section>

        {/* CTA principal */}
        <section className="flex justify-center">
          <Button asChild size="lg" className="gap-2 px-8 shadow-md">
            <Link href="/client/chat">
              <AlertTriangle size={18} />
              J'ai un problème
            </Link>
          </Button>
        </section>

        {/* 3 étapes */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Comment ça marche</h2>
          <div className="flex flex-col gap-3">
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                  {step.number}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{step.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accès rapide */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Accès rapide</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACCESS.map(({ href, icon: Icon, label, color }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className={`p-2 rounded-lg ${color}`}>
                  <Icon size={18} />
                </span>
                <span className="text-sm font-medium text-gray-700 leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
