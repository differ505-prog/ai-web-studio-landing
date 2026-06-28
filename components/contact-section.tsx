import { Mail, Send, User2 } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export function ContactSection() {
  return (
    <AnimatedSection
      id="contact"
      ariaLabelledBy="contact-title"
      className="mt-24 overflow-hidden rounded-[34px] border border-teal-300/20 bg-gradient-to-br from-teal-300/10 via-white/[0.04] to-amber-200/10"
    >
      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">
            Final CTA
          </p>
          <h2
            id="contact-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-stone-50 md:text-5xl"
          >
            如果你要的是更快上線、更好轉換、更能延伸的網站，現在就開始。
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            無論你要做品牌官網、產品 Landing Page、內部系統或 AI 整合專案，我們都能用清楚的策略與高速的開發節奏，協助你把點子變成真正可使用的數位產品。
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-slate-400">適合立即諮詢的情境</p>
              <p className="mt-2 text-lg font-semibold text-stone-50">
                新產品要快速上線、企業官網改版、流程數位化、AI 功能導入
              </p>
            </div>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-100 transition hover:text-teal-50"
            >
              hello@example.com
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,17,0.75),rgba(8,12,17,0.6))] p-6"
          aria-label="聯絡表單"
        >
          <div className="grid gap-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">姓名</span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <User2 className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="請輸入你的姓名"
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">需求描述</span>
              <textarea
                name="message"
                rows={6}
                placeholder="請簡述你的產業、目標、預計時程，以及想解決的問題。"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-200 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              送出需求
              <Send className="h-4 w-4" />
            </button>
            {/* 正式上線前請將 YOUR_FORM_ID 替換成你的 Formspree 表單 ID。 */}
          </div>
        </form>
      </div>
    </AnimatedSection>
  );
}
