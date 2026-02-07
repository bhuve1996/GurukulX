import { getDataAdapter } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase-client";
import { ui } from "@/lib/config";

/** GET /api/courses – list all courses (tracks) */
export async function GET() {
  const adapter = getDataAdapter();
  const tracks = await adapter.tracks.list();
  return Response.json({ courses: tracks });
}

/** POST /api/courses – create a course (requires Supabase) */
export async function POST(request: Request) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.courseRequiresSupabase },
      { status: 501 }
    );
  }
  let body: { id?: string; slug: string; name: string; description?: string | null; order?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ui.api.invalidJson }, { status: 400 });
  }
  const { slug, name, description = null, order = 0 } = body;
  if (!slug || typeof slug !== "string" || !name || typeof name !== "string") {
    return Response.json(
      { error: ui.api.slugAndNameRequired },
      { status: 400 }
    );
  }
  const id = body.id ?? crypto.randomUUID();
  const { data, error } = await supabase
    .from("tracks")
    .insert({ id, slug: slug.trim(), name: name.trim(), description: description?.trim() ?? null, order: Number(order) })
    .select()
    .single();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ course: data });
}
