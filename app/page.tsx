import { ContactSection } from "@/components/contact-section";
import { FAQ } from "@/components/FAQ";
import { FooterSection } from "@/components/footer-section";
import { HeroSection } from "@/components/hero-section";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { PainPointsSection } from "@/components/pain-points-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { Pricing } from "@/components/Pricing";
import { ProofStripSection } from "@/components/proof-strip-section";
import { ServicesSection } from "@/components/services-section";
import { WorkflowSection } from "@/components/workflow-section";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "築時數位",
  description:
    "提供品牌網站、風格 Landing Page、企業官網與兼具美感與轉換的數位體驗規劃。",
  areaServed: "Taiwan",
  email: "hello.arrivestudio@gmail.com",
  serviceType: [
    "品牌官網",
    "Landing Page",
    "形象網站",
    "數位體驗設計",
    "SaaS 產品網站",
    "任務管理工具 / 工具型 Web App",
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

      <main className="mx-auto w-full max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10 lg:py-8">
        <HeroSection />
        <div className="mt-10 lg:mt-14">
          <ProofStripSection />
        </div>
        <div className="mt-12 lg:mt-16">
          <PainPointsSection />
        </div>
        <ServicesSection />
        <PortfolioSection />
        <WorkflowSection />
        <Pricing />
        <FAQ />
        <ContactSection />
        <FooterSection />
      </main>
      <MobileStickyCta />
    </>
  );
}
