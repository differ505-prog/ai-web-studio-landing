import Image from "next/image";
import { notFound } from "next/navigation";
import { ContractDocument } from "@/components/studio/contract-document";
import { StudioShell } from "@/components/studio/studio-shell";
import { formatDateTime } from "@/lib/studio/format";
import { getSignedContractRecord } from "@/lib/studio/share-store";

export default async function StudioRecordDetailPage({
  params,
}: {
  params: Promise<{ recordId: string }>;
}) {
  const { recordId } = await params;
  const record = await getSignedContractRecord(recordId);

  if (!record) {
    notFound();
  }

  return (
    <StudioShell
      eyebrow="Record Detail"
      title={record.projectTitle}
      description="保留已簽署版本、簽署人資訊與審計資料，方便築時數位在後續履約或爭議處理時回查。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.72fr_minmax(0,1fr)]">
        <aside className="space-y-5 rounded-[28px] border border-stone-200 bg-stone-50 p-5">
          <section className="rounded-[24px] border border-stone-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Signed Meta</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              <p>簽署人：{record.signerName}</p>
              <p>角色：{record.signerRole}</p>
              <p>Email：{record.signerEmail}</p>
              <p>電話：{record.signerPhone}</p>
              <p>簽署時間：{formatDateTime(record.signedAt)}</p>
              <p>IP：{record.ip}</p>
              <p className="break-all">User Agent：{record.userAgent}</p>
              <p className="break-all">文件雜湊：{record.documentHash}</p>
            </div>
          </section>

          <section className="rounded-[24px] border border-stone-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Signature</p>
            <div className="mt-4 overflow-hidden rounded-[20px] border border-stone-200 bg-white">
              <Image
                src={record.signatureDataUrl}
                alt={`${record.signerName} 的簽名`}
                width={640}
                height={260}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </section>
        </aside>

        <ContractDocument
          draft={record.payload.draft}
          signedSummary={{
            signerName: record.signerName,
            signedAt: formatDateTime(record.signedAt),
          }}
        />
      </div>
    </StudioShell>
  );
}
