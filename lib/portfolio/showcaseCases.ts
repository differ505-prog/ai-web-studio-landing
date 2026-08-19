export type CaseTheme = "editorial" | "product";

export type BackgroundTone = "stone" | "sage" | "amber";

export type CaseCategory = "official" | "self";

export type CaseStudy = {
  slug: string;
  name: string;
  description: string;
  href: string;
  ctaLabel: string;
  planLabel?: string;
  category: CaseCategory;
  categoryLabel: string;
  theme: CaseTheme;
  imageUrl?: string;
  imageAlt?: string;
  imageRatioClass?: string;
  productMeta?: {
    eyebrow: string;
    featureChips: string[];
    backgroundTone: BackgroundTone;
    accentLabel: string;
  };
};

export const showcaseCases: CaseStudy[] = [
  {
    slug: "summer-rock-villa",
    name: "夏洛克民宿 Summer Rock Villa",
    description:
      "旅客在訂房前，先感受空間的溫柔。流暢的頁面導覽與細膩的響應式排版，完整呈現旅宿的空間氣質與在地體驗。",
    href: "https://www.summerrockvilla.com.tw/",
    ctaLabel: "實際體驗民宿官網",
    planLabel: "對應 NT$ 9,900 起步方案",
    category: "official",
    categoryLabel: "品牌官方授權展示",
    theme: "editorial",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "帶有海景與柔和日光氛圍的高質感民宿空間",
    imageRatioClass: "aspect-[4/5]",
  },
  {
    slug: "qingxi-design",
    name: "青曦設計 Qingxi Design",
    description:
      "收攏繁雜的空間配置邏輯，轉化為俐落的專業門面。兼具藝廊般的空間作品展示與系統化的服務流程，展現處理多層次資訊架構的硬實力。",
    href: "https://www.qingxidesign.tw/",
    ctaLabel: "探索設計工作室官網",
    planLabel: "對應 NT$ 29,900 延伸方案",
    category: "official",
    categoryLabel: "品牌官方授權展示",
    theme: "editorial",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "帶有極簡侘寂感與現代線條的室內設計空間",
    imageRatioClass: "aspect-[4/3]",
  },
  {
    slug: "vibelist",
    name: "VibeList · 禪模式任務管理 App",
    description:
      "為想安靜完成重要事情的人打造的待辦任務 App。以禪模式聚焦當下最重要的一件任務，必要時再展開完整列表；支援訪客模式直接體驗、Email 密碼與 Google 帳號登入，資料全程加密儲存，符合 GDPR 規範。",
    href: "https://www.vibelist.work/",
    ctaLabel: "前往體驗 VibeList",
    planLabel: "對應 App 與系統客製方案",
    category: "self",
    categoryLabel: "App 開發設計 · 自有 Side Project",
    theme: "product",
    productMeta: {
      eyebrow: "iOS · Android · PWA",
      featureChips: [
        "禪模式焦點視圖",
        "訪客模式免登入",
        "Google 帳號登入",
        "資料加密儲存 / GDPR",
      ],
      backgroundTone: "sage",
      accentLabel: "App · Next.js + Lucia Auth + Postgres",
    },
  },
];

export function findCaseBySlug(slug: string) {
  return showcaseCases.find((entry) => entry.slug === slug);
}
