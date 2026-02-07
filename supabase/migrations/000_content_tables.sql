-- Content tables (courses: tracks → phases → topics → content_items).
-- Run in Supabase SQL Editor. No seed data; add courses via API or import.

CREATE TABLE IF NOT EXISTS tracks (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  "order" integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS phases (
  id text PRIMARY KEY,
  track_id text NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  estimated_days integer
);

CREATE TABLE IF NOT EXISTS topics (
  id text PRIMARY KEY,
  phase_id text NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  estimated_days integer
);

CREATE TABLE IF NOT EXISTS content_items (
  id text PRIMARY KEY,
  topic_id text NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  short_body text,
  image_url text,
  video_url text,
  "order" integer NOT NULL DEFAULT 0
);
