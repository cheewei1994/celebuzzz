"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const deleteArticle = async () => {
    const ok = confirm("確定刪除這篇文章？");

    if (!ok) return;

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "刪除失敗");
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
