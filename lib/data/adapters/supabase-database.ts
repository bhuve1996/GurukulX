/**
 * Minimal Supabase Database type for our schema.
 * Without this, createClient() infers table row types as `never` and upsert/insert fail at compile time.
 */

export interface Database {
  public: {
    Tables: {
      tracks: {
        Row: { id: string; slug: string; name: string; description: string | null; order: number };
        Insert: { id: string; slug: string; name: string; description?: string | null; order?: number };
        Update: Partial<{ slug: string; name: string; description: string | null; order: number }>;
      };
      phases: {
        Row: { id: string; track_id: string; slug: string; name: string; order: number; estimated_days: number | null };
        Insert: { id: string; track_id: string; slug: string; name: string; order?: number; estimated_days?: number | null };
        Update: Partial<{ track_id: string; slug: string; name: string; order: number; estimated_days: number | null }>;
      };
      topics: {
        Row: { id: string; phase_id: string; slug: string; name: string; order: number; estimated_days: number | null };
        Insert: { id: string; phase_id: string; slug: string; name: string; order?: number; estimated_days?: number | null };
        Update: Partial<{ phase_id: string; slug: string; name: string; order: number; estimated_days: number | null }>;
      };
      content_items: {
        Row: {
          id: string;
          topic_id: string;
          type: string;
          title: string;
          body: string | null;
          short_body: string | null;
          image_url: string | null;
          video_url: string | null;
          order: number;
        };
        Insert: {
          id: string;
          topic_id: string;
          type: string;
          title: string;
          body?: string | null;
          short_body?: string | null;
          image_url?: string | null;
          video_url?: string | null;
          order?: number;
        };
        Update: Partial<{
          topic_id: string;
          type: string;
          title: string;
          body: string | null;
          short_body: string | null;
          image_url: string | null;
          video_url: string | null;
          order: number;
        }>;
      };
      user_progress: {
        Row: { user_id: string; item_id: string; completed_at: string };
        Insert: { user_id: string; item_id: string; completed_at?: string };
        Update: Partial<{ user_id: string; item_id: string; completed_at: string }>;
      };
      user_notes: {
        Row: { user_id: string; item_id: string; body: string; updated_at: string };
        Insert: { user_id: string; item_id: string; body: string; updated_at?: string };
        Update: Partial<{ user_id: string; item_id: string; body: string; updated_at: string }>;
      };
      user_saves: {
        Row: { user_id: string; item_id: string; saved_at: string };
        Insert: { user_id: string; item_id: string; saved_at?: string };
        Update: Partial<{ user_id: string; item_id: string; saved_at: string }>;
      };
      topic_comments: {
        Row: { id: string; topic_id: string; user_id: string; body: string; created_at: string };
        Insert: { id?: string; topic_id: string; user_id: string; body: string; created_at?: string };
        Update: Partial<{ topic_id: string; user_id: string; body: string; created_at: string }>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
