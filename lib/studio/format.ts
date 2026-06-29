import type { ProjectStatus } from "@/lib/studio/types";

export function formatCurrency(value: number) {
  return `NT$ ${value.toLocaleString("zh-TW")}`;
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getProjectStatusLabel(status: ProjectStatus) {
  const mapping: Record<ProjectStatus, string> = {
    lead: "新詢問",
    qualified: "已判定可接",
    proposal_sent: "已送提案",
    contract_pending: "待簽合約",
    signed: "已完成簽署",
    in_progress: "執行中",
    completed: "已完成",
  };

  return mapping[status];
}
