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
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          {currentCategory?.name}
        </h1>

        <p className="text-gray-500">
          共 {filteredArticles.length} 篇文章
        </p>
      </div>

        {filteredArticles.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <p className="text-gray-500">
              暫時沒有文章
            </p>
          </div>
)}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 object-cover"
              />

             <div className="p-5">
              
              <h2 className="font-bold text-lg leading-7 mb-3">
                {article.title}
              </h2>

              <p className="text-gray-600 text-sm leading-6 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex justify-between text-xs text-gray-500 mt-5">
                <span>👁️ {article.views} 閱讀</span>
                <span>📅 {article.date}</span>
              </div>
            </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}