import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold mb-2">
          忘記密碼
        </h1>

        <p className="text-gray-500 mb-6">
          請聯絡網站管理員重設密碼。
        </p>

        <Link
          href="/admin/login"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg"
        >
          返回登入
        </Link>

      </div>
    </div>
  );
}