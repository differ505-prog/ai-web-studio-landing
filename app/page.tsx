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
    "提供 AI 網頁開發、Landing Page、企業官網、內部自動化系統與 AI 深度整合服務。",
  areaServed: "Taiwan",
  serviceType: [
    "企業形象官網",
    "Landing Page",
    "內部自動化系統",
    "AI 系統整合",
  ],
  url: "https://arrive-studio.vercel.app/",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-12 lg:py-8">
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
