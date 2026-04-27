"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/providers/AuthProvider";
import type { UserRole } from "@/types/user";

const REDIRECT_BY_ROLE: Record<UserRole, string> = {
  locataire: "/client/logement",
  bailleur: "/dashboard",
};

export function useAuth() {
  const { user, session, profile, loading } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setPending(true);
      setError(null);
      const data = await authService.signIn(email, password);
      const role = (data.user?.user_metadata?.role ?? "locataire") as UserRole;
      router.push(REDIRECT_BY_ROLE[role]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Identifiants invalides.");
    } finally {
      setPending(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    extra?: { organisation?: string }
  ): Promise<"confirm" | "done"> => {
    try {
      setPending(true);
      setError(null);
      const data = await authService.signUp(email, password, fullName, role, extra);

      if (data.user && !data.session) return "confirm";

      router.push(REDIRECT_BY_ROLE[role]);
      return "done";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription.");
      return "done";
    } finally {
      setPending(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setPending(true);
      setError(null);
      await authService.forgotPassword(email);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi de l'e-mail.");
      return false;
    } finally {
      setPending(false);
    }
  };

  const resetPassword = async (newPassword: string): Promise<boolean> => {
    try {
      setPending(true);
      setError(null);
      await authService.resetPassword(newPassword);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la réinitialisation.");
      return false;
    } finally {
      setPending(false);
    }
  };

  const logout = async () => {
    await authService.signOut();
    router.push("/login");
  };

  return {
    user,
    session,
    profile,
    loading,
    pending,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  };
}
