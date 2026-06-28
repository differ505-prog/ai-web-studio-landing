import { ArrowRight, Bot, Gauge, Sparkles, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const quickStats = [
  {
    label: "平均啟動時程",
    value: "72 小時內",
    icon: Zap,
  },
  {
    label: "交付模式",
    value: "AI 協作迭代",
    icon: Bot,
  },
  {
    label: "效能與 SEO",
    value: "同步優化",
    icon: Gauge,
  },
];

export function HeroSection() {
  return (
    <AnimatedSection
      id="top"
      ariaLabelledBy="hero-title"
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 px-6 py-8 shadow-[0_28px_120px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-8 lg:px-10 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(88,28,135,0.16),transparent_22%),radial-gradient(circle_at_82%_16%,rgba(14,116,144,0.14),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-purple-900/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-900/10 blur-3xl" />

      <nav
        className="relative z-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between"
        aria-label="主選單"
      >
        <a href="#top" className="flex items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="font-display block text-xs uppercase tracking-[0.28em] text-slate-500">
              Official Landing Page
            </span>
            <span className="text-lg font-semibold text-slate-50">築時數位</span>
          </span>
        </a>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <a href="#services" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">
            核心服務
          </a>
          <a href="#portfolio" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">
            實戰案例
          </a>
          <a href="#pricing" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">
            透明報價
          </a>
          <a
            href="#contact"
            className="rounded-full border border-gray-600 bg-transparent px-4 py-2 font-medium text-slate-200 transition hover:border-gray-300 hover:bg-white/5"
          >
            免費諮詢
          </a>
        </div>
      </nav>

      <div className="relative z-10 grid gap-12 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-center">
        <div>
          <div className="font-display inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-100">
            <Zap className="h-4 w-4" />
            極速交付的次世代 AI 網頁開發
          </div>

          <h1
            id="hero-title"
            className="font-display mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl lg:text-7xl lg:leading-[1.02]"
          >
            極速交付你的品牌門面，
            <span className="bg-gradient-to-r from-slate-50 via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
              讓次世代 AI 網頁開發直接成為你的成長引擎。
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            打破傳統動輒數月的開發週期，我們以 AI 賦能設計、原型與工程流程，快速打造兼具質感、效能與 SEO
            的官方網站與商業系統，讓你的商業點子在最短時間內完美上線。
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
            >
              查看我們的方案
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-gray-600 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gray-300 hover:bg-white/5"
            >
              免費諮詢評估
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {quickStats.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-400">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-4 text-sm text-slate-400">{label}</p>
                <p className="font-display mt-1 text-lg font-bold tracking-tight text-slate-50">{value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/12 via-transparent to-cyan-500/10 blur-2xl" />
          <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.08),transparent_26%)]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.28em] text-slate-500">
                  Delivery Dashboard
                </p>
                <p className="mt-1 text-xl font-bold tracking-tight text-slate-50">AI Sprint Pipeline</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-200">
                Ready to Launch
              </span>
            </div>

            <div className="relative mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>需求定義與商業目標</span>
                  <span className="font-display text-cyan-300">100%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>AI 原型與畫面定稿</span>
                  <span className="font-display text-cyan-300">90%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>前後端整合與 QA 測試</span>
                  <span className="font-display text-cyan-300">78%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
                </div>
              </div>
            </div>

            <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">推薦技術棧</p>
                <p className="font-display mt-2 text-lg font-bold tracking-tight text-slate-50">
                  Next.js / TypeScript
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">預估首版交付</p>
                <p className="font-display mt-2 text-lg font-bold tracking-tight text-slate-50">
                  3 - 7 個工作天
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}
