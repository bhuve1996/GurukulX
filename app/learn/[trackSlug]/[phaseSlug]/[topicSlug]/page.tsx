import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { notFound } from "next/navigation";
import { ContentBlock } from "@/components/ContentBlock";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ trackSlug: string; phaseSlug: string; topicSlug: string }>;
}) {
  const { trackSlug, phaseSlug, topicSlug } = await params;
  const adapter = getDataAdapter();
  const track = await adapter.tracks.getBySlug(trackSlug);
  if (!track) notFound();
  const phases = await adapter.phases.listByTrackId(track.id);
  const phase = phases.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();
  const topics = await adapter.topics.listByPhaseId(phase.id);
  const topic = topics.find((t) => t.slug === topicSlug);
  if (!topic) notFound();

  const items = await adapter.content.listByTopicId(topic.id);

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
      <p className="mt-1 text-neutral-600">Notes, shorts, and practice.</p>
      <div className="mt-6 space-y-6 max-w-content">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-neutral-500">
            No content here yet. Check back soon.
          </p>
        ) : (
          items.map((item) => <ContentBlock key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
