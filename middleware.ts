import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // miaodaily.com -> celebuzzz.com
  if (
    host === "miaodaily.com" ||
    host === "www.miaodaily.com"
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "celebuzzz.com";
    url.protocol = "https:";

    return NextResponse.redirect(url, 308);
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