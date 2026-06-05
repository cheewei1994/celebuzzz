import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "喵喵網 - 每天分享值得閱讀的好文章",

  description:
    "喵喵網提供情感、家庭、健康、奇聞、美食等優質內容，每天分享值得閱讀的文章。",

  keywords: [
    "情感文章",
    "家庭故事",
    "健康知識",
    "奇聞趣事",
    "美食分享",
    "喵喵網",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
    lang="zh-Hant"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <head>
      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5206647366547356"
        crossOrigin="anonymous"
      />
    </head>

    <body className="min-h-full flex flex-col">
      {children}
    </body>
  </html>
);
}
