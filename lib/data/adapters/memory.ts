/**
 * In-memory adapter for development and tests.
 * No external DB; swap to Supabase via config.
 */

import type { DataAdapter, Track, Phase, Topic, ContentItem, UserNote, UserSave, TopicComment } from "@/lib/data/types";

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
  { id: "1", trackId: "1", slug: "python", name: "Python", order: 0, estimatedDays: 7 },
  { id: "2", trackId: "1", slug: "data", name: "Data", order: 1, estimatedDays: 7 },
  { id: "3", trackId: "1", slug: "ml", name: "ML", order: 2, estimatedDays: 14 },
  { id: "4", trackId: "1", slug: "deep-learning", name: "Deep Learning", order: 3, estimatedDays: 14 },
  { id: "5", trackId: "1", slug: "nlp-genai", name: "NLP / LLMs / GenAI", order: 4, estimatedDays: 14 },
  { id: "6", trackId: "1", slug: "computer-vision", name: "Computer Vision", order: 5, estimatedDays: 7 },
  { id: "7", trackId: "1", slug: "deployment", name: "Deployment", order: 6, estimatedDays: 5 },
  { id: "8", trackId: "1", slug: "mlops", name: "MLOps", order: 7, estimatedDays: 7 },
  { id: "9", trackId: "1", slug: "capstone", name: "Capstone", order: 8, estimatedDays: 14 },
];

const topics: Topic[] = [
  { id: "1", phaseId: "1", slug: "basics", name: "Basics", order: 0, estimatedDays: 3 },
  { id: "2", phaseId: "1", slug: "libraries", name: "Libraries", order: 1, estimatedDays: 4 },
  { id: "3", phaseId: "2", slug: "data-loading", name: "Data loading", order: 0, estimatedDays: 2 },
  { id: "4", phaseId: "2", slug: "eda", name: "Exploratory data analysis", order: 1, estimatedDays: 3 },
  { id: "5", phaseId: "2", slug: "visualization", name: "Visualization", order: 2, estimatedDays: 2 },
  { id: "6", phaseId: "3", slug: "supervised", name: "Supervised learning", order: 0, estimatedDays: 4 },
  { id: "7", phaseId: "3", slug: "algorithms", name: "Key algorithms", order: 1, estimatedDays: 5 },
  { id: "8", phaseId: "3", slug: "evaluation", name: "Model evaluation", order: 2, estimatedDays: 3 },
  { id: "9", phaseId: "4", slug: "neural-nets", name: "Neural networks", order: 0, estimatedDays: 4 },
  { id: "10", phaseId: "4", slug: "cnns", name: "Convolutional networks", order: 1, estimatedDays: 4 },
  { id: "11", phaseId: "4", slug: "rnns", name: "RNNs and sequences", order: 2, estimatedDays: 4 },
  { id: "12", phaseId: "5", slug: "text-basics", name: "Text basics", order: 0, estimatedDays: 4 },
  { id: "13", phaseId: "5", slug: "transformers", name: "Transformers", order: 1, estimatedDays: 5 },
  { id: "14", phaseId: "5", slug: "llms-genai", name: "LLMs and GenAI", order: 2, estimatedDays: 5 },
  { id: "15", phaseId: "6", slug: "images", name: "Images and preprocessing", order: 0, estimatedDays: 4 },
  { id: "16", phaseId: "6", slug: "vision-models", name: "Vision models", order: 1, estimatedDays: 3 },
  { id: "17", phaseId: "7", slug: "serving", name: "Serving models", order: 0, estimatedDays: 5 },
  { id: "18", phaseId: "8", slug: "pipeline", name: "Pipelines and monitoring", order: 0, estimatedDays: 7 },
  { id: "19", phaseId: "9", slug: "project", name: "Capstone project", order: 0, estimatedDays: 14 },
];

const content: ContentItem[] = [
  {
    id: "1",
    topicId: "1",
    type: "note",
    title: "Why Python for AI?",
    body:
      "Python is the standard language for AI and ML: readable syntax, a huge ecosystem (NumPy, Pandas, PyTorch, TensorFlow, scikit-learn), and strong community support. Most research and production ML code is written in Python.\n\nWatch: https://www.youtube.com/watch?v=kqtD5dpn9C0\nRead: https://www.python.org/about/",
    shortBody:
      "Python: readable syntax, huge ecosystem (NumPy, PyTorch, TensorFlow), great for AI/ML. Start here.",
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    videoUrl: null,
    order: 0,
  },
  {
    id: "2",
    topicId: "1",
    type: "short",
    title: "Variables and types",
    body:
      "Use clear variable names. Prefer type hints for readability: name: str, count: int, price: float. They help tools and other developers understand your code. Start with simple types and add hints as you go.\n\nWatch: https://www.youtube.com/watch?v=0sOvCWFmrtA",
    shortBody:
      "Clear names. Prefer type hints: name: str, count: int. Keeps code readable.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/0sOvCWFmrtA",
    order: 1,
  },
  {
    id: "3",
    topicId: "1",
    type: "note",
    title: "Your first script",
    body:
      "Create a .py file and run it with: python file.py. Use print() to see output. Keep scripts small and run them often to catch errors early.\n\nRead: https://docs.python.org/3/tutorial/interpreter.html",
    shortBody:
      "Create a .py file, run with python file.py. Use print() to see output.",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    videoUrl: null,
    order: 2,
  },
  // Python > Libraries (full course continues in Supabase via 002_full_course_content.sql)
  {
    id: "4",
    topicId: "2",
    type: "note",
    title: "NumPy in a nutshell",
    body:
      "NumPy gives you fast arrays and math in Python. Use ndarray for vectors and matrices; vectorize loops instead of writing for-loops. It is the foundation for Pandas and most ML libraries.\n\nRead: https://numpy.org/doc/stable/user/quickstart.html",
    shortBody: "NumPy: fast arrays, vectorized math. Foundation for Pandas and ML.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    videoUrl: null,
    order: 0,
  },
  {
    id: "5",
    topicId: "2",
    type: "short",
    title: "Pandas DataFrames",
    body:
      "Pandas DataFrames are tables: rows and columns, load CSV with read_csv(), filter with boolean indexing, group by with groupby(). Essential for data prep before ML.\n\nRead: https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html",
    shortBody: "DataFrames: load CSV, filter, groupby. Essential for data prep.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    videoUrl: null,
    order: 1,
  },
  {
    id: "6",
    topicId: "2",
    type: "note",
    title: "Matplotlib and Seaborn",
    body:
      "Matplotlib: low-level plotting (plot, scatter, bar). Seaborn: higher-level, great for distributions and correlations (histplot, pairplot, heatmap). Use both for EDA and reports.\n\nRead: https://matplotlib.org/stable/tutorials/introductory/quick_start.html",
    shortBody: "Matplotlib for custom plots; Seaborn for stats and EDA.",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    videoUrl: null,
    order: 2,
  },
];

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
