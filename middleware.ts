import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { UserRole } from "@/types/user";

const REDIRECT_BY_ROLE: Record<UserRole, string> = {
  locataire: "/client/chat",
  bailleur: "/dashboard",
};

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];
const PROTECTED_PREFIXES = ["/dashboard", "/equipment", "/client", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  // Utilisateur non connecté → redirige vers login pour les routes protégées
  if (!user && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Utilisateur connecté → redirige hors des pages auth
  if (user && isAuthRoute) {
    const role = (user.user_metadata?.role ?? "locataire") as UserRole;
    return NextResponse.redirect(new URL(REDIRECT_BY_ROLE[role], request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo-default\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
