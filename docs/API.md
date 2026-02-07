# GurukulX API

REST API for managing **courses** (tracks) and **languages**. All request/response bodies are JSON.

**Requirement:** Course and language **write** endpoints (POST, PUT, DELETE) require `DATA_ADAPTER=supabase`. GET courses works with memory adapter too.

---

## Courses (tracks)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/courses` | List all courses |
| POST | `/api/courses` | Create a course |
| GET | `/api/courses/[id]` | Get one course (by id or slug) |
| PUT | `/api/courses/[id]` | Update a course |
| DELETE | `/api/courses/[id]` | Delete a course (cascades to phases, topics, content) |

### GET /api/courses

**Response:** `{ "courses": [ { "id", "slug", "name", "description", "order" }, ... ] }`

### POST /api/courses

**Body:**
- `slug` (string, required) – URL-safe identifier, e.g. `"web-dev"`
- `name` (string, required) – Display name, e.g. `"Web Dev"`
- `description` (string, optional) – Short description
- `order` (number, optional) – Sort order (default 0)
- `id` (string, optional) – Primary key; if omitted, a UUID is generated

**Response:** `{ "course": { ... } }`

### GET /api/courses/[id]

`[id]` can be the track `id` or `slug`.  
**Response:** `{ "course": { ... } }` or 404.

### PUT /api/courses/[id]

**Body:** any of `slug`, `name`, `description`, `order` (partial update).  
**Response:** `{ "course": { ... } }`

### DELETE /api/courses/[id]

Deletes the track and all its phases, topics, and content (DB cascade).  
**Response:** `{ "ok": true }`

---

## Languages

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/languages` | List all languages |
| POST | `/api/languages` | Create a language |
| GET | `/api/languages/[id]` | Get one language (by id or code) |
| PUT | `/api/languages/[id]` | Update a language |
| DELETE | `/api/languages/[id]` | Delete a language |

Requires Supabase and the `languages` table (run `007_languages_table.sql`).

### GET /api/languages

**Response:** `{ "languages": [ { "id", "code", "name", "order" }, ... ] }`

### POST /api/languages

**Body:**
- `code` (string, required) – e.g. `"en"`, `"hi"`
- `name` (string, required) – e.g. `"English"`, `"Hindi"`
- `order` (number, optional) – default 0
- `id` (string, optional) – if omitted, a UUID is generated

**Response:** `{ "language": { ... } }`

### GET /api/languages/[id]

`[id]` can be the language `id` or `code`.  
**Response:** `{ "language": { ... } }` or 404.

### PUT /api/languages/[id]

**Body:** any of `code`, `name`, `order`.  
**Response:** `{ "language": { ... } }`

### DELETE /api/languages/[id]

**Response:** `{ "ok": true }`

---

## Example: manage courses from JSON

You can keep a JSON file (e.g. `courses.json`) and sync via the API:

```json
[
  { "slug": "ai-ml", "name": "AI/ML", "description": "Python → ML → GenAI", "order": 0 },
  { "slug": "web-dev", "name": "Web Dev", "description": "HTML → JS → React", "order": 1 }
]
```

- **GET** `/api/courses` to list current courses.
- **POST** `/api/courses` with each object to create.
- **PUT** `/api/courses/:id` to update; **DELETE** `/api/courses/:id` to remove.

Same pattern works for `languages` with `/api/languages`.
