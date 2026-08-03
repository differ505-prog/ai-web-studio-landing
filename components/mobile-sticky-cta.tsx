"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mail, MessageCircleMore } from "lucide-react";

export function MobileStickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 640;
      const nearFooter = window.innerHeight + window.scrollY >= document.body.offsetHeight - 480;
      setIsVisible(past && !nearFooter);
      setShowTop(window.scrollY > 1200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 transition-all duration-300 lg:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2 rounded-[24px] border border-stone-200/80 bg-white/95 p-2 shadow-[0_8px_28px_rgb(0,0,0,0.12)] backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <a
          href="https://lin.ee/uh4z4dL"
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-[18px] bg-[#06C755] px-3 py-2.5 text-[13px] font-semibold text-white shadow-sm transition active:scale-[0.98]"
        >
          <MessageCircleMore className="h-4 w-4" />
          加 LINE 聊聊需求
        </a>
        <a
          href="mailto:hello.arrivestudio@gmail.com"
          className="flex items-center justify-center gap-1.5 rounded-[18px] border border-stone-300 bg-white px-3 py-2.5 text-[13px] font-semibold text-stone-700 transition active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
        {showTop ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="回到頁首"
            className="flex items-center justify-center rounded-[18px] border border-stone-200 bg-stone-50 px-3 text-stone-600 transition active:scale-[0.98]"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}