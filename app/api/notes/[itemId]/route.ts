import { getDataAdapter } from "@/lib/data";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const userId = getUserIdFromRequest(_request);
  if (!userId) return new Response(JSON.stringify({ note: null }), { status: 200, headers: { "Content-Type": "application/json" } });
  const { itemId } = await params;
  const adapter = getDataAdapter();
  const note = await adapter.notes.get(userId, itemId);
  return new Response(JSON.stringify({ note }), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return new Response(JSON.stringify({ error: "No user" }), { status: 401 });
  const { itemId } = await params;
  let body: { body?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
  const text = typeof body.body === "string" ? body.body : "";
  const adapter = getDataAdapter();
  await adapter.notes.upsert(userId, itemId, text);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
}
