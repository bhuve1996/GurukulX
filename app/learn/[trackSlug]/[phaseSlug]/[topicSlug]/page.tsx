import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ContentBlock } from "@/components/ContentBlock";
import { ShortCard } from "@/components/ShortCard";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ trackSlug: string; phaseSlug: string; topicSlug: string }>;
}) {
  const { trackSlug, phaseSlug, topicSlug } = await params;
  const adapter = getDataAdapter();
  const userId = await getCurrentUserId();
  const track = await adapter.tracks.getBySlug(trackSlug);
  if (!track) notFound();
  const phases = await adapter.phases.listByTrackId(track.id);
  const phase = phases.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();
  const topics = await adapter.topics.listByPhaseId(phase.id);
  const topic = topics.find((t) => t.slug === topicSlug);
  if (!topic) notFound();

  const [items, completedIds] = await Promise.all([
    adapter.content.listByTopicId(topic.id),
    userId ? adapter.progress.listCompletedItemIds(userId, topic.id) : Promise.resolve([]),
  ]);
  const completedSet = new Set(completedIds);

  return (
    <div>
      <nav className="text-sm text-neutral-500">
        <Link href="/learn" className="hover:text-neutral-700">Learn</Link>
        <span className="mx-2">/</span>
        <Link href={`/learn/${track.slug}`} className="hover:text-neutral-700">{track.name}</Link>
        <span className="mx-2">/</span>
        <Link href={`/learn/${track.slug}/${phase.slug}`} className="hover:text-neutral-700">{phase.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{topic.name}</span>
      </nav>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {topic.name}
      </h1>
      <p className="mt-1 text-neutral-600">
        {items.length > 0 ? (
          <>
            <span className="font-medium text-neutral-700">
              {completedIds.length} of {items.length} done
            </span>
            {" · "}
            Tap a short for full content.
          </>
        ) : (
          "Shorts and full content for this topic."
        )}
      </p>

      {/* Shorts first (default): each item = image + title + short text, tag "Part of [Topic]" */}
      {items.length > 0 && (
        <section className="mt-6" aria-label="Shorts">
          <p className="mb-3 text-sm font-medium text-neutral-500">
            Coming under this topic — tap any card or the expand icon for full content
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ShortCard
                key={item.id}
                item={item}
                topicName={topic.name}
                isDone={completedSet.has(item.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Full content: scroll target for each item */}
      <section className="mt-10" id="full-content" aria-label="Full content">
        <h2 className="text-lg font-semibold text-neutral-800">Full content</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Read in detail or mark as done.
        </p>
        <div className="mt-4 space-y-6 max-w-content">
          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-neutral-500">
              No content here yet. Check back soon.
            </p>
          ) : (
            items.map((item) => (
              <ContentBlock key={item.id} item={item} isDone={completedSet.has(item.id)} />
            ))
          )}
        </div>
      </section>

      <div className="mt-6">
        <Link
          href={`/learn/${track.slug}/${phase.slug}/${topic.slug}/shorts`}
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          Play shorts in sequence →
        </Link>
      </div>
    </div>
  );
}
