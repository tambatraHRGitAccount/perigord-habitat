import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { UserRole } from "@/types/user";

const REDIRECT_BY_ROLE: Record<UserRole, string> = {
  locataire: "/client/chat",
  bailleur: "/dashboard",
};

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function proxy(req: NextRequest) {
  let res = NextResponse.next({
    request: req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Mettre à jour les cookies sur la requête ET la réponse
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const role = (user?.user_metadata?.role ?? user?.app_metadata?.role ?? "locataire") as UserRole;

  const pathname = req.nextUrl.pathname;
  const clientAuthPaths = ["/client/auth/login", "/client/auth/register"];
  const adminAuthPath = "/admin/auth/login";
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // --- LOGIQUE GÉNÉRALE AUTH ROUTES ---
  // Utilisateur connecté sur une page d'auth générale → rediriger selon rôle
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(REDIRECT_BY_ROLE[role], req.url));
  }

  // --- LOGIQUE CLIENT ---
  // Connecté (client) + page auth client → rediriger vers l'app client
  if (user && clientAuthPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/client/logement", req.url));
  }
  // Pas connecté + page client protégée → login client
  if (!user && pathname.startsWith("/client") && !clientAuthPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/client/auth/login", req.url));
  }

  // --- LOGIQUE ADMIN ---
  // Connecté admin + page login admin → rediriger vers dashboard
  if (user && role === "admin" && pathname === adminAuthPath) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  // Pas connecté + dashboard admin → login admin
  if (!user && pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/admin/auth/login", req.url));
  }
  // Connecté mais pas admin + dashboard admin → refus
  if (user && role !== "admin" && pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/client/logement", req.url));
  }

  // --- LOGIQUE DASHBOARD & EQUIPMENT (bailleur) ---
  // Pas connecté + routes protégées → login
  if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/equipment"))) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo-default\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
