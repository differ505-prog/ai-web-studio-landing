"use client";

import { useState } from "react";
import {
  PlusCircle,
  Globe,
  Map,
  MapPin,
} from "lucide-react";
import type { HuntTarget, HuntStatus } from "@/lib/studio/hunt";
import { huntStatusLabels, huntStatusCircles } from "@/lib/studio/hunt";

const cities = [
  "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
  "基隆市", "新竹市", "嘉義市", "新竹縣", "苗栗縣", "彰化縣",
  "南投縣", "雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣",
  "台東縣", "澎湖縣", "金門縣", "連江縣",
];

interface AddTargetFormProps {
  categoryId: string;
  onAdd: () => void;
  onCancel: () => void;
  onCreate: (data: {
    name: string;
    category: HuntTarget["category"];
    source: string;
    sourceUrl: string;
    notes: string;
    city: string;
    existingWebsite: string;
    googleMapsUrl: string;
  }) => void;
}

export function AddTargetForm({ categoryId, onAdd, onCancel, onCreate }: AddTargetFormProps) {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [city, setCity] = useState("");
  const [existingWebsite, setExistingWebsite] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [showMore, setShowMore] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim(),
      category: categoryId as HuntTarget["category"],
      source: source.trim() || "IG",
      sourceUrl: sourceUrl.trim(),
      notes: notes.trim(),
      city: city.trim(),
      existingWebsite: existingWebsite.trim(),
      googleMapsUrl: googleMapsUrl.trim(),
    });

    onAdd();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4"
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
          className="flex items-center gap-2 text-sm text-stone-500 transition hover:text-[#8B5E3C]"
        >
          <PlusCircle className="h-4 w-4" />
          新增更多資訊
        </button>
      ) : (
        <div className="space-y-3 border-t border-stone-100 pt-2">
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
            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="url"
              placeholder="現有網站連結（選填）"
              value={existingWebsite}
              onChange={(e) => setExistingWebsite(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
            />
          </div>
          <div className="relative">
            <Map className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="url"
              placeholder="Google 地圖連結（選填）"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:border-[#8B5E3C] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowMore(false)}
            className="text-xs text-stone-400 transition hover:text-stone-600"
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
