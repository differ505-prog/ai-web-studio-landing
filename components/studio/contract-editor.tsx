"use client";

import { useMemo, useState } from "react";
import { Copy, ExternalLink, LoaderCircle, Sparkles } from "lucide-react";
import { ContractDocument } from "@/components/studio/contract-document";
import { buildContractClauses, buildPaymentStages, paymentPlanPresets } from "@/lib/studio/templates";
import type { ContractDraft } from "@/lib/studio/types";

type ShareState = "idle" | "loading" | "success" | "error";

export function ContractEditor({
  initialDraft,
  isKvEnabled,
}: {
  initialDraft: ContractDraft;
  isKvEnabled: boolean;
}) {
  const [paymentPlan, setPaymentPlan] = useState<keyof typeof paymentPlanPresets>(
    initialDraft.paymentPlanLabel.includes("4-4-2") ? "4-4-2" : "3-4-3",
  );
  const [totalAmount, setTotalAmount] = useState(initialDraft.totalAmount);
  const [revisionRounds, setRevisionRounds] = useState(initialDraft.freeRevisionRounds);
  const [extraRevisionFee, setExtraRevisionFee] = useState(initialDraft.extraRevisionFee);
  const [ghostingDays, setGhostingDays] = useState(initialDraft.ghostingDays);
  const [warrantyDays, setWarrantyDays] = useState(initialDraft.warrantyDays);
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [shareLink, setShareLink] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const draft = useMemo<ContractDraft>(() => {
    const paymentStages = buildPaymentStages(totalAmount, paymentPlanPresets[paymentPlan]);

    return {
      ...initialDraft,
      totalAmount,
      freeRevisionRounds: revisionRounds,
      extraRevisionFee,
      ghostingDays,
      warrantyDays,
      paymentPlanLabel: `${paymentPlan} 分期付款`,
      paymentStages,
      clauses: buildContractClauses({
        projectTitle: initialDraft.projectTitle,
        totalAmount,
        paymentPlanLabel: `${paymentPlan} 分期付款`,
        freeRevisionRounds: revisionRounds,
        extraRevisionFee,
        finalReviewDays: initialDraft.finalReviewDays,
        ghostingDays,
        warrantyDays,
        jurisdiction: initialDraft.jurisdiction,
      }),
    };
  }, [extraRevisionFee, ghostingDays, initialDraft, paymentPlan, revisionRounds, totalAmount, warrantyDays]);

  async function handleShare() {
    setShareState("loading");
    setShareMessage("");

    try {
      const response = await fetch(`/api/contracts/${initialDraft.id}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft }),
      });

      const result = (await response.json()) as { shareUrl?: string; message?: string };

      if (!response.ok || !result.shareUrl) {
        throw new Error(result.message || "簽署連結產生失敗。");
      }

      setShareLink(result.shareUrl);
      setShareMessage("簽署連結已產生，可以直接貼給客戶在手機上簽署。");
      setShareState("success");
    } catch (error) {
      setShareState("error");
      setShareMessage(error instanceof Error ? error.message : "系統忙碌中，請稍後再試。");
    }
  }

  async function copyLink() {
    if (!shareLink) {
      return;
    }

    await navigator.clipboard.writeText(shareLink);
    setShareMessage("簽署連結已複製到剪貼簿。");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="space-y-5 rounded-[28px] border border-stone-200 bg-stone-50 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Contract Controls</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">築時合約工作台</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            保留築時數位的防禦型條款骨架，只微調關鍵變數，讓每份合約都能快速送出。
          </p>
        </div>

        <ControlCard title="總價與付款方式">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-stone-700">專案總價</span>
            <input
              type="number"
              min={1000}
              step={1000}
              value={totalAmount}
              onChange={(event) => setTotalAmount(Number(event.target.value || 0))}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-stone-700">付款方案</span>
            <select
              value={paymentPlan}
              onChange={(event) => setPaymentPlan(event.target.value as keyof typeof paymentPlanPresets)}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
            >
              <option value="3-4-3">3-4-3 分期</option>
              <option value="4-4-2">4-4-2 分期</option>
            </select>
          </label>
        </ControlCard>

        <ControlCard title="防禦條款變數">
          <FieldRow label="免費修改次數">
            <input
              type="number"
              min={1}
              max={5}
              value={revisionRounds}
              onChange={(event) => setRevisionRounds(Number(event.target.value || 1))}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
            />
          </FieldRow>
          <FieldRow label="超次修改費">
            <input
              type="text"
              value={extraRevisionFee}
              onChange={(event) => setExtraRevisionFee(event.target.value)}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
            />
          </FieldRow>
          <FieldRow label="失聯終止天數">
            <input
              type="number"
              min={7}
              value={ghostingDays}
              onChange={(event) => setGhostingDays(Number(event.target.value || 7))}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
            />
          </FieldRow>
          <FieldRow label="保固天數">
            <input
              type="number"
              min={7}
              value={warrantyDays}
              onChange={(event) => setWarrantyDays(Number(event.target.value || 7))}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
            />
          </FieldRow>
        </ControlCard>

        <ControlCard title="簽署分享">
          <p className="rounded-[18px] bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-600">
            {isKvEnabled
              ? "目前已啟用 Vercel KV，產生的是正式短版簽署連結，已簽留存也會持久保存。"
              : "目前尚未啟用 Vercel KV，系統會先退回 inline 簽署連結；功能可用，但網址會較長，建議正式上線前補上 KV。"}
          </p>
          <button
            type="button"
            onClick={handleShare}
            disabled={shareState === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8B5E3C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {shareState === "loading" ? "產生中..." : "產生客戶簽署網址"}
            {shareState === "loading" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </button>

          {shareLink ? (
            <div className="mt-4 rounded-[20px] border border-stone-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Share URL</p>
              <p className="mt-3 break-all text-sm leading-7 text-stone-700">{shareLink}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
                >
                  <Copy className="h-4 w-4" />
                  複製連結
                </button>
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
                >
                  <ExternalLink className="h-4 w-4" />
                  開啟簽署頁
                </a>
              </div>
            </div>
          ) : null}

          {shareMessage ? (
            <p
              className={`mt-4 rounded-[18px] px-4 py-3 text-sm leading-7 ${
                shareState === "error"
                  ? "border border-rose-200 bg-rose-50 text-rose-700"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {shareMessage}
            </p>
          ) : null}
        </ControlCard>
      </aside>

      <ContractDocument draft={draft} />
    </div>
  );
}

function ControlCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] border border-stone-200 bg-white p-4">
      <h4 className="text-sm font-semibold tracking-[0.05em] text-stone-900">{title}</h4>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-4 block first:mt-0">
      <span className="mb-2 block text-sm font-medium text-stone-700">{label}</span>
      {children}
    </label>
  );
}
