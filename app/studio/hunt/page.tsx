import { StudioShell } from "@/components/studio/studio-shell";
import { HuntBoard } from "@/components/studio/hunt-board";

export default function StudioHuntPage() {
  return (
    <StudioShell
      eyebrow="Lead Generation"
      title="狩獵名單"
      description="優先級 1：10 間被醜陋模板封印的民宿 → 優先級 4 避雷區：10 間室內設計工作室。資料存在本機 localStorage，不上傳。"
    >
      <HuntBoard />
    </StudioShell>
  );
}
