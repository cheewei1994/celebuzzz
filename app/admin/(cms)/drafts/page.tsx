import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import DeleteButton from "../articles/DeleteButton";

export default async function DraftsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const { search = "" } = await searchParams;
  let query = supabaseAdmin
    .from("articles")
    .select(
      `
    id,
    title,
    category,
    status,
    created_at
  `,
    )
    .eq("status", "draft");

  if (search) {
    query = query.or(`id.eq.${Number(search) || 0},title.ilike.%${search}%`);
  }

  const { data: drafts } = await query.order("created_at", {
    ascending: false,
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">草稿管理</h1>

      <form action="/admin/drafts" className="mb-6 flex gap-2">
        <input
          type="text"
          name="search"
          placeholder="搜尋草稿 ID 或標題..."
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
          href="/admin/drafts"
          className="bg-gray-500 text-white px-6 rounded-lg flex items-center"
        >
          重置
        </Link>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">標題</th>
              <th className="p-4 text-left">分類</th>
              <th className="p-4 text-left">狀態</th>
              <th className="p-4 text-left">操作</th>
            </tr>
          </thead>

          <tbody>
            {drafts?.map((article) => (
              <tr key={article.id} className="border-t">
                <td className="p-4">{article.id}</td>

                <td className="p-4">{article.title}</td>

                <td className="p-4">{article.category}</td>

                <td className="p-4">{article.status}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/edit/${article.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      編輯
                    </Link>

                    <DeleteButton id={article.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
