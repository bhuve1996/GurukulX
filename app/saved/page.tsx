import Link from "next/link";

export default function SavedPage() {
  return (
    <div className="max-w-content mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Saved</h1>
      <p className="mt-2 text-neutral-600">
        Bookmarks and saved items will appear here. Sign in and save content to see it.
      </p>
      <Link
        href="/learn"
        className="mt-6 inline-block rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 no-underline hover:bg-neutral-50"
      >
        Browse Learn →
      </Link>
    </div>
  );
}
