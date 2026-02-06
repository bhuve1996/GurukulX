/**
 * Data layer entry. Rest of the app imports getDataAdapter() from here only.
 * Switching DB = change DATA_ADAPTER in env + implement adapter in adapters/<name>.
 */

import { config } from "@/lib/config";
import type { DataAdapter } from "@/lib/data/types";
import memoryAdapter from "@/lib/data/adapters/memory";
import supabaseAdapter from "@/lib/data/adapters/supabase";

const adapters: Record<typeof config.dataAdapter, DataAdapter> = {
  memory: memoryAdapter,
  supabase: supabaseAdapter,
};

export function getDataAdapter(): DataAdapter {
  return adapters[config.dataAdapter];
}

export type { DataAdapter, Track, Phase, Topic, ContentItem } from "@/lib/data/types";
