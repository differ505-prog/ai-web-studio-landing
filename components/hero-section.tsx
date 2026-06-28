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
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 shadow-[0_0_90px_rgba(61,208,255,0.08)] backdrop-blur sm:px-8 lg:px-10 lg:py-10"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

      <nav
        className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between"
        aria-label="主選單"
      >
        <a href="#top" className="flex items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm text-slate-400">Official Landing Page</span>
            <span className="text-lg font-semibold">AI 網頁開發接案工作室</span>
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
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-medium text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/15"
          >
            免費諮詢
          </a>
        </div>
      </nav>

      <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-sm text-violet-200">
            <Zap className="h-4 w-4" />
            極速交付的次世代 AI 網頁開發
          </div>

          <h1
            id="hero-title"
            className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]"
          >
            幾天內上線你的品牌門面，
            <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
              用 AI 加速每一次商業成長。
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            打破傳統動輒數月的開發週期，我們以 AI 賦能設計、原型與工程流程，快速打造兼具質感、效能與 SEO
            的官方網站與商業系統，讓你的商業點子在最短時間內完美上線。
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              查看我們的方案
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              免費諮詢評估
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {quickStats.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-4 text-sm text-slate-400">{label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/20 blur-2xl" />
          <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Delivery Dashboard</p>
                <p className="mt-1 text-xl font-semibold text-white">AI Sprint Pipeline</p>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Ready to Launch
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>需求定義與商業目標</span>
                  <span className="text-cyan-300">100%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>AI 原型與畫面定稿</span>
                  <span className="text-cyan-300">90%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>前後端整合與 QA 測試</span>
                  <span className="text-cyan-300">78%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">推薦技術棧</p>
                <p className="mt-2 text-lg font-semibold text-white">Next.js / TypeScript</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">預估首版交付</p>
                <p className="mt-2 text-lg font-semibold text-white">3 - 7 個工作天</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}
