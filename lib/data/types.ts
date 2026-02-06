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
}

export interface Topic {
  id: string;
  phaseId: string;
  slug: string;
  name: string;
  order: number;
}

export interface ContentItem {
  id: string;
  topicId: string;
  type: "note" | "short" | "quiz" | "practice";
  title: string;
  body: string | null;
  /** Short for every item: concise summary that gives the whole idea. Used for short cards (image + title + text). */
  shortBody?: string | null;
  /** Image for the short card. If missing, UI shows a placeholder (e.g. first letter). */
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
  };
  topics: {
    listByPhaseId(phaseId: string): Promise<Topic[]>;
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
}
