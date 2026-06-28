import { Blocks, Building2, Cpu, LineChart } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const services = [
  {
    icon: Building2,
    title: "品牌形象官網",
    description:
      "以雜誌式的閱讀節奏重整品牌介紹、服務亮點與詢問入口，讓第一印象更完整而安定。",
    highlights: ["首頁敘事重構", "RWD 響應式頁面", "基礎 SEO 與品牌 metadata"],
  },
  {
    icon: LineChart,
    title: "營運資訊整理",
    description:
      "把原本零散的服務流程、方案內容與常見問答收斂成更有條理的內容架構，降低溝通成本。",
    highlights: ["服務架構梳理", "方案內容排版", "表單與導流優化"],
  },
  {
    icon: Cpu,
    title: "數位體驗延伸",
    description:
      "若品牌需要更進一步的預約、會員、資料管理或 AI 功能，我們也能延伸成可持續擴充的系統。",
    highlights: ["後台與權限規劃", "第三方串接", "可擴充技術架構"],
  },
];

export function ServicesSection() {
  return (
    <AnimatedSection id="services" ariaLabelledBy="services-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Core Services"
        title="設計不只是漂亮，而是讓品牌被更細緻地理解。"
        description="我們會先整理內容，再安排節奏，最後才把視覺放進去。這讓網站不只是好看，而是更像你的品牌本人。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, description, highlights }) => (
          <article
            key={title}
            className="group rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-[#8B5E3C]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-7 font-serif text-2xl font-semibold tracking-wide text-stone-900">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-8 text-stone-700">{description}</p>

            <div className="mt-7 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-stone-500">
              <Blocks className="h-4 w-4" />
              服務內容
            </div>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-[22px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700"
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
