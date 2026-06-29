import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { findContractDraft } from "@/lib/studio/mock-data";
import { createShareToken } from "@/lib/studio/share-store";
import type { ContractDraft, SharedContractPayload } from "@/lib/studio/types";

export async function POST(
  request: Request,
  context: { params: Promise<{ contractId: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "請先登入築時數位工作面板。" }, { status: 401 });
  }

  const { contractId } = await context.params;
  const fallbackDraft = findContractDraft(contractId);

  if (!fallbackDraft) {
    return NextResponse.json({ message: "找不到指定合約。" }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as { draft?: ContractDraft } | null;
  const draft = body?.draft ?? fallbackDraft;

  const payload: SharedContractPayload = {
    source: "arrive-studio-workbench",
    draft,
    sharedAt: new Date().toISOString(),
  };

  try {
    const token = await createShareToken(payload);
    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
    const protocol = requestHeaders.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
    const origin = host ? `${protocol}://${host}` : new URL(request.url).origin;

    return NextResponse.json({
      token,
      shareUrl: `${origin}/sign/${token}`,
      message: "簽署連結已建立。",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "簽署連結建立失敗。",
      },
      { status: 500 },
    );
  }
}
