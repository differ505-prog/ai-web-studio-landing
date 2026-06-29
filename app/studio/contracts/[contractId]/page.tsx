import { notFound } from "next/navigation";
import { ContractEditor } from "@/components/studio/contract-editor";
import { StudioShell } from "@/components/studio/studio-shell";
import { findContractDraft } from "@/lib/studio/mock-data";
import { isContractLinkStorageConfigured } from "@/lib/studio/share-store";

export default async function StudioContractDetailPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = await params;
  const draft = findContractDraft(contractId);
  const isKvEnabled = isContractLinkStorageConfigured();

  if (!draft) {
    notFound();
  }

  return (
    <StudioShell
      eyebrow="Contract Detail"
      title={draft.projectTitle}
      description="左側微調築時數位合約關鍵變數，右側維持正式合約預覽與條款層級。產生連結後即可傳給客戶用手機簽署。"
    >
      <ContractEditor initialDraft={draft} isKvEnabled={isKvEnabled} />
    </StudioShell>
  );
}
