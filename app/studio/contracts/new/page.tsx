import { ContractEditor } from "@/components/studio/contract-editor";
import { StudioShell } from "@/components/studio/studio-shell";
import { createBlankContractDraft } from "@/lib/studio/defaults";
import { isContractLinkStorageConfigured } from "@/lib/studio/share-store";

export default function StudioNewContractPage() {
  const draft = createBlankContractDraft();
  const isKvConfigured = isContractLinkStorageConfigured();

  return (
    <StudioShell
      eyebrow="New Contract"
      title="新增空白合約"
      description="先填入甲方資料、專案名稱與合約條件，再直接產生客戶簽署連結。這一頁就是築時數位的正式建檔入口。"
    >
      <ContractEditor initialDraft={draft} isKvConfigured={isKvConfigured} />
    </StudioShell>
  );
}
