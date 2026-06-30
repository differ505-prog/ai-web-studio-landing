"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Square } from "lucide-react";
import type { OpsTaskGroup } from "@/lib/studio/ops";

function statusText(completed: boolean, fallback: string) {
  return completed ? "已完成" : fallback;
}

export function OpsBoard({ initialGroups }: { initialGroups: OpsTaskGroup[] }) {
  const [groups, setGroups] = useState(initialGroups);

  const summary = useMemo(() => {
    const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
    const completedItems = groups.reduce(
      (sum, group) => sum + group.items.filter((item) => item.completed).length,
      0,
    );

    return {
      totalGroups: groups.length,
      totalItems,
      completedItems,
      pendingItems: totalItems - completedItems,
    };
  }, [groups]);

  function toggleGroup(groupId: string) {
    setGroups((current) =>
      current.map((group) => {
        if (group.id !== groupId) return group;

        const nextCompleted = !group.completed;
        return {
          ...group,
          completed: nextCompleted,
          items: group.items.map((item) => ({
            ...item,
            completed: nextCompleted,
          })),
        };
      }),
    );
  }

  function toggleItem(groupId: string, itemId: string) {
    setGroups((current) =>
      current.map((group) => {
        if (group.id !== groupId) return group;

        const items = group.items.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item,
        );
        const completed = items.every((item) => item.completed);

        return {
          ...group,
          completed,
          items,
        };
      }),
    );
  }

  function toggleCollapse(groupId: string) {
    setGroups((current) =>
      current.map((group) =>
        group.id === groupId
          ? {
              ...group,
              collapsed: !group.collapsed,
            }
          : group,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm text-stone-500">任務群組</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{summary.totalGroups}</p>
        </article>
        <article className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm text-stone-500">子任務總數</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{summary.totalItems}</p>
        </article>
        <article className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm text-stone-500">已完成</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{summary.completedItems}</p>
        </article>
        <article className="rounded-[24px] border border-stone-200 bg-[#f4ece0] p-5">
          <p className="text-sm text-stone-500">待推進</p>
          <p className="mt-4 text-3xl font-semibold tracking-[0.05em] text-stone-900">{summary.pendingItems}</p>
        </article>
      </section>

      <section className="space-y-5">
        {groups.map((group) => (
          <article key={group.id} className="rounded-[32px] border border-stone-200 bg-stone-50 p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-stone-300 bg-white text-stone-700 transition hover:border-stone-500"
                  aria-label={group.completed ? "取消完成任務群組" : "完成任務群組"}
                >
                  {group.completed ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[0.04em] text-stone-900">
                      {group.title}
                    </h3>
                    <span className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
                      {group.typeLabel}
                    </span>
                    <span className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
                      {statusText(group.completed, group.statusLabel)}
                    </span>
                  </div>

                  <div className="mt-4 inline-flex rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
                    含 {group.items.length} 項子任務
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleCollapse(group.id)}
                className="inline-flex items-center gap-2 self-start rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
              >
                {group.collapsed ? "展開" : "收合"}
                {group.collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            </div>

            {!group.collapsed ? (
              <div className="mt-6 space-y-4 border-l border-stone-200 pl-6 md:pl-8">
                {group.items.map((item) => (
                  <article key={item.id} className="rounded-[28px] border border-stone-200 bg-white p-5 md:p-6">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => toggleItem(group.id, item.id)}
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-stone-300 bg-stone-50 text-stone-700 transition hover:border-stone-500"
                        aria-label={item.completed ? "取消完成子任務" : "完成子任務"}
                      >
                        {item.completed ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                      </button>

                      <div className="flex-1">
                        <p className="text-xl font-semibold leading-10 tracking-[0.03em] text-stone-900">
                          {item.title}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
                          <span>{item.typeLabel}</span>
                          <span>{statusText(item.completed, item.statusLabel)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  );
}
