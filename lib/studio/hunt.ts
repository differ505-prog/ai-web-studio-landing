export type HuntStatus = "found" | "contacted" | "interested" | "converted" | "no_response";

export type HuntTarget = {
  id: string;
  name: string;
  category: "homestay" | "design-studio" | "private-dining";
  source: string;
  sourceUrl: string;
  notes: string;
  status: HuntStatus;
  createdAt: string;
  updatedAt: string;
};

export type HuntCategory = {
  id: "homestay" | "design-studio" | "private-dining";
  label: string;
  description: string;
  targetCount: number;
};

export type HuntState = {
  targets: HuntTarget[];
};

export const HUNT_STORAGE_KEY = "arrive-studio-hunt-v1";

export const huntCategories: HuntCategory[] = [
  {
    id: "homestay",
    label: "高端民宿 / 豪華露營區",
    description: "依賴 IG 訂房但無官網的獨立業者",
    targetCount: 10,
  },
  {
    id: "design-studio",
    label: "室內設計 / 軟裝工作室",
    description: "只靠 Facebook 或 IG 接案",
    targetCount: 10,
  },
  {
    id: "private-dining",
    label: "私廚 / 預約制餐飲",
    description: "只用 Google 表單預約的高客單價餐飲",
    targetCount: 10,
  },
];

export const huntStatusLabels: Record<HuntStatus, string> = {
  found: "找到",
  contacted: "已開發",
  interested: "有興趣",
  converted: "成交",
  no_response: "無回應",
};

export const huntStatusCircles: Record<HuntStatus, string> = {
  found: "○",
  contacted: "◐",
  interested: "◑",
  converted: "●",
  no_response: "✕",
};

function clampCount(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function readHuntState(): HuntState {
  if (typeof window === "undefined") return { targets: [] };
  try {
    const raw = window.localStorage.getItem(HUNT_STORAGE_KEY);
    if (!raw) return { targets: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.targets)) return { targets: [] };
    return parsed as HuntState;
  } catch {
    return { targets: [] };
  }
}

export function saveHuntState(state: HuntState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HUNT_STORAGE_KEY, JSON.stringify(state));
}

export function createTarget(
  data: Pick<HuntTarget, "name" | "category" | "source" | "sourceUrl" | "notes">,
): HuntTarget {
  const now = new Date().toISOString();
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...data,
    status: "found",
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTargetStatus(state: HuntState, targetId: string, status: HuntStatus): HuntState {
  return {
    ...state,
    targets: state.targets.map((t) =>
      t.id === targetId ? { ...t, status, updatedAt: new Date().toISOString() } : t,
    ),
  };
}

export function deleteTarget(state: HuntState, targetId: string): HuntState {
  return {
    ...state,
    targets: state.targets.filter((t) => t.id !== targetId),
  };
}

export function getHuntSummary(state: HuntState) {
  const totals = huntCategories.map((cat) => ({
    ...cat,
    found: state.targets.filter((t) => t.category === cat.id).length,
  }));

  const totalFound = state.targets.length;
  const totalTarget = huntCategories.reduce((sum, cat) => sum + cat.targetCount, 0);

  const statusBreakdown: Record<HuntStatus, number> = {
    found: 0,
    contacted: 0,
    interested: 0,
    converted: 0,
    no_response: 0,
  };
  state.targets.forEach((t) => {
    statusBreakdown[t.status]++;
  });

  return { totals, totalFound, totalTarget, statusBreakdown };
}
