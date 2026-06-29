import { NextResponse } from "next/server";
import { getSharedContractPayload, saveSignedContractRecord } from "@/lib/studio/share-store";
import type { SignatureSubmission } from "@/lib/studio/types";

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return NextResponse.json({ message: "簽署內容不存在。" }, { status: 404 });
  }

  return NextResponse.json(payload);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return NextResponse.json({ message: "簽署連結無效或已失效。" }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as SignatureSubmission | null;

  if (
    !body?.signerName ||
    !body.signerEmail ||
    !body.signerPhone ||
    !body.signerRole ||
    !body.signatureDataUrl ||
    !body.agreedToTerms
  ) {
    return NextResponse.json({ message: "請完整填寫簽署資訊並勾選同意。" }, { status: 400 });
  }

  try {
    const record = await saveSignedContractRecord(
      token,
      payload,
      body,
      {
        ip: getClientIp(request),
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    );

    return NextResponse.json({
      id: record.id,
      message: "簽署已完成，築時數位將以此版本作為正式留存。",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "簽署留存失敗。",
      },
      { status: 500 },
    );
  }
}
