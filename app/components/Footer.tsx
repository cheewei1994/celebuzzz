import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 border-t border-gray-300">
      <div className="max-w-7xl mx-auto py-8 text-center">
        <p className="text-gray-500 text-sm">
          Copyright © 2026 喵喵網 All rights reserved.
        </p>

        <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-gray-600">
  <Link
    href="/about"
    className="hover:text-violet-600 hover:underline transition-all duration-200"
  >
    關於我們
  </Link>

  <Link
    href="/contact"
    className="hover:text-violet-600 hover:underline transition-all duration-200"
  >
    聯絡我們
  </Link>

  <Link
    href="/privacy-policy"
    className="hover:text-violet-600 hover:underline transition-all duration-200"
  >
    隱私政策
  </Link>

  <Link
    href="/disclaimer"
    className="hover:text-violet-600 hover:underline transition-all duration-200"
  >
    免責聲明
  </Link>

  <Link
    href="/dmca"
    className="hover:text-violet-600 hover:underline transition-all duration-200"
  >
    DMCA
  </Link>
</div>
      </div>
    </footer>
  );
}