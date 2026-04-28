"use client";

import { Suspense, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Non connecté sur une page client protégée → login
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}
