import Image from "next/image";
import {
  ArrowRight,
  CheckCheck,
  Leaf,
  ScanSearch,
  Smartphone,
  Sparkles,
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
    eyebrow: "交付範圍",
    value: "網站 × App",
    note: "從品牌頁面到原生 App，同一個團隊完成。",
  },
  {
    icon: ScanSearch,
    eyebrow: "首版提案",
    value: "3 - 5 天",
    note: "方向確認後，再開始設計。",
  },
  {
    icon: CheckCheck,
    eyebrow: "上線後保固",
    value: "90 天",
    note: "小改版與技術問題不另收費。",
  },
];

const audienceChips = ["生活美學", "餐飲選物", "空間工作室", "App 開發"];

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
            Web · App Studio
          </div>

          <h1
            id="hero-title"
            className="mt-7 max-w-4xl font-serif text-4xl font-semibold tracking-wide text-stone-900 sm:text-5xl lg:text-6xl lg:leading-[1.15]"
          >
            品牌網站與 App，
            <span className="text-[#8B5E3C]">同一個節奏做完。</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
            先確認方向再動手。上線後 90 天內，小改版不另收費。
          </p>

          <ul className="mt-6 flex flex-wrap gap-2 text-xs">
            {audienceChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-stone-600"
              >
                {chip}
              </li>
            ))}
          </ul>

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
                一個節奏，網站與 App 同時完成。
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

            <footer className="flex items-center justify-between gap-4 border-t border-stone-200 bg-[#f7f3ec] px-6 py-4">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                Collaboration Flow
              </p>
              <a
                href="#workflow"
                className="text-sm font-semibold tracking-wide text-[#8B5E3C] underline-offset-4 hover:underline"
              >
                查看四步流程 →
              </a>
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
            「用信任的語氣整理美感。」
          </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </AnimatedSection>
  );
}
