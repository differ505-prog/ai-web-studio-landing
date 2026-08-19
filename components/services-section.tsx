import { Building2, LineChart, Cpu, Smartphone } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const services = [
  {
    icon: Building2,
    title: "品牌形象官網",
    description: "品牌介紹與詢問入口整合成清晰、可擴充的頁面。",
    highlights: ["首頁敘事重構", "RWD 響應式頁面", "基礎 SEO"],
  },
  {
    icon: LineChart,
    title: "營運資訊整理",
    description: "服務流程與方案收斂成有條理的內容架構。",
    highlights: ["服務架構梳理", "方案內容排版", "表單與導流優化"],
  },
  {
    icon: Cpu,
    title: "數位體驗延伸",
    description: "預約、會員、資料管理與 AI 功能整合成可擴充系統。",
    highlights: ["後台與權限規劃", "第三方串接", "可擴充技術架構"],
  },
  {
    icon: Smartphone,
    title: "App 開發設計",
    description: "原生或跨平台 App，含 UI/UX 設計、iOS / Android 上架。",
    highlights: ["UI/UX 與互動原型", "iOS · Android 開發", "上架輔導與維運"],
  },
];

export function ServicesSection() {
  return (
    <AnimatedSection id="services" ariaLabelledBy="services-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Core Services"
        title="網站、App、數位體驗，一個團隊做到底。"
        description="每項服務獨立啟動，隨品牌成長延伸。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {services.map(({ icon: Icon, title, description, highlights }) => (
          <article
            key={title}
            className="group rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-[#8B5E3C]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-serif text-xl font-semibold tracking-wide text-stone-900">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">{description}</p>

            <ul className="mt-6 flex flex-wrap gap-2 text-xs">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-stone-600"
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