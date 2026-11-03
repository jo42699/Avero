import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { GlobeSection } from "@/components/sections/globe-section";
import { PassportChecker } from "@/components/sections/passport-checker";
import { DestinationExplorer } from "@/components/sections/destination-explorer";
import { FeaturesSection } from "@/components/sections/features-section";
import { ProductPreview } from "@/components/sections/product-preview";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <div className="noise min-h-screen overflow-hidden bg-[#090a0d] text-[#f5f6f8]">
      <Navbar />
      <main>
        <HeroSection />
        <GlobeSection />
        <PassportChecker />
        <DestinationExplorer />
        <FeaturesSection />
        <ProductPreview />
        <HowItWorks />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
