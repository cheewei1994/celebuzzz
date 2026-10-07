import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function EditAdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { rows } = await db.query(
    `SELECT *
     FROM public.ads
     WHERE id = $1
     LIMIT 1`,
    [Number(id)],
  );

  const ad = rows[0];

  if (!ad) {
    return <div>廣告不存在</div>;
  }

  async function updateAd(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const code = formData.get("code") as string;

    const active = formData.get("active") === "on";

    await db.query(
      `UPDATE public.ads
       SET name = $1,
           position = $2,
           code = $3,
           active = $4
       WHERE id = $5`,
      [name, position, code, active, Number(id)],
    );

    redirect("/admin/ads");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">編輯廣告</h1>

      <form
        action={updateAd}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block mb-2 font-medium">名稱</label>

          <input
            name="name"
            defaultValue={ad.name}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Position</label>

          <input
            name="position"
            defaultValue={ad.position}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">廣告代碼</label>

          <textarea
            name="code"
            defaultValue={ad.code}
            rows={12}
            className="w-full border rounded-lg p-3 font-mono"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="active" defaultChecked={ad.active} />
            啟用廣告
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          儲存
        </button>
      </form>
    </main>
  );
}
