/**
 * Supabase implementation of DataAdapter.
 * Only this file imports @supabase/supabase-js; rest of app uses getDataAdapter().
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";
import type { DataAdapter, Track, Phase, Topic, ContentItem } from "@/lib/data/types";

// Table names from config if we ever want to make them configurable
const TABLES = {
  tracks: "tracks",
  phases: "phases",
  topics: "topics",
  content: "content_items",
} as const;

function getClient() {
  const { url, anonKey } = config.supabase;
  return createClient(url, anonKey);
}

function mapRow<T>(row: Record<string, unknown>): T {
  return row as unknown as T;
}

const supabaseAdapter: DataAdapter = {
  tracks: {
    list: async () => {
      const { data, error } = await getClient()
        .from(TABLES.tracks)
        .select("*")
        .order("order", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []).map(mapRow<Track>);
    },
    getBySlug: async (slug) => {
      const { data, error } = await getClient()
        .from(TABLES.tracks)
        .select("*")
        .eq("slug", slug)
        .single();
      if (error && error.code !== "PGRST116") throw new Error(error.message);
      return data ? mapRow<Track>(data) : null;
    },
  },
  phases: {
    listByTrackId: async (trackId) => {
      const { data, error } = await getClient()
        .from(TABLES.phases)
        .select("*")
        .eq("track_id", trackId)
        .order("order", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []).map((row: Record<string, unknown>) =>
        mapRow<Phase>({
          ...row,
          trackId: row.track_id,
        })
      );
    },
  },
  topics: {
    listByPhaseId: async (phaseId) => {
      const { data, error } = await getClient()
        .from(TABLES.topics)
        .select("*")
        .eq("phase_id", phaseId)
        .order("order", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []).map((row: Record<string, unknown>) =>
        mapRow<Topic>({
          ...row,
          phaseId: row.phase_id,
        })
      );
    },
  },
  content: {
    listByTopicId: async (topicId) => {
      const { data, error } = await getClient()
        .from(TABLES.content)
        .select("*")
        .eq("topic_id", topicId)
        .order("order", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []).map((row: Record<string, unknown>) =>
        mapRow<ContentItem>({
          ...row,
          topicId: row.topic_id,
          imageUrl: row.image_url ?? undefined,
          videoUrl: row.video_url ?? undefined,
        })
      );
    },
  },
};

export default supabaseAdapter;
