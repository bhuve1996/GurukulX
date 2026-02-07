import { getSupabaseClient } from "@/lib/supabase-client";
import { ui } from "@/lib/config";

type Params = Promise<{ id: string }>;

/** GET /api/languages/[id] – get one language by id or code */
export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
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
    .or(`id.eq.${id},code.eq.${id}`)
    .maybeSingle();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  if (!data) {
    return Response.json({ error: ui.api.languageNotFound }, { status: 404 });
  }
  return Response.json({ language: data });
}

/** PUT /api/languages/[id] – update a language */
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.languagesRequireSupabase },
      { status: 501 }
    );
  }
  let body: { code?: string; name?: string; order?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: ui.api.invalidJson }, { status: 400 });
  }
  const updates: Record<string, unknown> = {};
  if (body.code !== undefined) updates.code = String(body.code).trim().toLowerCase();
  if (body.name !== undefined) updates.name = String(body.name).trim();
  if (body.order !== undefined) updates.order = Number(body.order);
  if (Object.keys(updates).length === 0) {
    return Response.json({ error: ui.api.noFieldsToUpdate }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("languages")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ language: data });
}

/** DELETE /api/languages/[id] – delete a language */
export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: ui.api.languagesRequireSupabase },
      { status: 501 }
    );
  }
  const { error } = await supabase.from("languages").delete().eq("id", id);
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ ok: true });
}
