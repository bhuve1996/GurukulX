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
  /** Optional image URL (relative or absolute). */
  imageUrl?: string | null;
  /** Optional video URL (embed or direct). */
  videoUrl?: string | null;
  order: number;
}

/** Contract for all read/write the app needs. Implement per DB (Supabase, Prisma, etc.). */
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
  };
  // Auth and saves can be added here; adapters implement accordingly
}
