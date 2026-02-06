"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@/lib/learn/feed";

const SWIPE_THRESHOLD = 60;

type Props = {
  feed: FeedItem[];
};

function getContentUrl(f: FeedItem): string {
  return `/learn/${f.track.slug}/${f.phase.slug}/${f.topic.slug}#item-${f.item.id}`;
}

export function SwipeableFeed({ feed }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartY = useRef(0);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(1, feed.length));
  }, [feed.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + feed.length) % Math.max(1, feed.length));
  }, [feed.length]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - endY;
      if (delta > SWIPE_THRESHOLD) goNext();
      else if (delta < -SWIPE_THRESHOLD) goPrev();
    },
    [goNext, goPrev]
  );

  if (!feed.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <p className="text-neutral-500">No content in the feed yet.</p>
        <Link href="/learn" className="ml-2 text-neutral-900 underline">
          Browse Learn
        </Link>
      </div>
    );
  }

  const f = feed[index];
  const shortText = f.item.shortBody ?? f.item.body ?? "";
  const contentUrl = getContentUrl(f);

  return (
    <div
      className="flex min-h-[calc(100vh-120px)] flex-col sm:min-h-[calc(100vh-100px)]"
      style={{ touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <article className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
        <Link
          href={contentUrl}
          className="flex flex-1 flex-col overflow-hidden text-left no-underline outline-none"
        >
          <span className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            Part of {f.topic.name}
          </span>
          <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-neutral-200">
            {f.item.imageUrl ? (
              <Image
                src={f.item.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-5xl font-semibold text-neutral-400">
                {f.item.title.trim().charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-neutral-900 line-clamp-2 sm:text-xl">
              {f.item.title}
            </h2>
            <p className="mt-2 line-clamp-4 flex-1 text-sm text-neutral-600 sm:line-clamp-5">
              {shortText}
            </p>
            <span className="mt-3 inline-flex items-center text-sm font-medium text-neutral-900">
              Read full
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </article>

      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={goPrev}
          className="min-h-[48px] min-w-[44px] rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Previous
        </button>
        <span className="text-sm text-neutral-500">
          {index + 1} / {feed.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          className="min-h-[48px] min-w-[44px] rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
