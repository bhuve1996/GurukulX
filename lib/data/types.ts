/**
 * Data layer contracts. Adapters implement these; app code depends only on these types.
 * Adding or changing a DB = new adapter implementing the same interfaces.
 */

export interface Track {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  order: number;
}

export interface Phase {
  id: string;
  trackId: string;
  slug: string;
  name: string;
  order: number;
  /** Optional: e.g. "~7 days" for this phase. */
  estimatedDays?: number | null;
}

export interface Topic {
  id: string;
  phaseId: string;
  slug: string;
  name: string;
  order: number;
  /** Optional: e.g. "~3 days" for this topic. */
  estimatedDays?: number | null;
}

export interface UserNote {
  userId: string;
  itemId: string;
  body: string;
  updatedAt: string;
}

export interface UserSave {
  userId: string;
  itemId: string;
  savedAt: string;
}

export interface TopicComment {
  id: string;
  topicId: string;
  userId: string;
  body: string;
  createdAt: string;
}

export interface ContentItem {
  id: string;
  topicId: string;
  type: "note" | "short" | "quiz" | "practice";
  title: string;
  body: string | null;
  /** Short for every item: concise summary that gives the whole idea. Used for short cards (image + title + text). */
  shortBody?: string | null;
  /** Image for the card. Recommended for all notes/shorts (mandatory for best PWA experience); UI shows a placeholder if missing. */
  imageUrl?: string | null;
  /** Optional video URL (embed or direct) for full content. */
  videoUrl?: string | null;
  order: number;
}

/** Progress is per user (guest or authenticated). */
export interface DataAdapter {
  tracks: {
    list(): Promise<Track[]>;
    getBySlug(slug: string): Promise<Track | null>;
  };
  phases: {
    listByTrackId(trackId: string): Promise<Phase[]>;
    getById?(phaseId: string): Promise<Phase | null>;
  };
  topics: {
    listByPhaseId(phaseId: string): Promise<Topic[]>;
    getById?(topicId: string): Promise<Topic | null>;
  };
  content: {
    listByTopicId(topicId: string): Promise<ContentItem[]>;
    getById?(itemId: string): Promise<ContentItem | null>;
  };
  progress: {
    markDone(userId: string, itemId: string): Promise<void>;
    listCompletedItemIds(userId: string, topicId: string): Promise<string[]>;
    isDone(userId: string, itemId: string): Promise<boolean>;
  };
  notes: {
    get(userId: string, itemId: string): Promise<UserNote | null>;
    upsert(userId: string, itemId: string, body: string): Promise<void>;
  };
  saves: {
    add(userId: string, itemId: string): Promise<void>;
    remove(userId: string, itemId: string): Promise<void>;
    list(userId: string): Promise<UserSave[]>;
    isSaved(userId: string, itemId: string): Promise<boolean>;
  };
  comments: {
    listByTopicId(topicId: string): Promise<TopicComment[]>;
    add(topicId: string, userId: string, body: string): Promise<TopicComment>;
  };
}
