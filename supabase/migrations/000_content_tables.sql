-- Content tables required when using DATA_ADAPTER=supabase
-- Run this in Supabase SQL Editor if you see "table tracks does not exist" or similar.

-- Tracks
CREATE TABLE IF NOT EXISTS tracks (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  "order" integer NOT NULL DEFAULT 0
);

-- Phases
CREATE TABLE IF NOT EXISTS phases (
  id text PRIMARY KEY,
  track_id text NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  estimated_days integer
);

-- Topics
CREATE TABLE IF NOT EXISTS topics (
  id text PRIMARY KEY,
  phase_id text NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  estimated_days integer
);

-- Content items
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

-- Seed data (same as memory adapter)
INSERT INTO tracks (id, slug, name, description, "order") VALUES
  ('1', 'ai-ml', 'AI/ML', 'Python → Data → ML → Deep Learning → GenAI → CV → MLOps', 0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, track_id, slug, name, "order", estimated_days) VALUES
  ('1', '1', 'python', 'Python', 0, 7),
  ('2', '1', 'data', 'Data', 1, 7),
  ('3', '1', 'ml', 'ML', 2, 14),
  ('4', '1', 'deep-learning', 'Deep Learning', 3, 14),
  ('5', '1', 'nlp-genai', 'NLP / LLMs / GenAI', 4, 14),
  ('6', '1', 'computer-vision', 'Computer Vision', 5, 7),
  ('7', '1', 'deployment', 'Deployment', 6, 5),
  ('8', '1', 'mlops', 'MLOps', 7, 7),
  ('9', '1', 'capstone', 'Capstone', 8, 14)
ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, phase_id, slug, name, "order", estimated_days) VALUES
  ('1', '1', 'basics', 'Basics', 0, 3),
  ('2', '1', 'libraries', 'Libraries', 1, 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('1', '1', 'note', 'Why Python for AI?',
   'Python is the go-to language for AI and ML: clear syntax, huge ecosystem (NumPy, PyTorch, TensorFlow), and great community. Start here.',
   'Python: clear syntax, huge ecosystem (NumPy, PyTorch, TensorFlow), great community. Start here.',
   'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80', NULL, 0),
  ('2', '1', 'short', 'Variables and types',
   'Use clear names. Prefer type hints: `name: str`, `count: int`. Keep it readable.',
   'Clear names. Prefer type hints: name: str, count: int. Keep it readable.',
   NULL, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
  ('3', '1', 'note', 'Your first script',
   'Create a `.py` file, run with `python file.py`. Use `print()` to see output. Small steps.',
   'Create a .py file, run with python file.py. Use print() to see output.',
   NULL, NULL, 2)
ON CONFLICT (id) DO NOTHING;
