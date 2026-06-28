import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const plans = [
  {
    name: "極速啟動版",
    summary: "適合需要快速上線、驗證市場或建立專業品牌門面的團隊。",
    price: "專案制 NT$ 60,000 起",
    delivery: "交付時間：5 - 10 個工作天",
    featured: false,
    features: [
      "單頁式 Landing Page 或品牌官網首頁",
      "完整 RWD 響應式設計",
      "基礎 SEO 架構與 metadata 設定",
      "CTA 導流與表單介面設計",
      "上線部署協助與交付說明",
    ],
  },
  {
    name: "企業客製版",
    summary: "適合需要多頁網站、內部系統或 AI 與雲端整合的成長型企業。",
    price: "依需求報價",
    delivery: "交付時間：2 - 6 週，依模組範圍調整",
    featured: true,
    features: [
      "多頁官網、後台或內部管理系統規劃",
      "AI 原型設計與高保真 UI 客製化",
      "資料串接、流程自動化與權限機制",
      "模型 API、第三方服務與雲端架構整合",
      "測試、部署、維運與後續擴充建議",
    ],
  },
];

export function PricingSection() {
  return (
    <AnimatedSection id="pricing" ariaLabelledBy="pricing-title" className="mt-24">
      <SectionIntro
        eyebrow="Pricing / Plans"
        title="報價透明、交付清楚，讓你從一開始就知道專案怎麼推進。"
        description="我們不以模糊工時堆疊費用，而是根據交付價值、功能範圍與時程安排提出明確方案。"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {plans.map(({ name, summary, price, delivery, features, featured }) => (
          <article
            key={name}
            className={`rounded-[30px] border p-7 ${
              featured
                ? "border-teal-300/25 bg-gradient-to-br from-teal-300/10 via-white/[0.05] to-amber-200/10 shadow-[0_0_80px_rgba(46,226,198,0.08)]"
                : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold text-stone-50">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{summary}</p>
              </div>
              {featured ? (
                <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-100">
                  Most Popular
                </span>
              ) : null}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-slate-400">方案費用</p>
              <p className="font-display mt-2 text-3xl font-semibold text-stone-50">{price}</p>
              <p className="mt-3 text-sm text-teal-100">{delivery}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-7 text-slate-200">
                  <span className="mt-1 rounded-full border border-teal-300/20 bg-teal-300/10 p-1 text-teal-100">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
