"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { useAuth } from "@/hooks/useAuth";
import { AlertTriangle, History, Building2, FileText, ChevronRight, User, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  {
    id: "incidents",
    title: "Mes incidents",
    description: "Consulter et suivre mes demandes d'intervention",
    icon: AlertTriangle,
    color: "bg-red-50 text-red-600",
    href: "/client/incidents",
  },
  {
    id: "historique",
    title: "Historique",
    description: "Voir l'historique complet de mes demandes",
    icon: History,
    color: "bg-blue-50 text-blue-600",
    href: "/client/compte/historique",
  },
  {
    id: "logements",
    title: "Mes logements",
    description: "Gérer mes logements et leurs informations",
    icon: Building2,
    color: "bg-green-50 text-green-600",
    href: "/client/compte/logements",
  },
  {
    id: "documents",
    title: "Documents / Équipements",
    description: "Accéder à mes documents et la liste de mes équipements",
    icon: FileText,
    color: "bg-purple-50 text-purple-600",
    href: "/client/compte/documents",
  },
];

export default function ComptePage() {
  const { user, logout } = useAuth();

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Utilisateur";
  const email = user?.email ?? "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeaderApp />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Profil utilisateur */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User size={28} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                    <Mail size={14} />
                    {email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut size={16} />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Menu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-3 group"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon size={24} />
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
