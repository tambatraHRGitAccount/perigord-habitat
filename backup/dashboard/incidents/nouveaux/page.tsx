"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NouveauxIncidentsPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page principale avec le filtre
    router.replace("/dashboard/incidents?statut=nouveau");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement des nouveaux incidents...</p>
      </div>
    </div>
  );
}
