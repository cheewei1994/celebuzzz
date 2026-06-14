import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function TopArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const { search = "" } = await searchParams;

  let query = supabase
  .from("articles")
  .select("*")
  .eq("status", "published");

if (search) {
  query = query.or(
    `id.eq.${Number(search) || 0},title.ilike.%${search}%`
  );
}

const { data: articles } = await query.order(
  "views",
  {
    ascending: false,
  }
);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        🔥 熱門文章排行榜
      </h1>

      <form
  action="/admin/hot"
  className="mb-6 flex gap-2"
>
  <input
    type="text"
    name="search"
    placeholder="搜尋文章 ID 或標題..."
    defaultValue={search}
    className="flex-1 border rounded-lg p-3"
  />

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 rounded-lg"
  >
    搜尋
  </button>

  <Link
    href="/admin/hot"
    className="bg-gray-500 text-white px-6 py-3 rounded-lg"
  >
    重置
  </Link>
</form>

      <div className="bg-white rounded-xl shadow p-6">

        {articles?.map((article, index) => (
          <div
            key={article.id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <p className="font-bold">
                #{index + 1} {article.title}
              </p>

              <p className="text-gray-500">
                👁️ {article.views || 0} 次閱讀
              </p>
            </div>

            <div className="flex gap-2">

              <Link
                href={`/article/${article.id}`}
                target="_blank"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                查看
              </Link>

              <Link
                href={`/admin/edit/${article.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                編輯
              </Link>

            </div>
          </div>
        ))}

      </div>
    </main>
  );
}