"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "@/components/animated-section";

const faqs = [
  {
    question: "你們只做網站，還是連 App 也能一起做？",
    answer:
      "兩種都可以。網站、App UI/UX 與原生 App 開發都是我們的服務範圍，多數客戶會從品牌網站起步，等品牌定位穩定後再延伸成 App。",
  },
  {
    question: "網站上線後，如果要更新新菜單、案例照片或服務內容怎麼辦？",
    answer:
      "若是單頁品牌方案，我們會保留清楚的區塊結構，方便後續微調與延伸。若你需要更高頻率更新，也能進一步規劃可自行維護的內容管理方式。",
  },
  {
    question: "如果之後想加入預約、會員、App 或更完整的功能呢？",
    answer:
      "這次的頁面會以可延伸架構規劃，所以可以先建立品牌門面，再依照營運需求逐步增加預約、後台、第三方金流或 App，不必全部重做。",
  },
  {
    question: "App 開發會做到可以上架的程度嗎？會不會還要再找別人？",
    answer:
      "會一路做到可在 App Store / Google Play 上架的狀態，包含帳號設定、憑證、截圖素材與審核建議，你不需要再另外找團隊接手。",
  },
  {
    question: "你們真的能在短時間內完成有質感的品牌頁面嗎？",
    answer:
      "可以。多數起步方案 3-5 天就能看到首版提案，先確認方向再往下走，避免做完後再大改。",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <AnimatedSection id="faq" ariaLabelledBy="faq-title" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.36em] text-stone-500">FAQ</p>
        <h2
          id="faq-title"
          className="mt-5 font-serif text-3xl font-semibold tracking-wide text-stone-900 md:text-5xl md:leading-[1.25]"
        >
          把常見疑問先說清楚。
        </h2>
        <p className="mt-6 text-base leading-8 text-stone-700 md:text-lg">
          從網站交付、App 開發到後續維護，我們會在合作前先把界線與可能性說明完整。
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={item.question}
              className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-stone-50"
                aria-expanded={isOpen}
              >
                <span className="pr-2 font-serif text-lg font-semibold tracking-wide text-stone-900">
                  {item.question}
                </span>
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-[#8B5E3C]">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-stone-200 px-6 py-5 text-base leading-8 text-stone-700">
                      {item.answer}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
