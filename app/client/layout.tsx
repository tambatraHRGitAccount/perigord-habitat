"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

const AUTH_PATHS = ["/client/auth/login", "/client/auth/register"];

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isAuthPage = AUTH_PATHS.includes(pathname);

    // Connecté + page auth → rediriger vers l'app
    if (user && isAuthPage) {
      router.replace("/client/materiels");
      return;
    }

    // Pas connecté + page protégée → rediriger vers login
    if (!user && !isAuthPage) {
      router.replace("/client/auth/login");
    }
  }, [user, loading, pathname, router]);

  // Pendant le chargement de la session, ne rien afficher pour éviter le flash
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
