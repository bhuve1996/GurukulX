-- Backfill image_url for any content_items that have NULL (e.g. from older seed).
-- Uses a default learning/code image so every card has an image.
UPDATE content_items
SET image_url = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
WHERE image_url IS NULL;
