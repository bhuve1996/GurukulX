import { getDataAdapter } from "@/lib/data";
import { getUserIdFromRequest } from "@/lib/auth";
import { ui } from "@/lib/config";

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return new Response(JSON.stringify({ error: ui.api.noUser }), { status: 401 });
  }
  let body: { itemId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: ui.api.invalidJson }), { status: 400 });
  }
  const { itemId } = body;
  if (!itemId || typeof itemId !== "string") {
    return new Response(JSON.stringify({ error: ui.api.itemIdRequired }), { status: 400 });
  }
  const adapter = getDataAdapter();
  await adapter.progress.markDone(userId, itemId);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
