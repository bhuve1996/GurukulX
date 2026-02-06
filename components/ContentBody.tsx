"use client";

/**
 * Renders body text with URLs turned into clickable links (Watch/Read links in notes).
 */
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function isUrl(s: string): boolean {
  return s.startsWith("http://") || s.startsWith("https://");
}

export function ContentBody({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);
  return (
    <p className="whitespace-pre-line">
      {parts.map((part, i) =>
        isUrl(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 underline hover:text-neutral-700"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}
