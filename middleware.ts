import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    "User-Agent:",
    request.headers.get("user-agent")
  );

  const userAgent =
    request.headers.get("user-agent") || "";

  const host = request.headers.get("host");
  const referer =
    request.headers.get("referer") || "";

  const pathname = request.nextUrl.pathname;

  if (
    (host === "miaodaily.com" ||
      host === "www.miaodaily.com") &&
    pathname.startsWith("/article/")
  ) {
    // Facebook Bot 不跳转（测试）
    if (
      userAgent
        .toLowerCase()
        .includes("facebookexternalhit")
    ) {
      return NextResponse.next();
    }

    // 网站内部点击，不跳
    if (referer.includes("miaodaily.com")) {
      return NextResponse.next();
    }

    // 其他来源（Facebook、Google、直接访问等）跳转
    const url = request.nextUrl.clone();

    url.hostname = "www.celebuzzz.com";
    url.protocol = "https:";

    // ⭐ 新增这一行（解决 Coolify 带出 :3000）
    url.port = "";

    return NextResponse.redirect(url, 302);
  }

  // Admin login protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token =
      request.cookies.get("admin_token")?.value;

    const isLoginPage =
      request.nextUrl.pathname === "/admin/login";

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