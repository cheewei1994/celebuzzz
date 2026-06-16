import Link from "next/link";
import { headers } from "next/headers";
import LogoutButton from "@/app/components/LogoutButton";

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
        <div className="mb-10">
  <h2 className="text-2xl font-bold">
    🐱 喵喵網 CMS
  </h2>

  <p className="text-xs text-gray-400 mt-1">
    Content Management System
  </p>
</div>


        <nav className="space-y-3">
          <Link
            href="/admin/dashboard"
             className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin"
             className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            📝 新增文章
          </Link>

          <Link
            href="/admin/articles"
             className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            📄 已發布文章
          </Link>

          <Link
            href="/admin/drafts"
             className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            📂 草稿箱
          </Link>

          <Link
            href="/admin/top-articles"
             className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            🔥 熱門文章
          </Link>

<div className="pt-8">
  <LogoutButton />
</div>

        </nav>
      </aside>

      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
}