import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
  }>;
}) {
  const { saved } = await searchParams;
  const { rows: settingRows } = await db.query(
    `SELECT *
     FROM public.settings
     LIMIT 1`,
  );

  const setting = settingRows[0] ?? null;

  async function saveSettings(formData: FormData) {
    "use server";

    const site_name = formData.get("site_name") as string;

    const site_description = formData.get("site_description") as string;

    const logo_url = formData.get("logo_url") as string;

    const { rows: existingRows } = await db.query(
      `SELECT id
       FROM public.settings
       LIMIT 1`,
    );

    const existing = existingRows[0];

    if (existing) {
      await db.query(
        `UPDATE public.settings
         SET site_name = $1,
             site_description = $2,
             logo_url = $3
         WHERE id = $4`,
        [site_name, site_description, logo_url, existing.id],
      );
    } else {
      await db.query(
        `INSERT INTO public.settings
          (site_name, site_description, logo_url)
         VALUES
          ($1, $2, $3)`,
        [site_name, site_description, logo_url],
      );
    }

    redirect("/admin/settings?saved=1");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">網站設定</h1>

      {saved && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
          ✅ 設定已儲存
        </div>
      )}

      <form
        action={saveSettings}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        <div>
          <label className="block mb-2 font-medium">網站名稱</label>

          <input
            name="site_name"
            defaultValue={setting?.site_name || ""}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">網站副標題</label>

          <input
            name="site_description"
            defaultValue={setting?.site_description || ""}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Logo URL</label>

          <input
            name="logo_url"
            defaultValue={setting?.logo_url || ""}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          儲存設定
        </button>
      </form>
    </main>
  );
}
