import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForgotForm } from "@/components/auth/LoginForgotForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Mot de passe oublié"
      description="Nous vous enverrons un lien de réinitialisation"
    >
      <LoginForgotForm defaultMode="forgot-password" />
    </AuthCard>
  );
}
