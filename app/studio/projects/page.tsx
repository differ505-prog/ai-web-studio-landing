import { StudioShell } from "@/components/studio/studio-shell";
import { StatusPill } from "@/components/studio/status-pill";
import { formatCurrency } from "@/lib/studio/format";
import { studioProjects } from "@/lib/studio/mock-data";

export default function StudioProjectsPage() {
  return (
    <StudioShell
      eyebrow="Projects"
      title="案件管理"
      description="把所有築時數位案件集中在同一個節奏表內，方便追蹤目前階段、預算、下一步與待簽狀態。"
    >
      <div className="overflow-hidden rounded-[30px] border border-stone-200 bg-white">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_1fr] gap-4 border-b border-stone-200 bg-stone-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          <span>案件</span>
          <span>客戶 / 類型</span>
          <span>狀態</span>
          <span>預算</span>
          <span>下一步</span>
        </div>
        <div className="divide-y divide-stone-200">
          {studioProjects.map((project) => (
            <article key={project.id} className="grid grid-cols-1 gap-4 px-6 py-5 text-sm text-stone-700 lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_1fr]">
              <div>
                <p className="text-base font-semibold text-stone-900">{project.title}</p>
                <p className="mt-2 leading-7 text-stone-600">{project.summary}</p>
              </div>
              <div>
                <p>{project.client}</p>
                <p className="mt-2 text-stone-500">{project.serviceType}</p>
              </div>
              <div>
                <StatusPill status={project.status} />
              </div>
              <div className="font-medium text-stone-900">{formatCurrency(project.totalBudget)}</div>
              <div>
                <p>{project.nextAction}</p>
                <p className="mt-2 text-stone-500">最後更新：{project.updatedAt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </StudioShell>
  );
}
