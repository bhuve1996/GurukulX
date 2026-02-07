import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { getFeed } from "@/lib/learn/feed";
import { ContentBlock } from "@/components/ContentBlock";
import { ui } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const adapter = getDataAdapter();
  const userId = await getCurrentUserId();
  const tracks = await adapter.tracks.list();
  const feed = await getFeed(
    tracks,
    (id) => adapter.phases.listByTrackId(id),
    (id) => adapter.topics.listByPhaseId(id),
    (id) => adapter.content.listByTopicId(id)
  );

  // Today = continue: first incomplete item (same as home feed)
  let continueItem: (typeof feed)[0] | null = null;
  if (feed.length > 0) {
    let completedIds = new Set<string>();
    if (userId) {
      const topicIds = feed.map((f) => f.topic.id).filter((id, i, arr) => arr.indexOf(id) === i);
      for (const topicId of topicIds) {
        const done = await adapter.progress.listCompletedItemIds(userId, topicId);
        done.forEach((id) => completedIds.add(id));
      }
    }
    const idx = feed.findIndex((f) => !completedIds.has(f.item.id));
    if (idx !== -1) continueItem = feed[idx];
    else continueItem = feed[0]; // all done: show first as "start again"
  }

  const isDone = continueItem && userId
    ? await adapter.progress.isDone(userId, continueItem.item.id)
    : false;
  const isSaved = continueItem && userId
    ? await adapter.saves.isSaved(userId, continueItem.item.id)
    : false;
  const initialNote = continueItem && userId
    ? (await adapter.notes.get(userId, continueItem.item.id))?.body ?? null
    : null;

  return (
    <div className="max-w-content mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Today’s bite</h1>
      <p className="mt-1 text-neutral-600">Continue where you left off—one thing to learn today.</p>
      {continueItem ? (
        <div className="mt-6">
          <ContentBlock
            item={continueItem.item}
            initialNoteBody={initialNote}
            isDone={isDone}
            isSaved={isSaved}
          />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/learn/${continueItem.track.slug}/${continueItem.phase.slug}/${continueItem.topic.slug}`}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              See full topic: {continueItem.topic.name} →
            </Link>
            <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
              Swipe more on Home →
            </Link>
          </div>
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-neutral-500">
          {ui.today.noContentYet} <Link href="/learn" className="underline">{ui.nav.learn}</Link> {ui.today.orStartOn} <Link href="/" className="underline">{ui.nav.home}</Link>.
        </p>
      )}
    </div>
  );
}
