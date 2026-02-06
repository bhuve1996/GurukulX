import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm max-w-md">
        <h1 className="text-xl font-semibold text-neutral-900">Page not found</h1>
        <p className="mt-2 text-sm text-neutral-600">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-neutral-800"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
