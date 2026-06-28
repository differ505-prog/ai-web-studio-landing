import { Blocks, Building2, Cpu, LineChart } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const services = [
  {
    icon: Building2,
    title: "企業形象官網",
    description:
      "打造高質感品牌官網與 Landing Page，兼顧 RWD、SEO、效能與轉換設計，讓流量真正轉化成商機。",
    highlights: ["品牌視覺設計", "RWD 響應式開發", "SEO 結構優化"],
  },
  {
    icon: LineChart,
    title: "內部自動化系統",
    description:
      "從表單、資料管理、流程追蹤到視覺化儀表板，將重複性工作數位化，讓團隊效率大幅提升。",
    highlights: ["流程優化", "資料視覺化", "權限與後台管理"],
  },
  {
    icon: Cpu,
    title: "AI 系統深度整合",
    description:
      "無縫串接各大模型 API 與企業級雲端基礎設施，讓 AI 不只是展示，而是真正融入你的產品與流程。",
    highlights: ["模型 API 串接", "雲端架構整合", "企業級安全與擴充"],
  },
];

export function ServicesSection() {
  return (
    <AnimatedSection id="services" ariaLabelledBy="services-title" className="mt-24">
      <SectionIntro
        eyebrow="Core Services"
        title="不是只做漂亮頁面，而是交付真正能帶來成果的數位產品。"
        description="我們從商業目標出發，選擇合適的技術與介面策略。每一項服務都以高速交付、可維護架構與實際營運價值為核心。"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, description, highlights }) => (
          <article
            key={title}
            className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-200">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>

            <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500">
              <Blocks className="h-4 w-4" />
              交付重點
            </div>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
