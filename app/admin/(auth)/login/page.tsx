"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (res.ok) {
      window.location.href =
        "/admin";
    } else {
      alert("帳號或密碼錯誤");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white border rounded-xl shadow-sm w-full max-w-md p-8">

        <div className="flex items-center gap-2 mb-1">
          <span className="text-green-600 text-xl">
            🔒
          </span>

          <h1 className="text-xl font-bold">
            後台登入
          </h1>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          本管理員登入
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              電子郵件
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              密碼
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
          >
            登入
          </button>

<div className="text-center mt-4">
  <Link
    href="/admin/forgot-password"
    className="text-sm text-blue-600 hover:underline"
  >
    忘記密碼？
  </Link>
</div>

        </form>

      </div>
    </div>
  );
}