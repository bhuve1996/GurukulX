# GurukulX

Learn AI — notes, shorts, quizzes, practice. Layered and config-driven.

## Stack

- **Next.js 14** (App Router), TypeScript, Tailwind
- **Config** in `lib/config` — single source for env and adapter choice
- **Data layer** in `lib/data` — interfaces + adapters (memory, Supabase). Switch DB by config, not architecture.

## Run

```bash
npm install
npm run dev
```

Default data adapter is `memory` (no DB). To use Supabase:

1. Create a project at supabase.com, get URL and anon key.
2. Set in `.env`: `DATA_ADAPTER=supabase`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. In Supabase **SQL Editor**, run the migrations in order:
   - `000_content_tables.sql` (tracks, phases, topics, content_items — empty schema)
   - `001_notes_saves_comments_estimated_days.sql` (user_progress, user_notes, user_saves, topic_comments)
   - `007_languages_table.sql` (languages table, optional)
   Add courses and content via **API** (`POST /api/courses`, etc.) or your own import.

## Switching database

1. Implement a new adapter in `lib/data/adapters/<name>.ts` that satisfies `DataAdapter` in `lib/data/types.ts`.
2. Add the adapter name to `lib/config` and register it in `lib/data/index.ts`.
3. Set `DATA_ADAPTER=<name>` in env. No changes in app or components.

## Install on your iPhone (PWA)

GurukulX is a **Progressive Web App**: you can add it to your home screen and open it like an app.

1. Open the site in **Safari** on your iPhone (e.g. your deployed URL or `https://your-domain.com`).
2. Tap the **Share** button (square with arrow).
3. Scroll and tap **Add to Home Screen**.
4. Tap **Add**. An icon appears on your home screen; opening it launches GurukulX in standalone mode (no browser UI).

**Note:** For “Add to Home Screen” to work, the site must be served over **HTTPS** (e.g. Vercel, or your own SSL). `localhost` works for testing in Safari on your computer, but not for installing on the phone unless you use a tunnel (e.g. ngrok) or deploy first.

## Troubleshooting

**“An error occurred in the Server Components render” (production)**  
Usually means the app is using Supabase but the content tables are missing. Fix:

1. In Supabase Dashboard → **SQL Editor**, run **`000_content_tables.sql`** (creates empty `tracks`, `phases`, `topics`, `content_items`).
2. If you haven’t already, run **`supabase/migrations/001_notes_saves_comments_estimated_days.sql`** for progress, notes, saves, comments.
3. Add courses via API (`docs/API.md`) or use `DATA_ADAPTER=memory` for demo data.
4. Redeploy or refresh the app.


**Alternative:** Set `DATA_ADAPTER=memory` in your production env so the app uses in-memory data (no Supabase tables needed). Progress/notes/saves won’t persist across restarts.

## Cursor rules

- `.cursor/rules/layered-config-driven.mdc` — always apply: layered, config-driven; no direct DB in UI.
- `.cursor/rules/data-layer.mdc` — data layer conventions.
- `.cursor/rules/config.mdc` — config layer conventions.
