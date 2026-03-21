"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { ArrowLeft, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChargesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/client/qui-fait-quoi" className="gap-2">
            <ArrowLeft size={16} />
            Retour
          </Link>
        </Button>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Receipt size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Charges récupérables</h1>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Contenu à venir : liste des charges récupérables auprès du locataire.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
