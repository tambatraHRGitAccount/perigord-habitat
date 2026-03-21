import { HeaderApp } from "@/components/layout/HeaderApp";
import { FooterApp } from "@/components/layout/FooterApp";
import { HeroSection } from "@/components/landing/HeroSection";
import { ObjectivesSection } from "@/components/landing/ObjectivesSection";
import { RulesSection } from "@/components/landing/RulesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ExampleSection } from "@/components/landing/ExampleSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderApp />
      <HeroSection />
      <HowItWorksSection />
      <ObjectivesSection />
      <RulesSection />
      {/* <ExampleSection /> */}
      <FooterApp />
    </div>
  );
}
