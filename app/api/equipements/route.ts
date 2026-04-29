import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Equipment } from "@/types/equipment";

const DATA_PATH = path.join(process.cwd(), "data", "equipements.json");

// GET — lire tous les équipements
export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur GET equipements:", error);
    return NextResponse.json({ error: "Erreur lecture fichier" }, { status: 500 });
  }
}

// PUT — mettre à jour un équipement par id
export async function PUT(request: NextRequest) {
  try {
    const updated: Equipment = await request.json();

    if (!updated?.id) {
      return NextResponse.json({ error: "id manquant" }, { status: 400 });
    }

    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(raw) as { equipements: Equipment[] };

    const index = data.equipements.findIndex((eq) => eq.id === updated.id);
    if (index === -1) {
      return NextResponse.json({ error: "Équipement introuvable" }, { status: 404 });
    }

    data.equipements[index] = updated;

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, equipment: updated });
  } catch (error) {
    console.error("Erreur PUT equipement:", error);
    return NextResponse.json({ error: "Erreur écriture fichier" }, { status: 500 });
  }
}
