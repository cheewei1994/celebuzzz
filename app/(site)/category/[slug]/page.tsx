import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { categories } from "@/lib/categories";
import Pagination from "@/app/components/Pagination";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
  page?: string;
}>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

const currentPage = Number(page ?? "1");

const PAGE_SIZE = 16;
const from = (currentPage - 1) * PAGE_SIZE;
const to = from + PAGE_SIZE - 1;

  const currentCategory = categories.find(
  (item) => item.slug === slug
);

const categoryName =
  currentCategory?.name;

const {
  data: filteredArticles,
  count,
} = await supabase
  .from("articles")
  .select("*", { count: "exact" })
  .eq("category", categoryName)
  .order("created_at", {
    ascending: false,
  })
  .range(from, to);

const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);
  
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="
bg-violet-50
border
border-violet-100
rounded-2xl
p-6
mb-8
">
  <div className="flex items-center gap-3">
    <div className="w-1.5 h-8 bg-violet-600 rounded-full"></div>

    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
      {currentCategory?.name}
    </h1>
  </div>

  <div className="mt-2 ml-[18px]">
    <p className="text-gray-500 text-sm">
      共 {count ?? 0} 篇圖集
    </p>
  </div>
</div>

        {(!filteredArticles ||
  filteredArticles.length === 0) && (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <p className="text-gray-500">
              暫時沒有文章
            </p>
          </div>
)}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredArticles?.map((article) => (
           <a
            key={article.id}
            href={`/article/${article.id}`}
          >
            <article className="
bg-white
rounded-2xl
overflow-hidden
border
border-gray-100
shadow-sm
hover:border-violet-300
hover:shadow-md
hover:-translate-y-1
transition-all
duration-300
">

  <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
  <img
    src={article.cover}
    alt={article.title}
    className="w-full h-full object-cover"
  />
</div>

  <div className="p-3 md:p-5">
              
              <h2 className="font-bold text-sm md:text-lg leading-5 md:leading-7 mb-1 line-clamp-2">
                {article.title}
              </h2>

              <p className="hidden md:block text-gray-600 text-sm leading-6 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="
flex
justify-between
items-center
text-xs
text-gray-500
mt-4
pt-3
border-t
">
                <span>👁️ {article.views} 閱讀</span>
                <span className="hidden md:inline">
                  📅 {
  new Date(article.created_at)
    .toLocaleDateString("zh-TW")
}
                </span>
              </div>
            </div>
            </article>
          </a>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={`/category/${slug}`}
      />
    </main>
  );
}