"use client";

import { useEffect } from "react";
import { ui } from "@/lib/config";

export default function GlobalError({
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
    <html lang="en">
      <body className="antialiased bg-neutral-50">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm max-w-md">
            <h1 className="text-xl font-semibold text-neutral-900">{ui.globalError.title}</h1>
            <p className="mt-2 text-sm text-neutral-600">{ui.globalError.description}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              {ui.globalError.tryAgain}
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
