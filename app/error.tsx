"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm max-w-md">
        <h1 className="text-xl font-semibold text-neutral-900">Something went wrong</h1>
        <p className="mt-2 text-sm text-neutral-600">
          We couldn’t load this page. Try again or go back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 no-underline hover:bg-neutral-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
