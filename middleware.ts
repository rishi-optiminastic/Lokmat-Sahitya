import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(/|$)`);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/sahitya-assets") ||
    pathname === "/favicon.ico" ||
    /\.(ico|png|jpg|jpeg|gif|webp|svg|txt|xml|json|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  if (!LOCALE_PREFIX.test(pathname)) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|sahitya-assets).*)"],
};
