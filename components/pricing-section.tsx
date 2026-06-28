import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const plans = [
  {
    name: "極速啟動版",
    summary: "適合需要快速上線、驗證市場或建立專業品牌門面的團隊。",
    price: "專案制 NT$ 60，000 起",
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
    <AnimatedSection id="pricing" ariaLabelledBy="pricing-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Pricing / Plans"
        title="報價透明、交付清楚，讓品牌合作從一開始就保有從容。"
        description="我們以清楚的交付範圍與頁面成果來溝通方案，而不是用模糊工時堆疊費用。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {plans.map(({ name, summary, price, delivery, features, featured }) => (
          <article
            key={name}
            className={`rounded-[32px] border p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${
              featured
                ? "border-stone-200 bg-[#f6f1e9]"
                : "border-stone-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-3xl font-semibold tracking-wide text-stone-900">
                  {name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">{summary}</p>
              </div>
              {featured ? (
                <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600">
                  Most Popular
                </span>
              ) : null}
            </div>

            <div className="mt-8 rounded-[28px] border border-stone-200 bg-white p-5">
              <p className="text-sm text-stone-500">方案費用</p>
              <p className="mt-2 font-serif text-3xl font-semibold tracking-wide text-stone-900">
                {price}
              </p>
              <p className="mt-3 text-sm text-[#8B5E3C]">{delivery}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-[22px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-700"
                >
                  <span className="mt-1 rounded-full border border-stone-200 bg-white p-1 text-emerald-700/70">
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
