import { Mail, Send, User2 } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export function ContactSection() {
  return (
    <AnimatedSection
      id="contact"
      ariaLabelledBy="contact-title"
      className="overflow-hidden rounded-[38px] border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Final CTA</p>
          <h2
            id="contact-title"
            className="mt-5 font-serif text-3xl font-semibold tracking-wide text-stone-900 md:text-5xl md:leading-[1.25]"
          >
            如果你想讓品牌網站更安定、更有質感，也更容易被信任，現在就開始。
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-700 md:text-lg">
            無論你經營的是餐飲、空間收納、生活選物或個人品牌，我們都能把內容整理成更優雅的頁面節奏，讓使用者在舒服的閱讀裡，自然走向詢問與合作。
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm text-stone-500">很適合現在就聊聊的情境</p>
              <p className="mt-2 font-serif text-lg font-semibold tracking-wide text-stone-900">
                品牌剛起步、想改版首頁、需要更好的詢問轉換，或想把服務內容整理得更清楚
              </p>
            </div>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] transition hover:text-stone-800"
            >
              hello@example.com
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="rounded-[32px] border border-stone-200 bg-[#f7f3ec] p-6"
          aria-label="聯絡表單"
        >
          <div className="grid gap-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">姓名</span>
              <div className="flex items-center gap-3 rounded-[20px] border border-stone-200 bg-white px-4 py-3">
                <User2 className="h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="請輸入你的姓名"
                  className="w-full bg-transparent text-stone-800 placeholder:text-stone-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">Email</span>
              <div className="flex items-center gap-3 rounded-[20px] border border-stone-200 bg-white px-4 py-3">
                <Mail className="h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-stone-800 placeholder:text-stone-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-700">需求描述</span>
              <textarea
                name="message"
                rows={6}
                placeholder="請簡述你的品牌類型、想呈現的風格，以及目前最想改善的頁面問題。"
                className="w-full rounded-[20px] border border-stone-200 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5E3C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800"
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
