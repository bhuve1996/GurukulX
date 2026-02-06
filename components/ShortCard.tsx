"use client";

import Image from "next/image";
import Link from "next/link";
import type { ContentItem } from "@/lib/data/types";

type Props = {
  item: ContentItem;
  topicName: string;
  isDone?: boolean;
};

export function ShortCard({ item, topicName, isDone }: Props) {
  const shortText = item.shortBody ?? item.body ?? "";
  const fullTarget = `#item-${item.id}`;

  return (
    <Link
      href={fullTarget}
      className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white text-left no-underline shadow-sm transition hover:border-neutral-300 hover:shadow"
    >
      <span className="absolute left-3 top-3 z-10 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
        Part of {topicName}
      </span>
      {isDone && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
          ✓ Done
        </span>
      )}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-200">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-neutral-200 text-4xl font-semibold text-neutral-400"
            style={{ fontFamily: "system-ui" }}
          >
            {item.title.trim().charAt(0).toUpperCase() || "?"}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 line-clamp-2">{item.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-neutral-600">{shortText}</p>
      </div>
      <span
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow transition group-hover:bg-neutral-700"
        aria-label="Read full content"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </span>
    </Link>
  );
}
