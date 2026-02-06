import { cookies } from "next/headers";
import { GUEST_COOKIE_NAME } from "@/lib/auth/guest";

/** Get current user id for server components. Guest id from cookie (set by middleware). */
export async function getCurrentUserId(): Promise<string | null> {
  const c = await cookies();
  return c.get(GUEST_COOKIE_NAME)?.value ?? null;
}

/** Get user id from request (for API route handlers). */
export function getUserIdFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${GUEST_COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}
