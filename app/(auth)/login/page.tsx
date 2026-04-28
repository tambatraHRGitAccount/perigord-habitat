import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForgotForm } from "@/components/auth/LoginForgotForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Bon retour"
      description="Connectez-vous à votre espace"
    >
      <LoginForgotForm defaultMode="login" />
    </AuthCard>
  );
}
