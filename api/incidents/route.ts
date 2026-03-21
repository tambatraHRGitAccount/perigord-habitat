import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { data: locataire } = await supabase
      .from("locataires")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!locataire) {
      return NextResponse.json({ error: "Locataire non trouvé" }, { status: 404 });
    }

    const { data: incidents, error } = await supabase
      .from("incidents")
      .select("*")
      .eq("locataire_id", locataire.id)
      .order("date_creation", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ incidents });
  } catch (error) {
    console.error("Erreur GET incidents:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { data: locataire } = await supabase
      .from("locataires")
      .select("id, logement_id, bailleur_id")
      .eq("user_id", user.id)
      .single();

    if (!locataire) {
      return NextResponse.json({ error: "Locataire non trouvé" }, { status: 404 });
    }

    const body = await request.json();
    const { titre, description, priorite, piece, type_sinistre, preuves } = body;

    const { data: incident, error } = await supabase
      .from("incidents")
      .insert({
        locataire_id: locataire.id,
        logement_id: locataire.logement_id,
        bailleur_id: locataire.bailleur_id,
        titre,
        description,
        priorite,
        piece,
        type_sinistre,
        preuves,
        statut: "nouveau",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ incident }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST incident:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
