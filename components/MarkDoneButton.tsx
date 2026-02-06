"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = { itemId: string; isDone: boolean };

export function MarkDoneButton({ itemId, isDone }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(isDone);

  async function handleMarkDone() {
    if (done) return;
    setLoading(true);
    try {
      const res = await fetch("/api/progress/done", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (res.ok) {
        setDone(true);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  const iconClass = "h-5 w-5 sm:h-6 sm:w-6";

  if (done) {
    return (
      <button
        type="button"
        aria-label="Marked as done"
        className="inline-flex min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleMarkDone}
      disabled={loading}
      aria-label="Mark as done"
      className="inline-flex min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-60 transition-colors"
    >
      {loading ? (
        <span className={iconClass} aria-hidden>…</span>
      ) : (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </button>
  );
}
