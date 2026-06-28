import type { Metadata } from "next";
import {
  Noto_Sans_TC,
  Noto_Serif_TC,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const siteName = "築時數位";
const siteUrl = "https://arrive-studio.vercel.app/";
const title =
  "築時數位 | 以溫潤而高轉換的品牌網站，陪你把品味變成信任";
const description =
  "為講究空間美學、餐飲體驗與生活風格的品牌主理人，打造優雅、清晰且能承接商機的網站與數位體驗。";

const bodyFont = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-body",
});

const serifTcFont = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-tc",
});

const serifLatinFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-serif-latin",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "品牌網站設計",
      "餐飲品牌網站",
      "生活美學官網",
      "Landing Page 設計",
      "Next.js 開發",
      "女性品牌形象網站",
      "空間收納品牌網站",
      "SEO 優化",
      "RWD 響應式網站",
      "網站接案工作室",
    ],
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    category: "design",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg",
      apple: "/icon.svg",
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
          alt: "築時數位官方網站預覽圖",
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
    <html lang="zh-Hant">
      <body
        className={`${bodyFont.variable} ${serifTcFont.variable} ${serifLatinFont.variable} app-shell bg-stone-50 text-stone-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
