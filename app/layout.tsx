import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movis（ムーヴィズ）",
  description: "動画1本で、引越し見積もりが変わる。複数の引越会社から適正価格の見積もりを比較できるサービス。"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
