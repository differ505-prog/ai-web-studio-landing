import type { Metadata } from "next";
import Link from "next/link";
import { SigningFlow } from "@/components/studio/signing-flow";
import { getSharedContractPayload } from "@/lib/studio/share-store";

export const metadata: Metadata = {
  title: "築時數位線上簽署",
  description: "築時數位提供的專屬合約簽署頁，供客戶於手機或桌機完成電子簽署。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = await getSharedContractPayload(token);

  if (!payload) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
        <div className="max-w-lg rounded-[28px] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(44,42,41,0.08)]">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Link Unavailable</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[0.06em] text-stone-900">此簽署連結目前不可使用</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            可能是簽署連結已失效、尚未建立，或部署環境尚未配置持久化儲存。請聯繫築時數位重新取得簽署網址。
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
          >
            回到首頁
          </Link>
        </div>
      </div>
    );
  }

  return <SigningFlow token={token} payload={payload} />;
}
