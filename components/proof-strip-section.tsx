import { ArrowUpRight, Clock4, HandHeart, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const proofPoints = [
  {
    icon: HandHeart,
    label: "已交付 / 合作中的品牌",
    value: "12+",
    note: "餐飲、空間、生活選物與 SaaS 團隊",
  },
  {
    icon: Clock4,
    label: "首次回覆時間",
    value: "12 小時內",
    note: "工作日 09:00 – 19:00 主理人親自回覆",
  },
  {
    icon: ShieldCheck,
    label: "上線後保固",
    value: "90 天",
    note: "小改版、文案調整與技術問題不另收費",
  },
];

export function ProofStripSection() {
  return (
    <AnimatedSection
      ariaLabelledBy="proof-strip-title"
      className="relative overflow-hidden rounded-[36px] border border-stone-200/80 bg-gradient-to-br from-[#f7f3ec] via-white to-[#f7f3ec] px-6 py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:px-8 lg:px-10 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-stone-100/70 to-transparent" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Why Teams Choose Us</p>
          <h2
            id="proof-strip-title"
            className="mt-4 font-serif text-3xl font-semibold tracking-wide text-stone-900 sm:text-4xl lg:text-[40px] lg:leading-[1.2]"
          >
            把美感與信任，整理成看得到的數字。
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-700">
            不靠話術堆疊，用節奏、回覆速度與保固承諾，讓品牌主理人在簽約前就能判斷彼此適不適合。
          </p>
          <a
            href="#portfolio"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B5E3C] transition hover:text-stone-800"
          >
            看實際作品
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3">
          {proofPoints.map(({ icon: Icon, label, value, note }) => (
            <li
              key={label}
              className="group flex h-full flex-col gap-4 rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_4px_18px_rgb(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:border-stone-300"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-emerald-700/80">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{label}</p>
                <p className="mt-2 font-serif text-3xl font-semibold tracking-wide text-stone-900 sm:text-[32px] sm:leading-[1.15]">
                  {value}
                </p>
              </div>
              <p className="mt-auto text-sm leading-6 text-stone-600">{note}</p>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}