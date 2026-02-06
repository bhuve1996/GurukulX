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

  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800">
        <span aria-hidden>✓</span> Done
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleMarkDone}
      disabled={loading}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
    >
      {loading ? "…" : "Mark done"}
    </button>
  );
}
