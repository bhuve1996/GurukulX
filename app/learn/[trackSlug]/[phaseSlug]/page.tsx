import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function PhasePage({
  params,
}: {
  params: Promise<{ trackSlug: string; phaseSlug: string }>;
}) {
  const { trackSlug, phaseSlug } = await params;
  const adapter = getDataAdapter();
  const track = await adapter.tracks.getBySlug(trackSlug);
  if (!track) notFound();
  const phases = await adapter.phases.listByTrackId(track.id);
  const phase = phases.find((p) => p.slug === phaseSlug);
  if (!phase) notFound();

  const topics = await adapter.topics.listByPhaseId(phase.id);

  return (
    <div>
      <nav className="text-sm text-neutral-500">
        <Link href="/learn" className="hover:text-neutral-700">Learn</Link>
        <span className="mx-2">/</span>
        <Link href={`/learn/${track.slug}`} className="hover:text-neutral-700">{track.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{phase.name}</span>
      </nav>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {phase.name}
      </h1>
      <p className="mt-1 text-neutral-600">Topics in this phase.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/learn/${track.slug}/${phase.slug}/${topic.slug}`}
              className="block rounded-xl border border-neutral-200 bg-white p-4 no-underline shadow-sm hover:border-neutral-300 hover:shadow transition min-h-[44px] flex items-center font-medium text-neutral-900"
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
