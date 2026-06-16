import EditForm from "./EditForm";
import { supabase } from "@/lib/supabase";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        編輯文章 #{id}
      </h1>

     <EditForm article={article} />
    </main>
  );
}