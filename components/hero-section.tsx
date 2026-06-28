import Image from "next/image";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const quickStats = [
  {
    label: "首版提案節奏",
    value: "3-5 個工作天",
  },
  {
    label: "適合品牌",
    value: "餐飲 / 收納 / 生活選物",
  },
  {
    label: "合作方式",
    value: "策略、設計、開發一體完成",
  },
];

export function HeroSection() {
  return (
    <AnimatedSection
      id="top"
      ariaLabelledBy="hero-title"
      className="relative overflow-hidden rounded-[40px] border border-stone-200/80 bg-white px-6 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:px-8 lg:px-10 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-100/80 to-transparent" />

      <nav
        className="relative z-10 flex flex-col gap-5 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between"
        aria-label="主選單"
      >
        <a href="#top" className="flex items-center gap-3 text-stone-900">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-emerald-700/70">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-[11px] uppercase tracking-[0.28em] text-stone-500">
              Editorial Landing Page
            </span>
            <span className="font-serif text-xl font-semibold tracking-wide text-stone-900">
              築時數位
            </span>
          </span>
        </a>

        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
          <a href="#services" className="rounded-full px-3 py-2 transition hover:bg-stone-100 hover:text-stone-900">
            核心服務
          </a>
          <a href="#portfolio" className="rounded-full px-3 py-2 transition hover:bg-stone-100 hover:text-stone-900">
            風格案例
          </a>
          <a href="#pricing" className="rounded-full px-3 py-2 transition hover:bg-stone-100 hover:text-stone-900">
            合作方案
          </a>
          <a
            href="#contact"
            className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-700 transition hover:bg-stone-100"
          >
            預約諮詢
          </a>
        </div>
      </nav>

      <div className="relative z-10 grid gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-600">
            <Leaf className="h-4 w-4 text-emerald-700/70" />
            為生活美學品牌而生的溫潤網站體驗
          </div>

          <h1
            id="hero-title"
            className="mt-7 max-w-4xl font-serif text-4xl font-semibold tracking-wide text-stone-900 sm:text-5xl lg:text-7xl lg:leading-[1.15]"
          >
            讓你的品牌網站像一本
            <span className="text-[#8B5E3C]"> 值得翻閱的生活雜誌 </span>
            在第一眼就傳遞品味、安心與信任。
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
            我們把網站從冷硬的資訊堆疊，重新梳理成更有呼吸感的品牌場景。無論你經營的是空間收納、餐飲美學或選物品牌，都能用更細膩的節奏承接詢問、建立信任，並讓每一次瀏覽都更貼近你的品牌溫度。
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5E3C] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
            >
              查看合作方案
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
            >
              預約風格諮詢
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {quickStats.map(({ label, value }) => (
              <article
                key={label}
                className="rounded-[28px] border border-stone-200 bg-stone-50/80 p-5"
              >
                <p className="text-sm text-stone-500">{label}</p>
                <p className="mt-3 font-serif text-lg font-semibold tracking-wide text-stone-900">
                  {value}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <article className="overflow-hidden rounded-[32px] border border-stone-200 bg-[#f7f2ea] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="relative min-h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                alt="以柔和木質、餐桌器皿與生活選物呈現的日系北歐空間氛圍"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f7f2ea] via-[#f7f2ea]/20 to-transparent" />
            </div>

            <div className="relative grid gap-4 border-t border-stone-200 bg-white/90 p-6 sm:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                  Brand Direction
                </p>
                <p className="mt-3 font-serif text-2xl font-semibold tracking-wide text-stone-900">
                  Calm, Editorial, Trustworthy
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  以材質感、留白、柔和層次與細節排版，讓品牌訊息更像被細心編輯，而不是被大聲推銷。
                </p>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm text-stone-500">設計關鍵字</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                  <li>襯線標題與拉開字距，提升雜誌感與呼吸感</li>
                  <li>米白背景與白卡陰影，建立輕盈且高級的閱讀層次</li>
                  <li>陶土色 CTA 與莫蘭迪綠點綴，讓互動更安定耐看</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}
