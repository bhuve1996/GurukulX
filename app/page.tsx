import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { getFeed } from "@/lib/learn/feed";
import { SwipeableFeed } from "@/components/SwipeableFeed";
import { PullToRefresh } from "@/components/PullToRefresh";

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

  // Start at first incomplete item; build completedIds for Mark done on feed
  const completedIdsArr: string[] = [];
  let initialIndex = 0;
  if (userId && feed.length > 0) {
    const topicIds = feed.map((f) => f.topic.id).filter((id, i, arr) => arr.indexOf(id) === i);
    for (const topicId of topicIds) {
      const done = await adapter.progress.listCompletedItemIds(userId, topicId);
      for (let d = 0; d < done.length; d++) completedIdsArr.push(done[d]);
    }
    const nextIdx = feed.findIndex((f) => !completedIdsArr.includes(f.item.id));
    if (nextIdx !== -1) initialIndex = nextIdx;
  }

  return (
    <div className="flex h-[calc(100vh-2.75rem)] min-h-0 flex-col overflow-x-hidden bg-neutral-100 -mx-4 -my-4 md:mx-0 md:my-0 md:h-[calc(100vh-2.75rem)]">
      <div className="min-h-0 w-full flex-1 overflow-hidden px-0 md:mx-auto md:max-w-lg md:px-4 md:py-2">
        <PullToRefresh>
          <SwipeableFeed feed={feed} initialIndex={initialIndex} completedIds={completedIdsArr} />
        </PullToRefresh>
      </div>
    </div>
  );
}
