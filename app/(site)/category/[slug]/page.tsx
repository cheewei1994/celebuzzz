import Link from "next/link";
import { articles } from "@/lib/articles";
import { categories } from "@/lib/categories";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const currentCategory = categories.find(
    (item) => item.slug === slug
  );

  const filteredArticles = articles.filter(
    (article) => article.category === slug
  );

  
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl p-5 md:p-6 mb-6 shadow-sm border">
  <div className="flex items-center gap-3">
    <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>

    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
      {currentCategory?.name}
    </h1>
  </div>

  <div className="mt-2 ml-[18px]">
    <p className="text-gray-500 text-sm">
      共 {filteredArticles.length} 篇文章
    </p>
  </div>
</div>

        {filteredArticles.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <p className="text-gray-500">
              暫時沒有文章
            </p>
          </div>
)}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-32 md:h-64 object-cover"
              />

             <div className="p-3 md:p-5">
              
              <h2 className="font-bold text-sm md:text-lg leading-5 md:leading-7 mb-1 line-clamp-2">
                {article.title}
              </h2>

              <p className="hidden md:block text-gray-600 text-sm leading-6 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex justify-between text-xs text-gray-500 mt-2 md:mt-5">
                <span>👁️ {article.views} 閱讀</span>
                <span className="hidden md:inline">
                  📅 {article.date}
                </span>
              </div>
            </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}