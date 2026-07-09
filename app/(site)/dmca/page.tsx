import Link from "next/link";

export default function DMCAPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-sm border p-8">

        
        <h1 className="text-4xl font-bold mb-6">
          DMCA 版權投訴
        </h1>

        <p className="text-gray-700 leading-8 mb-6">
          喵喵網尊重所有原創作者及版權持有人的合法權益。
          若您認為本網站上的任何內容侵犯了您的版權，
          請依照下列說明提交投訴通知，
          我們將盡快進行審核與處理。
        </p>

        {/* 提示框 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-amber-700">
            ⚠️ 提醒：提交 DMCA 投訴前，
            請確認您為版權所有人、
            授權代理人或依法有權提出相關請求。
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          投訴需包含以下資訊
        </h2>

        <ol className="space-y-3 text-gray-700 mb-10">
          <li>① 您的姓名與聯絡方式。</li>
          <li>② 被侵權作品的詳細說明。</li>
          <li>③ 涉嫌侵權內容的完整網址（URL）。</li>
          <li>④ 您擁有相關權利的證明文件。</li>
          <li>⑤ 聲明所提供資訊真實且準確。</li>
          <li>⑥ 電子簽名或真實姓名。</li>
        </ol>

        <h2 className="text-2xl font-bold mb-4">
          提交投訴
        </h2>

        <div className="bg-gray-50 border rounded-2xl p-5 mb-10">
  <p className="font-semibold mb-3">
    📩 DMCA 投訴信箱
  </p>

  <a
    href="mailto:miomionetwork@gmail.com"
    className="text-green-600 hover:underline font-medium"
  >
    miomionetwork@gmail.com
  </a>

  <p className="text-sm text-gray-500 mt-2">
    我們通常會在 3–5 個工作天內回覆並處理版權投訴。
  </p>
</div>

        <h2 className="text-2xl font-bold mb-4">
          處理流程
        </h2>

        <p className="text-gray-700 leading-8">
          收到有效 DMCA 通知後，
          我們將審核相關內容，
          如確認涉及侵權，
          將移除或限制顯示相關內容，
          並依照適用法律進行處理。
        </p>

        <div className="mt-10 pt-6 border-t text-sm text-gray-500">
          其它問題請參閱

          <Link
            href="/contact"
            className="text-blue-600 hover:underline mx-1"
          >
            聯絡我們
          </Link>

          或

          <Link
            href="/privacy-policy"
            className="text-blue-600 hover:underline mx-1"
          >
            隱私政策
          </Link>
        </div>

      </div>
    </main>
  );
}