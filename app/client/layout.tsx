"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

const AUTH_PATHS = ["/client/auth/login", "/client/auth/register"];

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (loading) return;

    const isAuthPage = AUTH_PATHS.includes(pathname);

    // Connecté + page auth → rediriger vers la destination voulue (ou chat par défaut)
    if (user && isAuthPage) {
      const next = searchParams.get("next") ?? "/client/chat";
      router.replace(next);
      return;
    }

    // Pas connecté + page protégée → rediriger vers login en mémorisant la destination
    if (!user && !isAuthPage) {
      router.replace(`/client/auth/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router, searchParams]);

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
