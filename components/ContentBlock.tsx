import Image from "next/image";
import type { ContentItem } from "@/lib/data/types";
import { MarkDoneButton } from "@/components/MarkDoneButton";
import { SaveButton } from "@/components/SaveButton";
import { ItemNote } from "@/components/ItemNote";

type ContentBlockProps = {
  item: ContentItem;
  isDone?: boolean;
  isSaved?: boolean;
  initialNoteBody?: string | null;
};

function normalizeEmbedUrl(url: string): string {
  if (/youtube\.com\/embed\//.test(url) || /vimeo\.com\/video\//.test(url)) return url;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return url;
}

function Media({ item }: ContentBlockProps) {
  if (item.videoUrl) {
    const isEmbed = /youtube|youtu\.be|vimeo/.test(item.videoUrl);
    return (
      <div className="my-4 w-full overflow-hidden rounded-lg bg-neutral-200 aspect-video">
        {isEmbed ? (
          <iframe
            src={normalizeEmbedUrl(item.videoUrl)}
            title={item.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={item.videoUrl}
            controls
            className="h-full w-full"
            preload="metadata"
          >
            Your browser does not support video.
          </video>
        )}
      </div>
    );
  }
  if (item.imageUrl) {
    return (
      <figure className="my-4 w-full relative aspect-video max-h-[320px] sm:max-h-[400px] overflow-hidden rounded-lg bg-neutral-200">
        <Image
          src={item.imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 800px"
        />
      </figure>
    );
  }
  return null;
}

export function ContentBlock({ item, isDone = false, isSaved = false, initialNoteBody }: ContentBlockProps) {
  const typeLabel = item.type.charAt(0).toUpperCase() + item.type.slice(1);
  return (
    <article id={`item-${item.id}`} className="scroll-mt-24 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          {typeLabel}
        </span>
        <div className="flex items-center gap-2">
          <SaveButton itemId={item.id} isSaved={isSaved} />
          <MarkDoneButton itemId={item.id} isDone={isDone} />
        </div>
      </div>
      <h2 className="mt-1 text-xl font-semibold text-neutral-900 sm:text-2xl">
        {item.title}
      </h2>
      <Media item={item} />
      {item.body && (
        <div className="mt-3 max-w-none text-neutral-700 leading-relaxed">
          <p className="whitespace-pre-line">{item.body}</p>
        </div>
      )}
      <ItemNote itemId={item.id} initialBody={initialNoteBody ?? null} />
    </article>
  );
}
