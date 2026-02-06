/**
 * In-memory adapter for development and tests.
 * No external DB; swap to Supabase via config.
 */

import type { DataAdapter, Track, Phase, Topic, ContentItem } from "@/lib/data/types";

const tracks: Track[] = [
  {
    id: "1",
    slug: "ai-ml",
    name: "AI/ML",
    description: "Python → Data → ML → Deep Learning → GenAI → CV → MLOps",
    order: 0,
  },
];

const phases: Phase[] = [
  { id: "1", trackId: "1", slug: "python", name: "Python", order: 0 },
  { id: "2", trackId: "1", slug: "data", name: "Data", order: 1 },
  { id: "3", trackId: "1", slug: "ml", name: "ML", order: 2 },
  { id: "4", trackId: "1", slug: "deep-learning", name: "Deep Learning", order: 3 },
  { id: "5", trackId: "1", slug: "nlp-genai", name: "NLP / LLMs / GenAI", order: 4 },
  { id: "6", trackId: "1", slug: "computer-vision", name: "Computer Vision", order: 5 },
  { id: "7", trackId: "1", slug: "deployment", name: "Deployment", order: 6 },
  { id: "8", trackId: "1", slug: "mlops", name: "MLOps", order: 7 },
  { id: "9", trackId: "1", slug: "capstone", name: "Capstone", order: 8 },
];

const topics: Topic[] = [
  { id: "1", phaseId: "1", slug: "basics", name: "Basics", order: 0 },
  { id: "2", phaseId: "1", slug: "libraries", name: "Libraries", order: 1 },
];

const content: ContentItem[] = [
  {
    id: "1",
    topicId: "1",
    type: "note",
    title: "Why Python for AI?",
    body: "Python is the go-to language for AI and ML: clear syntax, huge ecosystem (NumPy, PyTorch, TensorFlow), and great community. Start here.",
    shortBody: "Python: clear syntax, huge ecosystem (NumPy, PyTorch, TensorFlow), great community. Start here.",
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    videoUrl: null,
    order: 0,
  },
  {
    id: "2",
    topicId: "1",
    type: "short",
    title: "Variables and types",
    body: "Use clear names. Prefer type hints: `name: str`, `count: int`. Keep it readable.",
    shortBody: "Clear names. Prefer type hints: name: str, count: int. Keep it readable.",
    imageUrl: null,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    order: 1,
  },
  {
    id: "3",
    topicId: "1",
    type: "note",
    title: "Your first script",
    body: "Create a `.py` file, run with `python file.py`. Use `print()` to see output. Small steps.",
    shortBody: "Create a .py file, run with python file.py. Use print() to see output.",
    imageUrl: null,
    videoUrl: null,
    order: 2,
  },
];

/** userId -> Set of completed itemIds */
const progressStore = new Map<string, Set<string>>();

const memoryAdapter: DataAdapter = {
  tracks: {
    list: async () => [...tracks].sort((a, b) => a.order - b.order),
    getBySlug: async (slug) => tracks.find((t) => t.slug === slug) ?? null,
  },
  phases: {
    listByTrackId: async (trackId) =>
      phases.filter((p) => p.trackId === trackId).sort((a, b) => a.order - b.order),
  },
  topics: {
    listByPhaseId: async (phaseId) =>
      topics.filter((t) => t.phaseId === phaseId).sort((a, b) => a.order - b.order),
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
};

export default memoryAdapter;
