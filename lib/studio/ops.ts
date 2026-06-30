const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export const OPS_STORAGE_KEY = "arrive-studio-ops-v2";
export const XP_PER_LEVEL = 200;
export const XP_PER_GROUP_COMPLETION = 100;
export const XP_WEEKLY_BONUS = 50;
export const XP_STREAK_BONUS = 25;

export type OpsTaskDefinition = {
  id: string;
  title: string;
  cadenceLabel: string;
  targetCount: number;
};

export type OpsTaskGroupDefinition = {
  id: string;
  title: string;
  cadenceLabel: string;
  rewardXp: number;
  items: OpsTaskDefinition[];
};

export type OpsTaskState = {
  count: number;
};

export type OpsGroupState = {
  collapsed: boolean;
  rewardClaimed: boolean;
  completedAt: string | null;
  items: Record<string, OpsTaskState>;
};

export type OpsWeeklyState = {
  weekKey: string;
  weekIndex: number;
  bonusClaimed: boolean;
  streakBonusClaimed: boolean;
  groups: Record<string, OpsGroupState>;
};

export type OpsStats = {
  xp: number;
  streak: number;
  lifetimeRuns: number;
  lastCompletedWeekIndex: number | null;
};

export type OpsBoardState = {
  weekly: OpsWeeklyState;
  stats: OpsStats;
};

export const opsTaskGroups: OpsTaskGroupDefinition[] = [
  {
    id: "poc-visual-bait",
    title: "執行「POC 視覺誘餌」開發法",
    cadenceLabel: "每週循環任務",
    rewardXp: XP_PER_GROUP_COMPLETION,
    items: [
      {
        id: "poc-visual-bait-mockup",
        title: "挑選名單，用 AI 花 15 分鐘幫他們生成一張「品牌專屬雜誌風」網頁 Mockup。",
        cadenceLabel: "每週 2 次",
        targetCount: 2,
      },
      {
        id: "poc-visual-bait-outreach",
        title: "透過 Instagram DM 或 Threads 發送具備溫度、不帶壓迫感的破冰訊息與 Mockup。",
        cadenceLabel: "每週 5 次",
        targetCount: 5,
      },
    ],
  },
];

export type OpsTaskView = OpsTaskDefinition & {
  currentCount: number;
  completed: boolean;
};

export type OpsGroupView = OpsTaskGroupDefinition & {
  collapsed: boolean;
  rewardClaimed: boolean;
  completed: boolean;
  completedItems: number;
  items: OpsTaskView[];
};

export type OpsSummary = {
  totalGroups: number;
  totalItems: number;
  totalRequiredActions: number;
  completedItems: number;
  pendingItems: number;
  completedGroups: number;
  pendingActions: number;
  weeklyCompletionRate: number;
};

export const opsRankTitles = [
  "起稿中",
  "構圖中",
  "提案中",
  "執行中",
  "定稿中",
  "主理中",
] as const;

export function getWeekInfo(date = new Date()) {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);
  const dayOffset = (current.getDay() + 6) % 7;
  current.setDate(current.getDate() - dayOffset);

  const firstThursday = new Date(current);
  firstThursday.setDate(firstThursday.getDate() + 3);
  const year = firstThursday.getFullYear();
  const januaryFourth = new Date(year, 0, 4);
  januaryFourth.setHours(0, 0, 0, 0);
  const januaryDayOffset = (januaryFourth.getDay() + 6) % 7;
  januaryFourth.setDate(januaryFourth.getDate() - januaryDayOffset);
  const weekNumber = Math.round((current.getTime() - januaryFourth.getTime()) / MS_PER_WEEK) + 1;

  return {
    weekIndex: Math.floor(current.getTime() / MS_PER_WEEK),
    weekKey: `${year}-W${String(weekNumber).padStart(2, "0")}`,
    weekLabel: `${year} 第 ${weekNumber} 週`,
  };
}

