export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <h1 className="text-4xl font-bold mb-6">
          聯絡我們
        </h1>

        <div className="space-y-6 text-gray-700 leading-8">
          <p>
            感謝您造訪喵喵網。
          </p>

          <p>
            如果您對網站內容有任何建議、合作提案、
            版權問題或其他相關事項，
            歡迎透過以下方式與我們聯繫。
          </p>

          <p className="mt-4">
  📧 電子郵件：

  <a
    href="mailto:miomionetwork@gmail.com"
    className="ml-2 text-blue-600 hover:underline font-medium"
  >
    miomionetwork@gmail.com
  </a>
</p>

          <p>
            我們將於收到來信後 3-7 個工作天內回覆。
          </p>

          <p>
            若您發現本站內容涉及版權、
            侵權或其他權利問題，
            請提供相關資料與證明文件，
            我們將盡快審核並處理。
          </p>
        </div>
      </div>
    </main>
  );
}