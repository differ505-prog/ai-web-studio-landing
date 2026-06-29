import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StudioShell } from "@/components/studio/studio-shell";
import { formatCurrency } from "@/lib/studio/format";
import { studioContracts } from "@/lib/studio/mock-data";

export default function StudioContractsPage() {
  return (
    <StudioShell
      eyebrow="Contracts"
      title="合約工作台"
      description="每一份合約都基於築時數位的防禦型模板，並可即時生成客戶手機簽署連結。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {studioContracts.map((contract) => (
          <article key={contract.id} className="rounded-[28px] border border-stone-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Contract Draft</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">{contract.projectTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{contract.title}</p>
            <div className="mt-5 grid gap-3 rounded-[22px] bg-stone-50 p-4 text-sm text-stone-700">
              <p>總價：{formatCurrency(contract.totalAmount)}</p>
              <p>付款方式：{contract.paymentPlanLabel}</p>
              <p>免費修改：每階段 {contract.freeRevisionRounds} 次</p>
              <p>保固：{contract.warrantyDays} 天</p>
            </div>
            <Link
              href={`/studio/contracts/${contract.id}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8B5E3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
            >
              進入合約工作台
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </StudioShell>
  );
}
