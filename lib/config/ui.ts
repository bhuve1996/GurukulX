/**
 * All user-facing text and app branding. Single source of truth; no static strings in components.
 * Override via env (e.g. NEXT_PUBLIC_APP_NAME) or replace this object with a JSON load.
 */

export const ui = {
  site: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "GurukulX",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? "Learn — notes, shorts, quizzes, practice.",
    defaultCardImage:
      process.env.NEXT_PUBLIC_DEFAULT_CARD_IMAGE ??
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  nav: {
    home: "Home",
    learn: "Learn",
    today: "Today",
    saved: "Saved",
    mainAria: "Main",
  },
  learn: {
    title: "Learn",
    subtitle: "Pick a track and follow the path.",
  },
  today: {
    title: "Today's bite",
    subtitle: "Continue where you left off—one thing to learn today.",
    seeFullTopic: "See full topic",
    swipeMoreOnHome: "Swipe more on Home",
    noContentYet: "No content yet. Browse",
    orStartOn: "or start on",
  },
  saved: {
    title: "Saved",
    saveItemsToSee: "Save items to see them here.",
    browseLearn: "Browse Learn",
    noSavedYet: "No saved items yet. Use the star on any content to save it.",
    savedCount: (n: number) => `${n} saved item${n === 1 ? "" : "s"}.`,
  },
  feed: {
    noContentInFeed: "No content in the feed yet.",
    browseLearn: "Browse Learn",
    tapToKnowMore: "Tap to know more",
    shareAria: "Share",
    partOf: "Part of",
    done: "Done",
    readFullContent: "Read full content",
  },
  notFound: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or was moved.",
    goHome: "Go home",
  },
  error: {
    title: "Something went wrong",
    description: "We couldn't load this page. Try again or go back home.",
    tryAgain: "Try again",
    goHome: "Go home",
  },
  globalError: {
    title: "Something went wrong",
    description: "The app hit an error. Try refreshing the page.",
    tryAgain: "Try again",
  },
  pullToRefresh: {
    pull: "Pull to refresh",
    release: "Release to refresh",
    refreshing: "Refreshing…",
  },
  markDone: {
    ariaMarkDone: "Mark as done",
    ariaMarkedDone: "Marked as done",
  },
  saveButton: {
    ariaSave: "Save",
    ariaUnsave: "Unsave",
    titleSave: "Save for later",
    titleUnsave: "Unsave",
  },
  contentBlock: {
    videoNotSupported: "Your browser does not support video.",
  },
  topicPage: {
    shortsAria: "Shorts",
    comingUnderTopic: "Coming under this topic — tap any card or the expand icon for full content",
    fullContent: "Full content",
    readInDetail: "Read in detail or mark as done.",
    noContentHereYet: "No content here yet. Check back soon.",
    ofDone: (done: number, total: number) => `${done} of ${total} done`,
    tapShortForFull: "Tap a short for full content.",
    shortsAndContent: "Shorts and full content for this topic.",
    shortsAndContentWithDays: (days: number) => `~${days} days · Shorts and full content.`,
    whatsNext: "What's next:",
    playShortsInSequence: "Play shorts in sequence",
  },
  shortsStack: {
    noItemsInTopic: "No items in this topic.",
    previous: "Previous",
    viewFull: "View full",
    next: "Next",
  },
  phasePage: {
    topicsInPhase: "Topics in this phase.",
    days: (n: number) => `~${n} days`,
  },
  trackPage: {
    days: (n: number) => `~${n} days`,
  },
  comments: {
    discussion: "Discussion",
    askOrShare: "Ask or share with others learning this topic.",
    placeholder: "Add a comment...",
    postComment: "Post comment",
    posting: "Posting...",
    loading: "Loading...",
    noCommentsYet: "No comments yet. Be the first!",
  },
  itemNote: {
    label: "Your note",
    placeholder: "Add a note...",
    saving: "Saving...",
  },
  loading: {
    text: "Loading…",
  },
  api: {
    invalidJson: "Invalid JSON",
    noUser: "No user",
    bodyRequired: "body required",
    itemIdRequired: "itemId required",
    slugAndNameRequired: "slug and name are required",
    codeAndNameRequired: "code and name are required",
    noFieldsToUpdate: "No fields to update",
    courseNotFound: "Course not found",
    languageNotFound: "Language not found",
    courseRequiresSupabase: "Course management requires DATA_ADAPTER=supabase",
    languagesRequireSupabase: "Languages require DATA_ADAPTER=supabase",
  },
} as const;

export type UI = typeof ui;
