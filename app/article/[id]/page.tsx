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

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

    <div className="text-sm text-gray-500 mb-4">
      首頁 ＞ 情感 ＞ 文章
    </div>

    <div className="mb-6">
      <Link
        href="/"
        className="text-blue-600 hover:underline"
      >
        ← 返回首頁
      </Link>
    </div>

    <h1 className="text-4xl font-bold mb-4">
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
      <div className="whitespace-pre-line">
        {article.content}
      </div>
    </div>

    <hr className="my-10" />

    <h2 className="text-2xl font-bold mb-6">
      🔥 相關文章
    </h2>

    <div className="space-y-4">
      <Link
        href="/article/12346"
        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        妻子偷偷轉走存款後，我終於醒悟
      </Link>

      <Link
        href="/article/12347"
        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        醫生提醒：這3種早餐別天天吃
      </Link>
    </div>

  </main>
)
}