import Link from "next/link";
import { getDataAdapter } from "@/lib/data";

export default async function LearnPage() {
  const adapter = getDataAdapter();
  const tracks = await adapter.tracks.list();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Learn</h1>
      <p className="mt-1 text-neutral-600">Pick a track and follow the path.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {tracks.map((track) => (
          <li key={track.id}>
            <Link
              href={`/learn/${track.slug}`}
              className="block rounded-xl border border-neutral-200 bg-white p-4 no-underline shadow-sm hover:border-neutral-300 hover:shadow transition min-h-[44px] flex flex-col justify-center"
            >
              <span className="font-semibold text-neutral-900">{track.name}</span>
              {track.description && (
                <span className="mt-1 block text-sm text-neutral-500 line-clamp-2">
                  {track.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
