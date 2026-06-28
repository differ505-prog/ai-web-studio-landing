import Image from "next/image";
import { ArrowUpRight, Cloud, LayoutDashboard, PackageCheck } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const outcomes = [
  {
    icon: PackageCheck,
    title: "複雜配件清單整合",
    description: "將多規格配件、尺寸與品項邏輯集中管理，降低人工比對與錯誤率。",
  },
  {
    icon: LayoutDashboard,
    title: "空間規劃流程數位化",
    description: "把原本仰賴 Excel 與紙本的規劃流程轉為系統化介面與可追蹤任務。",
  },
  {
    icon: Cloud,
    title: "雲端架構彈性擴充",
    description: "採用可持續演進的雲端架構，支援跨據點資料同步與後續模組化擴增。",
  },
];

export function PortfolioSection() {
  return (
    <AnimatedSection id="portfolio" ariaLabelledBy="portfolio-title" className="mt-24">
      <SectionIntro
        eyebrow="Portfolio / PoC"
        title="我們不只懂網頁，也懂如何替實體產業完成數位轉型。"
        description="以下展示一個具代表性的系統 PoC 方向，說明我們如何將複雜的營運流程拆解、重構並轉化成可落地的數位產品。"
      />

      <article className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
              alt="展示雲端系統操作與數位化管理情境的科技工作畫面"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050816] via-[#050816]/50 to-transparent" />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              精選案例
            </div>
            <h3 className="mt-5 text-3xl font-semibold text-white">
              系統櫃配件與空間收納自動化管理系統
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-300">
              這套網頁系統以雲端架構為核心，重新整理複雜的配件清單管理流程，整合多品類資料、規格條件與查詢邏輯，
              讓團隊能快速掌握庫存與搭配規則。同時，系統也將空間規劃流程數位化，協助業務與設計端更高效率地建立配置方案，
              展現我們為實體產業推動數位轉型的實戰能力。
            </p>

            <div className="mt-8 grid gap-4">
              {outcomes.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-slate-950/45 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{title}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
            >
              想打造你的產業 PoC
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}
