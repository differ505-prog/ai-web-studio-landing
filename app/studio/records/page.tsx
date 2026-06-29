import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StudioShell } from "@/components/studio/studio-shell";
import { formatDateTime } from "@/lib/studio/format";
import { listSignedContractRecords } from "@/lib/studio/share-store";

export default async function StudioRecordsPage() {
  const records = await listSignedContractRecords();

  return (
    <StudioShell
      eyebrow="Records"
      title="已簽留存"
      description="集中查看所有已簽署的合約紀錄，包含簽署時間、簽署人與文件快照，方便後續追溯。"
    >
      <div className="space-y-4">
        {records.map((record) => (
          <article key={record.id} className="rounded-[28px] border border-stone-200 bg-white p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Signed Contract</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">{record.projectTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {record.contractTitle} ｜ 簽署人：{record.signerName}（{record.signerRole}）
                </p>
              </div>
              <div className="rounded-[20px] bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-700">
                <p>簽署時間：{formatDateTime(record.signedAt)}</p>
                <p>Email：{record.signerEmail}</p>
                <p>IP：{record.ip}</p>
              </div>
            </div>
            <Link
              href={`/studio/records/${record.id}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
            >
              查看詳情
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </StudioShell>
  );
}
