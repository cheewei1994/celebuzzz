import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
const referer = request.headers.get("referer") || "";
const pathname = request.nextUrl.pathname;

if (
  (host === "miaodaily.com" ||
    host === "www.miaodaily.com") &&
  pathname.startsWith("/article/")
) {
  return NextResponse.next();
}

  // Admin login protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

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