import { auth } from "@/auth";
import { headers } from "next/headers";
import { findContractDraft } from "@/lib/studio/mock-data";
import { createShareToken } from "@/lib/studio/share-store";
import { successResponse, errorResponse, ApiError } from "@/lib/api-response";
import type { ContractDraft, SharedContractPayload } from "@/lib/studio/types";

export async function POST(
  request: Request,
  context: { params: Promise<{ contractId: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new ApiError({
      code: "UNAUTHORIZED",
      message: "請先登入築時數位工作面板。",
      status: 401,
    });
  }

  const { contractId } = await context.params;
  const body = (await request.json().catch(() => null)) as { draft?: ContractDraft } | null;
  const fallbackDraft = findContractDraft(contractId);

  if (!fallbackDraft && !body?.draft) {
    throw new ApiError({
      code: "NOT_FOUND",
      message: "找不到指定合約。",
      status: 404,
    });
  }

  const draft = body?.draft ?? fallbackDraft;

  if (!draft) {
    throw new ApiError({
      code: "NOT_FOUND",
      message: "找不到可分享的合約內容。",
      status: 404,
    });
  }

  const payload: SharedContractPayload = {
    source: "arrive-studio-workbench",
    draft,
    sharedAt: new Date().toISOString(),
  };

  try {
    const shareResult = await createShareToken(payload);
    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
    const protocol = requestHeaders.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
    const origin = host ? `${protocol}://${host}` : new URL(request.url).origin;

    return successResponse({
      token: shareResult.token,
      shareUrl: `${origin}/sign/${shareResult.token}`,
      storageMode: shareResult.storageMode,
    }, shareResult.message);
  } catch (error) {
    return errorResponse(error, 500);
  }
}
