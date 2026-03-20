import { useState, useEffect } from "react";
import { incidentService } from "@/services/incident.service";
import type { Incident, CreateIncidentDTO, IncidentStatut } from "@/types/incident";

export function useIncidents(locataireId: number | null) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = async () => {
    if (!locataireId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await incidentService.getIncidentsByLocataire(locataireId);
      setIncidents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement");
      console.error("Erreur chargement incidents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [locataireId]);

  const createIncident = async (
    logementId: number,
    bailleurId: number,
    incident: CreateIncidentDTO
  ) => {
    if (!locataireId) throw new Error("Locataire non identifié");

    try {
      const newIncident = await incidentService.createIncident(
        locataireId,
        logementId,
        bailleurId,
        incident
      );
      setIncidents((prev) => [newIncident, ...prev]);
      return newIncident;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création");
      throw err;
    }
  };

  const filterByStatut = (statut: IncidentStatut | "tous") => {
    if (statut === "tous") return incidents;
    return incidents.filter((i) => i.statut === statut);
  };

  return {
    incidents,
    loading,
    error,
    createIncident,
    filterByStatut,
    refetch: fetchIncidents,
  };
}
