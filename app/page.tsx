import { HeaderApp } from "@/components/layout/HeaderApp";
import { HeroSection } from "@/components/landing/HeroSection";
import { RulesSection } from "@/components/landing/RulesSection";
import { PurposeSection } from "@/components/landing/PurposeSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GoalSection } from "@/components/landing/GoalSection";
import { ExampleSection } from "@/components/landing/ExampleSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderApp />
      <HeroSection />
      <RulesSection />
      <PurposeSection />
      <HowItWorksSection />
      <FeaturesSection />
      <GoalSection />
      <ExampleSection />
    </div>
  );
}
