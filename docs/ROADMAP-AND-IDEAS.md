# GurukulX — What’s Done, What’s Left, and Ideas

## 1. Implementation status: what’s done vs what’s left

### Done

| Area | Status |
|------|--------|
| **Architecture** | Layered, config-driven. Data adapter (memory/Supabase) swappable. |
| **Config** | Single source in `lib/config`; `DATA_ADAPTER` drives DB choice. |
| **Data model** | Tracks → Phases → Topics → Content items. Content has `imageUrl`, `videoUrl`, `body`, `shortBody`, `type`. |
| **App shell** | Responsive header + nav (Home, Learn, Today, Saved). |
| **Learn flow** | Learn → Track → Phase → Topic → list of content items. Breadcrumbs throughout. |
| **Content display** | Notes/shorts with title, body, image (next/image), video (YouTube/embed or `<video>`). |
| **Today** | One “bite” per day from first topic (date-based index). Link to full topic. |
| **Guest auth** | Cookie-based guest id (middleware); used for progress without sign-up. |
| **Progress** | Mark done (API + UI), “X of Y done” on topic, done flag (✓ Done badge). Memory + Supabase adapters. |
| **Shorts UX** | `/learn/.../shorts` card stack: short body, Previous/Next, “View full” (hash to item), Mark done. |
| **Saved** | Stub page only (no save button or list yet). |
| **Cursor rules** | Layered + config-driven, data layer, config. |

### Not done (what’s left)

| Area | What’s missing |
|------|----------------|
| **Real auth** | No sign up / login (Supabase Auth etc.). Guest works for progress. |
| **User notes** | No per-item or per-topic user notes. |
| **Saved / bookmarks** | No save button, no list of saved items. |
| **Estimated duration** | No “how many days” for a track/phase/topic. |
| **What’s next / related** | No “next item” link, “continue where you left off” on Home. |
| **Daily logic** | Today uses a simple modulo; no configurable schedule. |
| **Community** | No discussion/comments (planned for later). |
| **Supabase** | Adapter + progress table; add `user_progress` table and optional `short_body` on content. |

**Supabase:** For progress with Supabase, create table:
`user_progress (user_id text, item_id text, completed_at timestamptz, primary key (user_id, item_id))`.

---

## 2. Progress: done count, days left, mark done, notes

### Ideas

- **Mark as done**  
  - User can mark a **content item** (or optionally a topic) as done.  
  - Stored per user (needs auth + DB: e.g. `user_progress` or `completions`).

- **What’s done / how many days**  
  - **Done**: “3 of 12 items done” (per topic or phase).  
  - **Days left**:  
    - Option A: **Config** — e.g. “Python phase: 7 days” in content config; show “~7 days” for the phase.  
    - Option B: **Derived** — e.g. “1 item per day” → days left = (total items − done).  
  - Best: **config per phase/topic** (e.g. `estimatedDays`) + optional “1 per day” mode. Show “~5 days left” from remaining items or from estimate.

- **User notes**  
  - Allow notes on a **content item** (or on a topic).  
  - Table: `user_notes(item_id, user_id, content, created_at)`.  
  - UI: “Add note” on item; show note count or snippet in list; expand to read/edit.

### Data layer (when you add it)

- **Progress**: `user_id`, `item_id` (or `topic_id`), `completed_at`.  
- **Notes**: `user_id`, `item_id` (or `topic_id`), `body`, `updated_at`.  
- **Estimates**: either on Phase/Topic in config/DB (e.g. `estimatedDays`) or a simple rule (“1 item/day”).

---

## 3. Shorts-style UX (InShorts-like)

### Concept

- **Card = one screen on mobile**  
  - Headline + very short body (e.g. &lt;100 words) or “fits one screen” (no scroll).  
  - Optional image/video; keep card height consistent (e.g. full viewport or 90vh).

- **Tap / action = “view in detail”**  
  - Same content in full (current ContentBlock style): full body, media, maybe user notes.  
  - Or “Expand” button that opens a sheet/modal or navigates to item detail.

- **Swipe = mark done**  
  - Swipe right (or a “Done” button) marks item complete and optionally advances to next.  
  - Small **UI flag** (e.g. checkmark, green dot, “Done” badge) on the card or in the list when completed.

- **Flow**  
  - Today or a topic can be a **vertical stack of cards** (one per item).  
  - Swipe or tap “Next” → next card.  
  - “Expand” → full view.  
  - “Mark done” (or swipe) → persist completion + show next.

