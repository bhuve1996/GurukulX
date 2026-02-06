import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ShortsStack } from "@/components/ShortsStack";

export default async function ShortsPage({
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

  return (
    <div>
      <ShortsStack
        items={items}
        completedIds={completedIds}
        trackSlug={trackSlug}
        phaseSlug={phaseSlug}
        topicSlug={topicSlug}
        topicName={topic.name}
      />
    </div>
  );
}
