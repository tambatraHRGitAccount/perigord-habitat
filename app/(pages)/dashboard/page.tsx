"use client";

import { AlertTriangle, CheckCircle, Package, MessageSquare, Wrench, Building2, FileText } from "lucide-react";
import { StatsCard } from "@/components/tableau_de_bord/StatsCard";
import { RecentActivity } from "@/components/tableau_de_bord/RecentActivity";
import { QuickActions } from "@/components/tableau_de_bord/QuickActions";
import { DashboardLayout } from "@/components/tableau_de_bord/DashboardLayout";
import { useDashboardData } from "@/hooks/tableau_de_bord/useDashboardData";

export default function Dashboard() {
  const { stats, loading } = useDashboardData();

  // Données d'activité récente
  const recentActivities = [
    {
      id: "1",
      title: "Incident résolu",
      description: "Fuite d'eau dans la salle de bain - Réparation terminée",
      time: "Il y a 2 heures",
      status: "success" as const
    },
    {
      id: "2",
      title: "Nouvel incident signalé",
      description: "Problème électrique dans la cuisine",
      time: "Il y a 5 heures",
      status: "warning" as const
    },
    {
      id: "3",
      title: "Équipement ajouté",
      description: "Nouveau lave-vaisselle installé",
      time: "Hier",
      status: "success" as const
    },
    {
      id: "4",
      title: "En attente de validation",
      description: "Demande de réparation du chauffage",
      time: "Il y a 2 jours",
      status: "pending" as const
    }
  ];

  // Actions rapides
  const quickActions = [
    {
      title: "Signaler un incident",
      description: "Déclarer un nouveau problème",
      icon: AlertTriangle,
      href: "/client/incidents",
      color: "orange" as const
    },
    {
      title: "Assistant IA",
      description: "Poser une question",
      icon: MessageSquare,
      href: "/client/chat",
      color: "blue" as const
    },
    {
      title: "Mes équipements",
      description: "Gérer les équipements",
      icon: Package,
      href: "/equipment",
      color: "green" as const
    },
    {
      title: "Visite 3D",
      description: "Explorer mon logement",
      icon: Building2,
      href: "/maison",
      color: "purple" as const
    }
  ];

  if (loading) {
    return (
      <DashboardLayout title="Tableau de bord" description="Vue d'ensemble de votre logement">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Chargement des données...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Tableau de bord" description="Vue d'ensemble de votre logement">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total incidents"
            value={stats.totalIncidents}
            icon={AlertTriangle}
            color="blue"
            trend={{ value: 12, isPositive: false }}
          />
          <StatsCard
            title="Incidents résolus"
            value={stats.resolvedIncidents}
            icon={CheckCircle}
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="En attente"
            value={stats.pendingIncidents}
            icon={Wrench}
            color="orange"
          />
          <StatsCard
            title="Équipements"
            value={stats.totalEquipments}
            icon={Package}
            color="purple"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Actions rapides et Activité récente */}
        <div className="grid lg:grid-cols-2 gap-8">
          <QuickActions actions={quickActions} />
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Section informative */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <FileText className="text-blue-600" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-gray-900 mb-3">Besoin d'aide ?</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Consultez notre guide "Qui fait quoi ?" pour savoir qui est responsable des réparations dans votre logement.
              </p>
              <a 
                href="/client/qui-fait-quoi" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Consulter le guide
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
