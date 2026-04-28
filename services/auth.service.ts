import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/user";

/*
  Supabase SQL requis (à exécuter dans l'éditeur SQL du dashboard) :

  create table public.profiles (
    id         uuid references auth.users(id) on delete cascade primary key,
    role       text not null check (role in ('locataire', 'bailleur')),
    full_name  text,
    organisation text,
    telephone  text,
    created_at timestamptz default now()
  );

  alter table public.profiles enable row level security;

  create policy "Lecture profil personnel"
    on public.profiles for select
    using (auth.uid() = id);

  create policy "Mise à jour profil personnel"
    on public.profiles for update
    using (auth.uid() = id);

  -- Trigger pour créer le profil automatiquement à l'inscription
  create or replace function public.handle_new_user()
  returns trigger language plpgsql security definer as $$
  begin
    insert into public.profiles (id, role, full_name, organisation)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'role', 'locataire'),
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'organisation'
    );
    return new;
  end;
  $$;

  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
*/

export const authService = {
  async signUp(
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    extra?: { organisation?: string }
  ) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role, ...extra },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) throw error;

    // Fallback : le trigger Supabase créé le profil automatiquement.
    // Si email auto-confirm est activé, on insère manuellement en secours.
    if (data.user && data.session) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        role,
        full_name: fullName,
        organisation: extra?.organisation ?? null,
      });
    }

    return data;
  },

  async signIn(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async forgotPassword(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
    });
    if (error) throw error;
  },

  async resetPassword(newPassword: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  async getProfile() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return data;
  },

  async getSession() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async getUser() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
};
