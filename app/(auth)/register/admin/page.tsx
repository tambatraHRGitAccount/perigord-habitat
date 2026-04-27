import { AuthCard } from "@/components/auth/AuthCard";
import { AdminRegisterForm } from "@/components/auth/AdminRegisterForm";

export default function AdminRegisterPage() {
  return (
    <AuthCard
      title="Espace bailleur"
      description="Créez votre compte administrateur"
    >
      <AdminRegisterForm />
    </AuthCard>
  );
}
