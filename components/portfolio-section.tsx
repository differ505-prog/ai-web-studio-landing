import Image from "next/image";
import { ArrowUpRight, Cloud, LayoutDashboard, PackageCheck } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const outcomes = [
  {
    icon: PackageCheck,
    title: "商品與配件資訊變得更清楚",
    description: "把複雜的規格與搭配邏輯整理為可閱讀的分類層次，提升品牌專業感。",
  },
  {
    icon: LayoutDashboard,
    title: "服務流程被優雅地說明",
    description: "不再依靠繁複的圖表，而是以卡片、段落與細節標註引導理解。",
  },
  {
    icon: Cloud,
    title: "後續擴充仍然保有彈性",
    description: "品牌先建立一致的前台門面，再逐步延伸為預約、會員或內部管理功能。",
  },
];

export function PortfolioSection() {
  return (
    <AnimatedSection id="portfolio" ariaLabelledBy="portfolio-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Selected Direction"
        title="我們偏愛把案例做得像一本品牌畫冊，而不是一張技術規格表。"
        description="以下是一個適合空間收納與生活品牌的敘事方式示意，說明如何用更平靜的畫面結構承接品牌故事、產品特色與服務信任。"
      />

      <article className="mt-12 overflow-hidden rounded-[36px] border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="以木質收納、溫潤材質與簡潔陳列呈現的生活美學空間"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f6f1e9] via-transparent to-transparent" />
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-600">
              精選方向
            </div>
            <h3 className="mt-5 font-serif text-3xl font-semibold tracking-wide text-stone-900">
              空間收納與生活選物品牌的編輯式官網提案
            </h3>
            <p className="mt-5 text-base leading-8 text-stone-700">
              我們會先梳理您的服務方式、材質特色與案例脈絡，再利用乾淨的留白與版面比例，讓使用者像翻閱質感型錄一樣理解您的價值。這尤其適合需要兼顧信任感與詢問轉換的商業官網。
            </p>

            <div className="mt-8 grid gap-4">
              {outcomes.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-[26px] border border-stone-200 bg-stone-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="rounded-full border border-stone-200 bg-white p-3 text-emerald-700/70">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-serif text-lg font-semibold tracking-wide text-stone-900">
                        {title}
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-stone-700">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] transition hover:text-stone-800"
            >
              想把你的品牌整理成這樣的畫面節奏
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}
