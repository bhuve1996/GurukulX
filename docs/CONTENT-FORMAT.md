# Content format and structure

This doc describes the **expected structure and format** of course content so that:
1. You can create content in the right shape (JSON or for import).
2. **Reading all content in order gives a learner full, in-depth understanding of the whole course.**

---

## Hierarchy

```
Track (course) → Phase → Topic → Content items (cards)
```

- **Track:** One course (e.g. "Web Dev", "AI Basics").
- **Phase:** A major section of the course (e.g. "Frontend", "Week 1–2").
- **Topic:** A specific concept or unit (e.g. "React hooks", "Variables").
- **Content item:** A single card: short (for feed/topic cards) + full body (for in-depth reading).

---

## 1. Track (course)

| Field         | Type   | Required | Notes |
|---------------|--------|----------|--------|
| `id`          | string | yes*     | UUID; can be generated if omitted in API. |
| `slug`        | string | yes      | URL-safe, unique (e.g. `web-dev`). |
| `name`        | string | yes      | Display name (e.g. "Web Development"). |
| `description` | string | no       | One or two sentences about the course. |
| `order`       | number | no       | Sort order (default 0). |

**Example JSON:**
```json
{
  "id": "uuid-optional-for-api",
  "slug": "web-dev",
  "name": "Web Development",
  "description": "From HTML/CSS to a full stack app.",
  "order": 0
}
```

---

## 2. Phase

| Field           | Type   | Required | Notes |
|-----------------|--------|----------|--------|
| `id`            | string | yes*     | UUID. |
| `track_id`      | string | yes      | Parent track `id`. |
| `slug`          | string | yes      | URL-safe (e.g. `frontend-basics`). |
| `name`          | string | yes      | Display name. |
| `order`         | number | no       | Order within track. |
| `estimated_days`| number | no       | e.g. 7 → shown as "~7 days". |

**Example JSON:**
```json
{
  "id": "phase-uuid",
  "track_id": "track-uuid",
  "slug": "frontend-basics",
  "name": "Frontend basics",
  "order": 0,
  "estimated_days": 7
}
```

---

## 3. Topic

| Field           | Type   | Required | Notes |
|-----------------|--------|----------|--------|
| `id`            | string | yes*     | UUID. |
| `phase_id`      | string | yes      | Parent phase `id`. |
| `slug`          | string | yes      | URL-safe (e.g. `react-hooks`). |
| `name`          | string | yes      | Display name. |
| `order`         | number | no       | Order within phase. |
| `estimated_days`| number | no       | e.g. 3 → "~3 days". |

**Example JSON:**
```json
{
  "id": "topic-uuid",
  "phase_id": "phase-uuid",
  "slug": "react-hooks",
  "name": "React hooks",
  "order": 0,
  "estimated_days": 3
}
```

---

## 4. Content item (card)

Each item is one **card**: it has a **short** version (for feed/topic preview) and a **full** version (for in-depth reading). The app assumes: **if a learner reads every item’s full body in order, they understand the whole course in depth.**

| Field       | Type   | Required | Notes |
|------------|--------|----------|--------|
| `id`       | string | yes*     | UUID. |
| `topic_id` | string | yes      | Parent topic `id`. |
| `type`     | string | yes      | One of: `note`, `short`, `quiz`, `practice`. |
| `title`    | string | yes      | Clear, descriptive title. |
| `body`     | string | no*      | **Full content.** See word expectations below. |
| `short_body` | string | no     | **Short summary.** See word expectations below. |
| `image_url` | string | no      | Card image (recommended for notes/shorts). |
| `video_url` | string | no      | Optional video (YouTube/Vimeo or direct URL). |
| `order`    | number | no       | Order within topic (default 0). |

\* In the app, if `short_body` is missing or very short (&lt; 120 characters), the card uses `body` for the preview. So either provide a real `short_body` or a `body` that works as both.

### Word/length expectations

- **short_body (short notes / card preview)**  
  - **Length:** About **80–150 words** (or at least **~120 characters** so the app uses it on cards).  
  - **Purpose:** One quick “bite”: the core idea so someone gets the takeaway without opening the full item.  
  - **Style:** Complete thought, no cliffhangers. A learner scrolling only shorts should still get the main concepts; for full depth they read the body.

