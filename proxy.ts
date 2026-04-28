import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { UserRole } from "@/types/user";

const REDIRECT_BY_ROLE: Record<UserRole, string> = {
  bailleur:  "/dashboard",
  locataire: "/",
};

const AUTH_ROUTES     = ["/login", "/register", "/forgot-password", "/reset-password"];
const BAILLEUR_ROUTES = ["/dashboard", "/equipment"];

export async function proxy(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const role = (
    user?.user_metadata?.role ??
    user?.app_metadata?.role ??
    "locataire"
  ) as UserRole;

  const pathname        = req.nextUrl.pathname;
  const isAuthRoute     = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isBailleurRoute = BAILLEUR_ROUTES.some((r) => pathname.startsWith(r));
  const isClientRoute   = pathname.startsWith("/client");

  // 1. Connecté sur une page d'auth → rediriger selon rôle
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(REDIRECT_BY_ROLE[role], req.url));
  }

  // 2. /client/* — non connecté → login
  if (!user && isClientRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. /dashboard et /equipment — non connecté → login avec next
  if (!user && isBailleurRoute) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. /dashboard et /equipment — locataire → page 403
  if (user && role === "locataire" && isBailleurRoute) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo-default\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
