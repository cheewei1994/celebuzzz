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
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto py-6 text-center">
            <h1 className="text-3xl font-bold">喵喵網</h1>
            <p className="text-gray-500 mt-2">
              每天分享值得閱讀的好文章
            </p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <ul className="flex justify-center overflow-x-auto whitespace-nowrap gap-8 py-4 text-lg font-medium [&::-webkit-scrollbar]:hidden">
              <li>
                <Link href="/"
                   className="hover:text-red-600 transition-colors duration-200">
                  首頁
                </Link>
              </li>

              {categories.map((item) => (
                <li key={item.slug}>
                 <Link
                    href={`/category/${item.slug}`}
                    className="hover:text-red-600 transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}