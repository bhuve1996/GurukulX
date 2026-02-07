"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ContentItem } from "@/lib/data/types";
import { MarkDoneButton } from "@/components/MarkDoneButton";
import { DEFAULT_CARD_IMAGE } from "@/lib/constants";
import { ui } from "@/lib/config";

function normalizeEmbedUrl(url: string): string {
  if (/youtube\.com\/embed\//.test(url) || /vimeo\.com\/video\//.test(url)) return url;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return url;
}

type Props = {
  items: ContentItem[];
  completedIds: string[];
  trackSlug: string;
  phaseSlug: string;
  topicSlug: string;
  topicName: string;
};

export function ShortsStack({
  items,
  completedIds,
  trackSlug,
  phaseSlug,
  topicSlug,
  topicName,
}: Props) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  const completedSet = new Set(completedIds);
  const isDone = item ? completedSet.has(item.id) : false;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  if (!item) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <p className="text-neutral-500">{ui.shortsStack.noItemsInTopic}</p>
      </div>
    );
  }

  const body = item.shortBody ?? item.body ?? "";
  const detailUrl = `/learn/${trackSlug}/${phaseSlug}/${topicSlug}#item-${item.id}`;

  return (
    <div className="flex min-h-[85vh] flex-col">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2">
        <Link
          href={`/learn/${trackSlug}/${phaseSlug}/${topicSlug}`}
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          ← {topicName}
        </Link>
        <span className="text-sm text-neutral-400">
          {index + 1} / {items.length}
        </span>
      </div>

      <div
        className="flex flex-1 flex-col overflow-hidden"
        style={{ touchAction: "pan-y" }}
      >
        <article className="flex flex-1 flex-col overflow-y-auto rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:mx-4 sm:mt-4 sm:max-h-[calc(85vh-120px)] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              {item.type}
            </span>
            <MarkDoneButton itemId={item.id} isDone={isDone} />
          </div>
          <h2 className="mt-2 text-xl font-semibold text-neutral-900 sm:text-2xl">
            {item.title}
          </h2>
          <figure className="relative my-3 aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
            <Image
              src={item.imageUrl || DEFAULT_CARD_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </figure>
          {item.videoUrl && /youtube|youtu\.be|vimeo/.test(item.videoUrl) && (
            <div className="my-3 aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
              <iframe
                src={normalizeEmbedUrl(item.videoUrl)}
                title={item.title}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          )}
          <p className="mt-2 flex-1 text-neutral-700 leading-relaxed">
            {body}
          </p>
        </article>

        <div className="flex items-center justify-between gap-4 border-t border-neutral-200 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            className="min-h-[48px] rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            {ui.shortsStack.previous}
          </button>
          <Link
            href={detailUrl}
            className="min-h-[48px] rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 no-underline hover:bg-neutral-50"
          >
            {ui.shortsStack.viewFull}
          </Link>
          <button
            type="button"
            onClick={goNext}
            className="min-h-[48px] rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            {ui.shortsStack.next}
          </button>
        </div>
      </div>
    </div>
  );
}
