-- Languages table for UI locale / course language support.
-- Run after 001. Optional: use for i18n or "course available in these languages".

CREATE TABLE IF NOT EXISTS languages (
  id text PRIMARY KEY,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  "order" integer NOT NULL DEFAULT 0
);

-- Example seed (optional; remove if you manage via API only)
INSERT INTO languages (id, code, name, "order") VALUES
  ('1', 'en', 'English', 0),
  ('2', 'hi', 'Hindi', 1)
ON CONFLICT (id) DO NOTHING;
