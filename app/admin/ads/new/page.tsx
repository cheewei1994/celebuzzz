import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default function NewAdPage() {
  async function createAd(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const code = formData.get("code") as string;

    const active =
      formData.get("active") === "on";

    await supabase
      .from("ads")
      .insert({
        name,
        position,
        code,
        active,
      });

    redirect("/admin/ads");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        新增廣告
      </h1>

      <form
        action={createAd}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block mb-2 font-medium">
            名稱
          </label>

          <input
            name="name"
            placeholder="例如：首頁頂部廣告"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Position
          </label>

          <input
            name="position"
            placeholder="例如：home-top"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            廣告代碼
          </label>

          <textarea
            name="code"
            rows={12}
            className="w-full border rounded-lg p-3 font-mono"
            placeholder="貼上 Adsense Code"
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              defaultChecked
            />
            啟用廣告
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          建立廣告
        </button>
      </form>
    </main>
  );
}