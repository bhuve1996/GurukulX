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
3. Create tables matching `lib/data/types.ts` (tracks, phases, topics, content_items).

## Switching database

1. Implement a new adapter in `lib/data/adapters/<name>.ts` that satisfies `DataAdapter` in `lib/data/types.ts`.
2. Add the adapter name to `lib/config` and register it in `lib/data/index.ts`.
3. Set `DATA_ADAPTER=<name>` in env. No changes in app or components.

## Cursor rules

- `.cursor/rules/layered-config-driven.mdc` — always apply: layered, config-driven; no direct DB in UI.
- `.cursor/rules/data-layer.mdc` — data layer conventions.
- `.cursor/rules/config.mdc` — config layer conventions.
