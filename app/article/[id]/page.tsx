import { categories } from "@/lib/categories";
import Link from "next/link";
import { articles } from "@/lib/articles";
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = articles.find(
  (item) => item.id === id
)

if (!article) {
  return <div>文章不存在</div>
}

  const categoryName =
  categories.find(
    (c) => c.slug === article.category
  )?.name || article.category;

  const relatedArticles = articles
  .filter(
    (item) =>
      item.category === article.category &&
      item.id !== article.id
  )
  .slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

    <div className="text-sm text-gray-500 mb-4">
      首頁 ＞ {categoryName} ＞ 文章
    </div>

    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
      {article.title}
    </h1>

    <div className="text-gray-500 mb-6">
      👁️ {article.views} 閱讀　📅 {article.date}
    </div>

    <img
       src={article.image}
      alt={article.title}
      className="w-full rounded-xl mb-8"
    />
   
    <div className="prose max-w-none">
      <div className="whitespace-pre-line text-lg leading-10 text-gray-800">
        {article.content}
      </div>
    </div>

    <hr className="my-10" />

    <h2 className="text-2xl font-bold mb-6">
      🔥 相關文章
    </h2>

    <div className="space-y-4">
      {relatedArticles.map((item) => (
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