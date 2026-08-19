import { CheckCheck, MessagesSquare, PencilLine, ScanSearch } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const steps = [
  {
    icon: MessagesSquare,
    step: "01",
    title: "確認方向與品牌定位",
    description: "品牌語氣方向書與頁面結構藍圖，確認後再做設計。",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "內容架構與版面配置",
    description: "完整內容區塊配置圖，標題、留白、圖片位置一目了然。",
  },
  {
    icon: PencilLine,
    step: "03",
    title: "視覺設計與原型確認",
    description: "可直接操作的互動原型，確認風格後再進開發。",
  },
  {
    icon: CheckCheck,
    step: "04",
    title: "開發、部署與交接",
    description: "上線網站／App、原始碼、90 天技術支援。",
  },
];

export function WorkflowSection() {
  return (
    <AnimatedSection id="workflow" ariaLabelledBy="workflow-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Workflow"
        title="四個交付節點，每個階段都有可操作的交付物。"
        description="每個階段結束時，收到一份交付物。"
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
