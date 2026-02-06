# GurukulX — What’s done and what’s not

## Do I need Supabase URL for login?

**No.** Everything works without Supabase.

- **Default** is the **memory** adapter: no DB, no env vars. Progress is stored in memory (resets on restart) and tied to a **guest cookie**.
- You only add Supabase when you want:
  - **Persistent progress** across devices and restarts, or
  - **Real sign up / login** (Supabase Auth).

Until then: run `npm run dev`, use the app; progress and shorts work with the guest cookie.

---

## What’s done (works now)

| Feature | Status |
|--------|--------|
| Learn flow | Tracks → Phases → Topics → content. Breadcrumbs. |
| **Shorts first** | Topic page shows short cards (image + title + text) with “Part of [Topic]”. Tap card or expand icon → scroll to full content. |
| **Full content** | Full content section below shorts; mark done, “X of Y done”. |
| **Mark done** | Button on each item; “✓ Done” badge; progress stored (guest cookie + memory). |
| **Play shorts in sequence** | Link to `/learn/.../shorts` for card-by-card flow. |
| Today | One bite per day from first topic. |
| Saved | Stub only (no save/list yet). |
| Responsive shell | Header, nav, mobile-friendly. |

---

## What’s not done (optional later)

| Feature | Notes |
|--------|--------|
| **Supabase / login** | Not required. Add when you want persistent progress or real auth. |
| User notes | Per-item notes. |
| Saved / bookmarks | Save button and Saved list. |
| Estimated days | “~N days left” for a phase/topic. |
| What’s next / Continue | “Next item”, “Continue where you left off” on Home. |
| Community | Discussion/comments. |

---

## If you add Supabase later

1. Create a project at supabase.com.
2. In `.env`: `DATA_ADAPTER=supabase`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Create tables (tracks, phases, topics, content_items, and `user_progress` for progress).
4. For login: add Supabase Auth and wire sign-in/sign-up; keep using the same progress API with the real user id.

No code changes in app or components; only config and DB.
