"use client";

import { motion } from "framer-motion";
import { CheckCircle, Sparkles, X } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

type PlanFeature = {
  label: string;
  included: boolean;
};

type Plan = {
  name: string;
  badge?: string;
  price: string;
  delivery: string;
  audience: string;
  cta: string;
  ctaHref: string;
  secondary?: boolean;
  featured?: boolean;
  features: PlanFeature[];
};

const plans: Plan[] = [
  {
    name: "品牌起步方案",
    badge: "生活品牌首選",
    price: "NT$ 9,900",
    delivery: "3-5 個工作天",
    audience: "適合餐飲店面、個人品牌、選物與空間風格工作室快速建立精緻門面。",
    cta: "立即整理品牌首頁",
    ctaHref: "#contact",
    featured: true,
    features: [
      { label: "單頁式品牌 Landing Page 與流暢段落導覽", included: true },
      { label: "基礎 SEO、OG 與品牌資訊設定", included: true },
      { label: "聯絡表單、社群連結與 CTA 導流設計", included: true },
      { label: "部署協助與上線後 7 天內一次微調", included: true },
      { label: "後台會員與複雜營運邏輯整合", included: false },
      { label: "深度客製資料流程或 AI 功能串接", included: false },
    ],
  },
  {
    name: "品牌延伸方案",
    price: "NT$ 29,900 起",
    delivery: "2-4 週",
    audience: "適合需要多頁官網、預約流程、後台管理或更完整品牌內容架構的成長型品牌。",
    cta: "預約品牌架構諮詢",
    ctaHref: "#contact",
    secondary: true,
    features: [
      { label: "包含起步方案內容，並延伸為多頁品牌網站", included: true },
      { label: "可加入會員、預約、詢價或內容管理機制", included: true },
      { label: "服務流程、案例與方案說明的完整頁面編排", included: true },
      { label: "第三方工具、付款或 AI 功能的延伸整合", included: true },
      { label: "上線後 30 天內技術支援與調整建議", included: true },
      { label: "專案啟動前的品牌訪談與架構拆解", included: true },
    ],
  },
];

export function Pricing() {
  return (
    <AnimatedSection id="pricing" ariaLabelledBy="pricing-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Pricing / Plans"
        title="把報價說清楚，讓合作從一開始就保持從容。"
        description="每個方案都以可感知的交付成果為核心，不用被複雜術語包圍，也不用擔心額外費用在後面才出現。"
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-stretch">
        {plans.map((plan) => (
          <motion.article
            key={plan.name}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`relative flex h-full flex-col overflow-hidden rounded-[32px] border p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${
              plan.featured
                ? "border-stone-200 bg-[#f6f1e9]"
                : "border-stone-200 bg-white"
            }`}
          >
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {plan.badge ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold tracking-[0.18em] text-stone-600">
                      <Sparkles className="h-3.5 w-3.5 text-[#8B5E3C]" />
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-stone-500">
                      進階合作
                    </span>
                  )}

                  <h3 className="mt-5 font-serif text-3xl font-semibold tracking-wide text-stone-900">
                    {plan.name}
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500">方案價格</p>
                <p className="mt-2 font-serif text-4xl font-semibold tracking-wide text-stone-900">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm font-medium text-[#8B5E3C]">
                  交付時間：{plan.delivery}
                </p>
              </div>

              <div className="mt-6 rounded-[28px] border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500">適合對象</p>
                <p className="mt-2 text-sm leading-7 text-stone-700">{plan.audience}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={`flex items-start gap-3 rounded-[22px] border px-4 py-3 text-sm leading-7 ${
                      feature.included
                        ? "border-stone-200 bg-white text-stone-700"
                        : "border-stone-200 bg-stone-50 text-stone-400"
                    }`}
                  >
                    <span
                      className={`mt-1 shrink-0 ${
                        feature.included ? "text-emerald-700/70" : "text-stone-400"
                      }`}
                    >
                      {feature.included ? (
                        <CheckCircle className="h-[18px] w-[18px]" />
                      ) : (
                        <X className="h-[18px] w-[18px]" />
                      )}
                    </span>
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                  plan.secondary
                    ? "border border-stone-300 text-stone-700 hover:bg-stone-100"
                    : "bg-[#8B5E3C] text-white hover:-translate-y-0.5 hover:bg-stone-800"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </AnimatedSection>
  );
}
