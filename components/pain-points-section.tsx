import { CheckCircle2, Clock3, Coins, PencilRuler, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const traditional = [
  {
    icon: Clock3,
    label: "溝通往返太久",
    description: "需求反覆確認卻缺少清楚的版面想像，決策疲勞也跟著增加。",
  },
  {
    icon: Coins,
    label: "預算感受不安",
    description: "看不清交付細節與優先順序時，品牌很容易為了不確定性付出更高成本。",
  },
  {
    icon: Wrench,
    label: "畫面與內容脫節",
    description: "網站完成後仍難以承接品牌風格，視覺精緻度與實際轉換彼此拉扯。",
  },
];

const betterWay = [
  {
    icon: PencilRuler,
    label: "先對齊品牌氣質",
    description: "從空間氛圍、材質感與閱讀節奏開始設定方向，讓後續設計更穩定。",
  },
  {
    icon: CheckCircle2,
    label: "以可上線頁面推進",
    description: "我們直接以真實版型與內容層次迭代，讓每一步都更接近最終成品。",
  },
  {
    icon: CheckCircle2,
    label: "保留營運彈性",
    description: "在質感與轉換之間取得平衡，讓你的網站既漂亮，也能持續承接品牌成長。",
  },
];

export function PainPointsSection() {
  return (
    <AnimatedSection id="comparison" ariaLabelledBy="pain-points-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Brand Perspective"
        title="當網站像藝廊一樣留白，品牌訊息反而更容易被理解。"
        description="我們不追求堆滿功能與高刺激視覺，而是整理出更溫柔、更清楚的資訊層次。對於重視空間感、服務體驗與品牌信任的主理人來說，這樣的呈現更能讓人放鬆停留。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-stone-200 bg-stone-100 p-3 text-stone-500">
              <Clock3 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-wide text-stone-900">
                常見的網站焦慮
              </h3>
              <p className="mt-1 text-sm text-stone-500">太多功能名詞，卻沒有真正安定人心的品牌畫面。</p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {traditional.map(({ icon: Icon, label, description }) => (
              <div key={label} className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-1 rounded-full border border-stone-200 bg-white p-2 text-stone-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-semibold tracking-wide text-stone-900">
                      {label}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-stone-700">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-stone-200 bg-[#f6f2ea] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-emerald-900/10 bg-white p-3 text-emerald-700/70">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-wide text-stone-900">
                我們偏好的呈現方式
              </h3>
              <p className="mt-1 text-sm text-stone-500">把重點收斂成更能閱讀、感受與信任的品牌敘事。</p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {betterWay.map(({ icon: Icon, label, description }) => (
              <div key={label} className="rounded-[28px] border border-stone-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-1 rounded-full border border-emerald-900/10 bg-stone-50 p-2 text-emerald-700/70">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-semibold tracking-wide text-stone-900">
                      {label}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-stone-700">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </AnimatedSection>
  );
}
