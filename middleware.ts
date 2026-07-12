import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // miaodaily.com -> celebuzzz.com（仅文章）
  if (
    (hostname === "miaodaily.com" ||
      hostname === "www.miaodaily.com") &&
    pathname.startsWith("/article/")
  ) {
    const url = request.nextUrl.clone();

    url.hostname = "celebuzzz.com";
    url.protocol = "https:";
    url.port = ""; // ⭐ 防止 Coolify 带出 :3000

    return NextResponse.redirect(url, 301);
  }

  // Admin Login Protection
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token && pathname !== "/admin/login") {
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