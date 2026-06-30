import { OpsBoard } from "@/components/studio/ops-board";
import { StudioShell } from "@/components/studio/studio-shell";

export default function StudioOpsPage() {
  return (
    <StudioShell
      eyebrow="Operations Console"
      title="任務作戰台"
      description="這一版已補上築時版規則層：每週循環、次數制達標、XP、等級、streak 與週 bonus。任務內容仍只放你指定的那一組。"
    >
      <OpsBoard />
    </StudioShell>
  );
}
