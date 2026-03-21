import { HeaderApp } from "@/components/layout/HeaderApp";
import { HeroSection } from "@/components/landing/HeroSection";
import { ObjectivesSection } from "@/components/landing/ObjectivesSection";
import { RulesSection } from "@/components/landing/RulesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ExampleSection } from "@/components/landing/ExampleSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderApp />
      <HeroSection />
      <ObjectivesSection />
      <RulesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ExampleSection />:
      <FooterSection />
    </div>
  );
}
