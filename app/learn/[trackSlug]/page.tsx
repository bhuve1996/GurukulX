import Link from "next/link";
import { getDataAdapter } from "@/lib/data";
import { notFound } from "next/navigation";
import { ui } from "@/lib/config";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;
  const adapter = getDataAdapter();
  const track = await adapter.tracks.getBySlug(trackSlug);
  if (!track) notFound();

  const phases = await adapter.phases.listByTrackId(track.id);

  return (
    <div>
      <nav className="text-sm text-neutral-500">
        <Link href="/learn" className="hover:text-neutral-700">
          {ui.nav.learn}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{track.name}</span>
      </nav>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
        {track.name}
      </h1>
      {track.description && (
        <p className="mt-1 text-neutral-600">{track.description}</p>
      )}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((phase) => (
          <li key={phase.id}>
            <Link
              href={`/learn/${track.slug}/${phase.slug}`}
              className="block rounded-xl border border-neutral-200 bg-white p-4 no-underline shadow-sm hover:border-neutral-300 hover:shadow transition min-h-[44px] flex items-center justify-between font-medium text-neutral-900"
            >
              <span>{phase.name}</span>
              {phase.estimatedDays != null && (
                <span className="text-sm font-normal text-neutral-500">{ui.trackPage.days(phase.estimatedDays)}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
