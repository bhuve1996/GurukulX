"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = { itemId: string; initialBody: string | null | undefined };

export function ItemNote({ itemId, initialBody }: Props) {
  const router = useRouter();
  const [body, setBody] = useState(initialBody ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBody(initialBody ?? "");
  }, [itemId, initialBody]);

  async function save() {
    setSaving(true);
    try {
      await fetch(`/api/notes/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
      <label className="block text-sm font-medium text-neutral-700">Your note</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onBlur={save}
        placeholder="Add a note..."
        rows={3}
        className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400"
        disabled={saving}
      />
      {saving && <p className="mt-1 text-xs text-neutral-500">Saving...</p>}
    </div>
  );
}
