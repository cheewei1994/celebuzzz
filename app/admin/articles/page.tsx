import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteButton from "./DeleteButton";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{
  search?: string;
  page?: string;
  start?: string;
  end?: string;
  period?: string;
}>;
}) {

const {
  search = "",
  page = "1",
  start = "",
  end = "",
  period = "",
} = await searchParams;

const currentPage = Number(page) || 1;
const pageSize = 20;
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

  let query = supabase
  .from("articles")
  .select("*")
  .eq("status", "published");

if (search) {
  query = query.or(
    `id.eq.${Number(search) || 0},title.ilike.%${search}%`
  );
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

const from = (currentPage - 1) * pageSize;
const to = from + pageSize - 1;

const { count } = await supabase
  .from("articles")
  .select("*", { count: "exact", head: true })
  .eq("status", "published");

  const totalPages = Math.ceil(
  (count || 0) / pageSize
);

const { data: articles } = await query
  .order("created_at", {
    ascending: false,
  })
  .range(from, to);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        已發布文章
      </h1>

      <p className="text-gray-500 mb-6 mt-2">
  共 {count || 0} 篇文章
</p>

<div className="mb-4 flex flex-wrap gap-2">
  <Link
    href="/admin/articles"
    className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
  >
    全部
  </Link>

  <Link
    href="/admin/articles?period=today"
    className="bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg"
  >
    今日
  </Link>

  <Link
    href="/admin/articles?period=week"
    className="bg-green-100 hover:bg-green-200 px-3 py-2 rounded-lg"
  >
    近7天
  </Link>

  <Link
    href="/admin/articles?period=month"
    className="bg-orange-100 hover:bg-orange-200 px-3 py-2 rounded-lg"
  >
    本月
  </Link>
</div>

    <form
      action="/admin/articles"
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
    href="/admin/articles"
    className="bg-gray-500 text-white px-6 rounded-lg flex items-center"
  >
    重置
  </Link>

  
    
  </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                標題
              </th>

              <th className="p-4 text-left">
                閱讀數
              </th>

              <th className="p-4 text-left">
                分類
              </th>

              <th className="p-4 text-left">
                日期
              </th>

              <th className="p-4 text-left">
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {articles?.map((article) => (
              <tr
                key={article.id}
                className="border-t"
              >
                <td className="p-4">
                  {article.id}
                </td>

                <td className="p-4 font-medium max-w-[500px]">
                  <Link
  href={`/article/${article.id}`}
  target="_blank"
  className="text-blue-600 hover:underline line-clamp-2"
>
                    {article.title}
                  </Link>
                </td>

                <td className="p-4">
  👁️ {article.views || 0}
</td>

<td className="p-4 min-w-[80px]">
  {article.category}
</td>

<td className="p-4">
  {article.created_at?.slice(0, 10)}
</td>

                <td className="p-4">
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

  <DeleteButton
    id={article.id}
  />
</div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

<div className="flex justify-center gap-4 py-6">
  {currentPage > 1 && (
    <Link
      href={`/admin/articles?page=${currentPage - 1}${
        search ? `&search=${search}` : ""
      }`}
      className="bg-gray-200 px-4 py-2 rounded"
    >
      ← 上一頁
    </Link>
  )}

  <span className="px-4 py-2">
  第 {currentPage} / {totalPages} 頁
</span>

  {(count || 0) > currentPage * pageSize && (
    <Link
      href={`/admin/articles?page=${currentPage + 1}${
        search ? `&search=${search}` : ""
      }`}
      className="bg-gray-200 px-4 py-2 rounded"
    >
      下一頁 →
    </Link>
  )}
</div>

      </div>
    </main>
  );
}