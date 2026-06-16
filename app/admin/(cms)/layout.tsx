import Link from "next/link";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();

  const pathname =
    headersList.get("next-url") || "";

  // 登入頁不顯示 Sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          CMS 後台
        </h2>

        <nav className="space-y-3">
          <Link
            href="/admin/dashboard"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            📝 新增文章
          </Link>

          <Link
            href="/admin/articles"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            📄 已發布文章
          </Link>

          <Link
            href="/admin/drafts"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            📂 草稿箱
          </Link>

          <Link
            href="/admin/top-articles"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            🔥 熱門文章
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
}