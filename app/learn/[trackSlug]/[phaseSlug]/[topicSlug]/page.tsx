import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ContentBlock } from "@/components/ContentBlock";
import { ShortCard } from "@/components/ShortCard";
import { TopicComments } from "@/components/TopicComments";
import { getNextForTopicPage, getNextHref, formatNextLink } from "@/lib/learn/next";
import { ui } from "@/lib/config";

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

  const items = await adapter.content.listByTopicId(topic.id);
  const [completedIds, notesAndSaved] = await Promise.all([
    userId ? adapter.progress.listCompletedItemIds(userId, topic.id) : Promise.resolve([]),
    userId
      ? Promise.all(
          items.map(async (item) => ({
            itemId: item.id,
            note: await adapter.notes.get(userId, item.id),
            isSaved: await adapter.saves.isSaved(userId, item.id),
          }))
        ).then((arr) => {
          const map = new Map<string, { noteBody: string | null; isSaved: boolean }>();
          arr.forEach(({ itemId, note, isSaved }) => map.set(itemId, { noteBody: note?.body ?? null, isSaved }));
          return map;
        })
      : Promise.resolve(new Map<string, { noteBody: string | null; isSaved: boolean }>()),
  ]);
  const completedSet = new Set(completedIds);
  const nextLink = getNextForTopicPage(track, phase, topic, topics, phases);
  const nextHref = getNextHref(nextLink);

  return (
    <div>
      <nav className="text-sm text-neutral-500">
        <Link href="/learn" className="hover:text-neutral-700">{ui.nav.learn}</Link>
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
              {ui.topicPage.ofDone(completedIds.length, items.length)}
            </span>
            {topic.estimatedDays != null && (
              <> · {ui.phasePage.days(topic.estimatedDays)}</>
            )}
            {" · "}
            {ui.topicPage.tapShortForFull}
          </>
        ) : (
          topic.estimatedDays != null ? ui.topicPage.shortsAndContentWithDays(topic.estimatedDays) : ui.topicPage.shortsAndContent
        )}
      </p>

      {/* Shorts first (default): each item = image + title + short text, tag "Part of [Topic]" */}
      {items.length > 0 && (
        <section className="mt-6" aria-label={ui.topicPage.shortsAria}>
          <p className="mb-3 text-sm font-medium text-neutral-500">
            {ui.topicPage.comingUnderTopic}
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
      <section className="mt-10" id="full-content" aria-label={ui.topicPage.fullContent}>
        <h2 className="text-lg font-semibold text-neutral-800">{ui.topicPage.fullContent}</h2>
        <p className="mt-1 text-sm text-neutral-500">
          {ui.topicPage.readInDetail}
        </p>
        <div className="mt-4 space-y-6 max-w-content">
          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-neutral-500">
              {ui.topicPage.noContentHereYet}
            </p>
          ) : (
            items.map((item) => {
              const extra = notesAndSaved.get(item.id);
              return (
                <ContentBlock
                  key={item.id}
                  item={item}
                  isDone={completedSet.has(item.id)}
                  isSaved={extra?.isSaved ?? false}
                  initialNoteBody={extra?.noteBody ?? null}
                />
              );
            })
          )}
        </div>
      </section>

      {nextHref && (
        <p className="mt-6">
          <span className="text-neutral-500">{ui.topicPage.whatsNext} </span>
          <Link href={nextHref} className="font-medium text-neutral-700 hover:text-neutral-900">
            {formatNextLink(nextLink!)}
          </Link>
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href={`/learn/${track.slug}/${phase.slug}/${topic.slug}/shorts`}
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          {ui.topicPage.playShortsInSequence} →
        </Link>
      </div>

      <TopicComments topicId={topic.id} />
    </div>
  );
}
