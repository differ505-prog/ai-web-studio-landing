import { ContactSection } from "@/components/contact-section";
import { FAQ } from "@/components/FAQ";
import { FooterSection } from "@/components/footer-section";
import { HeroSection } from "@/components/hero-section";
import { PainPointsSection } from "@/components/pain-points-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { Pricing } from "@/components/Pricing";
import { ServicesSection } from "@/components/services-section";
import { WorkflowSection } from "@/components/workflow-section";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "築時數位",
  description:
    "提供品牌網站、風格 Landing Page、企業官網與兼具美感與轉換的數位體驗規劃。",
  areaServed: "Taiwan",
  serviceType: ["品牌官網", "Landing Page", "形象網站", "數位體驗設計"],
  url: "https://arrive-studio.vercel.app/",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="mx-auto w-full max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10 lg:py-8">
        <HeroSection />
        <PainPointsSection />
        <ServicesSection />
        <PortfolioSection />
        <WorkflowSection />
        <Pricing />
        <FAQ />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
}
