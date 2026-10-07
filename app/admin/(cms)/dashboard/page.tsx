import Link from "next/link";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const [
    totalArticlesResult,
    publishedArticlesResult,
    draftArticlesResult,
    recentArticlesResult,
    topArticlesResult,
    totalViewsResult,
  ] = await Promise.all([
    db.query(
      `SELECT COUNT(*)::int AS count
       FROM public.articles`,
    ),
    db.query(
      `SELECT COUNT(*)::int AS count
       FROM public.articles
       WHERE status = $1`,
      ["published"],
    ),
    db.query(
      `SELECT COUNT(*)::int AS count
       FROM public.articles
       WHERE status = $1`,
      ["draft"],
    ),
    db.query(
      `SELECT *
       FROM public.articles
       ORDER BY created_at DESC
       LIMIT 5`,
    ),
    db.query(
      `SELECT *
       FROM public.articles
       WHERE status = $1
       ORDER BY views DESC
       LIMIT 5`,
      ["published"],
    ),
    db.query(
      `SELECT COALESCE(SUM(views), 0)::int AS total
       FROM public.articles`,
    ),
  ]);

  const totalArticles = totalArticlesResult.rows[0]?.count ?? 0;
  const publishedArticles = publishedArticlesResult.rows[0]?.count ?? 0;
  const draftArticles = draftArticlesResult.rows[0]?.count ?? 0;
  const recentArticles = recentArticlesResult.rows;
  const topArticles = topArticlesResult.rows;
  const totalViews = totalViewsResult.rows[0]?.total ?? 0;

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">後台管理中心</h1>

      <div className="grid md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">總文章</p>

          <h2 className="text-4xl font-bold">{totalArticles || 0}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">已發布</p>

          <h2 className="text-4xl font-bold text-green-600">
            {publishedArticles || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">草稿</p>

          <h2 className="text-4xl font-bold text-orange-600">
            {draftArticles || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">發布率</p>

          <h2 className="text-4xl font-bold text-blue-600">
            {totalArticles
              ? Math.round(((publishedArticles || 0) / totalArticles) * 100)
              : 0}
            %
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">總瀏覽量</p>

          <h2 className="text-4xl font-bold text-red-600">{totalViews}</h2>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">最近文章</h2>

        <div className="space-y-3">
          {recentArticles?.map((article) => (
            <div
              key={article.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{article.title}</p>

                <p className="text-sm text-gray-500">{article.status}</p>
              </div>

              <Link
                href={`/admin/edit/${article.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                編輯
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Link
          href="/admin"
          className="bg-violet-600 text-white p-6 rounded-xl text-center"
        >
          📝 新增文章
        </Link>

        <Link
          href="/admin/articles"
          className="bg-blue-600 text-white p-6 rounded-xl text-center"
        >
          📄 已發布文章
        </Link>

        <Link
          href="/admin/drafts"
          className="bg-orange-500 text-white p-6 rounded-xl text-center"
        >
          📂 草稿箱
        </Link>
      </div>
    </main>
  );
}
