import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-content mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Learn AI, one step at a time
      </h1>
      <p className="mt-2 text-neutral-600 leading-relaxed">
        Notes, shorts, quizzes, and practice. Pick a track and start, or see today’s bite.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Link
          href="/today"
          className="min-h-[48px] rounded-xl bg-neutral-900 px-6 py-3 text-center font-medium text-white no-underline hover:bg-neutral-800 flex items-center justify-center"
        >
          Today’s bite
        </Link>
        <Link
          href="/learn"
          className="min-h-[48px] rounded-xl border border-neutral-300 bg-white px-6 py-3 text-center font-medium text-neutral-700 no-underline hover:bg-neutral-50 flex items-center justify-center"
        >
          Browse Learn
        </Link>
      </div>
    </div>
  );
}
