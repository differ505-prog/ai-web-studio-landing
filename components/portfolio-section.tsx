import Image from "next/image";
import { ArrowUpRight, Leaf } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SectionIntro } from "@/components/section-intro";
import {
  showcaseCases,
  type BackgroundTone,
  type CaseStudy,
} from "@/lib/portfolio/showcaseCases";

const BACKGROUND_TONE_CLASSES: Record<
  BackgroundTone,
  { surface: string; ring: string; chip: string; accentText: string; innerGlow: string }
> = {
  stone: {
    surface: "bg-stone-50",
    ring: "border-stone-200",
    chip: "border-stone-300 bg-white text-stone-700",
    accentText: "text-stone-700",
    innerGlow: "from-white via-stone-100/60 to-stone-200/80",
  },
  sage: {
    surface: "bg-[#eef1eb]",
    ring: "border-[#cfd9c8]",
    chip: "border-[#cfd9c8] bg-white/85 text-[#3f6c5b]",
    accentText: "text-[#3f6c5b]",
    innerGlow: "from-white via-[#e4eadc]/70 to-[#cfd9c8]",
  },
  amber: {
    surface: "bg-[#f7ede0]",
    ring: "border-[#e6d4b8]",
    chip: "border-[#e6d4b8] bg-white/85 text-[#8b5e3c]",
    accentText: "text-[#8b5e3c]",
    innerGlow: "from-white via-[#f4e4cf]/70 to-[#e6d4b8]",
  },
};

function ProductPreviewArt({ caseStudy }: { caseStudy: CaseStudy }) {
  const chips = caseStudy.productMeta?.featureChips ?? [];

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-gradient-to-br from-white via-[#f4f7f1] to-[#dde4d6] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#cfd9c8] opacity-60 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#ebe2d7] opacity-70 blur-2xl" />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.32em] text-[#3f6c5b]/80">
            Zen Mode · Preview
          </span>
          <span className="rounded-full border border-[#cfd9c8] bg-white/80 px-2 py-1 text-[10px] text-[#3f6c5b]">
            {caseStudy.productMeta?.accentLabel.split(" · ")[1] ?? "Web App"}
          </span>
        </div>

        <div className="rounded-[20px] border border-[#cfd9c8] bg-white/90 p-5 shadow-[0_8px_24px_rgba(63,108,91,0.08)]">
          <p className="text-xs uppercase tracking-[0.28em] text-[#3f6c5b]/70">Today&apos;s Focus</p>
          <p className="mt-3 font-serif text-xl font-semibold tracking-wide text-stone-900">
            把這件事，安靜做完。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#cfd9c8] bg-[#eef1eb] text-[#3f6c5b]">
              <Leaf className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1 rounded-full bg-[#eef1eb]">
              <div className="h-1.5 w-2/3 rounded-full bg-[#3f6c5b]/80" />
            </div>
            <span className="text-[10px] text-[#3f6c5b]/80">2/3</span>
          </div>
          <ul className="mt-4 space-y-2 text-xs text-stone-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3f6c5b]/70" />
              完成 VibeList 禪模式介面迭代
            </li>
            <li className="flex items-center gap-2 opacity-60">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
              整理 Guest Mode 預設任務模板
            </li>
            <li className="flex items-center gap-2 opacity-40">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
              發佈本週累積進度週報
            </li>
          </ul>
        </div>

        {chips.length ? (
          <div className="flex flex-wrap gap-2">
            {chips.slice(0, 3).map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#cfd9c8] bg-white/85 px-3 py-1 text-[11px] text-[#3f6c5b]"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EditorialCaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const { name, description, imageUrl, imageAlt, href, ctaLabel, planLabel, categoryLabel } =
    caseStudy;

  return (
    <article className="overflow-hidden rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-7">
      <div
        className={`relative overflow-hidden rounded-[24px] bg-stone-100 ${
          caseStudy.imageRatioClass ?? "aspect-[4/3]"
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6f1e9]/70 via-transparent to-transparent" />
      </div>

      <div className="mt-6">
        <span className="w-fit rounded-full border border-stone-200 px-3 py-1 text-[11px] tracking-widest text-stone-500">
          [ {categoryLabel} ]
        </span>
        {planLabel ? <p className="mt-4 text-sm text-stone-500">{planLabel}</p> : null}
        <h3 className="mt-3 font-serif text-2xl font-semibold tracking-wide text-stone-900">
          {name}
        </h3>
        <p className="mt-4 text-sm leading-8 text-stone-700">{description}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] transition hover:text-stone-800"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function ProductCaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const meta = caseStudy.productMeta;
  const tone = BACKGROUND_TONE_CLASSES[meta?.backgroundTone ?? "stone"];

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[32px] border ${tone.ring} ${tone.surface} p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-7`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`w-fit rounded-full border ${tone.chip} px-3 py-1 text-[11px] tracking-widest`}>
          [ {caseStudy.categoryLabel} ]
        </span>
        <span className={`rounded-full border ${tone.chip} px-3 py-1 text-[11px] tracking-widest`}>
          {meta?.eyebrow}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="font-serif text-2xl font-semibold tracking-wide text-stone-900">
          {caseStudy.name}
        </h3>
        <p className="mt-3 text-sm leading-8 text-stone-700">{caseStudy.description}</p>
      </div>

      {meta?.featureChips?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {meta.featureChips.map((chip) => (
            <span
              key={chip}
              className={`rounded-full border ${tone.chip} px-3 py-1 text-[11px]`}
            >
              {chip}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex-1">
        <ProductPreviewArt caseStudy={caseStudy} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <a
          href={caseStudy.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm font-semibold ${tone.accentText} transition hover:text-stone-900`}
        >
          {caseStudy.ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        {meta?.accentLabel ? (
          <span className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
            {meta.accentLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}

function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return caseStudy.theme === "product" ? (
    <ProductCaseCard caseStudy={caseStudy} />
  ) : (
    <EditorialCaseCard caseStudy={caseStudy} />
  );
}

export function PortfolioSection() {
  const totalCases = showcaseCases.length;

  return (
    <AnimatedSection id="portfolio" ariaLabelledBy="portfolio-title" className="py-24 lg:py-32">
      <SectionIntro
        eyebrow="Selected Direction"
        title="我們偏愛用真實作品說話，讓案例本身成為最安靜也最有力的說服。"
        description={`以下為築時數位收錄的精選案例，目前共 ${totalCases} 件作品。我們以一致的編輯式視覺語言，針對不同產業的內容密度，量身打造專屬的閱讀節奏與商業信任感。`}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7">
        {showcaseCases.map((caseStudy) => (
          <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </AnimatedSection>
  );
}
