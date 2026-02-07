"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TopicComment } from "@/lib/data/types";
import { ui } from "@/lib/config";

type Props = { topicId: string };

export function TopicComments({ topicId }: Props) {
  const router = useRouter();
  const [comments, setComments] = useState<TopicComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBody, setNewBody] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/comments/${topicId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setComments(data.comments ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  async function postComment(e: React.FormEvent) {
    e.preventDefault();
    const body = newBody.trim();
    if (!body || posting) return;
    setPosting(true);
    try {
      const res = await fetch(`/api/comments/${topicId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, data.comment]);
        setNewBody("");
        router.refresh();
      }
    } finally {
      setPosting(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-neutral-200 bg-white p-4 sm:p-6" aria-label={ui.comments.discussion}>
      <h2 className="text-lg font-semibold text-neutral-900">{ui.comments.discussion}</h2>
      <p className="mt-1 text-sm text-neutral-500">{ui.comments.askOrShare}</p>
      <form onSubmit={postComment} className="mt-4">
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder={ui.comments.placeholder}
          rows={2}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400"
          disabled={posting}
        />
        <button
          type="submit"
          disabled={!newBody.trim() || posting}
          className="mt-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {posting ? ui.comments.posting : ui.comments.postComment}
        </button>
      </form>
      {loading ? (
        <p className="mt-4 text-sm text-neutral-500">{ui.comments.loading}</p>
      ) : comments.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">{ui.comments.noCommentsYet}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-neutral-100 bg-neutral-50 p-3">
              <p className="text-sm text-neutral-800">{c.body}</p>
              <p className="mt-1 text-xs text-neutral-400">{new Date(c.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
