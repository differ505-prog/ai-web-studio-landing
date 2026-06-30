import Link from "next/link";
import { ArrowRight, Compass, FileSignature, FolderOpenDot, ReceiptText, WalletCards } from "lucide-react";
import { StudioShell } from "@/components/studio/studio-shell";
import { StatusPill } from "@/components/studio/status-pill";
import { blueprintSnapshot } from "@/lib/studio/blueprint";
import { formatCurrency } from "@/lib/studio/format";
import { studioContracts, studioProjects } from "@/lib/studio/mock-data";

const metrics = [
  {
    label: "進行中案件",
    value: studioProjects.filter((project) => ["in_progress", "contract_pending", "proposal_sent"].includes(project.status)).length,
    icon: FolderOpenDot,
  },
  {
    label: "待簽合約",
    value: studioContracts.length,
    icon: FileSignature,
  },
  {
    label: "待收款金額",
    value: `NT$ ${studioProjects.reduce((sum, project) => sum + project.totalBudget, 0).toLocaleString("zh-TW")}`,
    icon: WalletCards,
  },
];

export default function StudioPage() {
  return (
    <StudioShell
      eyebrow="Studio Dashboard"
      title="築時數位內部總覽"
      description="集中掌握案件、合約、簽署與收款節點。這一版先用可運作的 MVP 架構，後續可再接正式資料庫與登入。"
    >
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article key={metric.label} className="rounded-[26px] border border-stone-200 bg-stone-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-stone-500">{metric.label}</p>
                  <Icon className="h-5 w-5 text-stone-500" />
                </div>
                <p className="mt-6 text-3xl font-semibold tracking-[0.05em] text-stone-900">{metric.value}</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-[26px] border border-stone-200 bg-[#f4ece0] p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Workflow Focus</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">目前最值得優先推進的案件</h3>
          <div className="mt-4 rounded-[22px] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-stone-900">{studioProjects[0].title}</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{studioProjects[0].summary}</p>
              </div>
              <StatusPill status={studioProjects[0].status} />
            </div>
            <p className="mt-4 text-sm font-medium text-stone-700">下一步：{studioProjects[0].nextAction}</p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[28px] border border-stone-200 bg-[#f7f1e7] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Strategy Blueprint</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">
              外部藍圖先抓方向，面板內再落地執行
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              目前外部藍圖顯示 {blueprintSnapshot.brand} 進度為 {blueprintSnapshot.completion}。我已把最重要的動作整理成
              工作面板版本，避免你每次都要跳出去重新解讀長篇任務清單。
            </p>
          </div>
          <Link
            href="/studio/blueprint"
            className="inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
          >
            <Compass className="h-4 w-4" />
            打開策略藍圖
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Projects</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">案件節奏</h3>
            </div>
            <Link
              href="/studio/projects"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
            >
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {studioProjects.map((project) => (
              <article key={project.id} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-stone-900">{project.title}</p>
                    <p className="mt-2 text-sm text-stone-500">{project.client} ｜ {project.serviceType}</p>
                    <p className="mt-3 text-sm leading-7 text-stone-700">{project.summary}</p>
                  </div>
                  <StatusPill status={project.status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
                  <span>預算：{formatCurrency(project.totalBudget)}</span>
                  <span>下一步：{project.nextAction}</span>
                  <span>更新：{project.updatedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Contracts</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">合約與留存</h3>
          <div className="mt-5 space-y-4">
            {studioContracts.map((contract) => (
              <article key={contract.id} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                <p className="text-base font-semibold text-stone-900">{contract.title}</p>
                <p className="mt-2 text-sm text-stone-600">{contract.projectTitle}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
                  <span>總價：{formatCurrency(contract.totalAmount)}</span>
                  <span>付款：{contract.paymentPlanLabel}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/studio/contracts/${contract.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-900"
                  >
                    <ReceiptText className="h-4 w-4" />
                    打開工作台
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </StudioShell>
  );
}
