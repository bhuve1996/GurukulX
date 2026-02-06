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

-- Content: summaries that explain the topic; image mandatory; add Watch/Read links in body for clarity.
INSERT INTO content_items (id, topic_id, type, title, body, short_body, image_url, video_url, "order") VALUES
  ('1', '1', 'note', 'Why Python for AI?',
   'Python is the standard language for AI and ML: readable syntax, a huge ecosystem (NumPy, Pandas, PyTorch, TensorFlow, scikit-learn), and strong community support. Most research and production ML code is written in Python.' || E'\n\n' || 'Watch: https://www.youtube.com/watch?v=kqtD5dpn9C0' || E'\n' || 'Read: https://www.python.org/about/',
   'Python: readable syntax, huge ecosystem (NumPy, PyTorch, TensorFlow), great for AI/ML. Start here.',
   'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80', NULL, 0),
  ('2', '1', 'short', 'Variables and types',
   'Use clear variable names. Prefer type hints for readability: name: str, count: int, price: float. They help tools and other developers understand your code. Start with simple types and add hints as you go.' || E'\n\n' || 'Watch: https://www.youtube.com/watch?v=0sOvCWFmrtA',
   'Clear names. Prefer type hints: name: str, count: int. Keeps code readable.',
   'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', 'https://www.youtube.com/embed/0sOvCWFmrtA', 1),
  ('3', '1', 'note', 'Your first script',
   'Create a .py file and run it with: python file.py. Use print() to see output. Keep scripts small and run them often to catch errors early.' || E'\n\n' || 'Read: https://docs.python.org/3/tutorial/interpreter.html',
   'Create a .py file, run with python file.py. Use print() to see output.',
   'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', NULL, 2)
ON CONFLICT (id) DO NOTHING;
