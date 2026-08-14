export type HuntStatus = "found" | "contacted" | "interested" | "converted" | "no_response";

export type HuntTarget = {
  id: string;
  name: string;
  category: "priority-1" | "priority-2" | "priority-3" | "priority-4";
  source: string;
  sourceUrl: string;
  notes: string;
  status: HuntStatus;
  city: string;
  existingWebsite: string;
  googleMapsUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type HuntCategory = {
  id: "priority-1" | "priority-2" | "priority-3" | "priority-4";
  label: string;
  badge: string;
  description: string;
  targetCount: number;
};

export type HuntState = {
  targets: HuntTarget[];
};

export const HUNT_STORAGE_KEY = "arrive-studio-hunt-v2";

export const huntCategories: HuntCategory[] = [
  {
    id: "priority-1",
    badge: "🥇",
    label: "優先級 1：挖角戰術",
    description: "被醜陋模板封印、實體裝潢極佳的潛力民宿",
    targetCount: 10,
  },
  {
    id: "priority-2",
    badge: "🥈",
    label: "優先級 2：IG 訂房民宿 / 豪華露營",
    description: "依賴 IG 訂房但無官網的高端獨立業者",
    targetCount: 10,
  },
  {
    id: "priority-3",
    badge: "🥉",
    label: "優先級 3：私廚 / 預約制餐飲",
    description: "只用 Google 表單預約的高客單價餐飲",
    targetCount: 10,
  },
  {
    id: "priority-4",
    badge: "⚠️",
    label: "優先級 4：室內設計 / 軟裝（避雷區）",
    description: "只靠 FB/IG 接案，容易陷入修改地獄",
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
  data: Pick<HuntTarget, "name" | "category" | "source" | "sourceUrl" | "notes" | "city" | "existingWebsite" | "googleMapsUrl">,
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
