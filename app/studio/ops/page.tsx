import { OpsBoard } from "@/components/studio/ops-board";
import { StudioShell } from "@/components/studio/studio-shell";
import { opsTaskGroups } from "@/lib/studio/ops";

export default function StudioOpsPage() {
  return (
    <StudioShell
      eyebrow="Operations Console"
      title="任務作戰台"
      description="先把你截圖中的那組任務做成可勾選、可收合的執行面板。這一版不擴寫其他任務，只聚焦在目前最想落地的那一組。"
    >
      <OpsBoard initialGroups={opsTaskGroups} />
    </StudioShell>
  );
}
