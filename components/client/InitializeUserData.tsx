"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function InitializeUserData() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleInitialize = async () => {
    if (!nom || !prenom) {
      setError("Veuillez remplir le nom et le prénom");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Utilisateur non connecté");
      }

      // Créer le locataire
      const { error: locataireError } = await supabase
        .from("locataires")
        .insert({
          user_id: user.id,
          bailleur_id: 1,
          logement_id: 1,
          code_acces_id: 1,
          nom,
          prenom,
          telephone: telephone || null,
          actif: true,
        });

      if (locataireError) throw locataireError;

      // Récupérer l'ID du locataire créé
      const { data: locataire } = await supabase
        .from("locataires")
        .select("id, logement_id")
        .eq("user_id", user.id)
        .single();

      if (!locataire) throw new Error("Erreur lors de la création du locataire");

      // Créer quelques incidents exemples
      const incidents = [
        {
          bailleur_id: 1,
          locataire_id: locataire.id,
          logement_id: locataire.logement_id,
          titre: "Fuite sous l'évier de la cuisine",
          description: "J'ai remarqué une fuite d'eau sous l'évier depuis ce matin.",
          statut: "nouveau",
          priorite: "haute",
          piece: "Cuisine",
        },
        {
          bailleur_id: 1,
          locataire_id: locataire.id,
          logement_id: locataire.logement_id,
          titre: "Radiateur chambre ne chauffe pas",
          description: "Le radiateur de la chambre principale reste froid.",
          statut: "en_cours",
          priorite: "haute",
          piece: "Chambre",
        },
        {
          bailleur_id: 1,
          locataire_id: locataire.id,
          logement_id: locataire.logement_id,
          titre: "Ampoule grillée dans l'entrée",
          description: "L'ampoule du plafonnier de l'entrée est grillée.",
          statut: "nouveau",
          priorite: "basse",
          piece: "Entrée",
        },
      ];

      const { error: incidentsError } = await supabase
        .from("incidents")
        .insert(incidents);

      if (incidentsError) throw incidentsError;

      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Erreur initialisation:", err);
      setError(err instanceof Error ? err.message : "Erreur lors de l'initialisation");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-6 max-w-md mx-auto mt-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="text-green-600" size={48} />
          <h2 className="text-xl font-bold text-gray-900">Données initialisées !</h2>
          <p className="text-gray-600">Vos données ont été créées avec succès. Rechargement...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto mt-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
          <div>
            <h2 className="text-lg font-bold text-gray-900">Initialisation requise</h2>
            <p className="text-sm text-gray-600 mt-1">
              Aucun profil locataire n'est associé à votre compte. Veuillez remplir les informations ci-dessous pour créer votre profil.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              placeholder="Dupont"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              placeholder="Marie"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telephone">Téléphone (optionnel)</Label>
            <Input
              id="telephone"
              placeholder="06 12 34 56 78"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <Button
          onClick={handleInitialize}
          disabled={loading || !nom || !prenom}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              Initialisation...
            </>
          ) : (
            "Créer mon profil"
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Un logement et quelques incidents exemples seront créés automatiquement.
        </p>
      </div>
    </Card>
  );
}
