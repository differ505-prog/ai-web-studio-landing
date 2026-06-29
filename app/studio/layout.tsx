import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

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
  return <StudioGate>{children}</StudioGate>;
}

async function StudioGate({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return children;
}
