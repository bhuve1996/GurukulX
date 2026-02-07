import { getDataAdapter } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase-client";
import { ui } from "@/lib/config";

type Params = Promise<{ id: string }>;

/** GET /api/courses/[id] – get one course by id or slug */
export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const adapter = getDataAdapter();
  const tracks = await adapter.tracks.list();
  const course = tracks.find((t) => t.id === id || t.slug === id) ?? null;
  if (!course) {
    return Response.json({ error: ui.api.courseNotFound }, { status: 404 });
  }
  return Response.json({ course });
}

/** PUT /api/courses/[id] – update a course (requires Supabase) */
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.courseRequiresSupabase },
      { status: 501 }
    );
  }
  let body: { slug?: string; name?: string; description?: string | null; order?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ui.api.invalidJson }, { status: 400 });
  }
  const updates: Record<string, unknown> = {};
  if (body.slug !== undefined) updates.slug = String(body.slug).trim();
  if (body.name !== undefined) updates.name = String(body.name).trim();
  if (body.description !== undefined) updates.description = body.description === null || body.description === "" ? null : String(body.description).trim();
  if (body.order !== undefined) updates.order = Number(body.order);
  if (Object.keys(updates).length === 0) {
    return Response.json({ error: ui.api.noFieldsToUpdate }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("tracks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ course: data });
}

/** DELETE /api/courses/[id] – delete a course (requires Supabase, cascades to phases/topics/content) */
export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.courseRequiresSupabase },
      { status: 501 }
    );
  }
  const { error } = await supabase.from("tracks").delete().eq("id", id);
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true });
}
