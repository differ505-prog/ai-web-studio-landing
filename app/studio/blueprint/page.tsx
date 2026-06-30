import Link from "next/link";
import { ArrowRight, ExternalLink, Target } from "lucide-react";
import { StudioShell } from "@/components/studio/studio-shell";
import {
  blueprintExecutionLanes,
  blueprintPriorityActions,
  blueprintSnapshot,
  blueprintUrl,
} from "@/lib/studio/blueprint";

export default function StudioBlueprintPage() {
  return (
    <StudioShell
      eyebrow="Blueprint"
      title="策略藍圖"
      description="把外部的行動藍圖轉成築時數位工作面板內可直接執行的節點。先在這裡抓重點，再視需要打開完整藍圖。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          <article className="rounded-[28px] border border-stone-200 bg-[#f7f1e7] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">External Blueprint</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">
              {blueprintSnapshot.brand}：{blueprintSnapshot.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">{blueprintSnapshot.summary}</p>
            <div className="mt-5 grid gap-3 rounded-[22px] bg-white p-4 text-sm text-stone-700">
              <p>目前進度：{blueprintSnapshot.completion}</p>
              <p>一次性任務：{blueprintSnapshot.completed}</p>
              <p>推薦做法：把策略留在這頁統整，實作動作回到工作面板執行。</p>
            </div>
            <a
              href={blueprintUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
            >
              <ExternalLink className="h-4 w-4" />
              開啟完整外部藍圖
            </a>
          </article>

          <article className="rounded-[28px] border border-stone-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Focus Principle</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">先成交，再擴張</h3>
            <div className="mt-5 space-y-3 text-sm leading-7 text-stone-700">
              <p>- 外部藍圖負責規劃節奏，不負責真正的案件留痕與法務留存。</p>
              <p>- 工作面板負責把客戶資料、合約、簽署證據與下一步沉澱成可追蹤資產。</p>
              <p>- 所以最優先的不是一直看藍圖，而是把藍圖中的高價值任務轉成可操作頁面。</p>
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <article className="rounded-[28px] border border-stone-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-[#8B5E3C]" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Action Mapping</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[0.05em] text-stone-900">直接對應到工作面板的三個入口</h3>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {blueprintPriorityActions.map((action) => (
                <article key={action.title} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                  <p className="text-base font-semibold text-stone-900">{action.title}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-700">{action.detail}</p>
                  <Link
                    href={action.href}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
                  >
                    {action.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            {blueprintExecutionLanes.map((lane) => (
              <article key={lane.title} className="rounded-[28px] border border-stone-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{lane.title}</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                  {lane.items.map((item) => (
                    <p key={item}>- {item}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </StudioShell>
  );
}
