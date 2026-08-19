import { CheckCircle2, Clock3, Coins, PencilRuler, Smartphone, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const traditional = [
  {
    icon: Clock3,
    label: "溝通往返太久",
    description: "需求反覆確認，卻沒有清楚的版面想像。",
  },
  {
    icon: Coins,
    label: "預算感受不安",
    description: "交付細節與優先順序不清時，容易為不確定性付出更高成本。",
  },
  {
    icon: Wrench,
    label: "網站與 App 脫鉤",
    description: "兩邊風格、流程各自發展，最後對不上。",
  },
];

const betterWay = [
  {
    icon: PencilRuler,
    label: "先確認品牌語氣",
    description: "從空間氛圍、閱讀節奏與受眾出發，設計方向更穩定。",
  },
  {
    icon: Smartphone,
    label: "同一編輯貫穿兩端",
    description: "網站與 App 出自同一個人，節奏自然一致。",
  },
  {
    icon: CheckCircle2,
    label: "保留營運彈性",
    description: "先建立品牌門面，依照需求逐步延伸功能。",
  },
];

export function PainPointsSection() {
  return (
    <AnimatedSection id="comparison" ariaLabelledBy="pain-points-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Brand Perspective"
        title="網站與 App 如果出自同一個語氣，訊息反而更容易被理解。"
        description="從品牌語氣出發，整理出清楚、有優先順序的資訊層次。"
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
