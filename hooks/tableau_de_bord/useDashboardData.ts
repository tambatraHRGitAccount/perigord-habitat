"use client";

import { useState, useEffect } from "react";

export interface DashboardStats {
  totalLogements: number;
  totalLocataires: number;
  totalEquipements: number;
  incidentsEnCours: number;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLogements: 0,
    totalLocataires: 0,
    totalEquipements: 0,
    incidentsEnCours: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    // TODO: Remplacer par un vrai appel API pour le bailleur
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStats({
          totalLogements: 12,
          totalLocataires: 15,
          totalEquipements: 48,
          incidentsEnCours: 3
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
