import type { ContentItem, Phase, Topic, Track } from "@/lib/data/types";

export interface FeedItem {
  item: ContentItem;
  topic: Topic;
  phase: Phase;
  track: Track;
}

/** Build a flat feed of all content items in order: track → phase → topic → items. */
export async function getFeed(
  tracks: Track[],
  getPhases: (trackId: string) => Promise<Phase[]>,
  getTopics: (phaseId: string) => Promise<Topic[]>,
  getItems: (topicId: string) => Promise<ContentItem[]>
): Promise<FeedItem[]> {
  const feed: FeedItem[] = [];
  for (const track of tracks) {
    const phases = await getPhases(track.id);
    for (const phase of phases) {
      const topics = await getTopics(phase.id);
      for (const topic of topics) {
        const items = await getItems(topic.id);
        for (const item of items) {
          feed.push({ item, topic, phase, track });
        }
      }
    }
  }
  return feed;
}
