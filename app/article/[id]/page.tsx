import { categories } from "@/lib/categories";
import Link from "next/link";
import ArticleSlider from "./ArticleSlider";
import { supabase } from "@/lib/supabase";
export const revalidate = 3600;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  console.log("HELLO TEST");
  
console.time("article-query");

  const { data: article } = await supabase
  .from("articles")
  .select(`
  id,
  title
`)
  .eq("id", Number(id))
  .single();

  console.timeEnd("article-query");

  return (
  <main>
    <h1>{article?.title}</h1>
    <div>TEST</div>
  </main>
);

 