import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-sm border p-8">

        <h1 className="text-4xl font-bold mb-8">
          免責聲明
        </h1>

        <div className="space-y-6 text-gray-700 leading-8">

          <p>
            歡迎使用喵喵網（以下簡稱「本網站」）。
            本網站所提供之所有資訊僅供一般參考用途，
            我們將盡力確保內容正確與即時，
            但不保證其完整性、準確性或適用性。
          </p>

          <section>
            <h2 className="text-xl font-bold mb-3">
              一、內容免責
            </h2>

            <p>
              本網站刊載之文章、圖片及其他資訊，
              可能來自公開資料、網路資訊整理、
              使用者投稿或第三方來源。
            </p>

            <p>
              本網站不對內容之正確性、
              完整性或即時性作任何明示或暗示保證。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              二、資訊使用風險
            </h2>

            <p>
              使用者應自行判斷資訊之真實性及適用性。
              因使用本網站內容所產生之任何損失、
              損害或法律責任，
              本網站概不負責。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              三、第三方連結
            </h2>

            <p>
              本網站可能包含指向第三方網站之連結。
              這些網站不受本網站控制，
              本網站不對其內容、
              隱私政策或服務負任何責任。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              四、版權聲明
            </h2>

            <p>
              本網站尊重智慧財產權。
              若您認為本網站內容涉及侵權，
              請透過
              <Link
                href="/dmca"
                className="text-blue-600 hover:underline mx-1"
              >
                DMCA 版權投訴
              </Link>
              與我們聯繫，
              我們將盡快處理。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              五、條款修改
            </h2>

            <p>
              本網站保留隨時修改本免責聲明內容之權利，
              更新後將直接公布於本頁面，
              恕不另行通知。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              六、聯絡我們
            </h2>

            <p>
              若您對本免責聲明有任何疑問，
              歡迎透過
              <Link
                href="/contact"
                className="text-blue-600 hover:underline mx-1"
              >
                聯絡我們
              </Link>
              與我們聯繫。
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}