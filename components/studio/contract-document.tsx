import { formatCurrency } from "@/lib/studio/format";
import type { ContractDraft } from "@/lib/studio/types";

export function ContractDocument({
  draft,
  signedSummary,
}: {
  draft: ContractDraft;
  signedSummary?: { signerName: string; signedAt: string };
}) {
  return (
    <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(44,42,41,0.05)] sm:p-8">
      <div className="border-b border-dashed border-stone-300 pb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Contract Preview</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[0.06em] text-stone-900">{draft.title}</h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          專案：{draft.projectTitle} ｜ 總價：{formatCurrency(draft.totalAmount)} ｜ 付款方式：
          {draft.paymentPlanLabel}
        </p>
        {signedSummary ? (
          <p className="mt-3 rounded-[18px] bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            已由 {signedSummary.signerName} 於 {signedSummary.signedAt} 完成簽署。
          </p>
        ) : null}
      </div>

      <section className="mt-6 grid gap-4 rounded-[24px] bg-stone-50 p-5 md:grid-cols-2">
        <InfoBlock title="甲方" lines={[draft.client.companyName, draft.client.contactPerson, draft.client.email, draft.client.phone]} />
        <InfoBlock title="乙方" lines={[draft.studio.companyName, draft.studio.contactPerson, draft.studio.email, draft.studio.phone]} />
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold tracking-[0.05em] text-stone-900">付款節點</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {draft.paymentStages.map((stage) => (
            <div key={stage.id} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-900">{stage.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[0.05em] text-[#8B5E3C]">{stage.percent}%</p>
              <p className="mt-1 text-sm text-stone-700">{formatCurrency(stage.amount)}</p>
              <p className="mt-3 text-xs leading-6 text-stone-500">{stage.dueRule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-5">
        {draft.clauses.map((clause) => (
          <div key={clause.id} className="rounded-[24px] border border-stone-200 px-5 py-5">
            <h3 className="text-base font-semibold tracking-[0.05em] text-stone-900">{clause.title}</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-8 text-stone-700">{clause.content}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-[24px] border border-stone-200 bg-[#f7f1e7] p-5">
        <h3 className="text-base font-semibold tracking-[0.05em] text-stone-900">附件與備註</h3>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-stone-700">
          {draft.notes.map((note) => (
            <li key={note}>- {note}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function InfoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-[20px] border border-stone-200 bg-white p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{title}</p>
      <div className="mt-3 space-y-1 text-sm leading-7 text-stone-700">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
