import type { Metadata } from "next";
import "./globals.css";

const siteName = "AI 網頁開發接案工作室";
const siteUrl = "https://example.com";
const title =
  "AI 網頁開發接案工作室 | 極速交付的次世代官網、系統與 AI 整合開發";
const description =
  "以 Next.js、React、TypeScript 與 AI 協作流程，幾天內打造高轉換 Landing Page、企業官網、內部系統與 AI 深度整合方案，兼顧美感、效能與 SEO。";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "AI 網頁開發",
      "Landing Page 設計",
      "Next.js 開發",
      "企業形象官網",
      "內部自動化系統",
      "AI 系統整合",
      "SEO 優化",
      "RWD 響應式網站",
      "網站接案工作室",
    ],
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      url: siteUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "AI 網頁開發接案工作室官方網站預覽圖",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="dark">
      <body className="app-shell antialiased">{children}</body>
    </html>
  );
}
