import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";

const showcaseCases = [
  {
    name: "夏洛克民宿 Summer Rock Villa",
    description:
      "讓旅客在訂房前，就先感受空間的溫柔。以流暢的頁面導覽與細膩的響應式排版，完整呈現旅宿的空間氣質與在地體驗。",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "帶有海景與柔和日光氛圍的高質感民宿空間",
    href: "https://www.summerrockvilla.com.tw/",
    cta: "實際體驗民宿官網",
    plan: "對應 9,900 起步方案",
    imageRatioClass: "aspect-[4/5]",
  },
  {
    name: "青曦設計 Qingxi Design",
    description:
      "收攏繁雜的空間配置邏輯，轉化為俐落的專業門面。兼具藝廊般的空間作品展示與系統化的服務流程，展現處理多層次資訊架構的硬實力。",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "帶有極簡侘寂感與現代線條的室內設計空間",
    href: "https://www.qingxidesign.tw/",
    cta: "探索設計工作室官網",
    plan: "對應 29,900 延伸方案",
    imageRatioClass: "aspect-[4/3]",
  },
] as const;

export function PortfolioSection() {
  return (
    <AnimatedSection id="portfolio" ariaLabelledBy="portfolio-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Selected Direction"
        title="我們偏愛用真實作品說話，讓案例本身成為最安靜也最有力的說服。"
        description="以下兩個網站皆為築時數位自有營運品牌，我們以相同的編輯式視覺語言，分別呈現旅宿品牌與設計工作室在不同內容密度下的閱讀節奏與商業信任感。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {showcaseCases.map(
          ({ name, description, image, imageAlt, href, cta, plan, imageRatioClass }) => (
            <article
              key={name}
              className="overflow-hidden rounded-[36px] border border-stone-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8"
            >
              <div
                className={`relative overflow-hidden rounded-[28px] bg-stone-100 ${imageRatioClass}`}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f6f1e9]/70 via-transparent to-transparent" />
              </div>

              <div className="mt-7">
                <span className="w-fit rounded-full border border-stone-200 px-3 py-1 text-xs tracking-widest text-stone-500">
                  [ 築時數位 自有營運品牌 ]
                </span>
                <p className="mt-5 text-sm text-stone-500">{plan}</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold tracking-wide text-stone-900">
                  {name}
                </h3>
                <p className="mt-5 text-base leading-8 text-stone-700">{description}</p>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] transition hover:text-stone-800"
                >
                  {cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ),
        )}
      </div>
    </AnimatedSection>
  );
}
