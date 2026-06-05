export default function DmcaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">
        DMCA Copyright Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-8">
        <p>
          喵喵網尊重他人的智慧財產權，
          並遵守《Digital Millennium Copyright Act (DMCA)》。
        </p>

        <p>
          如果您認為本網站上的任何內容侵犯了您的版權，
          請向我們提交版權投訴通知。
        </p>

        <p>
          您的通知應包含：
        </p>

        <ul className="list-disc pl-6">
          <li>版權所有者身份證明</li>
          <li>被侵權作品描述</li>
          <li>侵權內容網址</li>
          <li>聯絡方式</li>
          <li>聲明您為合法權利人</li>
        </ul>

        <p>
          聯絡信箱：
        </p>

        <p className="font-semibold text-lg">
          dmca@miaomiao.com
        </p>

        <p>
          收到有效通知後，
          我們將儘快審核並移除相關內容。
        </p>
      </div>
    </main>
  );
}