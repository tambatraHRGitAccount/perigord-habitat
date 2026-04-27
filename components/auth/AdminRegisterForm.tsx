"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export function AdminRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const { register, pending, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setConfirmError("Les mots de passe ne correspondent pas.");
      return;
    }
    setConfirmError(null);
    const result = await register(email, password, fullName, "bailleur", { organisation });
    if (result === "confirm") setRegistered(true);
  };

  if (registered) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="bg-indigo-50 p-4 rounded-full">
          <MailCheck size={36} className="text-indigo-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">Vérifiez votre boîte mail</p>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Un e-mail de confirmation a été envoyé à{" "}
            <span className="font-medium text-gray-700">{email}</span>.
            Cliquez sur le lien pour activer votre compte administrateur.
          </p>
        </div>
        <Link href="/login" className="text-xs text-indigo-600 hover:underline font-medium">
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      {(error || confirmError) && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
          {confirmError ?? error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="organisation">Organisation / Société</Label>
        <Input
          id="organisation"
          type="text"
          placeholder="Périgord Habitat"
          required
          autoFocus
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nom complet</Label>
        <Input
          id="name"
          type="text"
          placeholder="Jean Dupont"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Adresse e-mail professionnelle</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@organisation.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            minLength={8}
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
        {pending ? "Création du compte..." : "Créer le compte administrateur"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
