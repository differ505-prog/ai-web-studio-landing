import { auth, signOut } from "@/auth";
import Link from "next/link";
import {
  CheckSquare,
  Compass,
  FileBadge2,
  FilePenLine,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  ScrollText,
} from "lucide-react";

const navItems = [
  { href: "/studio", label: "總覽", icon: LayoutDashboard },
  { href: "/studio/blueprint", label: "藍圖", icon: Compass },
  { href: "/studio/ops", label: "作戰台", icon: CheckSquare },
  { href: "/studio/projects", label: "案件", icon: FolderKanban },
  { href: "/studio/contracts", label: "合約", icon: FilePenLine },
  { href: "/studio/records", label: "留存", icon: ScrollText },
  { href: "/studio/templates", label: "模板", icon: FileBadge2 },
];

export async function StudioShell({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3ed_0%,#f2ece3_100%)] text-stone-800">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 md:px-6 lg:px-8">
        <aside className="hidden w-[280px] shrink-0 rounded-[30px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(44,42,41,0.08)] backdrop-blur md:flex md:flex-col">
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Arrive Studio</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[0.06em] text-stone-900">築時數位工作面板</h1>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              私有營運後台，專門處理案件、合約、簽署與留存。
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-[20px] border border-transparent px-4 py-3 text-sm font-medium text-stone-600 transition hover:border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4">
            <div className="rounded-[24px] border border-stone-200 bg-[#efe6d9] p-5">
              <p className="text-sm font-semibold text-stone-900">目前建議模式</p>
              <p className="mt-2 text-sm leading-7 text-stone-700">
                內部工作面板獨立使用，客戶則透過專屬 token 開啟手機簽署頁。
              </p>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Signed In</p>
              <p className="mt-3 text-sm font-medium text-stone-900">{session?.user?.email ?? "未登入"}</p>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button
                  type="submit"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
                >
                  <LogOut className="h-4 w-4" />
                  登出
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="flex-1 rounded-[32px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_60px_rgba(44,42,41,0.08)] backdrop-blur sm:p-6 lg:p-8">
          <header className="rounded-[28px] border border-stone-200 bg-stone-50 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{eyebrow}</p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-[0.06em] text-stone-900">{title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600 md:text-base">{description}</p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-900"
              >
                回到官網首頁
              </Link>
            </div>
          </header>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
