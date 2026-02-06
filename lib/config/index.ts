/**
 * Single source of truth for runtime config.
 * App and data layer import from here; avoid process.env elsewhere.
 */

export type DataAdapterName = "supabase" | "memory";

const raw = {
  nodeEnv: process.env.NODE_ENV,
  dataAdapter: (process.env.DATA_ADAPTER ?? "memory") as DataAdapterName,
  // Supabase (only used when dataAdapter === "supabase")
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

function getConfig() {
  if (raw.dataAdapter === "supabase") {
    if (!raw.supabaseUrl || !raw.supabaseAnonKey) {
      throw new Error(
        "DATA_ADAPTER=supabase requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    }
  }
  return {
    nodeEnv: raw.nodeEnv,
    dataAdapter: raw.dataAdapter,
    supabase: {
      url: raw.supabaseUrl,
      anonKey: raw.supabaseAnonKey,
    },
  };
}

export const config = getConfig();
