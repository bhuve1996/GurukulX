import { getDataAdapter } from "@/lib/data";
import { getUserIdFromRequest } from "@/lib/auth";
import { ui } from "@/lib/config";

export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return new Response(JSON.stringify({ saves: [] }), { status: 200, headers: { "Content-Type": "application/json" } });
  const adapter = getDataAdapter();
  const saves = await adapter.saves.list(userId);
  return new Response(JSON.stringify({ saves }), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return new Response(JSON.stringify({ error: ui.api.noUser }), { status: 401 });
  let body: { itemId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: ui.api.invalidJson }), { status: 400 });
  }
  const itemId = body.itemId;
  if (!itemId || typeof itemId !== "string") {
    return new Response(JSON.stringify({ error: ui.api.itemIdRequired }), { status: 400 });
  }
  const adapter = getDataAdapter();
  await adapter.saves.add(userId, itemId);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function DELETE(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) return new Response(JSON.stringify({ error: ui.api.noUser }), { status: 401 });
  const url = new URL(request.url);
  const itemId = url.searchParams.get("itemId");
  if (!itemId) return new Response(JSON.stringify({ error: ui.api.itemIdRequired }), { status: 400 });
  const adapter = getDataAdapter();
  await adapter.saves.remove(userId, itemId);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
}
