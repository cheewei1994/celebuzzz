import EditForm from "./EditForm";
import { supabase } from "@/lib/supabase";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("Edit ID =", id);

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", Number(id))
    .single();

  console.log("Article =", article);
  console.log("Error =", error);

  if (!article) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-500">
          找不到文章
        </h1>

        <p className="mt-4">
          ID：{id}
        </p>

        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  return (
  <main className="max-w-5xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">
      編輯文章 #{id}
    </h1>

    <EditForm article={article} />
  </main>
);
}