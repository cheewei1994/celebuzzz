"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { categories } from "@/lib/categories";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* 第一行 */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="喵喵網"
            width={47}
            height={42}
          />

          <span className="font-bold text-xl">
            喵喵網
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* 第二行分类 */}
      <div className="overflow-x-auto bg-black/20">
        <div className="flex gap-2 px-2 py-2 whitespace-nowrap text-sm font-medium">
          <Link
            href="/"
            className="bg-white/20 px-4 py-2 rounded-md font-semibold"
        >
            首頁
        </Link>

          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className="px-3 py-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 汉堡菜单 */}
      {open && (
        <div className="border-t border-white/20 bg-black/10">
          <div className="flex flex-col px-4 py-3 gap-3 text-sm">
            <Link href="/about">
              關於我們
            </Link>

            <Link href="/contact">
              聯絡我們
            </Link>

            <Link href="/privacy-policy">
              隱私政策
            </Link>

            <Link href="/disclaimer">
              免責聲明
            </Link>

            <Link href="/dmca">
              DMCA
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}