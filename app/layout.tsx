import Image from "next/image";
import { categories } from "@/lib/categories";
import Link from "next/link";
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
        {/* Header */}
      <header className="bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-500 text-white shadow-md">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

    <Link
  href="/"
  className="flex items-center gap-1 shrink-0"
>
  <Image
    src="/logo.png"
    alt="喵喵網"
    width={60}
    height={42}
    priority
  />

  <div className="font-bold text-xl md:text-2xl">
    喵喵網
  </div>
</Link>

    <nav>
      <ul className="flex items-center gap-8 overflow-x-auto whitespace-nowrap text-base md:text-lg font-medium [&::-webkit-scrollbar]:hidden">
        <li>
          <Link href="/" className="hover:text-purple-200">
            首頁
          </Link>
        </li>

        {categories.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/category/${item.slug}`}
              className="hover:text-purple-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

  </div>
</header>

        {children}
      </body>
    </html>
  );
}