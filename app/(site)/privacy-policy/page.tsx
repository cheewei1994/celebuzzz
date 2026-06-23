import Link from "next/link";
export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <h1 className="text-4xl font-bold mb-8">
          隱私政策
        </h1>

        <div className="space-y-6 text-gray-700 leading-8">
          <p>
            歡迎您使用喵喵網（以下簡稱「本網站」）。
            為了讓您安心使用本網站的各項服務與資訊，
            特此向您說明本網站的隱私權保護政策，
            以保障您的權益。
          </p>

          <section>
            <h2 className="text-xl font-bold mb-3">
              一、隱私權保護政策的適用範圍
            </h2>
            <p>
              本隱私權保護政策適用於您使用本網站服務時所蒐集、
              處理及利用的個人資料，但不適用於本網站以外的相關連結網站，
              也不適用於非本網站所委託或參與管理的人員。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              二、資料的蒐集方式
            </h2>
            <p>
              當您瀏覽本網站時，伺服器可能會自動記錄相關資訊，
              包括使用時間、瀏覽器類型、IP 位址、
              瀏覽及點擊紀錄等資料。
            </p>
            <p>
              上述資料僅作為網站流量分析、
              服務改善及安全維護之用途。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              三、Cookie 的使用
            </h2>
            <p>
              為提供更好的使用體驗，
              本網站可能使用 Cookie 技術來記錄使用者偏好設定及瀏覽行為。
            </p>
            <p>
              若您不願接受 Cookie，
              可於瀏覽器設定中調整隱私權等級，
              但部分功能可能因此無法正常運作。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              四、第三方廣告與分析服務
            </h2>
            <p>
              本網站可能使用第三方服務，
              包括但不限於 Google AdSense 及 Google Analytics。
            </p>
            <p>
              這些第三方服務可能透過 Cookie、
              網路信標（Web Beacon）或其他技術蒐集資訊，
              以提供廣告服務、分析網站流量及改善使用者體驗。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              五、資料保護
            </h2>
            <p>
              本網站採取合理的技術及管理措施，
              保護使用者資料安全，
              避免未經授權的存取、洩漏、
              竄改或毀損。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              六、外部連結
            </h2>
            <p>
              本網站可能包含其他網站之連結。
              對於該等外部網站的隱私權政策及內容，
              本網站不負任何責任，
              建議您於使用前自行查閱相關規定。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              七、政策修訂
            </h2>
            <p>
              本網站保留隨時修改本隱私權保護政策之權利。
              更新後的內容將公布於本頁面，
              恕不另行通知。
            </p>
          </section>

          <section>
  <h2 className="text-xl font-bold mb-3">
    八、聯絡我們
  </h2>

  <p>
    若您對本隱私權保護政策有任何疑問，
    歡迎透過

    <Link
      href="/contact"
      className="text-blue-600 hover:underline font-medium mx-1"
    >
      聯絡我們
    </Link>

    頁面與我們聯繫。
  </p>
</section>
        </div>
      </div>
    </main>
  );
}