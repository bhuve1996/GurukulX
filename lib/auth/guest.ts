/**
 * Guest user id for progress/saves when no real auth.
 * Stored in cookie; middleware sets it on first visit.
 */

export const GUEST_COOKIE_NAME = "gurukulx_guest_id";

export function generateGuestId(): string {
  return `guest_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
