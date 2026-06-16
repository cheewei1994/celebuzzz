"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch(
      "/api/admin/logout",
      {
        method: "POST",
      }
    );

    window.location.href =
      "/admin/login";
  }

  return (
    <button
      onClick={logout}
      className="block w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-left"
    >
      🚪 退出登入
    </button>
  );
}