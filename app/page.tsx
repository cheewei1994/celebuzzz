import Link from "next/link";
import { articles } from "@/lib/articles";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-10 text-center">
          <h1 className="text-4xl font-bold"> 喵喵網</h1>
          <p className="text-gray-500 mt-2">
            每天分享值得閱讀的好文章
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-start lg:justify-center overflow-x-auto whitespace-nowrap gap-8 py-4 text-base font-medium [&::-webkit-scrollbar]:hidden">
            <li><Link href="/">首頁</Link></li>
            <li><Link href="/category/台灣">台灣</Link></li>
            <li><Link href="/category/娛樂">娛樂</Link></li>
            <li><Link href="/category/情感">情感</Link></li>
            <li><Link href="/category/命理">命理</Link></li>
            <li><Link href="/category/健康">健康</Link></li>
            <li><Link href="/category/美食">美食</Link></li>
            <li><Link href="/category/奇聞">奇聞</Link></li>
            <li><Link href="/category/生活">生活</Link></li>
            <li><Link href="/category/寵物">寵物</Link></li>
          </ul>
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-8">
          🔥 最新文章
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
  <Link
    key={article.id}
    href={`/article/${article.id}`}
    className="block"
  >
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">
        <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-red-50 text-red-600 rounded-full border border-red-200 mb-3">
          #{article.category}
        </span>
        <h3 className="font-bold text-lg leading-7 mb-3">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm leading-6 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex justify-between text-xs text-gray-500 mt-5">
          <span>👁️ {article.views} 閱讀</span>
          <span>📅 {article.date}</span>
        </div>
      </div>
    </article>
  </Link>
))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button className="px-4 py-2 border rounded-lg">
            ← 上一頁
          </button>

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-blue-600 text-white">
              1
            </button>
            <button className="w-10 h-10 rounded-lg border">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border">
              3
            </button>
            <button className="w-10 h-10 rounded-lg border">
              4
            </button>
          </div>

          <button className="px-4 py-2 border rounded-lg">
            下一頁 →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto py-10 text-center">
          <p className="text-gray-500 text-sm">
            Copyright © 2026 喵喵網 All rights reserved.
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
            <Link href="/about"className="hover:text-blue-600">關於我們</Link>
            <Link href="/contact"className="hover:text-blue-600">聯絡我們</Link>
            <Link href="/privacy-policy"className="hover:text-blue-600">隱私政策</Link>
            <Link href="/disclaimer"className="hover:text-blue-600">免責聲明</Link>
            <Link href="/dmca"className="hover:text-blue-600">DMCA</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}