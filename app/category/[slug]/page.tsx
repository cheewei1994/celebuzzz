import Link from "next/link";
import { articles } from "@/lib/articles";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = decodeURIComponent(slug);

  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        {category}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
          >
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold">
                  {article.title}
                </h2>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}