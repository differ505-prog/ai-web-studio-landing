"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
  Target,
  MapPin,
  Globe,
  Map,
  PlusCircle,
} from "lucide-react";
import {
  type HuntState,
  type HuntTarget,
  type HuntStatus,
  huntCategories,
  huntStatusLabels,
  huntStatusCircles,
  readHuntState,
  saveHuntState,
  createTarget,
  updateTargetStatus,
  deleteTarget,
  getHuntSummary,
} from "@/lib/studio/hunt";

function AddTargetForm({
  categoryId,
  onAdd,
  onCancel,
}: {
  categoryId: string;
  onAdd: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [city, setCity] = useState("");
  const [existingWebsite, setExistingWebsite] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [showMore, setShowMore] = useState(false);

  const cities = [
    "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
    "基隆市", "新竹市", "嘉義市", "新竹縣", "苗栗縣", "彰化縣",
    "南投縣", "雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣",
    "台東縣", "澎湖縣", "金門縣", "連江縣",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const state = readHuntState();
    const newTarget = createTarget({
      name: name.trim(),
      category: categoryId as HuntTarget["category"],
      source: source.trim() || "IG",
      sourceUrl: sourceUrl.trim(),
      notes: notes.trim(),
      city: city.trim(),
      existingWebsite: existingWebsite.trim(),
      googleMapsUrl: googleMapsUrl.trim(),
    });

    saveHuntState({ targets: [...state.targets, newTarget] });
    onAdd();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3"
    >
      <input
        type="text"
        placeholder="店家名稱"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
        required
      />
      <input
        type="text"
        placeholder="來源平台（IG / FB / 其他）"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <input
        type="url"
        placeholder="連結（可空白）"
        value={sourceUrl}
        onChange={(e) => setSourceUrl(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <textarea
        placeholder="備註（一句話觀察）"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />

      {!showMore ? (
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-[#8B5E3C] transition"
        >
          <PlusCircle className="h-4 w-4" />
          新增更多資訊
        </button>
      ) : (
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
          >
            <option value="">選擇縣市（選填）</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="url"
              placeholder="現有網站連結（選填）"
              value={existingWebsite}
              onChange={(e) => setExistingWebsite(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
            />
          </div>
          <div className="relative">
            <Map className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="url"
              placeholder="Google 地圖連結（選填）"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowMore(false)}
            className="text-xs text-stone-400 hover:text-stone-600 transition"
          >
            收合
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7a5230]"
        >
          儲存
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
        >
          取消
        </button>
      </div>
    </form>
  );
}

function TargetCard({
  target,
  onStatusChange,
  onDelete,
}: {
  target: HuntTarget;
  onStatusChange: (status: HuntStatus) => void;
  onDelete: () => void;
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-stone-900 truncate">{target.name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5">
              {target.source}
            </span>
            {target.city && (
              <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5">
                <MapPin className="h-3 w-3" />
                {target.city}
              </span>
            )}
            {target.sourceUrl && (
              <a
                href={target.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#8B5E3C] hover:underline"
              >
                連結 <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {(target.existingWebsite || target.googleMapsUrl) && (
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {target.existingWebsite && (
                <a
                  href={target.existingWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-[#8B5E3C] transition"
                >
                  <Globe className="h-3 w-3" />
                  現有網站
                </a>
              )}
              {target.googleMapsUrl && (
                <a
                  href={target.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-[#8B5E3C] transition"
                >
                  <Map className="h-3 w-3" />
                  地圖
                </a>
              )}
            </div>
          )}

          {target.notes && (
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">{target.notes}</p>
          )}
        </div>
        <button
          onClick={onDelete}
          className="shrink-0 rounded-xl p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-500"
          title="刪除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-stone-400"
          >
            <span>{huntStatusCircles[target.status]}</span>
            <span>{huntStatusLabels[target.status]}</span>
            {showStatusMenu ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {showStatusMenu && (
            <div className="absolute left-0 top-full mt-1 z-10 rounded-xl border border-stone-200 bg-white py-1 shadow-lg min-w-[120px]">
              {(Object.keys(huntStatusLabels) as HuntStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onStatusChange(status);
                    setShowStatusMenu(false);
                  }}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm text-left transition hover:bg-stone-50 ${
                    target.status === status ? "font-semibold text-[#8B5E3C]" : "text-stone-700"
                  }`}
                >
                  <span>{huntStatusCircles[status]}</span>
                  {huntStatusLabels[status]}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-xs text-stone-400">
          {new Date(target.createdAt).toLocaleDateString("zh-TW")}
        </span>
      </div>
    </div>
  );
}

export function HuntBoard() {
  const [state, setState] = useState<HuntState>({ targets: [] });
  const [isHydrated, setIsHydrated] = useState(false);
  const [addingCategory, setAddingCategory] = useState<string | null>(null);

  useEffect(() => {
    setState(readHuntState());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    saveHuntState(state);
  }, [isHydrated, state]);

  function handleStatusChange(targetId: string, status: HuntStatus) {
    setState((current) => updateTargetStatus(current, targetId, status));
  }

  function handleDelete(targetId: string) {
    setState((current) => deleteTarget(current, targetId));
  }

  function handleAddComplete() {
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
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-stone-500">{cat.description}</p>
                  <span className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-stone-600 ml-3">
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
                  />
                ))}

                {isAdding ? (
                  <AddTargetForm
                    categoryId={cat.id}
                    onAdd={handleAddComplete}
                    onCancel={() => setAddingCategory(null)}
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
