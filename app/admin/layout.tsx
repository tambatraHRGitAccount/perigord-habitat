"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const role = user?.user_metadata?.role ?? user?.app_metadata?.role;
  const isAdminAuthPage = pathname === "/admin/auth/login";

  useEffect(() => {
    if (loading) return;

    // Connecté admin + page login → dashboard
    if (user && role === "admin" && isAdminAuthPage) {
      router.replace("/admin/dashboard");
      return;
    }

    // Pas connecté + dashboard → login admin
    if (!user && !isAdminAuthPage) {
      router.replace("/admin/auth/login");
      return;
    }

    // Connecté mais pas admin + dashboard → refus
    if (user && role !== "admin" && !isAdminAuthPage) {
      router.replace("/client/materiels");
    }
  }, [user, role, loading, pathname, router, isAdminAuthPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
