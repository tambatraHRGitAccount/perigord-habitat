"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { ArrowLeft, Wrench, User, Building2, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReparationsPage() {
  const locataireReparations = [
    {
      category: "Portes et fenêtres",
      items: [
        "Graisser les gonds, paumelles et serrures",
        "Remplacer les poignées de portes cassées",
        "Changer les joints de fenêtres usés",
        "Remplacer les vitres cassées (sauf accident extérieur)"
      ]
    },
    {
      category: "Murs, sols, plafonds",
      items: [
        "Reboucher les petits trous dans les murs (chevilles, clous)",
        "Repeindre les murs si dégradés par l'usage normal",
        "Entretenir les revêtements de sol (parquet, lino) — petites réparations"
      ]
    },
    {
      category: "Plomberie",
      items: [
        "Changer les joints de robinets qui fuient",
        "Détartrer les robinets et la pomme de douche",
        "Déboucher les lavabos, éviers, baignoires (entretien courant)",
        "Remplacer les flotteurs et joints du mécanisme de chasse d'eau"
      ]
    },
    {
      category: "Électricité",
      items: [
        "Remplacer les ampoules",
        "Changer les prises et interrupteurs cassés (usage normal)",
        "Remplacer les fusibles"
      ]
    },
    {
      category: "Chauffage",
      items: [
        "Purger les radiateurs",
        "Remplacer les robinets thermostatiques défectueux (petite pièce)",
        "Entretenir annuellement la chaudière individuelle (nettoyage des filtres, etc.)"
      ]
    },
    {
      category: "Cuisine et équipements",
      items: [
        "Remplacer les petites pièces d'appareils fournis (joints de four, bacs de réfrigérateur)",
        "Entretenir la hotte (filtre, ampoule)",
        "Nettoyer régulièrement les grilles de ventilation"
      ]
    },
    {
      category: "Extérieur privatif (balcon, jardin)",
      items: [
        "Entretenir les espaces verts privatifs",
        "Nettoyer les gouttières si accès direct",
        "Maintenir en état les terrasses et balcons (joints de carrelage, etc.)"
      ]
    }
  ];

  const bailleurReparations = [
    {
      category: "Structure et gros œuvre",
      items: [
        "Toiture, murs porteurs, façades",
        "Planchers, escaliers communs",
        "Fondations et étanchéité"
      ]
    },
    {
      category: "Équipements vétustes",
      items: [
        "Remplacement d'une chaudière collective ou individuelle hors d'usage",
        "Remplacement d'une fenêtre dont les double-vitrages sont défaillants",
        "Remplacement d'une baignoire ou d'un receveur de douche fissurés"
      ]
    },
    {
      category: "Installations électriques",
      items: [
        "Tableau électrique défectueux",
        "Mise aux normes de l'installation",
        "Réparation des fils et câbles encastrés"
      ]
    },
    {
      category: "Plomberie lourde",
      items: [
        "Remplacement des canalisations principales",
        "Remplacement du cumulus / chauffe-eau (hors usage abusif)",
        "Réparation des fuites en colonne montante"
      ]
    },
    {
      category: "Chauffage collectif",
      items: [
        "Entretien et réparation des équipements de chauffage collectif",
        "Remplacement des radiateurs défectueux"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/client/qui-fait-quoi" className="gap-2">
            <ArrowLeft size={16} />
            Retour
          </Link>
        </Button>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wrench size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Réparations locatives</h1>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed text-base">
              Dans votre logement, certaines réparations sont à votre charge. D&apos;autres sont à la charge de votre propriétaire ou bailleur. 
              Ce guide vous aide à savoir qui doit faire quoi.
            </p>
          </div>

          {/* Section Locataire */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-blue-500">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-blue-600">
                Ce que le LOCATAIRE doit entretenir et réparer
              </h2>
            </div>

            <div className="space-y-6">
              {locataireReparations.map((section, idx) => (
                <div key={idx} className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-900 mb-3 text-base">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section Bailleur */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-orange-500">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-orange-600">
                Ce que le BAILLEUR doit réparer
              </h2>
            </div>

            <div className="space-y-6">
              {bailleurReparations.map((section, idx) => (
                <div key={idx} className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-500">
                  <h3 className="font-bold text-gray-900 mb-3 text-base">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-orange-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Avertissement */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Attention</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Si une dégradation est causée par un mauvais usage ou un défaut d&apos;entretien du locataire, 
                  la réparation peut rester à sa charge même si c&apos;est normalement la responsabilité du bailleur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
