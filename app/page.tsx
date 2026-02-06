import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { getContinueLink, getNextHref, formatNextLink } from "@/lib/learn/next";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const adapter = getDataAdapter();
  const userId = await getCurrentUserId();
  const tracks = await adapter.tracks.list();
  const track = tracks[0];
  let continueLink: ReturnType<typeof getContinueLink> = null;

  if (track && userId) {
    const phases = await adapter.phases.listByTrackId(track.id);
    const topicsByPhaseId = new Map<string, Awaited<ReturnType<typeof adapter.topics.listByPhaseId>>>();
    const itemsByTopicId = new Map<string, Awaited<ReturnType<typeof adapter.content.listByTopicId>>>();
    const completedItemIds = new Set<string>();
    for (const phase of phases) {
      const topics = await adapter.topics.listByPhaseId(phase.id);
      topicsByPhaseId.set(phase.id, topics);
      for (const topic of topics) {
        const items = await adapter.content.listByTopicId(topic.id);
        itemsByTopicId.set(topic.id, items);
        const done = await adapter.progress.listCompletedItemIds(userId, topic.id);
        done.forEach((id) => completedItemIds.add(id));
      }
    }
    continueLink = getContinueLink(track, phases, topicsByPhaseId, itemsByTopicId, completedItemIds);
  }

  const continueHref = continueLink ? getNextHref(continueLink) : null;

  return (
    <div className="max-w-content mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Learn AI, one step at a time
      </h1>
      <p className="mt-2 text-neutral-600 leading-relaxed">
        Notes, shorts, quizzes, and practice. Pick a track and start, or see today’s bite.
      </p>
      {continueHref && (
        <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-medium text-neutral-500">Continue where you left off</p>
          <Link href={continueHref} className="mt-1 block font-medium text-neutral-900 hover:underline">
            {formatNextLink(continueLink!)}
          </Link>
        </div>
      )}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Link
          href="/today"
          className="min-h-[48px] rounded-xl bg-neutral-900 px-6 py-3 text-center font-medium text-white no-underline hover:bg-neutral-800 flex items-center justify-center"
        >
          Today’s bite
        </Link>
        <Link
          href="/learn"
          className="min-h-[48px] rounded-xl border border-neutral-300 bg-white px-6 py-3 text-center font-medium text-neutral-700 no-underline hover:bg-neutral-50 flex items-center justify-center"
        >
          Browse Learn
        </Link>
      </div>
    </div>
  );
}
