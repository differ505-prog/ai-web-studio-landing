import { NextResponse } from "next/server";
import { getSharedContractPayload, saveSignedContractRecord } from "@/lib/studio/share-store";
import { SignerInfoSchema, createSafeErrorMessage } from "@/lib/validation";
import { getSignRateLimiter, getRateLimitInfo } from "@/lib/rate-limit";

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  if (!token || !/^[a-zA-Z0-9_-]{20,}$/.test(token)) {
    return NextResponse.json(
      { message: "無效的簽署連結格式。" },
      { status: 400 }
    );
  }

  const ip = getClientIp(_request);
  const rateLimiter = getSignRateLimiter();
  const { success, headers: rateLimitHeaders } = await getRateLimitInfo(
    rateLimiter,
    `${ip}:${token}`
  );

  if (!success) {
    return NextResponse.json(
      { message: "請求過於頻繁，請稍後再試。" },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return NextResponse.json(
      { message: "簽署內容不存在或連結已過期。" },
      { status: 404 }
    );
  }

  return NextResponse.json(payload);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  if (!token || !/^[a-zA-Z0-9_-]{20,}$/.test(token)) {
    return NextResponse.json(
      { message: "無效的簽署連結格式。" },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  const rateLimiter = getSignRateLimiter();
  const { success, headers: rateLimitHeaders } = await getRateLimitInfo(
    rateLimiter,
    `${ip}:${token}`
  );

  if (!success) {
    return NextResponse.json(
      { message: "請求過於頻繁，請稍後再試。" },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return NextResponse.json(
      { message: "簽署連結無效或已失效。" },
      { status: 404 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "資料格式錯誤，請重新整理後再試。" },
      { status: 400, headers: rateLimitHeaders }
    );
  }

  const parsed = SignerInfoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: createSafeErrorMessage(parsed.error) },
      { status: 400, headers: rateLimitHeaders }
    );
  }

  try {
    const record = await saveSignedContractRecord(
      token,
      payload,
      parsed.data,
      {
        ip,
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    );

    return NextResponse.json({
      id: record.id,
      message: "簽署已完成，築時數位將以此版本作為正式留存。",
    });
  } catch (error) {
    console.error("Contract signing error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        message: "簽署留存失敗，請稍後再試或聯絡我們。",
      },
      { status: 500 }
    );
  }
}
