"use client";

export default function DeleteAdButton({
  id,
}: {
  id: number;
}) {
  async function handleDelete() {
    if (!confirm("確定刪除？")) return;

    await fetch(`/api/delete-ad/${id}`, {
      method: "DELETE",
    });

    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      刪除
    </button>
  );
}