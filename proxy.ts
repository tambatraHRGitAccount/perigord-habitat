import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { UserRole } from "@/types/user";

const REDIRECT_BY_ROLE: Record<UserRole, string> = {
  locataire: "/client/logement",
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
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // --- ROUTES D'AUTHENTIFICATION GÉNÉRALES ---
  // Utilisateur connecté sur une page d'auth → rediriger selon rôle
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(REDIRECT_BY_ROLE[role], req.url));
  }

  // --- ROUTES CLIENT (/client/*) ---
  // Pas connecté + page client protégée → login
  if (!user && pathname.startsWith("/client")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // --- ROUTES BAILLEUR (/dashboard, /equipment) ---
  // Pas connecté → login avec redirection
  if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/equipment"))) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Connecté mais locataire → refuser l'accès
  if (user && role === "locataire" && (pathname.startsWith("/dashboard") || pathname.startsWith("/equipment"))) {
    return NextResponse.redirect(new URL("/client/logement", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo-default\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
