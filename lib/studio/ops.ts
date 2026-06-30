export type OpsTaskItem = {
  id: string;
  title: string;
  typeLabel: string;
  statusLabel: string;
  completed: boolean;
};

export type OpsTaskGroup = {
  id: string;
  title: string;
  typeLabel: string;
  statusLabel: string;
  collapsed: boolean;
  completed: boolean;
  items: OpsTaskItem[];
};

export const opsTaskGroups: OpsTaskGroup[] = [
  {
    id: "poc-visual-bait",
    title: "執行「POC 視覺誘餌」開發法（每週循環任務）",
    typeLabel: "一次性任務",
    statusLabel: "未完成",
    collapsed: false,
    completed: false,
    items: [
      {
        id: "poc-visual-bait-mockup",
        title: "每週 2 次：挑選名單，用 AI 花 15 分鐘幫他們生成一張「品牌專屬雜誌風」網頁 Mockup。",
        typeLabel: "一次性任務",
        statusLabel: "未完成",
        completed: false,
      },
      {
        id: "poc-visual-bait-outreach",
        title: "每週 5 次：透過 Instagram DM 或 Threads 發送具備溫度、不帶壓迫感的破冰訊息與 Mockup。",
        typeLabel: "一次性任務",
        statusLabel: "未完成",
        completed: false,
      },
    ],
  },
];

export function getOpsSummary(groups: OpsTaskGroup[]) {
  const totalGroups = groups.length;
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
  const completedItems = groups.reduce(
    (sum, group) => sum + group.items.filter((item) => item.completed).length,
    0,
  );

  return {
    totalGroups,
    totalItems,
    completedItems,
    pendingItems: totalItems - completedItems,
  };
}
