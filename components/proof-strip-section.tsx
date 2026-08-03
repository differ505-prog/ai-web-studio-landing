import Image from "next/image";
import { ArrowUpRight, Quote, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const testimonials = [
  {
    quote:
      "把美感整理成能讓客戶在第一眼就信任的節奏，不只把網站做完，更把我們想說的話說對了。",
    author: "夏洛克民宿 · Summer Rock Villa",
    role: "品牌官方授權展示",
    avatar:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=160&q=80",
    accent: "from-[#f7ede0] via-[#f4e4cf] to-[#e6d4b8]",
  },
  {
    quote:
      "原本繁雜的空間配置與服務內容，被收攏成俐落又專業的門面，連客戶都主動稱讚頁面質感。",
    author: "青曦設計 · Qingxi Design",
    role: "品牌官方授權展示",
    avatar:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=160&q=80",
    accent: "from-[#eef1eb] via-[#e4eadc] to-[#cfd9c8]",
  },
  {
    quote:
      "想要一款安靜又專注的 App，他們從品牌語氣一路做到互動節奏，整個過程比想像中更從容。",
    author: "VibeList · 禪模式任務管理",
    role: "App 開發設計 · 自有 Side Project",
    avatar:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=160&q=80",
    accent: "from-[#eef1eb] via-[#dde4d6] to-[#cfd9c8]",
  },
];

export function ProofStripSection() {
  return (
    <AnimatedSection
      ariaLabelledBy="proof-strip-title"
      className="relative overflow-hidden rounded-[36px] border border-stone-200/80 bg-gradient-to-br from-[#f7f3ec] via-white to-[#f7f3ec] px-6 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:px-8 lg:px-10 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-stone-100/70 to-transparent" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Words From Clients</p>
          <h2
            id="proof-strip-title"
            className="mt-4 font-serif text-3xl font-semibold tracking-wide text-stone-900 sm:text-4xl lg:text-[40px] lg:leading-[1.2]"
          >
            客戶說的話，比我們說的更值得你參考。
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-700">
            從品牌官網、空間設計到 App 開發，我們把每一段合作都收斂成一段真實回饋。希望這些話，能讓你在簽約前更安心。
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone-600">
            <Sparkles className="h-3.5 w-3.5 text-[#8B5E3C]" />
            Web · App · Brand Direction
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3">
          {testimonials.map(({ quote, author, role, avatar, accent }) => (
            <li
              key={author}
              className="group flex h-full flex-col gap-5 rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:border-stone-300"
            >
              <span className="relative inline-flex h-20 w-full items-center justify-center overflow-hidden rounded-[20px] border border-stone-200">
                <span
                  className={`absolute inset-0 bg-gradient-to-br ${accent}`}
                  aria-hidden
                />
                <Quote className="relative h-7 w-7 text-stone-700/70" />
              </span>
              <p className="text-[15px] leading-7 text-stone-700">「{quote}」</p>
              <div className="mt-auto flex items-center gap-3 border-t border-stone-100 pt-4">
                <Image
                  src={avatar}
                  alt={author}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-stone-200 object-cover"
                />
                <div>
                  <p className="font-serif text-sm font-semibold tracking-wide text-stone-900">
                    {author}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                    {role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-10 flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-7 text-stone-700">
          想看看這些合作實際走過的流程與作品？點下去直接感受成品，比再多說明都來得具體。
        </p>
        <a
          href="#portfolio"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#8B5E3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          看看實際作品
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </AnimatedSection>
  );
}
