import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    "User-Agent:",
    request.headers.get("user-agent")
  );

  const userAgent =
    request.headers.get("user-agent") || "";

  // ⭐ 改这里，不再使用 headers.get("host")
  const host = request.nextUrl.hostname;

  const referer =
    request.headers.get("referer") || "";

  const pathname = request.nextUrl.pathname;

  if (
    (host === "miaodaily.com" ||
      host === "www.miaodaily.com") &&
    pathname.startsWith("/article/")
  ) {
    // Facebook Bot 不跳转（保留）
    if (
      userAgent
        .toLowerCase()
        .includes("facebookexternalhit")
    ) {
      return NextResponse.next();
    }

    // 网站内部点击，不跳（保留）
    if (referer.includes("miaodaily.com")) {
      return NextResponse.next();
    }

    // ⭐ 保留你的原本逻辑
    const url = request.nextUrl.clone();

    url.hostname = "celebuzzz.com";
    url.protocol = "https:";

    // ⭐⭐⭐ Coolify 必须清掉 Port，否则会跳到 :3000
    url.port = "";

    return NextResponse.redirect(url, 302);
  }

  // Admin login protection（完全保留）
  if (pathname.startsWith("/admin")) {
    const token =
      request.cookies.get("admin_token")?.value;

    const isLoginPage =
      pathname === "/admin/login";

    if (!token && !isLoginPage) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};