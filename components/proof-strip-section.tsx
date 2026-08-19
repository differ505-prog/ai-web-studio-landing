import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const testimonials = [
  {
    quote:
      "把美感整理成客戶第一眼就信任的語氣。",
    author: "夏洛克民宿 · Summer Rock Villa",
    role: "品牌官方授權展示",
    avatar:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=160&q=80",
    accent: "from-[#f7ede0] via-[#f4e4cf] to-[#e6d4b8]",
  },
  {
    quote:
      "繁雜的空間與服務，被收攏成俐落的專業門面。",
    author: "青曦設計 · Qingxi Design",
    role: "品牌官方授權展示",
    avatar:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=160&q=80",
    accent: "from-[#eef1eb] via-[#e4eadc] to-[#cfd9c8]",
  },
  {
    quote:
      "安靜又專注，從品牌語氣一路做到互動節奏。",
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

      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Words From Clients</p>
            <h2
              id="proof-strip-title"
              className="mt-3 font-serif text-3xl font-semibold tracking-wide text-stone-900 sm:text-4xl"
            >
              實際合作過的客戶怎麼說。
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone-600">
            <Sparkles className="h-3.5 w-3.5 text-[#8B5E3C]" />
            Web · App · Brand
          </span>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {testimonials.map(({ quote, author, role, avatar, accent }) => (
            <li
              key={author}
              className="group flex h-full flex-col gap-4 rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_4px_18px_rgb(0,0,0,0.03)]"
            >
              <span className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-[20px] border border-stone-200">
                <span
                  className={`absolute inset-0 bg-gradient-to-br ${accent}`}
                  aria-hidden
                />
                <Quote className="relative h-6 w-6 text-stone-700/70" />
              </span>
              <p className="text-[15px] leading-7 text-stone-700">「{quote}」</p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <Image
                  src={avatar}
                  alt={author}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border border-stone-200 object-cover"
                />
                <div>
                  <p className="font-serif text-sm font-semibold tracking-wide text-stone-900">
                    {author}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    {role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}