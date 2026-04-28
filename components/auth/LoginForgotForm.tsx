"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

type FormMode = "login" | "forgot-password";

interface LoginForgotFormProps {
  defaultMode?: FormMode;
}

export function LoginForgotForm({ defaultMode = "login" }: LoginForgotFormProps) {
  const [mode, setMode] = useState<FormMode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { login, forgotPassword, pending, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await forgotPassword(email);
    if (ok) setEmailSent(true);
  };

  const switchToForgot = () => {
    setMode("forgot-password");
    setPassword("");
  };

  const switchToLogin = () => {
    setMode("login");
    setEmailSent(false);
  };

  /* ── Confirmation e-mail envoyé ── */
  if (mode === "forgot-password" && emailSent) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="bg-indigo-50 p-4 rounded-full">
          <MailCheck size={36} className="text-indigo-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">E-mail envoyé</p>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Un lien de réinitialisation a été envoyé à{" "}
            <span className="font-medium text-gray-700">{email}</span>.
            Vérifiez votre boîte de réception.
          </p>
        </div>
        <button
          type="button"
          onClick={switchToLogin}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:underline font-medium"
        >
          <ArrowLeft size={14} />
          Retour à la connexion
        </button>
      </div>
    );
  }

  /* ── Formulaire mot de passe oublié ── */
  if (mode === "forgot-password") {
    return (
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 pt-2">
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}
        <p className="text-sm text-gray-500 leading-relaxed">
          Entrez votre adresse e-mail. Nous vous enverrons un lien pour réinitialiser
          votre mot de passe.
        </p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full mt-1" disabled={pending}>
          {pending ? "Envoi en cours..." : "Envoyer le lien"}
        </Button>
        <button
          type="button"
          onClick={switchToLogin}
          className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          <ArrowLeft size={14} />
          Retour à la connexion
        </button>
      </form>
    );
  }

  /* ── Formulaire de connexion ── */
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 pt-2">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">{error}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="vous@exemple.com"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          <button
            type="button"
            onClick={switchToForgot}
            className="text-xs text-indigo-600 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
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

      <Button type="submit" className="w-full mt-1" disabled={pending}>
        {pending ? "Connexion..." : "Se connecter"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-indigo-600 font-medium hover:underline">
          S'inscrire
        </Link>
      </p>
    </form>
  );
}
