import MobileHeader from "./components/MobileHeader";
import Image from "next/image";
import { categories } from "@/lib/categories";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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

  icons: {
    icon: "/icon.png",
  },

  keywords: [
    "情感文章",
    "家庭故事",
    "健康知識",
    "奇聞趣事",
    "美食分享",
    "喵喵網",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html
  lang="zh-Hant"
  suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
      <head>
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5206647366547356"
          crossOrigin="anonymous"
        />

<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-VE89R3TEMB"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VE89R3TEMB');
  `}
</Script>

      </head>
      

      <body className="min-h-screen flex flex-col">

  <main className="flex-1">
    {children}
  </main>

  <Toaster position="top-center" />

</body>

    </html>
  );
}