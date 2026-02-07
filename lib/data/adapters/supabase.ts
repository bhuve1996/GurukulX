/**
 * Supabase implementation of DataAdapter.
 * Only this file imports @supabase/supabase-js; rest of app uses getDataAdapter().
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";
import type { DataAdapter, Track, Phase, Topic, ContentItem, UserNote, UserSave, TopicComment } from "@/lib/data/types";

const TABLES = {
  tracks: "tracks",
  phases: "phases",
  topics: "topics",
  content: "content_items",
  userProgress: "user_progress",
  userNotes: "user_notes",
  userSaves: "user_saves",
  topicComments: "topic_comments",
} as const;

let clientInstance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (clientInstance) return clientInstance;
  const { url, anonKey } = config.supabase;
  clientInstance = createClient(url, anonKey, {
    global: {
      fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }),
    },
  });
  return clientInstance;
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
          estimatedDays: row.estimated_days ?? undefined,
        })
      );
    },
    getById: async (phaseId) => {
      const { data, error } = await getClient().from(TABLES.phases).select("*").eq("id", phaseId).single();
      if (error && error.code !== "PGRST116") throw new Error(error.message);
      if (!data) return null;
      const row = data as Record<string, unknown>;
      return mapRow<Phase>({ ...row, trackId: row.track_id, estimatedDays: row.estimated_days ?? undefined });
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
          estimatedDays: row.estimated_days ?? undefined,
        })
      );
    },
    getById: async (topicId) => {
      const { data, error } = await getClient().from(TABLES.topics).select("*").eq("id", topicId).single();
      if (error && error.code !== "PGRST116") throw new Error(error.message);
      if (!data) return null;
      const row = data as Record<string, unknown>;
      return mapRow<Topic>({ ...row, phaseId: row.phase_id, estimatedDays: row.estimated_days ?? undefined });
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
      const client = getClient();
      const { data: topicData, error: topicError } = await client
        .from(TABLES.content)
        .select("id")
        .eq("topic_id", topicId);
      if (topicError) throw new Error(topicError.message);
      const topicItemIds = new Set((topicData ?? []).map((r: { id: string }) => r.id));
      const { data: progressData, error: progressError } = await client
        .from(TABLES.userProgress)
        .select("item_id")
        .eq("user_id", userId);
      if (progressError) throw new Error(progressError.message);
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
  notes: {
    get: async (userId, itemId) => {
      const { data, error } = await getClient()
        .from(TABLES.userNotes)
        .select("*")
        .eq("user_id", userId)
        .eq("item_id", itemId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!data) return null;
      const row = data as Record<string, unknown>;
      return mapRow<UserNote>({ ...row, userId: row.user_id, itemId: row.item_id, updatedAt: row.updated_at });
    },
    upsert: async (userId, itemId, body) => {
      const { error } = await getClient()
        .from(TABLES.userNotes)
        .upsert({ user_id: userId, item_id: itemId, body, updated_at: new Date().toISOString() }, { onConflict: "user_id,item_id" });
      if (error) throw new Error(error.message);
    },
  },
  saves: {
    add: async (userId, itemId) => {
      const { error } = await getClient()
        .from(TABLES.userSaves)
        .upsert({ user_id: userId, item_id: itemId, saved_at: new Date().toISOString() }, { onConflict: "user_id,item_id" });
      if (error) throw new Error(error.message);
    },
    remove: async (userId, itemId) => {
      const { error } = await getClient()
        .from(TABLES.userSaves)
        .delete()
        .eq("user_id", userId)
        .eq("item_id", itemId);
      if (error) throw new Error(error.message);
    },
    list: async (userId) => {
      const { data, error } = await getClient()
        .from(TABLES.userSaves)
        .select("*")
        .eq("user_id", userId)
        .order("saved_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []).map((row: Record<string, unknown>) =>
        mapRow<UserSave>({ ...row, userId: row.user_id, itemId: row.item_id, savedAt: row.saved_at })
      );
    },
    isSaved: async (userId, itemId) => {
      const { data, error } = await getClient()
        .from(TABLES.userSaves)
        .select("item_id")
        .eq("user_id", userId)
        .eq("item_id", itemId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return !!data;
    },
  },
  comments: {
    listByTopicId: async (topicId) => {
      const { data, error } = await getClient()
        .from(TABLES.topicComments)
        .select("*")
        .eq("topic_id", topicId)
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []).map((row: Record<string, unknown>) =>
        mapRow<TopicComment>({
          ...row,
          topicId: row.topic_id,
          userId: row.user_id,
          createdAt: row.created_at,
        })
      );
    },
    add: async (topicId, userId, body) => {
      const { data, error } = await getClient()
        .from(TABLES.topicComments)
        .insert({ topic_id: topicId, user_id: userId, body })
        .select()
        .single();
      if (error) throw new Error(error.message);
      const row = data as Record<string, unknown>;
      return mapRow<TopicComment>({
        ...row,
        topicId: row.topic_id,
        userId: row.user_id,
        createdAt: row.created_at,
      });
    },
  },
};

export default supabaseAdapter;
