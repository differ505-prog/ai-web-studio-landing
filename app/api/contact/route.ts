import { successResponse, rateLimitResponse, validationErrorResponse, errorResponse } from "@/lib/api-response";
import { ContactSchema, createSafeErrorMessage } from "@/lib/validation";
import { getContactRateLimiter, getRateLimitInfo } from "@/lib/rate-limit";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimiter = getContactRateLimiter();
  const { success, headers: rateLimitHeaders } = await getRateLimitInfo(
    rateLimiter,
    ip
  );

  if (!success) {
    return rateLimitResponse("請求過於頻繁，請稍後再試。");
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return validationErrorResponse("提交資料格式錯誤，請重新整理後再試。");
  }

  const parsed = ContactSchema.safeParse(payload);

  if (!parsed.success) {
    return validationErrorResponse(createSafeErrorMessage(parsed.error));
  }

  const { name, email, message, projectType, website } = parsed.data;

  if (website) {
    return successResponse({ received: true }, "已收到表單資料。");
  }

  if (!FORMSPREE_ENDPOINT) {
    return errorResponse(new Error("表單服務尚未完成設定，請直接來信至 hello.arrivestudio@gmail.com。"), 500);
  }

  try {
    const upstreamResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        projectType,
        _subject: "Arrive Studio 官網新詢問",
      }),
    });

    const result =
      (await upstreamResponse.json().catch(() => null)) as
        | { errors?: Array<{ message?: string }> }
        | null;

    if (!upstreamResponse.ok) {
      const upstreamMessage =
        result?.errors?.[0]?.message ||
        "目前無法送出表單，請稍後再試或直接來信聯絡。";

      return errorResponse(new Error(upstreamMessage), 502);
    }

    return successResponse({ submitted: true }, "已成功收到需求，我們會盡快回覆你。");
  } catch {
    return errorResponse(new Error("表單服務暫時無法連線，請稍後再試或直接來信聯絡。"), 502);
  }
}
