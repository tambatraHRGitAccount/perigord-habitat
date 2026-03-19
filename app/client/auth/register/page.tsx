import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Créer un compte"
      description="Rejoignez la plateforme Qui fait quoi"
    >
      <RegisterForm />
    </AuthCard>
  );
}
