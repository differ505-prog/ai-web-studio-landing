import { Redis } from "@upstash/redis";
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

let redisClient: Redis | null | undefined;

export function isContractLinkStorageConfigured() {
  const { url, token } = getKvConfig();
  return Boolean(url && token);
}

function getKvClient() {
  if (redisClient !== undefined) {
    return redisClient;
  }

  const { url, token } = getKvConfig();
  redisClient = url && token ? new Redis({ url, token }) : null;
  return redisClient;
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
  const redis = getKvClient();
  if (!redis) {
    return encodeInlinePayload(payload);
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const token = createToken();
    const setResult = await redis.set(buildStorageKey(token), payload, {
      ex: CONTRACT_LINK_TTL_SECONDS,
      nx: true,
    });

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

  const redis = getKvClient();
  if (!redis) {
    return MEMORY_SHARED.get(token) ?? null;
  }

  try {
    const raw = await redis.get<SharedContractPayload>(buildStorageKey(token));
    if (!raw) {
      return null;
    }

    return raw;
  } catch {
    return MEMORY_SHARED.get(token) ?? null;
  }
}

export async function saveSharedContractPayloadFallback(payload: SharedContractPayload) {
  return encodeInlinePayload(payload);
}

export type ShareTokenResult = {
  token: string;
  storageMode: "kv" | "inline";
  message: string;
};

export async function createShareToken(payload: SharedContractPayload) {
  if (isContractLinkStorageConfigured()) {
    try {
      const token = await saveSharedContractPayload(payload);
      return {
        token,
        storageMode: "kv" as const,
        message: "簽署連結已建立，已使用短版 token 儲存。",
      };
    } catch (error) {
      // Gracefully degrade to an inline token so contract sharing still works
      // even if KV credentials exist but the upstream store is unavailable.
      return {
        token: await saveSharedContractPayloadFallback(payload),
        storageMode: "inline" as const,
        message:
          error instanceof Error
            ? `KV 目前無法使用，已自動改用較長的備援連結。原因：${error.message}`
            : "KV 目前無法使用，已自動改用較長的備援連結。",
      };
    }
  }

  return {
    token: await saveSharedContractPayloadFallback(payload),
    storageMode: "inline" as const,
    message: "目前尚未偵測到 KV 設定，已改用較長的備援連結。",
  };
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

  const redis = getKvClient();
  if (!redis) {
    MEMORY_SIGNED.set(recordId, record);
    return record;
  }

  try {
    const saveResult = await redis.set(buildSignedRecordStorageKey(recordId), record);

    if (saveResult !== "OK") {
      throw new Error("已簽紀錄儲存失敗。");
    }

    await redis.lpush(SIGNED_CONTRACT_INDEX_KEY, recordId);
    return record;
  } catch {
    MEMORY_SIGNED.set(recordId, record);
    return record;
  }
}

export async function listSignedContractRecords(limit = 50) {
  const redis = getKvClient();
  if (!redis) {
    return Array.from(MEMORY_SIGNED.values())
      .sort((a, b) => b.signedAt.localeCompare(a.signedAt))
      .slice(0, limit);
  }

  try {
    const ids = await redis.lrange<string[]>(SIGNED_CONTRACT_INDEX_KEY, 0, Math.max(0, limit - 1));
    if (!Array.isArray(ids)) {
      return [];
    }

    const records = await Promise.all(
      ids.map(async (recordId) => {
        const raw = await redis.get<SignedContractRecord>(buildSignedRecordStorageKey(String(recordId)));
        if (!raw) {
          return null;
        }

        return raw;
      }),
    );

    return records.filter(Boolean) as SignedContractRecord[];
  } catch {
    return Array.from(MEMORY_SIGNED.values())
      .sort((a, b) => b.signedAt.localeCompare(a.signedAt))
      .slice(0, limit);
  }
}

export async function getSignedContractRecord(recordId: string) {
  const redis = getKvClient();
  if (!redis) {
    return MEMORY_SIGNED.get(recordId) ?? null;
  }

  try {
    const raw = await redis.get<SignedContractRecord>(buildSignedRecordStorageKey(recordId));
    if (!raw) {
      return null;
    }

    return raw;
  } catch {
    return MEMORY_SIGNED.get(recordId) ?? null;
  }
}
