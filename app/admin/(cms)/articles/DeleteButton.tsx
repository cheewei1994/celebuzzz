"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  const deleteArticle = async () => {
    const ok = confirm(
      "確定刪除這篇文章？"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("文章已刪除");

    router.refresh();
  };

  return (
    <button
      onClick={deleteArticle}
      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      刪除
    </button>
  );
}