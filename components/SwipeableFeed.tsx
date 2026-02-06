"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@/lib/learn/feed";
import { MarkDoneButton } from "@/components/MarkDoneButton";
import { DEFAULT_CARD_IMAGE } from "@/lib/constants";

function useShare(contentUrl: string, title: string) {
  return useCallback(async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}${contentUrl}` : contentUrl;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) {
        if ((e as Error).name !== "AbortError") copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  }, [contentUrl, title]);
}

function copyToClipboard(url: string) {
  navigator.clipboard?.writeText(url).catch(() => {});
}

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
  const touchStartY = useRef(0);
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
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const deltaX = x - touchStartX.current;
    const deltaY = y - touchStartY.current;
    // Only move card for horizontal swipes; let pull-to-refresh handle vertical pull
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;
    const capped = Math.max(-200, Math.min(200, deltaX));
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
    touchStartY.current = e.clientY;
    setDragOffset(0);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const deltaX = e.clientX - touchStartX.current;
    const deltaY = e.clientY - touchStartY.current;
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;
    const capped = Math.max(-200, Math.min(200, deltaX));
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

  const currentItem = feed.length > 0 ? feed[Math.min(index, feed.length - 1)] : null;
  const contentUrl = currentItem ? getContentUrl(currentItem) : "";
  const shareTitle = currentItem ? currentItem.item.title : "";
  const handleShare = useShare(contentUrl, shareTitle);

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
        <article className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-white shadow-none md:max-h-[calc(100vh-120px)] md:rounded-2xl md:border md:border-neutral-200 md:shadow-lg">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white">
            Part of {f.topic.name}
          </span>
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleShare(); }}
              aria-label="Share"
              className="inline-flex min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg className="h-5 w-5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <MarkDoneButton itemId={f.item.id} isDone={isDone} />
          </div>
          <Link
            href={contentUrl}
            className="flex h-full min-h-0 flex-1 flex-col overflow-hidden text-left no-underline outline-none"
          >
            <div className="relative h-[36vh] min-h-[140px] max-h-[220px] w-full flex-shrink-0 overflow-hidden bg-neutral-200">
              <Image
                src={f.item.imageUrl || DEFAULT_CARD_IMAGE}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2}
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-5">
              <h2 className="text-base font-semibold text-neutral-900 line-clamp-2 flex-shrink-0 sm:text-lg">
                {f.item.title}
              </h2>
              <p className="mt-2 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-neutral-600">
                {shortText}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center justify-center gap-1.5 border-t border-neutral-200 bg-neutral-50 px-4 py-3">
              <span className="text-xs font-medium text-neutral-600 sm:text-sm">
                Tap to know more
              </span>
              <svg className="h-3.5 w-3.5 text-neutral-500 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
      </article>
      </div>
    </div>
  );
}
