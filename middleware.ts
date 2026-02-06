import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GUEST_COOKIE_NAME, generateGuestId } from "@/lib/auth/guest";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  if (!request.cookies.get(GUEST_COOKIE_NAME)) {
    res.cookies.set(GUEST_COOKIE_NAME, generateGuestId(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] };
