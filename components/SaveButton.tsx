"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = { itemId: string; isSaved: boolean };

export function SaveButton({ itemId, isSaved }: Props) {
  const router = useRouter();
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      if (saved) {
        const res = await fetch(`/api/saves?itemId=${encodeURIComponent(itemId)}`, { method: "DELETE" });
        if (res.ok) setSaved(false);
      } else {
        const res = await fetch("/api/saves", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId }),
        });
        if (res.ok) setSaved(true);
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-neutral-300 bg-white p-2 text-neutral-600 hover:bg-neutral-50 disabled:opacity-60"
      aria-label={saved ? "Unsave" : "Save"}
      title={saved ? "Unsave" : "Save for later"}
    >
      {saved ? (
        <svg className="h-5 w-5 fill-amber-500 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )}
    </button>
  );
}
