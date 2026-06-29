import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { auth, signIn } from "@/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.email) {
    redirect("/studio");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7f3ed_0%,#f0e7db_100%)] px-4">
      <div className="max-w-lg rounded-[32px] border border-white/70 bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(44,42,41,0.08)] backdrop-blur">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#efe6d9] text-[#8B5E3C]">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.28em] text-stone-500">Studio Access</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[0.06em] text-stone-900">築時數位內部登入入口</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          請使用已列入築時數位白名單的 Google 帳號登入。登入後才能進入 `/studio` 操作案件、合約與簽署留存。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/studio" });
            }}
          >
            <button
              type="submit"
              className="inline-flex rounded-full bg-[#8B5E3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
            >
              使用 Google 登入
            </button>
          </form>
          <Link
            href="/"
            className="inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
          >
            回到官網
          </Link>
        </div>
      </div>
    </div>
  );
}
