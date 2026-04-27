"use client";

import { useState, useEffect } from "react";

export interface DashboardStats {
  totalIncidents: number;
  resolvedIncidents: number;
  pendingIncidents: number;
  totalEquipments: number;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    totalIncidents: 0,
    resolvedIncidents: 0,
    pendingIncidents: 0,
    totalEquipments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    // TODO: Remplacer par un vrai appel API
    const fetchData = async () => {
      try {
        // Simulation de données
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStats({
          totalIncidents: 24,
          resolvedIncidents: 18,
          pendingIncidents: 6,
          totalEquipments: 42
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, loading };
}
