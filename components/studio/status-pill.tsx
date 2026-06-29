import { getProjectStatusLabel } from "@/lib/studio/format";
import type { ProjectStatus } from "@/lib/studio/types";

const statusClasses: Record<ProjectStatus, string> = {
  lead: "bg-stone-200 text-stone-700",
  qualified: "bg-emerald-100 text-emerald-700",
  proposal_sent: "bg-sky-100 text-sky-700",
  contract_pending: "bg-amber-100 text-amber-700",
  signed: "bg-violet-100 text-violet-700",
  in_progress: "bg-emerald-100 text-emerald-700",
  completed: "bg-stone-900 text-white",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {getProjectStatusLabel(status)}
    </span>
  );
}
