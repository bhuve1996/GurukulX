/**
 * In-memory adapter for development and tests.
 * No external DB; swap to Supabase via config.
 */

import type { DataAdapter, Track, Phase, Topic, ContentItem, UserNote, UserSave, TopicComment } from "@/lib/data/types";

/** No static content; add courses via API or use Supabase. */
const tracks: Track[] = [];
const phases: Phase[] = [];
const topics: Topic[] = [];
const content: ContentItem[] = [];

/** userId -> Set of completed itemIds */
const progressStore = new Map<string, Set<string>>();
/** (userId, itemId) -> UserNote */
const notesStore = new Map<string, UserNote>();
/** userId -> UserSave[] */
const savesStore = new Map<string, UserSave[]>();
const commentsStore: TopicComment[] = [];
let commentIdCounter = 1;

function noteKey(userId: string, itemId: string) {
  return `${userId}:${itemId}`;
}

const memoryAdapter: DataAdapter = {
  tracks: {
    list: async () => [...tracks].sort((a, b) => a.order - b.order),
    getBySlug: async (slug) => tracks.find((t) => t.slug === slug) ?? null,
  },
  phases: {
    listByTrackId: async (trackId) =>
      phases.filter((p) => p.trackId === trackId).sort((a, b) => a.order - b.order),
    getById: async (phaseId) => phases.find((p) => p.id === phaseId) ?? null,
  },
  topics: {
    listByPhaseId: async (phaseId) =>
      topics.filter((t) => t.phaseId === phaseId).sort((a, b) => a.order - b.order),
    getById: async (topicId) => topics.find((t) => t.id === topicId) ?? null,
  },
  content: {
    listByTopicId: async (topicId) =>
      content.filter((c) => c.topicId === topicId).sort((a, b) => a.order - b.order),
    getById: async (itemId) => content.find((c) => c.id === itemId) ?? null,
  },
  progress: {
    markDone: async (userId, itemId) => {
      let set = progressStore.get(userId);
      if (!set) {
        set = new Set();
        progressStore.set(userId, set);
      }
      set.add(itemId);
    },
    listCompletedItemIds: async (userId, topicId) => {
      const set = progressStore.get(userId);
      if (!set) return [];
      return content.filter((c) => c.topicId === topicId && set!.has(c.id)).map((c) => c.id);
    },
    isDone: async (userId, itemId) => progressStore.get(userId)?.has(itemId) ?? false,
  },
  notes: {
    get: async (userId, itemId) => notesStore.get(noteKey(userId, itemId)) ?? null,
    upsert: async (userId, itemId, body) => {
      const key = noteKey(userId, itemId);
      notesStore.set(key, { userId, itemId, body, updatedAt: new Date().toISOString() });
    },
  },
  saves: {
    add: async (userId, itemId) => {
      const list = savesStore.get(userId) ?? [];
      if (list.some((s) => s.itemId === itemId)) return;
      list.push({ userId, itemId, savedAt: new Date().toISOString() });
      savesStore.set(userId, list);
    },
    remove: async (userId, itemId) => {
      const list = savesStore.get(userId) ?? [];
      savesStore.set(userId, list.filter((s) => s.itemId !== itemId));
    },
    list: async (userId) => [...(savesStore.get(userId) ?? [])].sort((a, b) => b.savedAt.localeCompare(a.savedAt)),
    isSaved: async (userId, itemId) => (savesStore.get(userId) ?? []).some((s) => s.itemId === itemId),
  },
  comments: {
    listByTopicId: async (topicId) =>
      [...commentsStore].filter((c) => c.topicId === topicId).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    add: async (topicId, userId, body) => {
      const comment: TopicComment = {
        id: String(commentIdCounter++),
        topicId,
        userId,
        body,
        createdAt: new Date().toISOString(),
      };
      commentsStore.push(comment);
      return comment;
    },
  },
};

export default memoryAdapter;
