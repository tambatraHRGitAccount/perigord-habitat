"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, User } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import type { UserRole } from "@/types/user";

const ROLE_CONFIG: Record<UserRole, { label: string; description: string; icon: typeof User; bg: string; iconColor: string }> = {
  locataire: {
    label: "Je suis locataire",
    description: "Accédez à votre espace personnel",
    icon: User,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  bailleur: {
    label: "Je suis bailleur",
    description: "Gérez vos logements et locataires",
    icon: Home,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
};

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole | null>(null);

  if (role) {
    const config = ROLE_CONFIG[role];
    return (
      <AuthCard
        title={config.label}
        description="Créez votre compte pour commencer"
      >
        <RegisterForm role={role} onChangeRole={() => setRole(null)} />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Créer un compte"
      description="Choisissez votre profil pour commencer"
    >
      <div className="flex flex-col gap-4 pt-2">
        {(Object.entries(ROLE_CONFIG) as [UserRole, typeof ROLE_CONFIG[UserRole]][]).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={key}
              onClick={() => setRole(key)}
              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                <Icon className={config.iconColor} size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{config.label}</p>
                <p className="text-sm text-gray-500">{config.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}

        <p className="text-center text-sm text-gray-500 pt-2">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
