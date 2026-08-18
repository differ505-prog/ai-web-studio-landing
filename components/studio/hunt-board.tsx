"use client";

import { useEffect, useState } from "react";
import { Plus, Target } from "lucide-react";
import {
  type HuntState,
  type HuntTarget,
  type HuntStatus,
  huntCategories,
  readHuntState,
  saveHuntState,
  createTarget,
  updateTargetStatus,
  deleteTarget,
  getHuntSummary,
  updateTarget,
} from "@/lib/studio/hunt";
import { TargetCard } from "./target-card";
import { AddTargetForm } from "./add-target-form";

export function HuntBoard() {
  const [state, setState] = useState<HuntState>({ targets: [] });
  const [isHydrated, setIsHydrated] = useState(false);
  const [addingCategory, setAddingCategory] = useState<string | null>(null);

  useEffect(() => {
    // Required for SSR hydration pattern with localStorage
    const initialState = readHuntState();
    setState(initialState);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    saveHuntState(state);
  }, [state, isHydrated]);

  function handleStatusChange(targetId: string, status: HuntStatus) {
    setState((current) => updateTargetStatus(current, targetId, status));
  }

  function handleUpdate(targetId: string, updates: Partial<Omit<HuntTarget, "id" | "createdAt" | "updatedAt">>) {
    setState((current) => updateTarget(current, targetId, updates));
  }

  function handleDelete(targetId: string) {
    setState((current) => deleteTarget(current, targetId));
  }

  function handleAdd(data: Parameters<typeof createTarget>[0]) {
    const state = readHuntState();
    const newTarget = createTarget(data);
    saveHuntState({ targets: [...state.targets, newTarget] });
    setAddingCategory(null);
    setState(readHuntState());
  }

  const summary = getHuntSummary(state);

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-stone-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {summary.totals.map((cat) => {
          const isComplete = cat.found >= cat.targetCount;
          return (
            <article
              key={cat.id}
              className={`rounded-[24px] border p-5 ${
                isComplete
                  ? "border-[#8B5E3C] bg-[#f4ece0]"
                  : "border-stone-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Target
                  className={`h-4 w-4 ${isComplete ? "text-[#8B5E3C]" : "text-stone-400"}`}
                />
                <p className="text-sm text-stone-500">{cat.label}</p>
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-[0.05em] text-stone-900">
                {cat.found}/{cat.targetCount}
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-[#8B5E3C] transition-all"
                  style={{
                    width: `${Math.min(100, (cat.found / cat.targetCount) * 100)}%`,
                  }}
                />
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {huntCategories.map((cat) => {
          const targets = state.targets.filter((t) => t.category === cat.id);
          const isAdding = addingCategory === cat.id;

          return (
            <div key={cat.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <span>{cat.badge}</span>
                <h3 className="text-lg font-semibold text-stone-900">{cat.label}</h3>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-stone-500">{cat.description}</p>
                <span className="ml-3 shrink-0 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-stone-600">
                  {targets.length}/{cat.targetCount}
                </span>
              </div>

              <div className="space-y-3">
                {targets.map((target) => (
                  <TargetCard
                    key={target.id}
                    target={target}
                    onStatusChange={(status) => handleStatusChange(target.id, status)}
                    onDelete={() => handleDelete(target.id)}
                    onUpdate={(updates) => handleUpdate(target.id, updates)}
                  />
                ))}

                {isAdding ? (
                  <AddTargetForm
                    categoryId={cat.id}
                    onAdd={() => setAddingCategory(null)}
                    onCancel={() => setAddingCategory(null)}
                    onCreate={handleAdd}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingCategory(cat.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 py-4 text-sm font-medium text-stone-500 transition hover:border-[#8B5E3C] hover:text-[#8B5E3C]"
                  >
                    <Plus className="h-4 w-4" />
                    新增一間
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
