-- Progress (mark done)
CREATE TABLE IF NOT EXISTS user_progress (
  user_id text NOT NULL,
  item_id text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, item_id)
);

-- User notes (per item)
CREATE TABLE IF NOT EXISTS user_notes (
  user_id text NOT NULL,
  item_id text NOT NULL,
  body text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, item_id)
);

-- User saves (bookmarks)
CREATE TABLE IF NOT EXISTS user_saves (
  user_id text NOT NULL,
  item_id text NOT NULL,
  saved_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, item_id)
);

-- Topic comments (community)
CREATE TABLE IF NOT EXISTS topic_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id text NOT NULL,
  user_id text NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS topic_comments_topic_id ON topic_comments(topic_id);

-- Optional: add estimated_days to phases and topics if your tables exist
-- ALTER TABLE phases ADD COLUMN IF NOT EXISTS estimated_days integer;
-- ALTER TABLE topics ADD COLUMN IF NOT EXISTS estimated_days integer;
