import { categories } from "@/lib/categories";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {

  const params = await searchParams;

const currentPage = Number(
  params.page || 1
);

const pageSize = 12;

const from =
  (currentPage - 1) * pageSize;

const to =
  from + pageSize - 1;

  const {
  data: articles,
  count,
  error,
} = await supabase
  .from("articles")
  .select("*", {
    count: "exact",
  })
  
   .eq("status", "published")
  .order("created_at", {
    ascending: false,
  })
  .range(from, to);

  const totalPages = Math.ceil(
  (count || 0) / pageSize
);
  
  return (
    <main className="min-h-screen bg-gray-50">
    
      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 pt-5 pb-10">
        
        <div className="flex items-center gap-3 mb-5">
  <div className="w-1.5 h-6 bg-violet-600 rounded-full"></div>

  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
    最新文章
  </h2>
</div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles?.map((article) => (
  <Link
    key={article.id}
    href={`/article/${article.id}`}
    prefetch={false}
    className="block"
  >
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      {article.cover && (
      <img
        src={article.cover}
        alt={article.title}
        className="w-full h-32 md:h-64 object-cover"
      />
      )}

      <div className="p-3 md:p-5">
        <span className="hidden md:inline-flex items-center px-3 py-1 text-xs font-bold bg-red-50 text-red-600 rounded-full border border-red-200 mb-3">
          #{categories.find(
            (c) => c.slug === article.category
          )?.name || article.category}
        </span>
        <h3 className="font-bold text-sm md:text-lg leading-5 md:leading-7 mb-1 line-clamp-2">
          {article.title}
        </h3>

        <p
  className="hidden md:block text-gray-600 text-sm leading-6 overflow-hidden"
  style={{
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  }}
>
  {article.summary}
</p>

        <div className="flex justify-between text-xs text-gray-500 mt-4">
          👁️ {article.views || 0} 閱讀
          <span className="hidden md:inline">
            {new Date(article.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  </Link>
))}
        </div>

       <div className="flex justify-center items-center gap-2 mt-12">

  {currentPage > 1 && (
    <Link
      href={`/?page=${currentPage - 1}`}
      className="px-4 py-2 border rounded-lg hover:bg-gray-100"
    >
      ← 上一頁
    </Link>
  )}

  {Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).map((page) => (
    <Link
      key={page}
      href={`/?page=${page}`}
      className={`w-10 h-10 flex items-center justify-center rounded-lg border ${
        currentPage === page
          ? "bg-blue-600 text-white border-blue-600"
          : "hover:bg-gray-100"
      }`}
    >
      {page}
    </Link>
  ))}

  {currentPage < totalPages && (
    <Link
      href={`/?page=${currentPage + 1}`}
      className="px-4 py-2 border rounded-lg hover:bg-gray-100"
    >
      下一頁 →
    </Link>
  )}

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