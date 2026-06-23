import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
  }>;
}) {
 const { saved } = await searchParams;   
  const { data: setting } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  async function saveSettings(
    formData: FormData
  ) {
    "use server";

    const site_name =
      formData.get("site_name") as string;

    const site_description =
      formData.get(
        "site_description"
      ) as string;

    const logo_url =
      formData.get("logo_url") as string;

   const { data: existing } = await supabase
  .from("settings")
  .select("id")
  .limit(1)
  .maybeSingle();

if (existing) {
  await supabase
    .from("settings")
    .update({
      site_name,
      site_description,
      logo_url,
    })
    .eq("id", existing.id);
} else {
  await supabase
    .from("settings")
    .insert({
      site_name,
      site_description,
      logo_url,
    });
}

    redirect("/admin/settings?saved=1");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        網站設定
      </h1>

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
          <label className="block mb-2 font-medium">
            網站名稱
          </label>

          <input
            name="site_name"
            defaultValue={
              setting?.site_name || ""
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            網站副標題
          </label>

          <input
            name="site_description"
            defaultValue={
              setting?.site_description ||
              ""
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Logo URL
          </label>

          <input
            name="logo_url"
            defaultValue={
              setting?.logo_url || ""
            }
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