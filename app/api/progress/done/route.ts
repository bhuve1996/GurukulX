import { getDataAdapter } from "@/lib/data";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return new Response(JSON.stringify({ error: "No user" }), { status: 401 });
  }
  let body: { itemId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
  const { itemId } = body;
  if (!itemId || typeof itemId !== "string") {
    return new Response(JSON.stringify({ error: "itemId required" }), { status: 400 });
  }
  const adapter = getDataAdapter();
  await adapter.progress.markDone(userId, itemId);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
