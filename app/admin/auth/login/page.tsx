import { AuthCard } from "@/components/auth/AuthCard";
import { LoginAdminForm } from "@/components/auth/LoginAdminForm";

export default function AdminLoginPage() {
  return (
    <AuthCard
      title="Espace administrateur"
      description="Connectez-vous à votre tableau de bord"
    >
      <LoginAdminForm />
    </AuthCard>
  );
}
