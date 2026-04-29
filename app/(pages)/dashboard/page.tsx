"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Home, Users, Package, AlertTriangle, Wrench, FileText } from "lucide-react";
import { StatsCard } from "@/components/tableau_de_bord/StatsCard";
import { QuickActions } from "@/components/tableau_de_bord/QuickActions";
import { DashboardLayout } from "@/components/tableau_de_bord/DashboardLayout";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      const role = user.user_metadata?.role ?? user.app_metadata?.role;

      // Seul le bailleur peut accéder au dashboard
      if (role !== "bailleur") {
        router.push("/not-authorized");
        return;
      }

      setIsAuthorized(true);
    };

    checkAuth();
  }, [router]);

  // Statistiques pour le bailleur
  const stats = {
    totalLogements: 12,
    totalLocataires: 15,
    totalEquipements: 48,
    incidentsEnCours: 3
  };

  // Actions rapides pour le bailleur
  const quickActions = [
    {
      title: "Gérer les équipements",
      description: "Voir tous les équipements",
      icon: Package,
      href: "/equipment",
      color: "blue" as const
    },
    {
      title: "Voir les locataires",
      description: "Gérer les locataires",
      icon: Users,
      href: "/maison",
      color: "green" as const
    },
    {
      title: "Voir les incidents",
      description: "Incidents en cours",
      icon: AlertTriangle,
      href: "/client/incidents",
      color: "orange" as const
    },
    {
      title: "Interventions",
      description: "Planifier une intervention",
      icon: Wrench,
      href: "/client/interventions",
      color: "purple" as const
    }
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout title="Tableau de bord" description="Vue d'ensemble de la gestion">
      <div className="w-full space-y-8">
        
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Logements"
            value={stats.totalLogements}
            icon={Home}
            color="blue"
          />
          <StatsCard
            title="Locataires"
            value={stats.totalLocataires}
            icon={Users}
            color="green"
          />
          <StatsCard
            title="Équipements"
            value={stats.totalEquipements}
            icon={Package}
            color="purple"
          />
          <StatsCard
            title="Incidents en cours"
            value={stats.incidentsEnCours}
            icon={AlertTriangle}
            color="orange"
          />
        </div>

        {/* Actions rapides */}
        <QuickActions actions={quickActions} />

        {/* Section informative */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gestion des équipements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Package className="text-blue-600" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-2">Équipements</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Gérez tous les équipements de vos logements : ajout, modification, suivi de maintenance.
                </p>
                <a 
                  href="/equipment" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Gérer les équipements
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Incidents */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-orange-600" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-2">Incidents</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Suivez et gérez tous les incidents signalés par vos locataires en temps réel.
                </p>
                <a 
                  href="/client/incidents" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Voir les incidents
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
