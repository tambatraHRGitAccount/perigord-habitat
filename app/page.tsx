import { HeaderApp } from "@/components/layout/HeaderApp";
import { HeroSection } from "@/components/landing/HeroSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderApp />
      <HeroSection />
    </div>
  );
}
