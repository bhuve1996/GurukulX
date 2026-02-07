import { getSupabaseClient } from "@/lib/supabase-client";
import { ui } from "@/lib/config";

/** GET /api/languages – list all languages */
export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.languagesRequireSupabase },
      { status: 501 }
    );
  }
  const { data, error } = await supabase
    .from("languages")
    .select("*")
    .order("order", { ascending: true });
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ languages: data ?? [] });
}

/** POST /api/languages – create a language */
export async function POST(request: Request) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.languagesRequireSupabase },
      { status: 501 }
    );
  }
  let body: { id?: string; code: string; name: string; order?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ui.api.invalidJson }, { status: 400 });
  }
  const { code, name, order = 0 } = body;
  if (!code || typeof code !== "string" || !name || typeof name !== "string") {
    return Response.json(
      { error: ui.api.codeAndNameRequired },
      { status: 400 }
    );
  }
  const id = body.id ?? crypto.randomUUID();
  const { data, error } = await supabase
    .from("languages")
    .insert({ id, code: code.trim().toLowerCase(), name: name.trim(), order: Number(order) })
    .select()
    .single();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ language: data });
}
