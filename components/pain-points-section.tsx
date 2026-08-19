import { CheckCircle2, Clock3, Coins, PencilRuler, Smartphone, Wrench } from "lucide-react";
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
    label: "兩個載體節奏脫鉤",
    description: "網站先做完之後才想做 App，結果兩邊風格與流程對不上。",
  },
];

const betterWay = [
  {
    icon: PencilRuler,
    label: "先對齊品牌氣質",
    description: "從空間氛圍、材質感與閱讀節奏開始設定方向，後續設計更穩定。",
  },
  {
    icon: Smartphone,
    label: "同一編輯貫穿兩端",
    description: "用同一組語氣延伸網站與 App，兩邊都像出自同一位編輯之手。",
  },
  {
    icon: CheckCircle2,
    label: "保留營運彈性",
    description: "在質感與轉換之間取得平衡，作品既漂亮也能持續承接成長。",
  },
];

export function PainPointsSection() {
  return (
    <AnimatedSection id="comparison" ariaLabelledBy="pain-points-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Brand Perspective"
        title="網站與 App 如果出自同一個語氣，訊息反而更容易被理解。"
        description="不追求堆滿功能，從品牌語氣出發，整理出清楚、有優先順序的資訊層次。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-stone-200 bg-stone-100 p-3 text-stone-500">
              <Clock3 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-wide text-stone-900">
                常見的數位體驗焦慮
              </h3>
              <p className="mt-1 text-sm text-stone-500">先確認方向再做設計，避免交付後才發現走了冤枉路。</p>
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
              <p className="mt-1 text-sm text-stone-500">從品牌氣質與受眾確認方向，依優先順序安排頁面結構與功能。</p>
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