### What we need

- **Content shape**  
  - Either:  
    - **Short version** on each item (e.g. `shortBody` or `summary` &lt;100 words), and `body` = full; or  
    - **Single body** and we truncate for card (e.g. first 100 words + “Read more”).  
  - Config or type: e.g. “short” type = one-screen card; “note” = default to full.

- **UI**  
  - **Shorts view**: one card per item; swipe/tap to next; “Expand” and “Mark done” (or swipe-to-done).  
  - **List view**: keep current topic page; add a “Shorts” mode toggle or a “Play shorts” entry that opens the card stack for that topic.  
  - **Flag**: show a done indicator on the card and in the list (e.g. check icon, or “Done” pill).

### Best learning angle

- **Low friction**: one screen → read → done → next. Good for “one bite per day” and revision.  
- **Depth when needed**: tap to expand so serious learners can go full detail.  
- **Clear progress**: swipe = done gives a satisfying “finished” signal and makes “what’s next” obvious.

---

## 4. What’s next / what it’s related to

### “What’s next”

- **Next item**  
  - After current item in the same topic: “Next: Variables and types”.  
  - At end of topic: “Next topic: Libraries” or “Next phase: Data”.

- **Continue where you left off**  
  - Home or Today: “Continue: Python → Basics → Variables and types” (first incomplete item in track).

- **Today**  
  - Can be “next incomplete item” instead of (or in addition to) “one random/fixed item per day”.

### “Related”

- **Same topic**  
  - Other items in the same topic (we already show them in order).

- **Same phase**  
  - “More in Python: Basics, Libraries”.

- **Prereq / next phase**  
  - e.g. “After Python: Data” (we have phases in order; we can add “Related phases” or “Next phase”).

- **Backend**  
  - Optional: `relatedTopicIds` or `nextPhaseId` in config/DB.  
  - Simpler: **order** only — next = next item in topic; next topic in phase; next phase in track.

Recommendation: **start with order-based “next”** (next item, next topic, next phase). Add explicit “related” links later if you want cross-links.

---

## 5. What would make learning here “best” (opinion)

- **One clear action**  
  - “Today’s bite” or “Continue” so the user always has a single next step.

- **Shorts for habit**  
  - One-screen cards, swipe = done, so daily use is quick and satisfying.

- **Depth on demand**  
  - Tap to expand to full note/video so motivated learners aren’t stuck with only 100 words.

- **Visible progress**  
  - “3/12 done”, “~5 days left”, and a done flag on cards so progress feels real.

- **Lightweight notes**  
  - Per-item notes so users can attach “my take” or reminders without leaving the app.

- **No clutter**  
  - Avoid too many modes; e.g. one “Shorts” entry per topic (or per Today) rather than duplicating every screen.

---

## 6. Suggested order to build (after discussion)

1. **Auth** (Supabase Auth or similar) so progress and notes are per user.  
2. **Progress**  
   - Tables + adapter methods: mark done, list completed.  
   - UI: “Mark done” on content item, and show “X of Y done” (and optionally “~N days left” from config or 1/day).  
3. **Shorts UX**  
   - Add `shortBody` or use truncation; build card stack (one card per item, swipe/tap next, “Expand”, “Mark done” + done flag).  
4. **User notes**  
   - Table + adapter; “Add note” on item; show in full view.  
5. **What’s next**  
   - “Next” link (next item / topic / phase); “Continue where you left off” on Home/Today.  
6. **Saved**  
   - Save/bookmark API + UI; Saved page = list of saved items.  
7. **Estimated days**  
   - Config or DB field (e.g. `estimatedDays` per phase/topic); show in phase/topic header.

---

## 7. Summary

- **Complete today**: Read-only Learn flow, Today, responsive shell, images/videos, config-driven data.  
- **Not yet**: Auth, progress/done, user notes, saved list, shorts UX, estimated days, “what’s next”/“continue”, community.  
- **High impact next**: Auth → progress (mark done + counts/days) → shorts-style cards (one screen, swipe = done, expand for detail) → “what’s next”/continue.  
- **Nice to have**: User notes, saved, explicit “related” links, then community.

If you want to move ahead, we can next: (a) add progress + “mark done” + “X of Y” (with or without auth stub), or (b) add the shorts card view and swipe/done flag for one topic, or (c) lock the data model and API for progress/notes and then implement UI. Your call.
