import { CheckCheck, MessagesSquare, Rocket, ScanSearch } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const steps = [
  {
    icon: MessagesSquare,
    step: "01",
    title: "需求溝通",
    description: "釐清商業目標、受眾、內容架構與交付範圍，建立明確的專案方向。",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "AI 原型生成與確認",
    description: "快速生成畫面雛形與流程原型，在開發前就先完成視覺與互動對焦。",
  },
  {
    icon: CheckCheck,
    step: "03",
    title: "極速開發與測試",
    description: "以現代前端架構完成實作，並同步進行跨裝置測試、效能與 SEO 基礎優化。",
  },
  {
    icon: Rocket,
    step: "04",
    title: "正式上線與交付",
    description: "完成部署、驗收與操作交接，讓你的網站或系統可立即投入商業使用。",
  },
];

export function WorkflowSection() {
  return (
    <AnimatedSection id="workflow" ariaLabelledBy="workflow-title" className="mt-24">
      <SectionIntro
        eyebrow="Workflow"
        title="把專案做快，不等於省略流程，而是把流程設計得更聰明。"
        description="我們將溝通、設計、開發與部署壓縮進高效率的節奏中，確保你每一階段都看得到成果、做得出決策。"
        align="center"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        {steps.map(({ icon: Icon, step, title, description }) => (
          <article
            key={step}
            className="relative rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Step {step}
            </span>
            <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-300/20 bg-teal-300/10 text-teal-100">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-stone-50">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
