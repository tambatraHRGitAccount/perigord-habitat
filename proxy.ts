import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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
  const role = user?.user_metadata?.role ?? user?.app_metadata?.role;

  const pathname = req.nextUrl.pathname;
  const clientAuthPaths = ["/client/auth/login", "/client/auth/register"];
  const adminAuthPath = "/admin/auth/login";

  // --- LOGIQUE CLIENT ---
  // Connecté (client) + page auth client → rediriger vers l'app client
  if (user && clientAuthPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/client/materiels", req.url));
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
    return NextResponse.redirect(new URL("/client/materiels", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/client/:path*", "/admin/dashboard/:path*", "/admin/auth/login"],
};
