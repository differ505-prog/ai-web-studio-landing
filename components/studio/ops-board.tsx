"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, Check, ChevronDown, ChevronUp, Minus, Plus, Sparkles, Square, Target, Trophy } from "lucide-react";
import {
  createInitialOpsState,
  getGroupViews,
  getLevel,
  getOpsSummary,
  getRankTitle,
  OPS_STORAGE_KEY,
  syncOpsState,
  toggleGroupCollapsed,
  updateTaskProgress,
  XP_PER_GROUP_COMPLETION,
  XP_PER_LEVEL,
  XP_STREAK_BONUS,
  XP_WEEKLY_BONUS,
  type OpsBoardState,
} from "@/lib/studio/ops";

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function getGroupStatus(state: { completed: boolean; rewardClaimed: boolean; completedItems: number }) {
  if (state.rewardClaimed) return "本週已結算";
  if (state.completed) return "已達標";
  if (state.completedItems > 0) return "進行中";
  return "待開始";
}

function getItemStatus(currentCount: number, targetCount: number) {
  if (currentCount >= targetCount) return "已達標";
  if (currentCount > 0) return "進行中";
  return "待開始";
}

export function OpsBoard() {
  const [state, setState] = useState<OpsBoardState>(() => createInitialOpsState());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(OPS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      setState(syncOpsState(parsed));
    } catch {
      setState(createInitialOpsState());
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(OPS_STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  const groups = useMemo(() => getGroupViews(state), [state]);
  const summary = useMemo(() => getOpsSummary(groups), [groups]);
  const level = useMemo(() => getLevel(state.stats.xp), [state.stats.xp]);
  const rankTitle = useMemo(() => getRankTitle(level), [level]);
  const levelBaseXp = (level - 1) * XP_PER_LEVEL;
  const levelProgressPercent = Math.min(1, (state.stats.xp - levelBaseXp) / XP_PER_LEVEL);

  function updateCount(groupId: string, itemId: string, nextCount: number) {
    setState((current) => updateTaskProgress(syncOpsState(current), groupId, itemId, nextCount));
  }

  function handleCollapse(groupId: string) {
    setState((current) => toggleGroupCollapsed(current, groupId));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-stone-200 bg-[#f4ece0] p-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Rule Layer Enabled</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[0.05em] text-stone-900">築時版作戰台規則已上線</h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-700">
              這版已把重複性與升級規則補進來。現在不是單純打勾，而是每週循環結算、依次數達標、自動累積 XP，
              並在整週完成時發放 bonus 與 streak 獎勵。
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-stone-700">
              <span className="rounded-full border border-stone-300 bg-white px-4 py-2">本週任務完成：+{XP_PER_GROUP_COMPLETION} XP</span>
              <span className="rounded-full border border-stone-300 bg-white px-4 py-2">本週全清 bonus：+{XP_WEEKLY_BONUS} XP</span>
              <span className="rounded-full border border-stone-300 bg-white px-4 py-2">連續達標加成：+{XP_STREAK_BONUS} XP</span>
            </div>
          </div>

          <div className="rounded-[26px] border border-stone-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-stone-500">目前等級</p>
                <p className="mt-3 text-3xl font-semibold tracking-[0.05em] text-stone-900">Lv. {level}</p>
                <p className="mt-2 text-sm text-stone-600">{rankTitle}</p>
              </div>
              <div className="rounded-full border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700">
                XP {state.stats.xp}
              </div>
            </div>
            <div className="mt-5">
              <div className="h-3 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-[#8B5E3C] transition-all"
                  style={{ width: formatPercent(levelProgressPercent) }}
                />
              </div>
              <p className="mt-3 text-sm text-stone-600">
                距離下一級還差 {Math.max(0, level * XP_PER_LEVEL - state.stats.xp)} XP
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-[24px] border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">本週所需動作</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{summary.totalRequiredActions}</p>
        </article>
        <article className="rounded-[24px] border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">已完成動作</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">
            {summary.totalRequiredActions - summary.pendingActions}
          </p>
        </article>
        <article className="rounded-[24px] border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">連續達標</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{state.stats.streak}</p>
        </article>
        <article className="rounded-[24px] border border-stone-200 bg-[#f7f1e7] p-5">
          <p className="text-sm text-stone-500">累積通關輪次</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{state.stats.lifetimeRuns}</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-stone-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-[#8B5E3C]" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Weekly Cycle</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[0.05em] text-stone-900">{state.weekly.weekKey}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            這一輪以「每週達標」為單位。進度會保存在這台裝置；新的一週開始時，系統會自動重置本週動作次數，並保留 XP、
            streak 與通關紀錄。
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-[#8B5E3C] transition-all"
              style={{ width: formatPercent(summary.weeklyCompletionRate) }}
            />
          </div>
          <p className="mt-3 text-sm text-stone-600">本週完成率：{formatPercent(summary.weeklyCompletionRate)}</p>
        </article>

        <article className="rounded-[28px] border border-stone-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-[#8B5E3C]" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Reward Status</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[0.05em] text-stone-900">本週獎勵狀態</h3>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-stone-700">
            <p className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              任務結算：{summary.completedGroups}/{summary.totalGroups} 組
            </p>
            <p className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              週โบนัส：{state.weekly.bonusClaimed ? "已發放" : "尚未達成"}
            </p>
            <p className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              streak 加成：{state.weekly.streakBonusClaimed ? "已發放" : "尚未達成"}
            </p>
          </div>
        </article>
      </section>

      <section className="space-y-5">
        {groups.map((group) => {
          const totalTarget = group.items.reduce((sum, item) => sum + item.targetCount, 0);
          const totalProgress = group.items.reduce((sum, item) => sum + item.currentCount, 0);

          return (
            <article key={group.id} className="rounded-[32px] border border-stone-200 bg-stone-50 p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-stone-300 bg-white text-stone-700">
                    {group.completed ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold leading-tight tracking-[0.04em] text-stone-900">
                        {group.title}
                      </h3>
                      <span className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
                        {group.cadenceLabel}
                      </span>
                      <span className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
                        {getGroupStatus(group)}
                      </span>
                      <span className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
                        達標 +{group.rewardXp} XP
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
                      <span>
                        本週動作：{totalProgress}/{totalTarget}
                      </span>
                      <span>
                        子任務：{group.completedItems}/{group.items.length}
                      </span>
                      {group.rewardClaimed ? <span>本輪獎勵已結算，等待下週自動刷新</span> : null}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCollapse(group.id)}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
                >
                  {group.collapsed ? "展開" : "收合"}
                  {group.collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-[#8B5E3C] transition-all"
                  style={{ width: formatPercent(totalTarget === 0 ? 0 : totalProgress / totalTarget) }}
                />
              </div>

              {!group.collapsed ? (
                <div className="mt-6 space-y-4 border-l border-stone-200 pl-6 md:pl-8">
                  {group.items.map((item) => (
                    <article key={item.id} className="rounded-[28px] border border-stone-200 bg-white p-5 md:p-6">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex gap-4">
                          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-stone-300 bg-stone-50 text-stone-700">
                            {item.completed ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                          </div>

                          <div className="flex-1">
                            <p className="text-xl font-semibold leading-10 tracking-[0.03em] text-stone-900">
                              {item.title}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
                              <span>{item.cadenceLabel}</span>
                              <span>{getItemStatus(item.currentCount, item.targetCount)}</span>
                              <span>
                                進度 {item.currentCount}/{item.targetCount}
                              </span>
                            </div>
                            <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200">
                              <div
                                className="h-full rounded-full bg-[#8B5E3C] transition-all"
                                style={{ width: formatPercent(item.currentCount / item.targetCount) }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end lg:self-start">
                          <button
                            type="button"
                            onClick={() => updateCount(group.id, item.id, item.currentCount - 1)}
                            disabled={item.currentCount === 0 || group.rewardClaimed}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="min-w-[72px] text-center text-lg font-semibold tracking-[0.05em] text-stone-900">
                            {item.currentCount}
                          </div>
                          <button
                            type="button"
                            onClick={() => updateCount(group.id, item.id, item.currentCount + 1)}
                            disabled={item.currentCount >= item.targetCount || group.rewardClaimed}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}