- **body (full content)**  
  - **Length:** As long as needed to explain the concept **in depth** (often **150–500+ words** per item, depending on topic).  
  - **Purpose:** This is the main learning content. **Reading every item’s `body` in order should be enough to understand the whole course in depth.**  
  - **Style:** Clear explanations, examples, steps, or key facts. No critical information only in videos; summarize in text so the course is understandable even without video.

- **Principle:**  
  - **Shorts** = quick scan, main idea.  
  - **Full body** = full understanding.  
  - Together, they support both “quick browse” and “deep read” without losing depth.

### Content types

- **note** – Explanatory content (text + optional image/video).
- **short** – Same structure; use when the item is intentionally a single, concise lesson.
- **quiz** – Placeholder for future quiz UI; for now use `body` (and optional `short_body`) like a note.
- **practice** – Placeholder for future practice UI; for now use `body` (and optional `short_body`) like a note.

### Example content item JSON

```json
{
  "id": "item-uuid",
  "topic_id": "topic-uuid",
  "type": "note",
  "title": "What are React hooks?",
  "short_body": "Hooks are functions that let you use state and other React features in function components. useState and useEffect are the most common. They replace class lifecycle and state with a simpler, composable API.",
  "body": "React Hooks (introduced in React 16.8) let you use state and other React features without writing a class.\n\n**useState** holds a value that can change; when you update it, the component re-renders.\n\n**useEffect** runs side effects (e.g. fetching data, subscribing) after render; you can depend on specific values and clean up on unmount.\n\nOther hooks (useContext, useRef, useMemo, etc.) follow the same idea: reusable logic tied to the component lifecycle. Rules: only call hooks at the top level and from React functions (components or custom hooks).\n\nExample: [optional code or link]",
  "image_url": "https://example.com/react-hooks.png",
  "video_url": "https://www.youtube.com/watch?v=...",
  "order": 0
}
```

### Example “card” shape (for your own tools or import)

You can think of each content item as a **card** with:

- **Card preview (feed / topic list):** `title` + `short_body` (or first part of `body` if no `short_body`) + `image_url`.
- **Full card (when opened):** `title` + `body` + optional `image_url` / `video_url`.

So when you create content:

- Every card has a **title** and a **full body** that teaches the concept in depth.
- Every card has a **short** (or a body long enough to use as short) so the feed and topic pages make sense.
- **Order** of items within a topic = recommended reading order; the whole sequence should form a coherent, in-depth course.

---

## 5. Full course JSON (logical shape)

You can structure a full course in one JSON for import or reference (IDs and references depend on your import script):

```json
{
  "track": {
    "slug": "web-dev",
    "name": "Web Development",
    "description": "From HTML to a full stack app."
  },
  "phases": [
    {
      "slug": "frontend-basics",
      "name": "Frontend basics",
      "order": 0,
      "estimated_days": 7,
      "topics": [
        {
          "slug": "react-hooks",
          "name": "React hooks",
          "order": 0,
          "estimated_days": 3,
          "content_items": [
            {
              "type": "note",
              "title": "What are React hooks?",
              "short_body": "80–150 words: the one main idea.",
              "body": "150–500+ words: full explanation so the course is understandable in depth.",
              "image_url": "https://...",
              "video_url": "https://...",
              "order": 0
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 6. Checklist for “whole course in depth”

When you create content in this format:

1. **Tracks and phases** – Clear course and section names; order matches learning path.
2. **Topics** – One clear concept per topic; order matches dependencies.
3. **Each content item:**
   - **title** – Describes what the card teaches.
   - **short_body** – ~80–150 words (or ≥120 chars); one takeaway.
   - **body** – Full explanation; no critical knowledge only in video.
4. **Order** – Reading all `body` text in track → phase → topic → item order explains the **whole course in depth**.
5. **image_url** – Recommended for notes/shorts so cards look good and PWA feed works well.
6. **video_url** – Optional; use to supplement, not replace, the in-depth text in `body`.

If you follow this structure and word expectations, learners can understand the full course by reading the content you provide.
