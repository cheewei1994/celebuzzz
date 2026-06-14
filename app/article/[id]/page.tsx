import { categories } from "@/lib/categories";
import Link from "next/link";
import ArticleSlider from "./ArticleSlider";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.time("article-query");

const { data: article } = await supabase
  .from("articles")
  .select(`
  id,
  title,
  blocks
`)
  .eq("id", Number(id))
  .single();

console.timeEnd("article-query");

if (!article) {
  return <div>文章不存在</div>;
}

return (
  <ArticleSlider
    blocks={article.blocks || []}
  />
);
}