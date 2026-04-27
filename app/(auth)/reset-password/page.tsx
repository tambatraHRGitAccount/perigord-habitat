"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { resetPassword, pending, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setConfirmError("Les mots de passe ne correspondent pas.");
      return;
    }
    setConfirmError(null);
    const ok = await resetPassword(password);
    if (ok) setDone(true);
  };

  if (done) {
    return (
      <AuthCard title="Mot de passe mis à jour" description="">
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="bg-green-50 p-4 rounded-full">
            <CheckCircle size={36} className="text-green-600" />
          </div>
          <p className="text-sm text-gray-500">
            Votre mot de passe a été réinitialisé avec succès.
          </p>
          <Button className="w-full" onClick={() => router.push("/login")}>
            Se connecter
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Nouveau mot de passe"
      description="Choisissez un mot de passe sécurisé"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
        {(error || confirmError) && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
            {confirmError ?? error}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              autoFocus
              className="pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm">Confirmer le mot de passe</Label>
          <Input
            id="confirm"
            type="password"
            placeholder="••••••••"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full mt-1" disabled={pending}>
          {pending ? "Mise à jour..." : "Réinitialiser le mot de passe"}
        </Button>
      </form>
    </AuthCard>
  );
}
