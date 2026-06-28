import { CheckCheck, MessagesSquare, PencilLine, ScanSearch } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const steps = [
  {
    icon: MessagesSquare,
    step: "01",
    title: "梳理品牌語氣",
    description: "先釐清受眾、服務重點與你希望被感受到的品牌氣質。",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "整理頁面節奏",
    description: "把資訊拆成更好理解的段落，安排標題、留白、圖片與 CTA 的位置。",
  },
  {
    icon: PencilLine,
    step: "03",
    title: "完成視覺與文案整合",
    description: "在風格一致的基礎上，將重點細節補齊，讓網站更像經過編輯的品牌內容。",
  },
  {
    icon: CheckCheck,
    step: "04",
    title: "上線並持續優化",
    description: "完成部署後，仍保留後續擴充與調整空間，讓品牌成長時不必重新來過。",
  },
];

export function WorkflowSection() {
  return (
    <AnimatedSection id="workflow" ariaLabelledBy="workflow-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Workflow"
        title="真正讓人安心的合作流程，是每一步都看得到方向。"
        description="我們把流程做得更輕盈，但不偷省細節。從品牌語氣到版型成品，整個節奏都圍繞著清楚、舒服與可決策而設計。"
        align="center"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {steps.map(({ icon: Icon, step, title, description }) => (
          <article
            key={step}
            className="relative rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-stone-500">
              Step {step}
            </span>
            <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-[#8B5E3C]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-serif text-2xl font-semibold tracking-wide text-stone-900">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-700">{description}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
