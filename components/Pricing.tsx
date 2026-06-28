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
    name: "極速啟動版",
    badge: "🔥 實體店家首選",
    price: "NT$ 9,900",
    delivery: "3-5 個工作天",
    audience:
      "需要建立專業形象的餐飲實體店面、個人品牌或微型工作室。",
    cta: "立即啟動數位店面",
    ctaHref: "#contact",
    featured: true,
    features: [
      {
        label:
          "專屬品牌形象官網 (支援多區塊動態導覽與平滑滾動)",
        included: true,
      },
      { label: "基本 SEO 搜尋引擎優化與 OG 標籤設定", included: true },
      { label: "社群連結與在地化聯絡表單 (無縫串接 Email 或 LINE)", included: true },
      { label: "免費協助部署與首年免主機費 (採用 Serverless 架構)", included: true },
      { label: "上線後 7 天內免費微調 1 次", included: true },
      { label: "專屬會員 / 員工登入權限管理系統", included: false },
      {
        label:
          "系統櫃配件、空間收納或餐飲實體營運的深度客製邏輯",
        included: false,
      },
    ],
  },
  {
    name: "企業客製化系統",
    price: "NT$ 29,900 起",
    delivery: "2-4 週",
    audience:
      "面臨複雜庫存與報價痛點的空間收納業者、系統櫃廠或餐飲營運團隊。",
    cta: "預約產業專屬架構諮詢",
    ctaHref: "#contact",
    secondary: true,
    features: [
      { label: "包含極速啟動版所有功能，並升級為多頁面架構", included: true },
      { label: "專屬會員 / 員工登入權限管理系統", included: true },
      {
        label:
          "深度客製化業務邏輯 (例如：系統櫃五金配件雲端清單、複雜空間規劃自動報價模型)",
        included: true,
      },
      {
        label: "實體營運痛點解決方案 (例如：餐飲排班與耗損追蹤)",
        included: true,
      },
      {
        label:
          "第三方 API 深度整合 (如：綠界金流、Line Pay、一卡通 iPASS 票證服務、AI 大模型數據分析)",
        included: true,
      },
      {
        label: "上線後 30 天內免費技術支援與 Bug 修復保障",
        included: true,
      },
      { label: "專案啟動前需求訪談與架構拆解會議", included: true },
    ],
  },
];

export function Pricing() {
  return (
    <AnimatedSection id="pricing" ariaLabelledBy="pricing-title" className="mt-24">
      <SectionIntro
        eyebrow="Pricing / Plans"
        title="透明、極速、無隱藏費用的開發方案"
        description="打破傳統軟體外包數十萬的門檻。我們專注於實體產業的數位轉型，用 AI 賦能，把省下來的開發時間回饋到你的預算上。"
        align="center"
      />

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-stretch">
        {plans.map((plan) => (
          <motion.article
            key={plan.name}
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.22)] ${
              plan.featured
                ? "ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2),0_24px_80px_rgba(0,0,0,0.22)]"
                : ""
            }`}
          >
            {plan.featured ? (
              <>
                <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-indigo-500/18 blur-3xl" />
                <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent" />
              </>
            ) : (
              <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-cyan-400/8 blur-3xl" />
            )}

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {plan.badge ? (
                    <span className="font-display inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-indigo-100">
                      <Sparkles className="h-3.5 w-3.5" />
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="font-display inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-300">
                      產業專屬架構
                    </span>
                  )}

                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-50">
                    {plan.name}
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <p className="text-sm text-slate-400">方案價格</p>
                <p className="font-display mt-2 text-4xl font-bold tracking-tight text-slate-50">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm font-medium text-cyan-300">
                  交付時間：{plan.delivery}
                </p>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <p className="text-sm text-slate-400">目標客群</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{plan.audience}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-7 ${
                      feature.included
                        ? "border-white/10 bg-white/5 text-slate-100 backdrop-blur-md"
                        : "border-white/6 bg-white/[0.03] text-slate-500 opacity-70"
                    }`}
                  >
                    <span
                      className={`mt-1 shrink-0 ${
                        feature.included ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      {feature.included ? (
                        <CheckCircle className="h-4.5 w-4.5" />
                      ) : (
                        <X className="h-4.5 w-4.5" />
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
                    ? "border border-gray-600 bg-transparent text-white hover:border-gray-300 hover:bg-white/5"
                    : "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:-translate-y-0.5 hover:brightness-110"
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
