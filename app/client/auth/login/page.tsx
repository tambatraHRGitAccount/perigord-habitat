import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Bon retour"
      description="Connectez-vous à votre espace"
    >
      <LoginForm />
    </AuthCard>
  );
}
