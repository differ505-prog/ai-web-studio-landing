import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "築時數位工作面板",
  description: "築時數位內部使用的案件、合約、簽署與留存工作面板。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
