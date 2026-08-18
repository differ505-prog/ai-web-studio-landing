import { successResponse, rateLimitResponse, validationErrorResponse, errorResponse, notFoundResponse, ApiError } from "@/lib/api-response";
import { getSharedContractPayload, saveSignedContractRecord } from "@/lib/studio/share-store";
import { SignerInfoSchema, createSafeErrorMessage } from "@/lib/validation";
import { getSignRateLimiter, getRateLimitInfo } from "@/lib/rate-limit";

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
}

function isValidToken(token: string): boolean {
  return /^[a-zA-Z0-9_-]{20,}$/.test(token);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  if (!isValidToken(token)) {
    throw new ApiError({
      code: "BAD_REQUEST",
      message: "無效的簽署連結格式。",
      status: 400,
    });
  }

  const ip = getClientIp(request);
  const rateLimiter = getSignRateLimiter();
  const { success } = await getRateLimitInfo(rateLimiter, `${ip}:${token}`);

  if (!success) {
    return rateLimitResponse("請求過於頻繁，請稍後再試。");
  }

  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return notFoundResponse("簽署內容不存在或連結已過期。");
  }

  return successResponse(payload);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  if (!isValidToken(token)) {
    throw new ApiError({
      code: "BAD_REQUEST",
      message: "無效的簽署連結格式。",
      status: 400,
    });
  }

  const ip = getClientIp(request);
  const rateLimiter = getSignRateLimiter();
  const { success } = await getRateLimitInfo(rateLimiter, `${ip}:${token}`);

  if (!success) {
    return rateLimitResponse("請求過於頻繁，請稍後再試。");
  }

  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return notFoundResponse("簽署連結無效或已失效。");
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return validationErrorResponse("資料格式錯誤，請重新整理後再試。");
  }

  const parsed = SignerInfoSchema.safeParse(body);

  if (!parsed.success) {
    return validationErrorResponse(createSafeErrorMessage(parsed.error));
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

    return successResponse({ id: record.id }, "簽署已完成，築時數位將以此版本作為正式留存。");
  } catch (error) {
    console.error("Contract signing error:", error instanceof Error ? error.message : "Unknown error");
    return errorResponse(error, 500);
  }
}
