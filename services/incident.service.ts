import { createClient } from "@/lib/supabase/client";
import type { Incident, CreateIncidentDTO } from "@/types/incident";

export class IncidentService {
  private supabase = createClient();

  async getIncidentsByLocataire(locataireId: number): Promise<Incident[]> {
    const { data, error } = await this.supabase
      .from("incidents")
      .select("*")
      .eq("locataire_id", locataireId)
      .order("date_creation", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createIncident(
    locataireId: number,
    logementId: number,
    bailleurId: number,
    incident: CreateIncidentDTO
  ): Promise<Incident> {
    const { data, error } = await this.supabase
      .from("incidents")
      .insert({
        locataire_id: locataireId,
        logement_id: logementId,
        bailleur_id: bailleurId,
        titre: incident.titre,
        description: incident.description,
        priorite: incident.priorite,
        piece: incident.piece,
        type_sinistre: incident.type_sinistre,
        preuves: incident.preuves,
        statut: "nouveau",
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getIncidentById(id: number): Promise<Incident | null> {
    const { data, error } = await this.supabase
      .from("incidents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateIncidentStatut(
    id: number,
    statut: Incident["statut"]
  ): Promise<void> {
    const { error } = await this.supabase
      .from("incidents")
      .update({ statut })
      .eq("id", id);

    if (error) throw error;
  }
}

export const incidentService = new IncidentService();
