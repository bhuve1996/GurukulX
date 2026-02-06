import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { getFeed } from "@/lib/learn/feed";
import { SwipeableFeed } from "@/components/SwipeableFeed";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const adapter = getDataAdapter();
  const userId = await getCurrentUserId();
  const tracks = await adapter.tracks.list();
  const feed = await getFeed(
    tracks,
    (id) => adapter.phases.listByTrackId(id),
    (id) => adapter.topics.listByPhaseId(id),
    (id) => adapter.content.listByTopicId(id)
  );

  // Start at first incomplete item so user can pick up where they left off
  let initialIndex = 0;
  if (userId && feed.length > 0) {
    const completedIds = new Set<string>();
    const topicIds = feed.map((f) => f.topic.id).filter((id, i, arr) => arr.indexOf(id) === i);
    for (const topicId of topicIds) {
      const done = await adapter.progress.listCompletedItemIds(userId, topicId);
      done.forEach((id) => completedIds.add(id));
    }
    const nextIdx = feed.findIndex((f) => !completedIds.has(f.item.id));
    if (nextIdx !== -1) initialIndex = nextIdx;
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-neutral-100 md:min-h-[calc(100vh-4rem)]">
      {/* InShorts-style minimal header; feed fills remaining viewport for PWA */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <span className="text-lg font-semibold text-neutral-900">For you</span>
        <Link
          href="/learn"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 no-underline hover:bg-neutral-100 hover:text-neutral-900"
        >
          Learn
        </Link>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden md:mx-auto md:max-w-lg md:py-4">
        <SwipeableFeed feed={feed} initialIndex={initialIndex} />
      </div>
    </div>
  );
}
