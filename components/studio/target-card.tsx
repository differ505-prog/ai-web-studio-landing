"use client";

import { useState } from "react";
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Map,
  MapPin,
  Pencil,
} from "lucide-react";
import type { HuntTarget, HuntStatus } from "@/lib/studio/hunt";
import { huntStatusLabels, huntStatusCircles } from "@/lib/studio/hunt";

const cities = [
  "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
  "基隆市", "新竹市", "嘉義市", "新竹縣", "苗栗縣", "彰化縣",
  "南投縣", "雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣",
  "台東縣", "澎湖縣", "金門縣", "連江縣",
];

interface TargetCardProps {
  target: HuntTarget;
  onStatusChange: (status: HuntStatus) => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Omit<HuntTarget, "id" | "createdAt" | "updatedAt">>) => void;
}

export function TargetCard({ target, onStatusChange, onDelete, onUpdate }: TargetCardProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: target.name,
    source: target.source,
    sourceUrl: target.sourceUrl,
    notes: target.notes,
    city: target.city,
    existingWebsite: target.existingWebsite,
    googleMapsUrl: target.googleMapsUrl,
  });

  function handleSave() {
    onUpdate({
      name: form.name.trim() || target.name,
      source: form.source.trim() || "IG",
      sourceUrl: form.sourceUrl.trim(),
      notes: form.notes.trim(),
      city: form.city.trim(),
      existingWebsite: form.existingWebsite.trim(),
      googleMapsUrl: form.googleMapsUrl.trim(),
    });
    setEditing(false);
  }

  function handleCancel() {
    setForm({
      name: target.name,
      source: target.source,
      sourceUrl: target.sourceUrl,
      notes: target.notes,
      city: target.city,
      existingWebsite: target.existingWebsite,
      googleMapsUrl: target.googleMapsUrl,
    });
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-base font-semibold text-stone-900">{target.name}</p>
              <button
                onClick={() => setEditing(true)}
                className="shrink-0 rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
                title="編輯"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
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
                    className="inline-flex items-center gap-1 text-xs text-stone-600 transition hover:text-[#8B5E3C]"
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
                    className="inline-flex items-center gap-1 text-xs text-stone-600 transition hover:text-[#8B5E3C]"
                  >
                    <Map className="h-3 w-3" />
                    地圖
                  </a>
                )}
              </div>
            )}

            {target.notes && (
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{target.notes}</p>
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
              <div className="absolute left-0 top-full z-10 mt-1 min-w-[120px] rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
                {(Object.keys(huntStatusLabels) as HuntStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      onStatusChange(status);
                      setShowStatusMenu(false);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition hover:bg-stone-50 ${
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

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSave(); }}
      className="space-y-3 rounded-2xl border-2 border-[#8B5E3C] bg-white p-4"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-[#8B5E3C]">
        <Pencil className="h-4 w-4" />
        編輯中
      </div>

      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="店家名稱"
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <input
        type="text"
        value={form.source}
        onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
        placeholder="來源平台（IG / FB / 其他）"
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <input
        type="url"
        value={form.sourceUrl}
        onChange={(e) => setForm((f) => ({ ...f, sourceUrl: e.target.value }))}
        placeholder="連結（可空白）"
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <textarea
        value={form.notes}
        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        placeholder="備註"
        rows={2}
        className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <select
        value={form.city}
        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      >
        <option value="">選擇縣市（選填）</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="url"
        value={form.existingWebsite}
        onChange={(e) => setForm((f) => ({ ...f, existingWebsite: e.target.value }))}
        placeholder="現有網站連結（選填）"
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />
      <input
        type="url"
        value={form.googleMapsUrl}
        onChange={(e) => setForm((f) => ({ ...f, googleMapsUrl: e.target.value }))}
        placeholder="Google 地圖連結（選填）"
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
      />

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-[#8B5E3C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7a5230]"
        >
          儲存
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
        >
          取消
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
