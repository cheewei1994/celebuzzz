import { categories } from "@/lib/categories";
import Link from "next/link";
import ArticleSlider from "./ArticleSlider";
import { supabaseAdmin } from "@/lib/supabase-admin";
import AdSlot from "@/app/components/AdSlot";
import { SmartAdEngine } from "@/lib/ads/SmartAdEngine";
import { ImageIcon, House, CalendarDays } from "lucide-react";
import ViewTracker from "./ViewTracker";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data: article } = await supabaseAdmin
    .from("articles")
    .select(
      `
      title,
      cover
    `,
    )
    .eq("id", Number(id))
    .single();

  if (!article) {
    return {
      title: "文章不存在 - 喵喵網",
    };
  }

  return {
    title: article.title,

    description: "喵喵網 - 每天分享值得閱讀的好文章",

    alternates: {
      canonical: `https://celebuzzz.com/article/${id}`,
    },

    openGraph: {
      title: article.title,
      description: "喵喵網 - 每天分享值得閱讀的好文章",
      url: `https://celebuzzz.com/article/${id}`,
      siteName: "喵喵網",
      type: "article",
      images: article.cover
        ? [
            {
              url: article.cover,
            },
          ]
        : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: article } = await supabaseAdmin
    .from("articles")
    .select(
      `
      id,
      title,
      cover,
      category,
      created_at,
      views,
      blocks
    `,
    )
    .eq("id", Number(id))
    .single();

  if (!article) {
    notFound();
  }

  const adEngine = SmartAdEngine(article.blocks || []);

  const currentCategory = categories.find((c) => c.name === article.category);

  const categoryName = currentCategory?.name || article.category;

  const { data: relatedArticles } = await supabaseAdmin
    .from("articles")
    .select(
      `
    id,
    title,
    cover,
    created_at,
    views
  `,
    )
    .eq("status", "published")
    .neq("id", article.id)
    .order("views", {
      ascending: false,
    })
    .limit(15);

  return (
    <main className="w-full pt-4 pb-10">
      <ViewTracker articleId={article.id} />

      <div className="max-w-[900px] mx-auto px-4">
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-purple-600 transition"
          >
            <House size={14} className="relative top-[0px] left-[0px]" />
            <span>首頁</span>
          </Link>

          <span>＞</span>

          <Link
            href={`/category/${currentCategory?.slug}`}
            className="hover:text-purple-600 hover:underline transition"
          >
            {categoryName}
          </Link>

          <span>＞</span>

          <span className="text-gray-700">文章</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-500 border-b border-gray-200 pb-3 mb-6">
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="relative top-[0px] left-[0px]" />

            <span className="relative top-[0px] right-[3px]">
              {new Date(article.created_at).toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        </div>

        <div className="my-6">
          <AdSlot position="article-top" />
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4">
        <ArticleSlider blocks={article.blocks || []} />

        <div className="px-0 md:px-4">
          <AdSlot position="article-bottom" />

          <div className="mt-12" />

          <h2 className="text-xl font-bold mb-5">🔥 推薦圖集</h2>

          <div className="space-y-4 md:space-y-0">
            {relatedArticles?.map((item, index) => (
              <a
                key={item.id}
                href={`/article/${item.id}`}
                className={`
    ${index >= 6 ? "hidden md:grid" : ""}

    flex
    flex-col
    md:grid
    md:grid-cols-[1fr_220px]
    gap-3
    md:gap-5
    py-1
    md:py-4
    border-b
    border-gray-100
    hover:bg-gray-50
    transition-all
  `}
              >
                <div className="order-2 md:order-1 flex flex-col justify-between">
                  <h3
                    className="
    text-lg
    md:text-lg
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

                  <p className="hidden md:block text-sm text-gray-600 mt-8">
                    {new Date(item.created_at).toLocaleDateString("zh-TW")}
                  </p>
                </div>

                <div className="order-1 md:order-2 relative">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="
    w-full
    h-[190px]
    md:w-[220px]
    md:h-[124px]
    object-cover
    rounded-lg
  "
                  />

                  <div
                    className="
    absolute
    bottom-1
    right-1
    bg-black
    w-6
    h-6
    md:w-7
    md:h-7
    flex
    items-center
    justify-center
  "
                  >
                    <ImageIcon size={16} className="text-white" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
