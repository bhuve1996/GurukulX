# Adding multiple courses

## How it works today

**One course = one Track.** The app is already built for multiple courses.

- **Track** = course (e.g. "AI/ML", "Web Dev"). Has: `id`, `slug`, `name`, `description`, `order`.
- **Phase** = section inside a track (e.g. "Python", "Data"). Belongs to one track (`track_id`).
- **Topic** = unit inside a phase (e.g. "Basics", "Libraries"). Belongs to one phase (`phase_id`).
- **Content item** = one card/short (note, short, quiz, practice). Belongs to one topic (`topic_id`).

So: **Track → Phase → Topic → Content**. Add a new course = add a new track + its phases, topics, and content.

---

## Where multiple tracks are used

| Place | Behavior |
|-------|----------|
| **Learn** (`/learn`) | Lists all tracks. Each track links to `/learn/{trackSlug}`. |
| **Home feed** | Shows content from **all tracks** in one feed, ordered by track `order` then phase → topic → item order. |
| **Today** | "Continue" = first incomplete item in that combined feed (any track). |
| **Saved** | Shows saved items from any track; breadcrumb is e.g. "AI/ML → Python → Basics". |
| **URLs** | `/learn/{trackSlug}/{phaseSlug}/{topicSlug}` — track is in the path, so each course has its own tree. |

No code change is required for multiple courses; you only add data.

---

## Adding a second course (Supabase)

1. **Insert the track** (e.g. "Web Dev"):

```sql
INSERT INTO tracks (id, slug, name, description, "order") VALUES
  ('2', 'web-dev', 'Web Dev', 'HTML/CSS → JS → React → Backend → Full-stack', 1)
ON CONFLICT (id) DO NOTHING;
```

2. **Insert phases** for that track (use `track_id = '2'`):

```sql
INSERT INTO phases (id, track_id, slug, name, "order", estimated_days) VALUES
  ('10', '2', 'html-css', 'HTML & CSS', 0, 7),
  ('11', '2', 'javascript', 'JavaScript', 1, 14)
ON CONFLICT (id) DO NOTHING;
```

3. **Insert topics** for each phase (`phase_id` = one of the new phase ids):

```sql
INSERT INTO topics (id, phase_id, slug, name, "order", estimated_days) VALUES
  ('20', '10', 'basics', 'Basics', 0, 3),
  ('21', '10', 'layout', 'Layout', 1, 4)
ON CONFLICT (id) DO NOTHING;
```

4. **Insert content_items** for each topic (`topic_id` = one of the new topic ids). Reuse the same shape: `id`, `topic_id`, `type`, `title`, `body`, `short_body`, `image_url`, `video_url`, `order`. Keep `id` globally unique (e.g. start from `'100'` for the new course so they don’t clash with AI/ML ids 1–56).

5. **Optional:** Run a short-body migration (like 005) for the new course’s content so cards have good summaries.

After that, **Learn** will show "Web Dev" as a second card, and the **home feed** will mix AI/ML and Web Dev content (by track `order`, then phase/topic/item order).

---

## Adding a second course (memory adapter)

In `lib/data/adapters/memory.ts`:

1. **Append to `tracks`** — e.g. `{ id: '2', slug: 'web-dev', name: 'Web Dev', description: '...', order: 1 }`.
2. **Append to `phases`** — entries with `trackId: '2'` and new ids (e.g. `'10'`, `'11'`).
3. **Append to `topics`** — entries with `phaseId: '10'` / `'11'` and new ids.
4. **Append to `content`** — entries with `topicId` pointing at those topics, and unique `id`s.

The feed and Learn page will pick up the new track automatically.

---

## Ordering

- **Track order:** `tracks.order` (e.g. 0 = AI/ML, 1 = Web Dev). Home feed and Learn list tracks by this.
- **Phase / topic / content order:** `phases.order`, `topics.order`, `content_items.order` within their parent.

So "first course" = track with smallest `order`; within a course, order is phase → topic → item by respective `order`.

---

## Optional: feed per course

Right now the home feed is **one combined feed** for all tracks. If you want "Home = only one course" or "Switch course on home":

- You could add a **course/track selector** on the home or Today page and pass `trackId` (or `trackSlug`) into `getFeed` by filtering `tracks` to that one track before building the feed.
- Or keep the current behavior (one mixed feed) and use Learn when you want to browse by course.

The data model and URLs already support multiple courses; the only decision is whether the home feed stays mixed or becomes per-course.
