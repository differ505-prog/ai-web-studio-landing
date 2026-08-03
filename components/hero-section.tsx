import Image from "next/image";
import {
  ArrowRight,
  CheckCheck,
  Leaf,
  MessagesSquare,
  PencilLine,
  ScanSearch,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const navLinks = [
  { label: "核心服務", href: "#services" },
  { label: "風格案例", href: "#portfolio" },
  { label: "合作方案", href: "#pricing" },
];

const heroProof = [
  {
    icon: Smartphone,
    eyebrow: "網站 × App 開發",
    value: "品牌官網 / iOS · Android App",
    note: "從品牌頁面到原生 App，用同一個節奏與語氣一體完成。",
  },
  {
    icon: ScanSearch,
    eyebrow: "首版提案節奏",
    value: "3 - 5 個工作天",
    note: "先看到方向，再決定要不要往下走。",
  },
  {
    icon: CheckCheck,
    eyebrow: "上線後保固",
    value: "90 天",
    note: "小改版、文案調整與技術問題不另收費。",
  },
];

const collaborationSteps = [
  {
    icon: MessagesSquare,
    step: "01",
    label: "梳理品牌與產品",
    detail: "從目標受眾、服務重點到 App 核心流程一起對齊。",
  },
  {
    icon: ScanSearch,
    step: "02",
    label: "整理頁面與功能節奏",
    detail: "把資訊拆成更好理解的段落，安排留白、互動與 CTA 位置。",
  },
  {
    icon: PencilLine,
    step: "03",
    label: "完成視覺與原型整合",
    detail: "在風格一致的基礎上補齊細節，讓成品更像被編輯過。",
  },
  {
    icon: CheckCheck,
    step: "04",
    label: "上線、交付與持續優化",
    detail: "完成部署後仍保留擴充空間，成長時不必從頭來過。",
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
              Editorial · Web · App Studio
            </span>
            <span className="font-serif text-xl font-semibold tracking-wide text-stone-900">
              築時數位
            </span>
          </span>
        </a>

        <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-stone-100 hover:text-stone-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-700 transition hover:bg-stone-100"
          >
            聊聊你的需求
          </a>
        </div>
      </nav>

      <div className="relative z-10 grid gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-600">
            <Leaf className="h-4 w-4 text-emerald-700/70" />
            為生活美學品牌而生的溫潤網站 · App 體驗
          </div>

          <h1
            id="hero-title"
            className="mt-7 max-w-4xl font-serif text-4xl font-semibold tracking-wide text-stone-900 sm:text-5xl lg:text-7xl lg:leading-[1.15]"
          >
            讓你的品牌
            <span className="text-[#8B5E3C]"> 從網站到 App，</span>
            像一本值得翻閱的生活雜誌，在第一眼就傳遞品味與信任。
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
            我們把網站、App UI/UX 與原生開發重新梳理成更有呼吸感的品牌場景。無論你經營的是空間收納、餐飲美學、生活選物，或是想為自己的服務打造一款 App，都能用更細膩的節奏承接詢問、建立信任，讓每一次瀏覽與每一次開啟 App，都更貼近你的品牌溫度。
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5E3C] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
            >
              看看實際作品
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
            >
              聊聊你的需求
            </a>
          </div>
        </div>

        <div className="relative">
          <article className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <header className="flex items-center justify-between border-b border-stone-200 bg-[#f7f3ec] px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  What We Deliver
                </p>
                <p className="mt-2 font-serif text-lg font-semibold tracking-wide text-stone-900">
                  一個團隊，把網站與 App 一起做完
                </p>
              </div>
              <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:inline-flex">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                Web · App
              </span>
            </header>

            <ul className="grid divide-y divide-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {heroProof.map(({ icon: Icon, eyebrow, value, note }) => (
                <li key={eyebrow} className="flex flex-col gap-3 p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-emerald-700/80">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">{eyebrow}</p>
                  <p className="font-serif text-[20px] font-semibold leading-[1.2] tracking-wide text-stone-900">
                    {value}
                  </p>
                  <p className="text-sm leading-6 text-stone-600">{note}</p>
                </li>
              ))}
            </ul>

            <footer className="border-t border-stone-200 bg-[#f7f3ec] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                Collaboration Flow
              </p>
              <p className="mt-3 font-serif text-xl font-semibold tracking-wide text-stone-900">
                一個節奏走完：策略 → 設計 → 開發 → 上線
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {collaborationSteps.map(({ icon: Icon, step, label, detail }) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-[20px] border border-stone-200 bg-white p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-[#8B5E3C]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-stone-500">
                        Step {step}
                      </p>
                      <p className="mt-1 font-serif text-sm font-semibold tracking-wide text-stone-900">
                        {label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-stone-600">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </footer>
          </article>

          <figure className="mt-5 flex items-center gap-3 rounded-[24px] border border-stone-200 bg-white/70 p-4">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=160&q=80"
              alt="以柔和木質、餐桌器皿與生活選物呈現的日系北歐空間氛圍"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-stone-200 object-cover"
            />
            <figcaption className="text-sm leading-6 text-stone-600">
              <span className="font-serif text-base font-semibold text-stone-900">
                築時數位 · 主理人
              </span>
              <span className="mt-1 block italic text-stone-700">
                「把美感整理成能讓客戶在第一眼就信任的節奏。」
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </AnimatedSection>
  );
}
