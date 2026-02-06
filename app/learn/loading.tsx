export default function LearnLoading() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-4" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      <p className="mt-4 text-sm text-neutral-500">Loading…</p>
    </div>
  );
}
