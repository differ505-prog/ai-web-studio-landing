import { StudioShell } from "@/components/studio/studio-shell";
import { HuntBoard } from "@/components/studio/hunt-board";

export default function StudioHuntPage() {
  return (
    <StudioShell
      eyebrow="Lead Generation"
      title="狩獵名單"
      description="鎖定完全無官網、或是只有陽春舊網站的潛在客戶。資料存在這台裝置。"
    >
      <HuntBoard />
    </StudioShell>
  );
}
