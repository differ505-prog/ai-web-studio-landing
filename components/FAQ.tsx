"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const faqs = [
  {
    question: "網站上線後，如果我們未來有新商品或新照片需要更新怎麼辦？",
    answer:
      "這取決於您的方案！若是「極速啟動版」，我們提供上線後 7 天內的免費圖文微調，後續若有頻繁更新需求，可加購極低月費的「輕量維護包」。若是「企業客製化系統」，我們會為您打造專屬的管理後台，讓您的團隊隨時登入、無限制地自行上傳新照片與修改內容，完全不求人！",
  },
  {
    question: "專案開發真的只要 3 到 5 天就能上線嗎？",
    answer:
      "是的！我們採用次世代的 AI 敏捷開發流程，省去了傳統外包冗長的來回溝通與切版時間。只要您在啟動會議前準備好基本的文案與品牌素材，我們就能在幾天內讓您的商業點子完美落地。",
  },
  {
    question: "你們有提供主機與網域的協助嗎？",
    answer:
      "有的！採用次世代 Serverless 雲端架構，我們為您實現「永久免主機費」的優勢，直接為您省下每年傳統外包公司的維護成本。針對網域（您的網路門牌），我們會協助您完成註冊與所有的 DNS、SSL 安全憑證設定。網域所有權將直接登記於您的名下，確保您的品牌資產完全掌握在自己手中。",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <AnimatedSection id="faq" ariaLabelledBy="faq-title" className="mt-24">
      <SectionIntro
        eyebrow="FAQ"
        title="把客戶最常擔心的問題，先回答清楚。"
        description="從後續更新、交付時程到主機與網域協助，我們把常見疑慮先攤開來說，讓高單價方案的信任感建立在透明與可執行的承諾上。"
        align="center"
      />

      <div className="mx-auto mt-10 grid max-w-4xl gap-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={item.question}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.03]"
                aria-expanded={isOpen}
              >
                <span className="pr-2 text-lg font-bold tracking-tight text-slate-50">
                  {item.question}
                </span>
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-300">
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
                    <div className="border-t border-white/10 px-6 py-5 text-base leading-relaxed text-slate-300">
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
