import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/user";

const REDIRECT_BY_ROLE: Record<UserRole, string> = {
  bailleur:  "/dashboard",
  locataire: "/",
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data.user) {
      if (next) return NextResponse.redirect(`${origin}${next}`);
      const role = (data.user.user_metadata?.role ?? "locataire") as UserRole;
      return NextResponse.redirect(`${origin}${REDIRECT_BY_ROLE[role]}`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
