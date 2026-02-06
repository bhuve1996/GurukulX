import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { ContentBlock } from "@/components/ContentBlock";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const adapter = getDataAdapter();
  const tracks = await adapter.tracks.list();
  const track = tracks[0];
  if (!track) {
    return (
      <div className="max-w-content mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900">Today</h1>
        <p className="mt-2 text-neutral-600">No tracks yet. Add content in Learn.</p>
      </div>
    );
  }
  const phases = await adapter.phases.listByTrackId(track.id);
  const phase = phases[0];
  if (!phase) {
    return (
      <div className="max-w-content mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900">Today</h1>
        <p className="mt-2 text-neutral-600">No phases yet.</p>
      </div>
    );
  }
  const topics = await adapter.topics.listByPhaseId(phase.id);
  const topic = topics[0];
  if (!topic) {
    return (
      <div className="max-w-content mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900">Today</h1>
        <p className="mt-2 text-neutral-600">No topics yet.</p>
      </div>
    );
  }
  const items = await adapter.content.listByTopicId(topic.id);
  const todayIndex = Math.floor(Date.now() / 86400000) % Math.max(items.length, 1);
  const item = items[todayIndex];

  return (
    <div className="max-w-content mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Today’s bite</h1>
      <p className="mt-1 text-neutral-600">One thing to learn today.</p>
      {item ? (
        <div className="mt-6">
          <ContentBlock item={item} />
          <div className="mt-6">
            <Link
              href={`/learn/${track.slug}/${phase.slug}/${topic.slug}`}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              See full topic: {topic.name} →
            </Link>
          </div>
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-neutral-500">
          No content in this topic yet. Browse <Link href="/learn" className="underline">Learn</Link> to explore.
        </p>
      )}
    </div>
  );
}
