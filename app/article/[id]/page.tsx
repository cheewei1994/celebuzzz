import { categories } from "@/lib/categories";
import Link from "next/link";
import ArticleSlider from "./ArticleSlider";
import { supabase } from "@/lib/supabase";
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: article } = await supabase
  .from("articles")
  .select("*")
  .eq("id", Number(id))
  .single();

  if (!article) {
  return <div>文章不存在</div>;
}

supabase
  .from("articles")
  .update({
    views: (article.views || 0) + 1,
  })
  .eq("id", article.id);

  const categoryName =
  categories.find(
    (c) => c.slug === article.category
  )?.name || article.category;

  const { data: relatedArticles } = await supabase
  .from("articles")
  .select("*")
  .eq("category", article.category)
  .eq("status", "published")
  .neq("id", article.id)
  .limit(3);

  return (
    <main className="max-w-[900px] mx-auto px-4 py-10">

    <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">

  <Link
    href="/"
    className="hover:text-purple-600 hover:underline transition"
  >
     🏠 首頁
  </Link>

  <span>＞</span>

  <Link
    href={`/category/${article.category}`}
    className="hover:text-purple-600 hover:underline transition"
  >
    {categoryName}
  </Link>

  <span>＞</span>

  <span className="text-gray-700">
    文章
  </span>

</div>

    <h1 className="text-3xl md:text-3xl font-bold leading-tight mb-4">
      {article.title}
    </h1>

    <div className="text-gray-500 mb-6">
      👁️ {(article.views || 0) + 1} 閱讀 📅 {new Date(article.created_at).toLocaleDateString()}
    </div>

   
    <ArticleSlider
  blocks={article.blocks || []}
/>

<hr className="my-10" />

<h2 className="text-2xl font-bold mb-6">
  🔥 相關文章
</h2>

<div className="space-y-4">
  {relatedArticles?.map((item) => (
    <Link
      key={item.id}
      href={`/article/${item.id}`}
      className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:translate-x-1 transition-all duration-200"
    >
      <h3 className="font-medium line-clamp-2">
        {item.title}
      </h3>
    </Link>
  ))}
</div>

  </main>
)
}