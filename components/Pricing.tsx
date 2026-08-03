"use client";

import { motion } from "framer-motion";
import { CheckCircle, Smartphone, Sparkles, X } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

type PlanFeature = {
  label: string;
  included: boolean;
};

type Plan = {
  name: string;
  badge?: string;
  icon?: "sparkles" | "smartphone";
  price: string;
  rhythm: string;
  scope: string;
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
    icon: "sparkles",
    price: "NT$ 9，900",
    rhythm: "首版 3-5 天 · 7 天內微調",
    scope: "單頁品牌 Landing Page、品牌資訊與社群連結。",
    cta: "聊聊你的需求",
    ctaHref: "#contact",
    featured: true,
    features: [
      { label: "單頁式品牌 Landing Page 與流暢段落導覽", included: true },
      { label: "基礎 SEO、OG 與品牌資訊設定", included: true },
      { label: "聯絡表單、社群連結與 CTA 導流設計", included: true },
      { label: "部署協助與上線後保固期內一次微調", included: true },
      { label: "App UI / 原生或跨平台開發", included: false },
      { label: "後台會員與複雜營運邏輯整合", included: false },
    ],
  },
  {
    name: "品牌延伸方案",
    icon: "sparkles",
    price: "NT$ 29，900 起",
    rhythm: "2-4 週交付 · 30 天支援",
    scope: "多頁官網、預約流程、後台與內容架構。",
    cta: "聊聊你的需求",
    ctaHref: "#contact",
    secondary: true,
    features: [
      { label: "起步方案內容，並延伸為多頁品牌網站", included: true },
      { label: "可加入會員、預約、詢價或內容管理機制", included: true },
      { label: "服務流程、案例與方案說明的完整頁面編排", included: true },
      { label: "第三方工具、付款或 AI 功能的延伸整合", included: true },
      { label: "上線後 30 天技術支援與調整建議", included: true },
      { label: "App UI / 原生或跨平台開發", included: false },
    ],
  },
  {
    name: "App 與系統客製",
    badge: "含 App 開發設計",
    icon: "smartphone",
    price: "依需求報價",
    rhythm: "4-10 週 · 依模組範圍調整",
    scope: "App UI / 原生或跨平台、後台與上架輔導。",
    cta: "聊聊你的需求",
    ctaHref: "#contact",
    features: [
      { label: "App UI / UX 設計與互動原型", included: true },
      { label: "iOS / Android 原生或跨平台 App 開發", included: true },
      { label: "App Store / Google Play 上架輔導", included: true },
      { label: "後台、會員、權限與資料流程規劃", included: true },
      { label: "第三方服務、付款或 AI API 整合", included: true },
      { label: "上線後保固與後續迭代建議", included: true },
    ],
  },
];

function PlanIcon({ name }: { name?: Plan["icon"] }) {
  if (name === "smartphone") {
    return <Smartphone className="h-3.5 w-3.5 text-[#8B5E3C]" />;
  }
  return <Sparkles className="h-3.5 w-3.5 text-[#8B5E3C]" />;
}

export function Pricing() {
  return (
    <AnimatedSection id="pricing" ariaLabelledBy="pricing-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Pricing / Plans"
        title="三種節奏，總有一種剛好對上你現在的位置。"
        description="方案以可感知的交付成果為核心，不用被複雜術語包圍，也不用擔心額外費用在後面才出現。"
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch">
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
                      <PlanIcon name={plan.icon} />
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-stone-500">
                      <PlanIcon name={plan.icon} />
                      進階合作
                    </span>
                  )}

                  <h3 className="mt-5 font-serif text-2xl font-semibold tracking-wide text-stone-900">
                    {plan.name}
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500">方案價格</p>
                <p className="mt-2 font-serif text-3xl font-semibold tracking-wide text-stone-900">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm font-medium text-[#8B5E3C]">{plan.rhythm}</p>
                <p className="mt-2 text-xs leading-6 text-stone-500">{plan.scope}</p>
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
