import { categories } from "@/lib/categories";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Pagination from "@/app/components/Pagination";
export const dynamic = "force-dynamic";
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {

  const params = await searchParams;

const currentPage = Number(
  params.page || 1
);

const pageSize = 12;

const from =
  (currentPage - 1) * pageSize;

const to =
  from + pageSize - 1;

  const {
  data: articles,
  count,
  error,
} = await supabase
  .from("articles")
  .select("*", {
    count: "exact",
  })
  
   .eq("status", "published")
  .order("created_at", {
    ascending: false,
  })
  .range(from, to);

  const totalPages = Math.ceil(
  (count || 0) / pageSize
);
  
  return (
    <main className="bg-gray-50">
    
      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 pt-5 pb-10">
        
        <div className="flex items-center gap-3 mb-5">
  <div className="w-1.5 h-6 bg-violet-600 rounded-full"></div>

  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
    最新圖集 🚀 Powered by
  </h2>
</div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => (
  <a
  key={article.id}
  href={`/article/${article.id}`}
  className="block"
>
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      {article.cover && (
     <div className="aspect-[16/10] overflow-hidden">
  <img
    src={article.cover}
    alt={article.title}
    className="w-full h-full object-cover"
  />
</div>
      )}

      <div className="p-3 md:p-5">
  
        <h3
  className="
  font-bold
  text-base
  md:text-xl
  leading-6
  md:leading-8
  line-clamp-2
  mb-2
"
>
          {article.title}
        </h3>

        <p
  className="hidden md:block text-gray-600 text-sm leading-6 overflow-hidden"
  style={{
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  }}
>
  {article.summary}
</p>

        <div className="flex justify-between text-xs text-gray-500 mt-4">
          👁️ {article.views || 0} 閱讀
          <span className="hidden md:inline">
            {new Date(article.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  </a>
))}
        </div>

       <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  baseUrl="/"
/>
      </section>

      
    </main>
  );
}