import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ["vi", "en"];
const defaultLocale = "vi";

function getLocaleFromPathname(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  return segment && locales.includes(segment) ? segment : null;
}

function getPreferredLocale(request: NextRequest): string {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && locales.includes(cookie)) return cookie;

  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const lang of acceptLang.split(",")) {
    const code = lang.split(";")[0]!.trim().substring(0, 2).toLowerCase();
    if (locales.includes(code)) return code;
  }

  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = await getToken({ req: request });
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPathname(pathname);

  if (pathnameLocale) {
    const response = NextResponse.next();
    response.cookies.set("locale", pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
