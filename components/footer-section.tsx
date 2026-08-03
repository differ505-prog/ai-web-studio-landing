import { Sparkles } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-stone-200 py-10">
      <div className="flex flex-col gap-6 text-sm text-stone-500 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-base font-semibold tracking-wide text-stone-900">
            築時數位 · Arrive Studio
          </p>
          <p className="mt-2 max-w-md leading-7">
            為生活美學品牌做品牌官網與 App，用一致的編輯式節奏讓作品更值得停留。
          </p>
          <a
            href="https://lin.ee/uh4z4dL"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[#06C755] transition hover:brightness-90"
          >
            LINE 官方帳號：lin.ee/uh4z4dL
          </a>
          <p className="mt-4">© 2026 築時數位. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
          <a href="#services" className="transition hover:text-stone-800">
            服務項目
          </a>
          <a href="#portfolio" className="transition hover:text-stone-800">
            案例展示
          </a>
          <a href="#pricing" className="transition hover:text-stone-800">
            合作方案
          </a>
          <a href="#contact" className="transition hover:text-stone-800">
            聊聊你的需求
          </a>
        </div>
      </div>
    </footer>
  );
}
