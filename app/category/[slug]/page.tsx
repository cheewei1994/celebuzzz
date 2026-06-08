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
      <h1 className="text-3xl font-bold mb-8">
        {currentCategory?.name ?? slug}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
          >
            <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">
                  {article.title}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {article.date}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}