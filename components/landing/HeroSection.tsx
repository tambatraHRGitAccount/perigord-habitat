"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare, Box, Star, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHAT_PREVIEW = [
  { role: "user", text: "Qui paie la réparation de la chaudière ?" },
  { role: "assistant", text: "🔥 C'est la responsabilité du propriétaire. La chaudière fait partie des équipements à entretenir obligatoirement." },
  { role: "user", text: "Et si c'est une fuite d'eau ?" },
  { role: "assistant", text: "💧 Cela dépend de l'origine. Canalisation encastrée → propriétaire. Joint ou robinet → locataire." },
];

export function HeroSection() {
  return (
    <section className="flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-12 gap-12 lg:gap-20">

      {/* ── Colonne gauche ── */}
      <div className="flex-1 flex flex-col gap-6 max-w-xl">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Assistant locatif disponible
        </span>

        {/* Titre */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
          Résolvez vos litiges{" "}
          <span className="text-indigo-600">Locatifs,</span>
          <br />Simplement
        </h1>

        {/* Sous-titre */}
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
          Posez vos questions sur vos incidents locatifs. Notre assistant identifie les responsabilités et vous guide pas à pas dans vos démarches.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="gap-2 rounded-full px-6">
            <Link href="/client/chat">
              Démarrer le chat
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 rounded-full px-6">
            <Link href="/schema-logement-konva">
              <Box size={16} />
              Schéma logement
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={16} className="text-indigo-500" />
            <span><strong className="text-gray-900">1 200+</strong> Questions répondues</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BookOpen size={16} className="text-indigo-500" />
            <span><strong className="text-gray-900">15</strong> Thèmes couverts</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star size={16} className="text-indigo-500" />
            <span><strong className="text-gray-900">4.9</strong> Note moyenne</span>
          </div>
        </div>
      </div>

      {/* ── Colonne droite – aperçu chat ── */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">

        {/* Badge "Rejoignez X+ locataires" */}
        <div className="absolute -top-4 -right-2 flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 z-10">
          <div className="flex -space-x-2">
            {["#6366f1", "#8b5cf6", "#a78bfa"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                {["A", "B", "C"][i]}
              </div>
            ))}
          </div>
          <div className="text-xs">
            <p className="font-semibold text-gray-900">Rejoignez 1 200+</p>
            <p className="text-gray-400">locataires</p>
          </div>
        </div>

        {/* Carte principale – preview du chat */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* En-tête carte */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
            <Image src="/logo-default.png" alt="QFQ" width={32} height={32} className="rounded-lg" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Qui fait quoi ?</p>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                En ligne
              </p>
            </div>
          </div>

          {/* Messages preview */}
          <div className="flex flex-col gap-3 px-5 py-5">
            {CHAT_PREVIEW.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input preview */}
          <div className="px-5 pb-5">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <MessageSquare size={14} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-400">Posez votre question…</span>
            </div>
          </div>
        </div>

        {/* Badge "200+ Thèmes" */}
        <div className="absolute -bottom-2 left-0 flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
            <BookOpen size={16} className="text-indigo-600" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-gray-900">15 Thèmes</p>
            <p className="text-gray-400">Couverts</p>
          </div>
        </div>
      </div>

    </section>
  );
}
