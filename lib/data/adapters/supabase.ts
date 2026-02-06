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
  userProgress: "user_progress",
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
          shortBody: row.short_body ?? undefined,
        })
      );
    },
    getById: async (itemId) => {
      const { data, error } = await getClient()
        .from(TABLES.content)
        .select("*")
        .eq("id", itemId)
        .single();
      if (error && error.code !== "PGRST116") throw new Error(error.message);
      if (!data) return null;
      const row = data as Record<string, unknown>;
      return mapRow<ContentItem>({
        ...row,
        topicId: row.topic_id,
        imageUrl: row.image_url ?? undefined,
        videoUrl: row.video_url ?? undefined,
        shortBody: row.short_body ?? undefined,
      });
    },
  },
  progress: {
    markDone: async (userId, itemId) => {
      const { error } = await getClient()
        .from(TABLES.userProgress)
        .upsert({ user_id: userId, item_id: itemId, completed_at: new Date().toISOString() }, { onConflict: "user_id,item_id" });
      if (error) throw new Error(error.message);
    },
    listCompletedItemIds: async (userId, topicId) => {
      const [{ data: progressData, error: progressError }, { data: topicData, error: topicError }] = await Promise.all([
        getClient().from(TABLES.userProgress).select("item_id").eq("user_id", userId),
        getClient().from(TABLES.content).select("id").eq("topic_id", topicId),
      ]);
      if (progressError) throw new Error(progressError.message);
      if (topicError) throw new Error(topicError.message);
      const topicItemIds = new Set((topicData ?? []).map((r: { id: string }) => r.id));
      return (progressData ?? []).map((r: { item_id: string }) => r.item_id).filter((id: string) => topicItemIds.has(id));
    },
    isDone: async (userId, itemId) => {
      const { data, error } = await getClient()
        .from(TABLES.userProgress)
        .select("item_id")
        .eq("user_id", userId)
        .eq("item_id", itemId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return !!data;
    },
  },
};

export default supabaseAdapter;
