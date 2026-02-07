-- Delete all data from Supabase (GurukulX app tables).
-- Run this in Supabase SQL Editor when you want to wipe everything.
-- Tables are truncated in dependency order; CASCADE clears referenced rows.

TRUNCATE
  user_progress,
  user_notes,
  user_saves,
  topic_comments,
  content_items,
  topics,
  phases,
  tracks
RESTART IDENTITY CASCADE;
