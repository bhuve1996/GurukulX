"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@/lib/learn/feed";
import { MarkDoneButton } from "@/components/MarkDoneButton";
import { DEFAULT_CARD_IMAGE } from "@/lib/constants";

const SWIPE_THRESHOLD = 80;

type Props = {
  feed: FeedItem[];
  /** Start at this index (e.g. first incomplete item so user continues where they left off). */
  initialIndex?: number;
  /** Completed item IDs (from progress) so we can show Done badge and Mark done. */
  completedIds?: string[];
};

function getContentUrl(f: FeedItem): string {
  return `/learn/${f.track.slug}/${f.phase.slug}/${f.topic.slug}#item-${f.item.id}`;
}

export function SwipeableFeed({ feed, initialIndex = 0, completedIds = [] }: Props) {
  const completedSet = new Set(completedIds);
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, feed.length - 1))
  );
  const touchStartX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  const goNext = useCallback(() => {
    setDragOffset(0);
    setIndex((i) => (i + 1) % Math.max(1, feed.length));
  }, [feed.length]);

  const goPrev = useCallback(() => {
    setDragOffset(0);
    setIndex((i) => (i - 1 + feed.length) % Math.max(1, feed.length));
  }, [feed.length]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const x = e.touches[0].clientX;
    const delta = x - touchStartX.current;
    // Cap drag for a bit of resistance at the edges
    const capped = Math.max(-200, Math.min(200, delta));
    setDragOffset(capped);
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = touchStartX.current - endX;
      if (deltaX > SWIPE_THRESHOLD) goNext();
      else if (deltaX < -SWIPE_THRESHOLD) goPrev();
      else setDragOffset(0);
    },
    [goNext, goPrev]
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    setDragOffset(0);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const delta = e.clientX - touchStartX.current;
    const capped = Math.max(-200, Math.min(200, delta));
    setDragOffset(capped);
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      const deltaX = touchStartX.current - e.clientX;
      if (deltaX > SWIPE_THRESHOLD) goNext();
      else if (deltaX < -SWIPE_THRESHOLD) goPrev();
      else setDragOffset(0);
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
  const isDone = completedSet.has(f.item.id);

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden"
      style={{ touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setDragOffset(0)}
      onMouseUp={onMouseUp}
    >
      <div
        className="flex min-h-0 flex-1 flex-col transition-transform duration-150 ease-out"
        style={{ transform: `translateX(${dragOffset}px)` }}
      >
        <article className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-white shadow-none md:max-h-[calc(100vh-140px)] md:rounded-2xl md:border md:border-neutral-200 md:shadow-lg">
          <span className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            Part of {f.topic.name}
          </span>
          <div className="absolute right-4 top-4 z-10">
            <MarkDoneButton itemId={f.item.id} isDone={isDone} />
          </div>
          <Link
            href={contentUrl}
            className="flex h-full min-h-0 flex-1 flex-col overflow-hidden text-left no-underline outline-none"
          >
            <div className="relative min-h-[45vh] flex-1 w-full overflow-hidden bg-neutral-200">
              <Image
                src={f.item.imageUrl || DEFAULT_CARD_IMAGE}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2}
              />
            </div>
            <div className="flex flex-shrink-0 flex-col p-4 sm:p-5">
              <h2 className="text-lg font-semibold text-neutral-900 line-clamp-2 sm:text-xl">
                {f.item.title}
              </h2>
              <p className="mt-2 min-h-[3rem] flex-1 overflow-y-auto text-sm leading-relaxed text-neutral-600">
                {shortText}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 pt-8">
              <span className="inline-flex items-center text-sm font-medium text-white">
                Tap to know more
                <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
      </article>
      </div>
    </div>
  );
}
