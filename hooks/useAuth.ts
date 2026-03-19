"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  const { user, session, loading } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setPending(true);
      setError(null);
      await authService.signInWithEmail(email, password);
      router.push("/client/materiels");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setPending(false);
    }
  };

  const register = async (email: string, password: string, fullName: string): Promise<"confirm" | "done"> => {
    try {
      setPending(true);
      setError(null);
      const data = await authService.signUpWithEmail(email, password, fullName);
      // Si Supabase retourne un user sans session, la confirmation email est requise
      if (data.user && !data.session) {
        return "confirm";
      }
      router.push("/");
      return "done";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur d'inscription");
      return "done";
    } finally {
      setPending(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setPending(true);
      setError(null);
      await authService.signInWithGoogle();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur Google OAuth");
    } finally {
      setPending(false);
    }
  };

  const logout = async () => {
    await authService.signOut();
    router.push("/client/auth/login");
  };

  return { user, session, loading, pending, error, login, register, loginWithGoogle, logout };
}
