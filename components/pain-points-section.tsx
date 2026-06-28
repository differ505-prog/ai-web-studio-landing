import { AlertTriangle, CheckCircle2, Clock3, Coins, Layers3, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const traditional = [
  { icon: Clock3, label: "開發週期冗長", description: "需求往返與流程斷點，常讓專案拖到數月後才看到成果。" },
  { icon: Coins, label: "預算持續膨脹", description: "估價不透明、追加需求頻繁，讓整體成本難以控制。" },
  { icon: Wrench, label: "維護與擴充困難", description: "架構老舊或缺乏文件，後續功能新增總是更慢更貴。" },
];

const aiDriven = [
  { icon: Layers3, label: "敏捷迭代溝通", description: "以 AI 原型與視覺草圖先對齊方向，降低認知落差與重工。" },
  { icon: CheckCircle2, label: "數天內極速上線", description: "聚焦 MVP 與高價值功能，讓市場驗證與商業推進更快開始。" },
  { icon: AlertTriangle, label: "價格透明可預期", description: "以清楚交付範圍與技術架構規劃，控制預算風險與維運成本。" },
];

export function PainPointsSection() {
  return (
    <AnimatedSection id="comparison" ariaLabelledBy="pain-points-title" className="mt-24">
      <SectionIntro
        eyebrow="Traditional vs AI Workflow"
        title="傳統開發卡在流程，我們把速度與品質一起拉滿。"
        description="多數網站專案不是輸在技術，而是輸在低效率的溝通與缺乏可視化決策。透過 AI 協作流程，我們能更快對齊需求、更早驗證方向，並在短時間內交付可上線版本。"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[30px] border border-orange-200/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-orange-200/15 bg-orange-200/8 p-3 text-orange-100">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold text-stone-50">傳統開發模式</h3>
              <p className="mt-1 text-sm text-slate-400">高溝通成本、週期拉長、超出預算的常見來源。</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {traditional.map(({ icon: Icon, label, description }) => (
              <div key={label} className="rounded-3xl border border-white/8 bg-black/20 p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-2 text-orange-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-stone-50">{label}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[30px] border border-teal-300/20 bg-teal-300/6 p-6 shadow-[0_0_60px_rgba(46,226,198,0.07)]">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-teal-300/20 bg-teal-300/10 p-3 text-teal-100">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold text-stone-50">我們的 AI 開發模式</h3>
              <p className="mt-1 text-sm text-slate-400">敏捷迭代、快速驗證、透明交付，為成長速度而設計。</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {aiDriven.map(({ icon: Icon, label, description }) => (
              <div key={label} className="rounded-3xl border border-white/8 bg-black/20 p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-1 rounded-2xl border border-white/10 bg-white/5 p-2 text-teal-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-stone-50">{label}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
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
