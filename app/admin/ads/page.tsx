import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import DeleteAdButton from "./DeleteAdButton";
import ToggleActiveButton from "./ToggleActiveButton";

export default async function AdsPage() {
  const { data: ads } = await supabaseAdmin.from("ads").select("*").order("id");

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">廣告管理</h1>

        <Link
          href="/admin/ads/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + 新增廣告
        </Link>
      </div>

      <div className="space-y-4">
        {ads?.map((ad) => (
          <div key={ad.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold">{ad.name}</h2>

                <p className="text-gray-500">{ad.position}</p>
                <div className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {ad.code}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/ads/edit/${ad.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  編輯
                </Link>

                <DeleteAdButton id={ad.id} />
                <ToggleActiveButton id={ad.id} active={ad.active} />

                {ad.active ? (
                  <span className="text-green-600">啟用中</span>
                ) : (
                  <span className="text-red-600">已停用</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
