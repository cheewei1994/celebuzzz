import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function TopArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    start?: string;
    end?: string;
    period?: string;
  }>;
}) {
  const {
  search = "",
  start = "",
  end = "",
  period = "",
} = await searchParams;

  let query = supabase
  .from("articles")
  .select("*")
  .eq("status", "published");

  let filterStart = start;
let filterEnd = end;

const now = new Date();

if (period === "today") {
  filterStart = now.toISOString().split("T")[0];
  filterEnd = now.toISOString().split("T")[0];
}

if (period === "week") {
  const d = new Date();
  d.setDate(now.getDate() - 7);
  filterStart = d.toISOString().split("T")[0];
}

if (period === "month") {
  const d = new Date();
  d.setMonth(now.getMonth() - 1);
  filterStart = d.toISOString().split("T")[0];
}

if (period === "year") {
  filterStart = `${now.getFullYear()}-01-01`;
}

  if (filterStart) {
  query = query.gte(
    "created_at",
    `${filterStart}T00:00:00`
  );
}

if (filterEnd) {
  query = query.lte(
    "created_at",
    `${filterEnd}T23:59:59`
  );
}

if (search) {
  query = query.or(
    `id.eq.${Number(search) || 0},title.ilike.%${search}%`
  );
}

const { data: articles } = await query
  .order("views", {
    ascending: false,
  })
  .limit(10);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold">
  🔥 熱門文章排行榜
</h1>


<div className="mb-4 flex flex-wrap gap-2">
  <Link
    href="/admin/top-articles"
    className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
  >
    全部
  </Link>

  <Link
    href="/admin/top-articles?period=today"
    className="bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg"
  >
    今日
  </Link>

  <Link
    href="/admin/top-articles?period=week"
    className="bg-green-100 hover:bg-green-200 px-3 py-2 rounded-lg"
  >
    近7天
  </Link>

  <Link
    href="/admin/top-articles?period=month"
    className="bg-orange-100 hover:bg-orange-200 px-3 py-2 rounded-lg"
  >
    本月
  </Link>

  <Link
    href="/admin/top-articles?period=year"
    className="bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-lg"
  >
    今年
  </Link>
</div>

      <form
  action="/admin/top-articles"
  className="mb-6 flex flex-wrap gap-2"
>
  <input
    type="text"
    name="search"
    placeholder="搜尋文章 ID 或標題..."
    defaultValue={search}
    className="flex-1 border rounded-lg p-3"
  />

  <input
  type="date"
  name="start"
  defaultValue={start}
  className="border rounded-lg p-3"
/>

<input
  type="date"
  name="end"
  defaultValue={end}
  className="border rounded-lg p-3"
/>

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 rounded-lg"
  >
    搜尋
  </button>

  <Link
    href="/admin/top-articles"
    className="bg-gray-500 text-white px-6 py-3 rounded-lg"
  >
    重置
  </Link>
</form>

      <div className="bg-white rounded-xl shadow p-6">

        {articles?.map((article, index) => (
          <div
  key={article.id}
  className="flex justify-between items-start border-b py-4 gap-3"
>
  <div className="flex-1 min-w-0">
  <p className="font-bold truncate mb-2">
    #{index + 1} {article.title}
  </p>

  <div className="text-sm text-gray-500 flex gap-4">
    <span>👁️ {article.views || 0} 次閱讀</span>

    <span>
        📅 {article.created_at.slice(0, 10)}
    </span>
  </div>
</div>

  <div className="flex gap-2 shrink-0">

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