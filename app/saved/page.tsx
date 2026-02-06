import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { getCurrentUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const userId = await getCurrentUserId();
  const adapter = getDataAdapter();

  if (!userId) {
    return (
      <div className="max-w-content mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Saved</h1>
        <p className="mt-2 text-neutral-600">Save items to see them here.</p>
        <Link href="/learn" className="mt-6 inline-block rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 no-underline hover:bg-neutral-50">
          Browse Learn →
        </Link>
      </div>
    );
  }

  const [saves, tracks] = await Promise.all([adapter.saves.list(userId), adapter.tracks.list()]);
  const resolved = await Promise.all(
    saves.map(async (s) => {
      const item = await adapter.content.getById?.(s.itemId);
      if (!item) return null;
      const topic = await adapter.topics.getById?.(item.topicId);
      if (!topic) return null;
      const phase = await adapter.phases.getById?.(topic.phaseId);
      if (!phase) return null;
      const track = tracks.find((t) => t.id === phase.trackId);
      if (!track) return null;
      return { item, topic, phase, track };
    })
  );

  const list = resolved.filter((r): r is NonNullable<typeof r> => r != null);

  return (
    <div className="max-w-content mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Saved</h1>
      <p className="mt-2 text-neutral-600">
        {list.length === 0
          ? "No saved items yet. Use the star on any content to save it."
          : `${list.length} saved item${list.length === 1 ? "" : "s"}.`}
      </p>
      {list.length > 0 && (
        <ul className="mt-6 space-y-3">
          {list.map(({ item, topic, phase, track }) => (
            <li key={item.id}>
              <Link
                href={`/learn/${track.slug}/${phase.slug}/${topic.slug}#item-${item.id}`}
                className="block rounded-xl border border-neutral-200 bg-white p-4 no-underline shadow-sm hover:border-neutral-300"
              >
                <span className="font-medium text-neutral-900">{item.title}</span>
                <span className="ml-2 text-sm text-neutral-500">
                  {track.name} → {phase.name} → {topic.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/learn" className="mt-6 inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900">
        Browse Learn →
      </Link>
    </div>
  );
}
