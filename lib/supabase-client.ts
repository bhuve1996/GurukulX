/**
 * Supabase client for API routes that need to write (courses, languages).
 * Use getDataAdapter() for read-only app data. Use this only when DATA_ADAPTER=supabase.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";

let instance: SupabaseClient | null = null;

/** Returns Supabase client when DATA_ADAPTER=supabase; otherwise null. */
export function getSupabaseClient(): SupabaseClient | null {
  if (config.dataAdapter !== "supabase") return null;
  if (instance) return instance;
  const { url, anonKey } = config.supabase;
  if (!url || !anonKey) return null;
  instance = createClient(url, anonKey, {
    global: { fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }) },
  });
  return instance;
}
