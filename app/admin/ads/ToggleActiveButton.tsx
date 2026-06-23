"use client";

export default function ToggleActiveButton({
  id,
  active,
}: {
  id: number;
  active: boolean;
}) {
  async function toggle() {
    await fetch(`/api/toggle-ad/${id}`, {
      method: "POST",
    });

    location.reload();
  }

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 rounded text-sm text-white ${
        active
          ? "bg-orange-500"
          : "bg-green-600"
      }`}
    >
      {active ? "停用" : "啟用"}
    </button>
  );
}