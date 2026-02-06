import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getFeed } from "@/lib/learn/feed";
import { SwipeableFeed } from "@/components/SwipeableFeed";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const adapter = getDataAdapter();
  const tracks = await adapter.tracks.list();
  const feed = await getFeed(
    tracks,
    (id) => adapter.phases.listByTrackId(id),
    (id) => adapter.topics.listByPhaseId(id),
    (id) => adapter.content.listByTopicId(id)
  );

  return (
    <div className="mx-auto max-w-lg">
      {/* InShorts-style minimal header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-neutral-900">For you</span>
        <Link
          href="/learn"
          className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 no-underline hover:bg-neutral-100 hover:text-neutral-900"
        >
          Learn
        </Link>
      </div>
      <SwipeableFeed feed={feed} />
    </div>
  );
}
