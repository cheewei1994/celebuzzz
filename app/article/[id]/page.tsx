import { supabase } from "@/lib/supabase";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select(`
  id,
  title,
  category,
  created_at,
  views,
  blocks
`)
    .eq("id", Number(id))
    .single();

  if (!article) {
  return <div>文章不存在</div>;
}

return (
  <main>
    <h1>{article.title}</h1>

    <div>
      文章恢复中...
    </div>
  </main>
);
  
}