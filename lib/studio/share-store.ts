import { createHash, randomUUID } from "node:crypto";
import { sampleSignedRecords } from "@/lib/studio/mock-data";
import type {
  SharedContractPayload,
  SignatureSubmission,
  SignedContractRecord,
} from "@/lib/studio/types";

const CONTRACT_LINK_PREFIX = "arrive_contract_link:";
const SIGNED_CONTRACT_PREFIX = "arrive_signed_contract:";
const SIGNED_CONTRACT_INDEX_KEY = "arrive_signed_contract_index";
const INLINE_PREFIX = "inline_";
const CONTRACT_LINK_TTL_SECONDS = 60 * 60 * 24 * 30;
const MEMORY_SHARED = new Map<string, SharedContractPayload>();
const MEMORY_SIGNED = new Map<string, SignedContractRecord>(
  sampleSignedRecords.map((record) => [record.id, record]),
);

function getEnvValue(name: string) {
  return process.env[name] ?? "";
}

function getKvConfig() {
  return {
    url: getEnvValue("KV_REST_API_URL"),
    token: getEnvValue("KV_REST_API_TOKEN"),
  };
}

export function isContractLinkStorageConfigured() {
  const { url, token } = getKvConfig();
  return Boolean(url && token);
}

function createToken() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function buildStorageKey(token: string) {
  return `${CONTRACT_LINK_PREFIX}${token}`;
}

function buildSignedRecordStorageKey(recordId: string) {
  return `${SIGNED_CONTRACT_PREFIX}${recordId}`;
}

async function runKvCommand(command: Array<string | number>) {
  const { url, token } = getKvConfig();

  if (!url || !token) {
    throw new Error("KV storage is not configured.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { result: unknown };
  return data.result;
}

function encodeInlinePayload(payload: SharedContractPayload) {
  return `${INLINE_PREFIX}${Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")}`;
}

function decodeInlinePayload(token: string) {
  if (!token.startsWith(INLINE_PREFIX)) {
    return null;
  }

  try {
    const raw = token.slice(INLINE_PREFIX.length);
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as SharedContractPayload;
  } catch {
    return null;
  }
}

export async function saveSharedContractPayload(payload: SharedContractPayload) {
  if (!isContractLinkStorageConfigured()) {
    return encodeInlinePayload(payload);
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const token = createToken();
    const setResult = await runKvCommand([
      "SET",
      buildStorageKey(token),
      JSON.stringify(payload),
      "EX",
      CONTRACT_LINK_TTL_SECONDS,
      "NX",
    ]);

    if (setResult === "OK") {
      return token;
    }
  }

  throw new Error("無法配置唯一簽署 token。");
}

export async function getSharedContractPayload(token: string) {
  const inlinePayload = decodeInlinePayload(token);
  if (inlinePayload) {
    return inlinePayload;
  }

  if (!isContractLinkStorageConfigured()) {
    return MEMORY_SHARED.get(token) ?? null;
  }

  const raw = await runKvCommand(["GET", buildStorageKey(token)]);
  if (!raw) {
    return null;
  }

  return JSON.parse(String(raw)) as SharedContractPayload;
}

export async function saveSharedContractPayloadFallback(payload: SharedContractPayload) {
  return encodeInlinePayload(payload);
}

export async function createShareToken(payload: SharedContractPayload) {
  if (isContractLinkStorageConfigured()) {
    return saveSharedContractPayload(payload);
  }

  return saveSharedContractPayloadFallback(payload);
}

export async function saveSignedContractRecord(
  token: string,
  payload: SharedContractPayload,
  submission: SignatureSubmission,
  requestMeta: { ip: string; userAgent: string },
) {
  const signedAt = new Date().toISOString();
  const recordId = createToken();
  const record: SignedContractRecord = {
    id: recordId,
    contractId: payload.draft.id,
    sourceToken: token,
    projectTitle: payload.draft.projectTitle,
    contractTitle: payload.draft.title,
    clientName: payload.draft.client.companyName || payload.draft.client.name,
    signerName: submission.signerName,
    signerEmail: submission.signerEmail,
    signerPhone: submission.signerPhone,
    signerRole: submission.signerRole,
    signatureDataUrl: submission.signatureDataUrl,
    signedAt,
    ip: requestMeta.ip,
    userAgent: requestMeta.userAgent,
    documentHash: createHash("sha256").update(JSON.stringify(payload)).digest("hex"),
    payload,
  };

  if (!isContractLinkStorageConfigured()) {
    MEMORY_SIGNED.set(recordId, record);
    return record;
  }

  const saveResult = await runKvCommand([
    "SET",
    buildSignedRecordStorageKey(recordId),
    JSON.stringify(record),
  ]);

  if (saveResult !== "OK") {
    throw new Error("已簽紀錄儲存失敗。");
  }

  await runKvCommand(["LPUSH", SIGNED_CONTRACT_INDEX_KEY, recordId]);
  return record;
}

export async function listSignedContractRecords(limit = 50) {
  if (!isContractLinkStorageConfigured()) {
    return Array.from(MEMORY_SIGNED.values())
      .sort((a, b) => b.signedAt.localeCompare(a.signedAt))
      .slice(0, limit);
  }

  const ids = await runKvCommand(["LRANGE", SIGNED_CONTRACT_INDEX_KEY, 0, Math.max(0, limit - 1)]);
  if (!Array.isArray(ids)) {
    return [];
  }

  const records = await Promise.all(
    ids.map(async (recordId) => {
      const raw = await runKvCommand(["GET", buildSignedRecordStorageKey(String(recordId))]);
      if (!raw) {
        return null;
      }

      return JSON.parse(String(raw)) as SignedContractRecord;
    }),
  );

  return records.filter(Boolean) as SignedContractRecord[];
}

export async function getSignedContractRecord(recordId: string) {
  if (!isContractLinkStorageConfigured()) {
    return MEMORY_SIGNED.get(recordId) ?? null;
  }

  const raw = await runKvCommand(["GET", buildSignedRecordStorageKey(recordId)]);
  if (!raw) {
    return null;
  }

  return JSON.parse(String(raw)) as SignedContractRecord;
}
