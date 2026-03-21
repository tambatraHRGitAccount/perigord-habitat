import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Locataire } from "@/types/user";

export function useCurrentUser() {
  const [locataire, setLocataire] = useState<Locataire | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error: fetchError } = await supabase
            .from("locataires")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (fetchError) throw fetchError;
          setLocataire(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
        console.error("Erreur chargement utilisateur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { locataire, loading, error };
}
