import type { ContentItem, Phase, Topic, Track } from "@/lib/data/types";

export type NextLink =
  | { type: "item"; track: Track; phase: Phase; topic: Topic; item: ContentItem }
  | { type: "topic"; track: Track; phase: Phase; topic: Topic }
  | { type: "phase"; track: Track; phase: Phase }
  | null;

/** Next item in same topic; else null. */
export function getNextItemInTopic(items: ContentItem[], currentItemId: string): ContentItem | null {
  const idx = items.findIndex((i) => i.id === currentItemId);
  if (idx === -1 || idx >= items.length - 1) return null;
  return items[idx + 1]!;
}

/** After this topic: next topic in phase, or next phase in track. */
export function getNextForTopicPage(
  track: Track,
  phase: Phase,
  topic: Topic,
  allTopicsInPhase: Topic[],
  allPhasesInTrack: Phase[]
): NextLink {
  const topicIdx = allTopicsInPhase.findIndex((t) => t.id === topic.id);
  if (topicIdx >= 0 && topicIdx < allTopicsInPhase.length - 1) {
    return { type: "topic", track, phase, topic: allTopicsInPhase[topicIdx + 1]! };
  }
  const phaseIdx = allPhasesInTrack.findIndex((p) => p.id === phase.id);
  if (phaseIdx >= 0 && phaseIdx < allPhasesInTrack.length - 1) {
    return { type: "phase", track, phase: allPhasesInTrack[phaseIdx + 1]! };
  }
  return null;
}

/** First incomplete item in track. */
export function getContinueLink(
  track: Track,
  phases: Phase[],
  topicsByPhaseId: Map<string, Topic[]>,
  itemsByTopicId: Map<string, ContentItem[]>,
  completedItemIds: Set<string>
): NextLink {
  for (const phase of phases) {
    const topics = topicsByPhaseId.get(phase.id) ?? [];
    for (const topic of topics) {
      const items = itemsByTopicId.get(topic.id) ?? [];
      for (const item of items) {
        if (!completedItemIds.has(item.id)) {
          return { type: "item", track, phase, topic, item };
        }
      }
    }
  }
  return null;
}

export function formatNextLink(link: NextLink): string {
  if (!link) return "";
  if (link.type === "item") return `${link.track.name} → ${link.phase.name} → ${link.topic.name} → ${link.item.title}`;
  if (link.type === "topic") return `${link.track.name} → ${link.phase.name} → ${link.topic.name}`;
  return `${link.track.name} → ${link.phase.name}`;
}

export function getNextHref(link: NextLink): string | null {
  if (!link) return null;
  const base = `/learn/${link.track.slug}`;
  if (link.type === "item") return `${base}/${link.phase.slug}/${link.topic.slug}#item-${link.item.id}`;
  if (link.type === "topic") return `${base}/${link.phase.slug}/${link.topic.slug}`;
  return `${base}/${link.phase.slug}`;
}
