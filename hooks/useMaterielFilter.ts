"use client";

import { useState, useMemo } from "react";
import type { Piece } from "@/types/materiel";
import { MATERIELS } from "@/data/materiels";

export function useMaterielFilter() {
  const [filtre, setFiltre] = useState<Piece>("Tous");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    MATERIELS.filter((m) => {
      const matchPiece = filtre === "Tous" || m.piece === filtre;
      const q = search.toLowerCase();
      const matchSearch = m.nom.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
      return matchPiece && matchSearch;
    }),
    [filtre, search]
  );

  return { filtre, setFiltre, search, setSearch, filtered };
}