export function getLevel(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getRankTitle(level: number) {
  const index = Math.min(opsRankTitles.length - 1, Math.max(0, level - 1));
  return opsRankTitles[index];
}

export function createInitialOpsState(date = new Date()): OpsBoardState {
  const weekInfo = getWeekInfo(date);

  return {
    weekly: {
      weekKey: weekInfo.weekKey,
      weekIndex: weekInfo.weekIndex,
      bonusClaimed: false,
      streakBonusClaimed: false,
      groups: Object.fromEntries(
        opsTaskGroups.map((group) => [
          group.id,
          {
            collapsed: false,
            rewardClaimed: false,
            completedAt: null,
            items: Object.fromEntries(group.items.map((item) => [item.id, { count: 0 }])),
          },
        ]),
      ),
    },
    stats: {
      xp: 0,
      streak: 0,
      lifetimeRuns: 0,
      lastCompletedWeekIndex: null,
    },
  };
}

function clampCount(value: number, max: number) {
  return Math.max(0, Math.min(max, value));
}

function isGroupComplete(group: OpsTaskGroupDefinition, groupState: OpsGroupState) {
  return group.items.every((item) => (groupState.items[item.id]?.count ?? 0) >= item.targetCount);
}

export function getGroupViews(state: OpsBoardState) {
  return opsTaskGroups.map<OpsGroupView>((group) => {
    const groupState = state.weekly.groups[group.id];
    const items = group.items.map<OpsTaskView>((item) => {
      const currentCount = clampCount(groupState.items[item.id]?.count ?? 0, item.targetCount);

      return {
        ...item,
        currentCount,
        completed: currentCount >= item.targetCount,
      };
    });

    const completedItems = items.filter((item) => item.completed).length;

    return {
      ...group,
      collapsed: groupState.collapsed,
      rewardClaimed: groupState.rewardClaimed,
      completed: completedItems === items.length,
      completedItems,
      items,
    };
  });
}

export function getOpsSummary(groups: OpsGroupView[]): OpsSummary {
  const totalGroups = groups.length;
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
  const totalRequiredActions = groups.reduce(
    (sum, group) => sum + group.items.reduce((itemSum, item) => itemSum + item.targetCount, 0),
    0,
  );
  const completedItems = groups.reduce((sum, group) => sum + group.completedItems, 0);
  const completedGroups = groups.filter((group) => group.completed).length;
  const completedActions = groups.reduce(
    (sum, group) => sum + group.items.reduce((itemSum, item) => itemSum + item.currentCount, 0),
    0,
  );

  return {
    totalGroups,
    totalItems,
    totalRequiredActions,
    completedItems,
    pendingItems: totalItems - completedItems,
    completedGroups,
    pendingActions: Math.max(0, totalRequiredActions - completedActions),
    weeklyCompletionRate: totalRequiredActions === 0 ? 0 : completedActions / totalRequiredActions,
  };
}

export function getOpsStaticSummary() {
  const groups = opsTaskGroups.length;
  const items = opsTaskGroups.reduce((sum, group) => sum + group.items.length, 0);
  const requiredActions = opsTaskGroups.reduce(
    (sum, group) => sum + group.items.reduce((itemSum, item) => itemSum + item.targetCount, 0),
    0,
  );

  return {
    totalGroups: groups,
    totalItems: items,
    totalRequiredActions: requiredActions,
  };
}

export function syncOpsState(rawState: unknown, date = new Date()): OpsBoardState {
  const fallback = createInitialOpsState(date);

  if (!rawState || typeof rawState !== "object") {
    return fallback;
  }

  const maybeState = rawState as Partial<OpsBoardState>;
  const weekInfo = getWeekInfo(date);

  const stats: OpsStats = {
    xp: typeof maybeState.stats?.xp === "number" ? maybeState.stats.xp : 0,
    streak: typeof maybeState.stats?.streak === "number" ? maybeState.stats.streak : 0,
    lifetimeRuns: typeof maybeState.stats?.lifetimeRuns === "number" ? maybeState.stats.lifetimeRuns : 0,
    lastCompletedWeekIndex:
      typeof maybeState.stats?.lastCompletedWeekIndex === "number" ? maybeState.stats.lastCompletedWeekIndex : null,
  };

  const currentWeekState: OpsWeeklyState = {
    weekKey: weekInfo.weekKey,
    weekIndex: weekInfo.weekIndex,
    bonusClaimed: false,
    streakBonusClaimed: false,
    groups: Object.fromEntries(
      opsTaskGroups.map((group) => {
        const sourceGroup = maybeState.weekly?.groups?.[group.id];
        return [
          group.id,
          {
            collapsed: typeof sourceGroup?.collapsed === "boolean" ? sourceGroup.collapsed : false,
            rewardClaimed: typeof sourceGroup?.rewardClaimed === "boolean" ? sourceGroup.rewardClaimed : false,
            completedAt: typeof sourceGroup?.completedAt === "string" ? sourceGroup.completedAt : null,
            items: Object.fromEntries(
              group.items.map((item) => [
                item.id,
                {
                  count: clampCount(
                    typeof sourceGroup?.items?.[item.id]?.count === "number" ? sourceGroup.items[item.id].count : 0,
                    item.targetCount,
                  ),
                },
              ]),
            ),
          },
        ];
      }),
    ),
  };

  if (maybeState.weekly?.weekIndex === weekInfo.weekIndex) {
    currentWeekState.bonusClaimed = Boolean(maybeState.weekly?.bonusClaimed);
    currentWeekState.streakBonusClaimed = Boolean(maybeState.weekly?.streakBonusClaimed);
    return {
      weekly: currentWeekState,
      stats,
    };
  }

  const previousWeekIndex =
    typeof maybeState.weekly?.weekIndex === "number" ? maybeState.weekly.weekIndex : weekInfo.weekIndex;
  const previousGap = weekInfo.weekIndex - previousWeekIndex;
  const previousGroups = maybeState.weekly?.groups;
  const previousCompleted =
    previousGroups && typeof previousGroups === "object"
      ? opsTaskGroups.every((group) => {
          const groupState = previousGroups[group.id];
          if (!groupState) return false;
          return group.items.every((item) => {
            const count = groupState.items?.[item.id]?.count;
            return typeof count === "number" && count >= item.targetCount;
          });
        })
      : false;

  if (previousGap > 1 || !previousCompleted) {
    stats.streak = 0;
  }

  return {
    weekly: currentWeekState,
    stats,
  };
}

export function toggleGroupCollapsed(state: OpsBoardState, groupId: string) {
  const group = state.weekly.groups[groupId];
  if (!group) return state;

  return {
    ...state,
    weekly: {
      ...state.weekly,
      groups: {
        ...state.weekly.groups,
        [groupId]: {
          ...group,
          collapsed: !group.collapsed,
        },
      },
    },
  };
}

export function updateTaskProgress(
  state: OpsBoardState,
  groupId: string,
  itemId: string,
  nextCount: number,
  date = new Date(),
) {
  const group = opsTaskGroups.find((entry) => entry.id === groupId);
  const item = group?.items.find((entry) => entry.id === itemId);

  if (!group || !item) {
    return state;
  }

  const groupState = state.weekly.groups[groupId];
  const currentCount = groupState.items[itemId]?.count ?? 0;
  const clampedCount = clampCount(nextCount, item.targetCount);

  if (clampedCount === currentCount) {
    return state;
  }

  const previousGroupComplete = isGroupComplete(group, groupState);

  const nextGroupState: OpsGroupState = {
    ...groupState,
    items: {
      ...groupState.items,
      [itemId]: {
        count: clampedCount,
      },
    },
  };

  const nextWeekly: OpsWeeklyState = {
    ...state.weekly,
    groups: {
      ...state.weekly.groups,
      [groupId]: nextGroupState,
    },
  };

  const nextState: OpsBoardState = {
    ...state,
    weekly: nextWeekly,
    stats: {
      ...state.stats,
    },
  };

  const groupCompletedNow = isGroupComplete(group, nextGroupState);

  if (!previousGroupComplete && groupCompletedNow && !groupState.rewardClaimed) {
    nextState.weekly.groups[groupId] = {
      ...nextGroupState,
      rewardClaimed: true,
      completedAt: date.toISOString(),
    };
    nextState.stats.xp += group.rewardXp;
    nextState.stats.lifetimeRuns += 1;
  }

  const allGroupsCompleted = opsTaskGroups.every((entry) =>
    isGroupComplete(entry, nextState.weekly.groups[entry.id]),
  );

  if (allGroupsCompleted && !nextState.weekly.bonusClaimed) {
    nextState.weekly.bonusClaimed = true;
    nextState.stats.xp += XP_WEEKLY_BONUS;

    const lastCompleted = nextState.stats.lastCompletedWeekIndex;
    const streak = lastCompleted === nextState.weekly.weekIndex - 1 ? nextState.stats.streak + 1 : 1;
    nextState.stats.streak = streak;
    nextState.stats.lastCompletedWeekIndex = nextState.weekly.weekIndex;

    if (streak >= 2 && !nextState.weekly.streakBonusClaimed) {
      nextState.weekly.streakBonusClaimed = true;
      nextState.stats.xp += XP_STREAK_BONUS;
    }
  }

  return nextState;
}
