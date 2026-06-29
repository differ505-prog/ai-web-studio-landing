"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";
import { ContractDocument } from "@/components/studio/contract-document";
import { SignaturePad } from "@/components/studio/signature-pad";
import type { SharedContractPayload } from "@/lib/studio/types";

type SubmitState = "idle" | "loading" | "success" | "error";

export function SigningFlow({
  token,
  payload,
}: {
  token: string;
  payload: SharedContractPayload;
}) {
  const [signerName, setSignerName] = useState(payload.draft.client.contactPerson || payload.draft.client.name);
  const [signerEmail, setSignerEmail] = useState(payload.draft.client.email);
  const [signerPhone, setSignerPhone] = useState(payload.draft.client.phone);
  const [signerRole, setSignerRole] = useState("專案窗口");
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(
    () => Boolean(signerName && signerEmail && signerPhone && signatureDataUrl && agreed),
    [agreed, signatureDataUrl, signerEmail, signerName, signerPhone],
  );

  async function handleSubmit() {
    if (!canSubmit) {
      setSubmitState("error");
      setMessage("請完整填寫資料、勾選同意並完成簽名。");
      return;
    }

    setSubmitState("loading");
    setMessage("");

    try {
      const response = await fetch(`/api/sign/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signerName,
          signerEmail,
          signerPhone,
          signerRole,
          signatureDataUrl,
          agreedToTerms: agreed,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "簽署送出失敗。");
      }

      setSubmitState("success");
      setMessage(result.message || "已完成簽署，築時數位將以此版本作為正式留存。");
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "系統忙碌中，請稍後再試。");
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ef_0%,#efe7db_100%)] px-4 py-6 text-stone-800 sm:px-6">
      <div className="mx-auto max-w-[1100px] space-y-6">
        <header className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(44,42,41,0.08)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Arrive Studio E-Sign</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[0.06em] text-stone-900">築時數位線上簽署合約</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            你正在簽署「{payload.draft.projectTitle}」的正式合約。請先完整閱讀內容，再於下方填寫資料與簽名。
          </p>
        </header>

        <ContractDocument draft={payload.draft} />

        <section className="rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(44,42,41,0.08)] backdrop-blur sm:p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#8B5E3C]" />
            <p className="text-sm font-semibold tracking-[0.05em] text-stone-900">簽署確認</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="簽署人姓名">
              <input
                value={signerName}
                onChange={(event) => setSignerName(event.target.value)}
                className="w-full rounded-[18px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </Field>
            <Field label="聯絡 Email">
              <input
                type="email"
                value={signerEmail}
                onChange={(event) => setSignerEmail(event.target.value)}
                className="w-full rounded-[18px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </Field>
            <Field label="聯絡電話">
              <input
                value={signerPhone}
                onChange={(event) => setSignerPhone(event.target.value)}
                className="w-full rounded-[18px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </Field>
            <Field label="角色">
              <input
                value={signerRole}
                onChange={(event) => setSignerRole(event.target.value)}
                className="w-full rounded-[18px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </Field>
          </div>

          <div className="mt-5">
            <SignaturePad onChange={setSignatureDataUrl} />
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-[22px] border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300"
            />
            我已完整閱讀合約內容，確認資料無誤，並同意以電子方式完成本次簽署。
          </label>

          {message ? (
            <p
              className={`mt-5 rounded-[20px] px-4 py-3 text-sm leading-7 ${
                submitState === "success"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-rose-200 bg-rose-50 text-rose-700"
              }`}
            >
              {message}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitState === "loading"}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8B5E3C] px-5 py-4 text-sm font-semibold text-white transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {submitState === "loading" ? "送出簽署中..." : submitState === "success" ? "已完成簽署" : "確認送出簽署"}
            {submitState === "loading" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : submitState === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : null}
          </button>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-stone-700">{label}</span>
      {children}
    </label>
  );
}
