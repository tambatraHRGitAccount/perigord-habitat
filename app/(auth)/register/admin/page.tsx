import { AuthCard } from "@/components/auth/AuthCard";
import { AdminRegisterForm } from "@/components/auth/AdminRegisterForm";

export default function AdminRegisterPage() {
  return (
    <AuthCard
      title="Espace professionnel"
      description="Créez votre compte bailleur ou administrateur"
    >
      <AdminRegisterForm />
    </AuthCard>
  );
}
