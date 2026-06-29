import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { StudioShell } from "@/components/studio/studio-shell";
import { StatusPill } from "@/components/studio/status-pill";
import { formatCurrency } from "@/lib/studio/format";
import { findProjectRecord, studioContracts } from "@/lib/studio/mock-data";

export default async function StudioProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = findProjectRecord(projectId);

  if (!project) {
    notFound();
  }

  const relatedContracts = studioContracts.filter((contract) => contract.projectId === project.id);

  return (
    <StudioShell
      eyebrow="Project Detail"
      title={project.title}
      description="在單一案件頁集中查看專案摘要、下一步、預算與對應合約，方便築時數位內部推進。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-5 rounded-[28px] border border-stone-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-stone-500">{project.client} ｜ {project.serviceType}</p>
              <p className="mt-4 text-sm leading-7 text-stone-700">{project.summary}</p>
            </div>
            <StatusPill status={project.status} />
          </div>
          <div className="rounded-[24px] bg-stone-50 p-4 text-sm leading-7 text-stone-700">
            <p>案件預算：{formatCurrency(project.totalBudget)}</p>
            <p>下一步：{project.nextAction}</p>
            <p>最後更新：{project.updatedAt}</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Related Contracts</p>
          <div className="mt-5 space-y-4">
            {relatedContracts.map((contract) => (
              <article key={contract.id} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                <p className="text-base font-semibold text-stone-900">{contract.title}</p>
                <p className="mt-2 text-sm text-stone-600">
                  {contract.paymentPlanLabel} ｜ {formatCurrency(contract.totalAmount)}
                </p>
                <Link
                  href={`/studio/contracts/${contract.id}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-900"
                >
                  前往合約工作台
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </StudioShell>
  );
}
