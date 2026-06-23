import { categories } from "@/lib/categories";
import Link from "next/link";
import ArticleSlider from "./ArticleSlider";
import { supabase } from "@/lib/supabase";
import AdSlot from "@/app/components/AdSlot";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      category,
      created_at,
      views,
      blocks
    `)
    .eq("id", Number(id))
    .single();

  if (!article) {
    return <div>文章不存在</div>;
  }

  await supabase
  .from("articles")
  .update({
    views: (article.views || 0) + 1,
  })
  .eq("id", article.id);


  const currentCategory = categories.find(
  (c) => c.name === article.category
);

const categoryName =
  currentCategory?.name || article.category;

 const { data: relatedArticles } = await supabase
  .from("articles")
  .select(`
    id,
    title,
    cover,
    created_at,
    views
  `)
  .eq("status", "published")
  .neq("id", article.id)
  .order("views", {
    ascending: false,
  })
  .limit(15);

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
  href={`/category/${currentCategory?.slug}`}
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

      <div className="flex items-center gap-3 text-sm text-gray-500 border-b border-gray-200 pb-3 mb-6">
  <span>
    📅 {new Date(article.created_at).toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })}
  </span>
</div>
      <AdSlot position="article-top" />

      <ArticleSlider
        blocks={article.blocks || []}
      />
      <AdSlot position="article-middle" />

      <hr className="my-10" />
      <AdSlot position="article-bottom" />

     <h2 className="text-lg font-bold mb-4">
  🔥 推薦文章
</h2>

<div className="space-y-0">
  {relatedArticles?.map((item) => (
    <Link
      key={item.id}
      href={`/article/${item.id}`}
      className="
  grid
  grid-cols-[1fr_220px]
  gap-5
  py-4
  border-b
  border-gray-100
  hover:bg-gray-50
  transition-all
"
    >
      <div className="flex flex-col justify-between">
        <h3
  className="
    text-lg
    font-semibold
    text-gray-900
    leading-7
    line-clamp-2
    hover:text-violet-900
    transition-colors
  "
>

          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mt-8">
          {new Date(item.created_at).toLocaleDateString("zh-TW")}
        </p>
      </div>

      <img
        src={item.cover}
        alt={item.title}
        className="
  w-[220px]
  h-[124px]
  object-cover
  rounded-lg
"
      />
    </Link>
  ))}
</div>

    </main>
  );
}